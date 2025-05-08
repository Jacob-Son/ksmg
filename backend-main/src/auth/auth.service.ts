import { Injectable } from '@nestjs/common';
import { LoginType, ShippingInfo } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { BizService } from 'src/biz/biz.service';
import { decryptText, encryptText } from 'src/common/utils/crypto';
import { WalletService } from 'src/wallet/wallet.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly walletService: WalletService,
    private readonly bizService: BizService,
    private readonly prisma: PrismaService,
  ) {}
  async getUser(token: string) {
    try {
      const userResult = await this.walletService.getUser(token);
      return {
        userAddress: userResult.userAddress,
        name: userResult.name,
        email: userResult.email,
        loginType: userResult.loginType,
        profileImageUrl: userResult.profileImageUrl,
        phoneNumber: userResult.phoneNumber ?? null,
      };
    } catch (e) {
      console.log(e);
      throw new Error('유저 정보를 가져오는데 실패했습니다.');
    }
  }

  // async signIn(
  //   name: string,
  //   email: string,
  //   loginType: LoginType,
  //   profileImageUrl: string,
  // ): Promise<{
  //   userInfo: any;
  //   isNewUser: boolean;
  //   isNeedPassword?: boolean;
  // }> {
  //   try {
  //     const checkUser = await this.prisma.user.findUnique({
  //       where: {
  //         email_loginType: {
  //           email,
  //           loginType,
  //         },
  //       },
  //       select: {
  //         name: true,
  //         email: true,
  //         loginType: true,
  //         userProfileUrl: true,
  //         userAddress: true,
  //         accountNumber: true,
  //       },
  //     });

  //     if (checkUser) {
  //       const userName = checkUser.name
  //         ? await decryptText({ prisma: this.prisma, content: checkUser.name })
  //         : null;
  //       const accountNumber = checkUser.accountNumber
  //         ? await decryptText({
  //             prisma: this.prisma,
  //             content: checkUser.accountNumber,
  //           })
  //         : null;

  //       if (!checkUser.userAddress) {
  //         return {
  //           userInfo: {
  //             ...checkUser,
  //             name: userName,
  //             accountNumber,
  //           },
  //           isNeedPassword: true,
  //           isNewUser: false,
  //         };
  //       }
  //       return {
  //         userInfo: {
  //           ...checkUser,
  //           name: userName,
  //           accountNumber,
  //         },
  //         isNewUser: false,
  //       };
  //     }

  //     const encryptedName = name
  //       ? (await encryptText(this.prisma, name)).content
  //       : '';
  //     const user = await this.prisma.user.create({
  //       data: {
  //         name: encryptedName,
  //         email,
  //         loginType,
  //         userProfileUrl: profileImageUrl,
  //         accountOwner: name,
  //       },
  //     });
  //     return {
  //       userInfo: user,
  //       isNewUser: true,
  //     };
  //   } catch (e) {
  //     console.log('Error in signIn:', e);
  //     throw new Error('로그인 처리 중 오류 발생');
  //     return {
  //       userInfo: null,
  //       isNewUser: false,
  //     };
  //   }
  // }

  async signIn(
    name: string,
    email: string,
    loginType: LoginType,
    profileImageUrl: string,
  ): Promise<{
    userInfo: any;
    isNewUser: boolean;
    isNeedPassword?: boolean;
  }> {
    try {
      const checkUser = await this.prisma.user.findUnique({
        where: {
          email_loginType: {
            email,
            loginType,
          },
        },
        select: {
          name: true,
          email: true,
          loginType: true,
          userProfileUrl: true,
          userAddress: true,
          accountNumber: true,
        },
      });

      if (checkUser) {
        const userName = checkUser.name
          ? await decryptText({ prisma: this.prisma, content: checkUser.name })
          : null;
        const accountNumber = checkUser.accountNumber
          ? await decryptText({
              prisma: this.prisma,
              content: checkUser.accountNumber,
            })
          : null;

        return {
          userInfo: {
            ...checkUser,
            name: userName,
            accountNumber,
          },
          isNewUser: false,
          //달라진 점
          // isNeedPassword: !checkUser.userAddress,
        };
      }

      const encryptedName = name
        ? (await encryptText(this.prisma, name)).content
        : '';
      const user = await this.prisma.user.create({
        data: {
          name: encryptedName,
          email,
          loginType,
          userProfileUrl: profileImageUrl,
          accountOwner: name,
        },
      });

      return {
        userInfo: user,
        isNewUser: true,
      };
    } catch (e) {
      // console.error('Error in signIn:', e);
      // throw new Error('로그인 처리 중 오류 발생');
      console.log(e);
      return {
        userInfo: null,
        isNewUser: false,
      };
    }
  }

  async makeAddress(
    email: string,
    loginType: LoginType,
    password: string,
    // phoneNumber: string,
    shippingInfo: Pick<
      ShippingInfo,
      'name' | 'postCode' | 'mainAddress' | 'detailAddress'
    >,
    token: string,
  ) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email_loginType: { email, loginType } },
        select: { phoneNumber: true },
      });
      const userAddress = await this.walletService.registerWallet(
        token,
        password,
        existingUser?.phoneNumber ?? null,
      );
      // const _phoneNumber = (await encryptText(this.prisma, phoneNumber))
      //   .content;
      await this.prisma.user.update({
        where: {
          email_loginType: {
            email,
            loginType,
          },
        },
        data: {
          userAddress,
          // phoneNumber: _phoneNumber,
          shippingInfo: {
            create: shippingInfo,
          },
        },
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async resetWalletPassword(password: string, token: string) {
    try {
      await this.walletService.resetWalletPassword(token, password);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async checkPassword(password: string, token: string) {
    try {
      const res = await this.walletService.checkWalletPassword(token, password);
      return res;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async signMessage(
    message: string,
    password: string,
    token: string,
  ): Promise<{ signature: string }> {
    try {
      const signature = await this.walletService.signMessage(
        message,
        password,
        token,
      );
      return {
        signature,
      };
    } catch (e) {
      console.log(e);
      throw new Error('메시지 서명에 실패했습니다.');
    }
  }

  // async sendCertificationNumber(
  //   phoneNumber: string,
  //   code: string,
  // ): Promise<boolean> {
  //   try {
  //     const res = await this.bizService.sendAuthCode(phoneNumber, { code });
  //     return res;
  //   } catch (e) {
  //     console.log(e);
  //     return false;
  //   }
  // }
}
