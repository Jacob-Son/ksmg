import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from './users.service';
import { ethers } from 'ethers';
import { split, combine } from 'shamir-secret-sharing';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import * as bcrypt from 'bcrypt';
import { promisify } from 'util';
import { toUint8Array, toHexString, generateSalt } from 'src/auth/auth.utils';

@Injectable()
export class UserKeyStoreService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async findOne(id: number) {
    return await this.prisma.userKeyStore.findUnique({
      where: { id },
    });
  }

  async create(password: string) {
    const { address, shareC, shareB1, shareB2 } = await this.createNewWallet();

    const { passwordHash, salt, ivHex, encryptedShareCBase64 } =
      await this.encryptShareCWithPassword(shareC, password);

    return this.prisma.userKeyStore.create({
      data: {
        address,
        shareB1,
        shareB2,
        passwordHash,
        salt,
        iv: ivHex,
        encryptedShareC: encryptedShareCBase64,
      },
    });
  }

  // 비밀번호 재설정 함수
  // shareB1, shareB2로 private key를 복구하고 새로운 [shareC, shareB1, shareB2]를 생성한다.
  // 이후 새로운 유저 비밀번호로 shareC를 암호화하여 DB에 저장한다.
  // (rotation으로 shareC, shareB1, shareB2를 모두 변경)
  async rotateKey(uid: string, newPassword: string) {
    const user = await this.usersService.findOne(uid);
    const userKeyStore = await this.findOne(user.userKeyStoreId);
    const { shareB1, shareB2 } = userKeyStore;
    const _shareB1 = Uint8Array.from(Buffer.from(shareB1, 'hex'));
    const _shareB2 = Uint8Array.from(Buffer.from(shareB2, 'hex'));
    const secret = await combine([_shareB1, _shareB2]);

    // rotation
    const newShares = await split(secret, 3, 2);
    const [newShareC, newShareB1, newShareB2] = newShares.map((share) =>
      toHexString(share),
    );

    const { passwordHash, salt, ivHex, encryptedShareCBase64 } =
      await this.encryptShareCWithPassword(newShareC, newPassword);

    // update
    return await this.prisma.userKeyStore.update({
      where: { id: user.userKeyStoreId },
      data: {
        shareB1: newShareB1,
        shareB2: newShareB2,
        passwordHash,
        salt,
        iv: ivHex,
        encryptedShareC: encryptedShareCBase64,
      },
    });
  }

  private async createNewWallet() {
    const wallet = ethers.Wallet.createRandom();
    const secret = toUint8Array(wallet.privateKey);
    const shares = await split(secret, 3, 2);
    const [shareC, shareB1, shareB2] = shares.map((share) =>
      toHexString(share),
    );

    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
      shareC,
      shareB1,
      shareB2,
    };
  }

  private async encryptShareCWithPassword(shareC: string, password: string) {
    // password hashing
    const passwordSalt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, passwordSalt);

    // shareC encryption with user's password
    const salt = generateSalt();
    const iv = randomBytes(16);
    const cipherKey = (await promisify(scrypt)(password, salt, 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', cipherKey, iv);
    const encryptedShareC = Buffer.concat([
      cipher.update(shareC),
      cipher.final(),
    ]);

    const ivHex = iv.toString('hex');
    const encryptedShareCBase64 = encryptedShareC.toString('base64');

    return {
      passwordHash,
      salt,
      ivHex,
      encryptedShareCBase64,
    };
  }
}
