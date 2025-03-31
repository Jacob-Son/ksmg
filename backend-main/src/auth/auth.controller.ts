import {
  Body,
  Controller,
  Headers,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginType, ShippingInfo, UserRole } from '@prisma/client';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signIn')
  @ApiTags('auth')
  @ApiOperation({
    summary: '로그인',
    description: '로그인을 합니다.',
  })
  async signIn(@Headers('authorization') authorization: string) {
    let user: {
      name: string;
      // phoneNumber: string;
      email: string;
      loginType: LoginType;
      profileImageUrl: string;
      // role: UserRole; // ✅ 역할 추가
    };
    try {
      user = await this.authService.getUser(authorization);
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: '로그인에 실패했습니다.',
        data: null,
      };
    }

    const signInInfo = await this.authService.signIn(
      user.name,
      user.email,
      user.loginType,
      user.profileImageUrl,
    );
    if (!signInInfo.userInfo) {
      return {
        success: false,
        error: '로그인에 실패했습니다.',
        data: null,
      };
    }
    if (signInInfo.isNeedPassword) {
      return {
        success: false,
        error: 'WALLET_ADDRESS_NOT_FOUND',
        data: null,
      };
    }
    return {
      success: true,
      error: null,
      data: {
        userInfo: signInInfo.userInfo,
        isNewUser: signInInfo.isNewUser,
      },
    };
  }

  @Patch('/make-wallet')
  @ApiTags('auth')
  @ApiOperation({
    summary: '지갑 주소 생성',
    description: '지갑 주소를 생성합니다.',
  })
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async makeAddress(
    @Headers('authorization') authorization: string,
    @Body('password') password: string,
    // @Body('phoneNumber') phoneNumber: string,
    @Body('shippingInfo')
    shippingInfo: Pick<
      ShippingInfo,
      'name' | 'postCode' | 'mainAddress' | 'detailAddress'
    >,
  ) {
    let user: {
      name: string;
      email: string;
      loginType: LoginType;
      profileImageUrl: string;
    };
    try {
      user = await this.authService.getUser(authorization);
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: '로그인에 실패했습니다.',
        data: null,
      };
    }
    const result = await this.authService.makeAddress(
      user.email,
      user.loginType,
      password,
      // phoneNumber,
      shippingInfo,
      authorization,
    );
    if (!result) {
      return {
        success: false,
        error: '지갑 주소 생성에 실패했습니다.',
        data: null,
      };
    }
    return {
      success: true,
      error: null,
      data: null,
    };
  }

  @Patch('/reset-wallet-password')
  @ApiTags('auth')
  @ApiOperation({
    summary: '지갑 비밀번호 초기화',
    description: '지갑 비밀번호를 초기화합니다.',
  })
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async resetWalletPassword(
    @Headers('authorization') authorization: string,
    @Body('password') password: string,
  ) {
    const result = await this.authService.resetWalletPassword(
      password,
      authorization,
    );
    if (!result) {
      return {
        success: false,
        error: '지갑 비밀번호 초기화에 실패했습니다.',
        data: null,
      };
    }
    return {
      success: true,
      error: null,
      data: null,
    };
  }

  @Post('/password-check')
  @ApiTags('auth')
  @ApiOperation({
    summary: '지갑 비밀번호 확인',
    description: '지갑 비밀번호를 확인합니다.',
  })
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async checkPassword(
    @Headers('authorization') authorization: string,
    @Body('password') password: string,
  ) {
    const result = await this.authService.checkPassword(
      password,
      authorization,
    );
    if (!result) {
      return {
        success: false,
        error: '지갑 비밀번호가 일치하지 않습니다.',
        data: null,
      };
    }
    return {
      success: true,
      error: null,
      data: null,
    };
  }

  @Post('/sign-message')
  @ApiTags('auth')
  @ApiOperation({
    summary: '메세지 서명',
    description: '메세지를 서명합니다.',
  })
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async signMessage(
    @Headers('authorization') authorization: string,
    @Body('message') message: string,
    @Body('password') password: string,
  ) {
    const result = await this.authService.signMessage(
      message,
      password,
      authorization,
    );
    if (!result) {
      return {
        success: false,
        error: '메세지 서명에 실패했습니다.',
        data: null,
      };
    }
    return {
      success: true,
      error: null,
      data: result,
    };
  }

  // @Post('/certification-number')
  // @ApiTags('auth')
  // @ApiOperation({
  //   summary: '인증번호 발송',
  //   description: '인증번호를 발송합니다.',
  // })
  // @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  // async sendCertificationNumber(
  //   @Body('phoneNumber') phoneNumber: string,
  //   @Body('code') code: string,
  // ) {
  //   const result = await this.authService.sendCertificationNumber(
  //     phoneNumber,
  //     String(code),
  //   );
  //   if (!result) {
  //     return {
  //       success: false,
  //       error: '인증번호 발송에 실패했습니다.',
  //       data: null,
  //     };
  //   }
  //   return {
  //     success: true,
  //     error: null,
  //     data: null,
  //   };
  // }
}
