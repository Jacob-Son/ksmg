import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginType } from '@prisma/client';
import axios from 'axios';
import { Wallet } from 'ethers';
import { BizService } from 'src/biz/biz.service';

@Injectable()
export class WalletService {
  constructor(
    private readonly configService: ConfigService,
    private readonly bizService: BizService,
  ) {}
  async getUser(token: string) {
    const walletBaseUrl = this.configService.get<string>('WALLET_BASE_URL');
    try {
      const userResult = await axios.post<{
        uid: string;
        email: string;
        name: string;
        provider: string;
        createdAt: string;
        updatedAt: string;
        walletAddress: string;
        lastLoginAt: string;
        profileImageUrl: string;
        phoneNumber: string;
      }>(walletBaseUrl + '/auth/authenticate', {
        accessToken: token,
      });
      return {
        name: userResult.data.name,
        phoneNumber: userResult.data?.phoneNumber ?? '',
        userAddress: userResult.data?.walletAddress ?? null,
        email: userResult.data.email,
        loginType: userResult.data.provider.toUpperCase() as LoginType,
        profileImageUrl: userResult.data.profileImageUrl,
      };
    } catch (e) {
      console.log(e);
      throw new Error('유저 정보를 가져오는데 실패했습니다.');
    }
  }

  async registerWallet(token: string, password: string, phoneNumber: string) {
    const walletBaseUrl = this.configService.get<string>('WALLET_BASE_URL');
    try {
      const userResult = await axios.post<{
        uid: string;
        walletAddress: string;
      }>(
        walletBaseUrl + '/auth/register-wallet',
        {
          password,
          phoneNumber,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      return userResult.data.walletAddress;
    } catch (e) {
      console.log(e);
      throw new Error('지갑을 생성하는데 실패했습니다.');
    }
  }

  async resetWalletPassword(token: string, password: string) {
    const walletBaseUrl = this.configService.get<string>('WALLET_BASE_URL');
    try {
      const userResult = await axios.post<{
        uid: string;
        walletAddress: string;
      }>(
        walletBaseUrl + '/auth/reset-wallet-password',
        {
          newPassword: password,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      return userResult.data.walletAddress;
    } catch (e) {
      console.log(e);
      throw new Error('지갑 비밀번호를 초기화하는데 실패했습니다.');
    }
  }

  async checkWalletPassword(token: string, password: string) {
    const walletBaseUrl = this.configService.get<string>('WALLET_BASE_URL');
    try {
      const result = await axios.post<{
        uid: string;
        walletAddress: string;
      }>(
        walletBaseUrl + '/auth/password-check',
        {
          password,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      return result.data;
    } catch (e) {
      console.log(e);
      throw new Error('지갑 비밀번호를 확인하는데 실패했습니다.');
    }
  }

  async signMessage(message: string, password: string, token: string) {
    const walletBaseUrl = this.configService.get<string>('WALLET_BASE_URL');
    try {
      const userResult = await axios.post<{
        signature: string;
      }>(
        walletBaseUrl + '/signer/sign-message',
        {
          message,
          password,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      return userResult.data.signature;
    } catch (e) {
      console.log(e);
      throw new Error('메시지 서명에 실패했습니다.');
    }
  }

  async transferNft(
    toAddress: string,
    collectionAddress: string,
    tokenId: string,
  ) {
    const walletBaseUrl = this.configService.get<string>('WALLET_BASE_URL');
    const signature = this.relayerSignMessage(
      'E-Book NFT tx request: transfer',
    );
    try {
      const txResult = await axios.post<{
        txHash: string;
      }>(walletBaseUrl + '/tx/ebook/transfer', {
        toAddress,
        tokenId,
        signature,
      });
      return txResult.data.txHash;
    } catch (e) {
      console.log(e);
      // throw new Error('NFT를 전송하는데 실패했습니다.');
    }
  }

  async mintNft(
    creatorAddress: string,
    collectionAddress: string,
    recipientAddress: string,
    tokenId: string,
    creatorRoyalty: number,
  ) {
    try {
      const walletBaseUrl = this.configService.get<string>('WALLET_BASE_URL');
      const signature = this.relayerSignMessage('E-Book NFT tx request: mint');
      const txResult = await axios.post<{
        txHash: string;
      }>(walletBaseUrl + '/tx/ebook/mint', {
        creatorAddress,
        recipientAddress,
        tokenId,
        creatorRoyaltyRatio: creatorRoyalty,
        signature,
      });
      return txResult.data.txHash;
    } catch (e) {
      console.log(e);
      // throw new Error('NFT를 전송하는데 실패했습니다.');
    }
  }

  async burnNft(collectionAddress: string, tokenId: string) {
    const walletBaseUrl = this.configService.get<string>('WALLET_BASE_URL');
    const signature = this.relayerSignMessage('E-Book NFT tx request: burn');
    try {
      const txResult = await axios.post<{
        txHash: string;
      }>(walletBaseUrl + '/tx/ebook/burn', {
        tokenId,
        signature,
      });
      return txResult.data.txHash;
    } catch (e) {
      console.log(e);
      // throw new Error('NFT를 전송하는데 실패했습니다.');
    }
  }

  async userSignMessage(message: string, password: string) {
    const walletBaseUrl = this.configService.get<string>('WALLET_BASE_URL');
    try {
      const signResult = await axios.post<{
        signedMessage: string;
      }>(walletBaseUrl + '/signer/sign-message', {
        message,
        password,
      });
      return signResult.data.signedMessage;
    } catch (e) {
      console.log(e);
      throw new Error('서명에 실패했습니다.');
    }
  }

  async relayerSignMessage(message: string) {
    try {
      const walletPrivateKey = this.configService.get<string>(
        'RELAYER_PRIVATE_KEY',
      );
      const relayerWallet = new Wallet(walletPrivateKey);
      const signature = await relayerWallet.signMessage(message);
      return signature;
    } catch (e) {
      console.log(e);
      throw new Error('서명에 실패했습니다.');
    }
  }
}
