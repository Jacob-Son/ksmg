import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { Job } from 'bull';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QueueService {
  private readonly rpcUrl: string;
  private readonly chainId: number;
  private readonly provider: ethers.JsonRpcProvider;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.rpcUrl = this.configService.get<string>('POLYGON_RPC_URL');
    this.chainId = this.configService.get<number>('POLYGON_CHAIN_ID');
    this.provider = new ethers.JsonRpcProvider(this.rpcUrl);
  }

  // async broadcastTx(job: Job) {
  async broadcastTx(job: Job) {
    console.log('>>> job = ', job);
    try {
      const { relayerId, signedTx } = job.data;

      // const txResult = await this.provider.broadcastTransaction(signedTx.data);
      console.log('>>> broadcasting Tx...');
      this.provider.broadcastTransaction(signedTx.data);

      // const chkpt1 = Date.now();

      // increase the relayer's nonce (in DB - Relayer.txCount)
      // console.log('>>> increasing realyer Tx count...');
      await this.increaseRelayerTxCount(relayerId);
      // const chkpt2 = Date.now();
      // console.log('>>> increaseRelayerTxCount: ', chkpt2 - chkpt1, 'ms');
      console.log('>>> DONE.');
    } catch (e) {
      throw new Error(e);
    }
  }

  async increaseRelayerTxCount(relayerId: number) {
    await this.prisma.relayer.update({
      where: {
        id: relayerId,
      },
      data: {
        txCount: {
          increment: 1,
        },
      },
    });
  }
}
