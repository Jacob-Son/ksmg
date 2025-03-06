import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // id token을 받으면 해당 유저가 있는지 확인하고 없으면 생성
  // 해당 유저가 있으면 로그인 성공 처리 및 유저 정보 반환
  //   loginOrRegister(loginDTO: LoginDTO): Promise<User> {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  registerWallet(uid: string, walletAddress: string, userKeyStoreId: number) {
    return this.prisma.user.update({
      where: { uid },
      data: { walletAddress, userKeyStoreId },
    });
  }

  registerPhoneNumber(uid: string, phoneNumber: string) {
    return this.prisma.user.update({
      where: { uid },
      data: { phoneNumber },
    });
  }

  findOne(uid: string) {
    return this.prisma.user.findUnique({
      where: { uid },
    });
  }

  async getUserIdByEmailAndProvider(email: string, provider: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email_provider: {
          email,
          provider,
        },
      },
    });

    if (!user) {
      return null;
    } else {
      return user.uid;
    }
  }

  async getUserByEmailAndProvider(email: string, provider: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email_provider: {
          email,
          provider,
        },
      },
    });
    return user;
  }

  // TODO: check: is `async` neccessary?
  async getWalletAddressByUid(uid: string) {
    const user = await this.prisma.user.findUnique({
      where: { uid },
    });

    if (!user) {
      return null;
    } else {
      return user.walletAddress;
    }
  }

  async updateLastLoginAt(uid: string) {
    return await this.prisma.user.update({
      where: { uid },
      data: { lastLoginAt: new Date() },
    });
  }
}
