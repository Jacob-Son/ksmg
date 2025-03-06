import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserKeyStoreService } from 'src/users/user-keystore.service';
import { JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  CheckWalletPasswordDto,
  LoginDto,
  LoginOrRegisterDto,
  LoginOrRegisterResponse,
  RegisterWalletDto,
  RegisteredWalletInfo,
  ResetWalletPasswordDto,
} from './dto/auth.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

export enum SocialLoginProvider {
  GOOGLE = 'google',
  KAKAO = 'kakao',
  NAVER = 'naver',
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly userKeyStoreService: UserKeyStoreService,
  ) {}

  // [주의: 백엔드 테스트용]
  async testLogin(email: string, provider: string) {
    const uid = await this.usersService.getUserIdByEmailAndProvider(
      email,
      provider,
    );
    if (!uid) {
      return { error: 'User not found' };
    }
    const payload = { sub: uid };

    const jwtSignOptions: JwtSignOptions = {
      secret: this.configService.get<string>('CUSTOM_JWT_SECRET'),
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, jwtSignOptions),
    };
  }

  // [STEP 1]
  // input: 소셜 프로바이더 인증 서버에서 발급한 access_token
  // output: 서비스 서버에서 발급한 access_token (JWT)
  async loginOrRegisterWithProviderAccessToken(
    dto: LoginOrRegisterDto,
  ): Promise<LoginOrRegisterResponse> {
    try {
      // TODO: check if it is ok to use email as user identifier
      // and check if we need to check `is_email_valid` & `is_email_verified` fields
      const { email, name, profileImageUrl } =
        await this.getUserDataFromProviderToken(dto.provider, dto.accessToken);

      // TODO: for google, naver

      let user = await this.usersService.getUserByEmailAndProvider(
        email,
        dto.provider,
      );

      if (!user) {
        // create user
        user = await this.usersService.create({
          email,
          name,
          profileImageUrl,
          provider: dto.provider,
        });
      }

      const walletRegistered = user.walletAddress ? true : false; // TODO: test

      // generate jwt token
      const jwt = await this.issueJwtToken(user.uid);
      return {
        uid: user.uid,
        accessToken: jwt,
        walletAddress: user.walletAddress,
        walletRegistered,
      };
    } catch (e) {
      throw new Error('Failed to verify provider access token');
    }
  }

  // [STEP 2]
  // input: 서비스 서버에서 발급한 access_token (JWT) (step 1에서 발급한 토큰)
  // output: 없음 (Guard 역할)
  // TODO: 이 함수의 목적을 명확히 하기
  async loginWithServiceAccessToken(dto: LoginDto): Promise<UserEntity> {
    try {
      const jwtSignOptions: JwtSignOptions = {
        secret: this.configService.get<string>('CUSTOM_JWT_SECRET'),
      };

      // verified and decoded token
      // const decoded = await this.jwtService.decode(loginDto.accessToken);
      const verifiedToken = await this.jwtService.verifyAsync(
        dto.accessToken,
        jwtSignOptions,
      );

      const uid = verifiedToken.sub;

      const user = await this.usersService.findOne(uid);

      if (!user) {
        throw new Error('User not found');
      }

      await this.usersService.updateLastLoginAt(uid);

      return user;
    } catch (e) {
      throw new Error('Failed to verify service access token');
    }
  }

  async registerWallet(
    uid: string,
    dto: RegisterWalletDto,
  ): Promise<RegisteredWalletInfo> {
    try {
      // TODO: Atomicity
      // create user key store (random)
      const userKeyStore = await this.userKeyStoreService.create(dto.password);

      // update user
      await this.usersService.registerWallet(
        uid,
        userKeyStore.address,
        userKeyStore.id,
      );

      await this.usersService.registerPhoneNumber(uid, dto.phoneNumber);

      return {
        uid,
        walletAddress: userKeyStore.address,
      };
    } catch (e) {
      throw new Error('Failed to register wallet & phone number');
    }
  }

  async checkWalletPassword(uid: string, dto: CheckWalletPasswordDto) {
    try {
      const user = await this.usersService.findOne(uid);
      const userKeyStore = await this.userKeyStoreService.findOne(
        user.userKeyStoreId,
      );

      const isMatch = await bcrypt.compare(
        dto.password,
        userKeyStore.passwordHash,
      );

      return isMatch;
    } catch (e) {
      throw new Error('Failed to check wallet password');
    }
  }

  // 이전 비밀번호를 잊어버렸을 경우
  // TODO: 이전 비밀번호를 알고 있을 경우 호출할 함수도 추가 검토
  async resetWalletPassword(
    uid: string,
    dto: ResetWalletPasswordDto,
  ): Promise<RegisteredWalletInfo> {
    try {
      const userKeyStore = await this.userKeyStoreService.rotateKey(
        uid,
        dto.newPassword,
      );
      return {
        uid,
        walletAddress: userKeyStore.address,
      };
    } catch (e) {
      throw new Error('Failed to reset wallet password');
    }
  }

  // ------------------------------ private methods ------------------------------

  // TODO: rename this method
  // FIXME: expiration time, refresh token handling
  // TODO: check if it is compatible with other providers (google, naver)

  private async getUserDataFromProviderToken(
    provider: string,
    accessToken: string,
  ) {
    let providerAuthUrl: string;
    let data: any;
    let email: string;
    let name: string;
    let profileImageUrl: string;

    // add more providers here
    switch (provider) {
      case SocialLoginProvider.KAKAO:
        providerAuthUrl = this.configService.get<string>('KAKAO_AUTH_URL');
        data = await this.getUserDataFromProvider(providerAuthUrl, accessToken);
        email = data.kakao_account.email;
        name = data.kakao_account.profile.nickname;
        profileImageUrl = data.kakao_account.profile.profile_image_url;
        break;
      case SocialLoginProvider.GOOGLE:
        providerAuthUrl = this.configService.get<string>('GOOGLE_AUTH_URL');
        data = await this.getUserDataFromProvider(providerAuthUrl, accessToken);
        email = data.email;
        name = data.name;
        profileImageUrl = data.picture;
        break;
      case SocialLoginProvider.NAVER:
        providerAuthUrl = this.configService.get<string>('NAVER_AUTH_URL');
        data = await this.getUserDataFromProvider(providerAuthUrl, accessToken);
        email = data.response.email ? data.response.email : data.response.id;
        name = data.response.name;
        profileImageUrl = data.response.profile_image;
        break;
      default:
        throw new Error('Invalid provider');
    }

    return {
      email,
      name,
      profileImageUrl,
    };
  }

  // JWT token for the service backend
  private async issueJwtToken(uid: string) {
    const payload = { sub: uid };

    const jwtSignOptions: JwtSignOptions = {
      secret: this.configService.get<string>('CUSTOM_JWT_SECRET'),
    };

    return await this.jwtService.signAsync(payload, jwtSignOptions);
  }

  // TODO: 성공 여부 처리
  private async getUserDataFromProvider(
    providerAuthUrl: string,
    accessToken: string,
  ) {
    const response = await fetch(providerAuthUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });

    const data = await response.json();
    console.log('>>> data: ', data);
    return data;
  }
}
