import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserKeyStoreService } from 'src/users/user-keystore.service';
import { createDecipheriv, scrypt } from 'crypto';
import * as bcrypt from 'bcrypt';
import { ethers } from 'ethers';
import { combine } from 'shamir-secret-sharing';
import { promisify } from 'util';
import { toString } from 'src/auth/auth.utils';
import { SignMessageResponse } from './dto/signer.dto';

@Injectable()
export class SignerService {
  constructor(
    private usersService: UsersService,
    private userKeyStoreService: UserKeyStoreService,
  ) {}

  // TODO: test
  async signMessage(
    uid: string,
    password: string,
    message: string,
  ): Promise<SignMessageResponse> {
    const user = await this.usersService.findOne(uid);
    const userKeyStore = await this.userKeyStoreService.findOne(
      user.userKeyStoreId,
    );
    const isMatch = await bcrypt.compare(password, userKeyStore.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    const { encryptedShareC, shareB1 } = userKeyStore;
    const encryptedShareCBuffer = Buffer.from(encryptedShareC, 'base64');

    // restore cipherKey
    const cipherKey = (await promisify(scrypt)(
      password,
      userKeyStore.salt,
      32,
    )) as Buffer;

    const ivBuffer = Buffer.from(userKeyStore.iv, 'hex');

    const decipher = createDecipheriv('aes-256-ctr', cipherKey, ivBuffer);

    const shareCBufferString = Buffer.concat([
      decipher.update(encryptedShareCBuffer),
      decipher.final(),
    ]).toString();

    const _shareC = Uint8Array.from(Buffer.from(shareCBufferString, 'hex'));
    const _shareB1 = Uint8Array.from(Buffer.from(shareB1, 'hex'));

    const secret = await combine([_shareC, _shareB1]);
    const secretStr = toString(secret);

    const wallet = new ethers.Wallet(secretStr);
    const signedMessage = await wallet.signMessage(message);
    return {
      uid,
      walletAddress: user.walletAddress,
      message,
      signedMessage,
    };
  }
}
