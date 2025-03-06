import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProviderCache {
  constructor(private readonly prisma: PrismaService) {}

  // TODO: check if `async` is necessary
  // async getRelayerTxCount(relayerAddress: string): Promise<number> {
  //   const relayer = await this.prisma.relayer.findUnique({
  //     where: { walletAddress: relayerAddress },
  //     select: { txCount: true },
  //   });

  //   return relayer.txCount;
  // }
}
