import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { PopulatedTx } from '../interfaces/populatedTx.interface';
import { SignedTx } from '../interfaces/signedTx.interface';

// Sign transactions with relayer account
@Injectable()
export class SignTxService {
  constructor(private readonly configService: ConfigService) {}

  private readonly relayerPrivateKey: string = this.configService.get<string>(
    'RELAYER_PRIVATE_KEY',
  );

  // sign transaction with relayer account
  async signTx(populatedTx: PopulatedTx): Promise<SignedTx> {
    const signer = new ethers.Wallet(this.relayerPrivateKey);
    const signedTxString = await signer.signTransaction(populatedTx);
    const signedTx: SignedTx = { data: signedTxString };
    return signedTx;
  }
}
