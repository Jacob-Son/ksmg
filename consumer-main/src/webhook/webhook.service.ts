import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TxStatus } from '@prisma/client';

@Injectable()
export class WebhookService {
  constructor(private readonly prisma: PrismaService) {}

  getAlchemyWebhookMinedTransaction(payload: any) {
    try {
      // TODO: add more input validation (e.g. check webhookId from payload)
      // if (payload.event.transaction.from !== 'RELAYER_ADDRESS') throw new Error(); // TODO: update
      if (payload.type !== 'MINED_TRANSACTION') throw new Error();

      if (payload.event.transaction) {
        this.updateMinedTxRecord(payload.event.transaction);
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  getAlchemyWebhookGraphql(payload: any) {
    try {
      if (payload.type !== 'GRAPHQL') throw new Error();

      if (payload.event.data.block.logs.length > 0) {
        const logs = payload.event.data.block.logs;
        logs.forEach(async (log: any) => {
          if (
            log.topics[0] !==
            '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
          ) {
            console.log('>>> not transfer event');
            return;
          }
          const _txHash = log.transaction.hash;
          const _from = `0x${log.topics[1].slice(26)}`; // address format (string)
          const _to = `0x${log.topics[2].slice(26)}`; // address format (string)
          const _tokenId = Number(log.topics[3]); // number

          this.updateAdminTxRecordTransferFields(_txHash, _from, _to, _tokenId);
        });
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  private async updateMinedTxRecord(minedTx: any) {
    const txHash = minedTx.hash;
    const blockNumber = Number(minedTx.blockNumber);

    const existingAdminTxRecord = await this.prisma.adminTxRecord.findUnique({
      where: { txHash },
    });

    if (existingAdminTxRecord) {
      await this.prisma.adminTxRecord.update({
        where: { txHash },
        data: {
          status: TxStatus.SUCCESS,
          blockNumber: blockNumber,
        },
      });
      return;
    }

    const existingUserTxRecords = await this.prisma.userTxRecord.findMany({
      where: { txHash },
    });

    if (existingUserTxRecords.length > 0) {
      await this.prisma.userTxRecord.updateMany({
        where: { txHash },
        data: {
          status: TxStatus.SUCCESS,
          blockNumber: blockNumber,
        },
      });
    }
  }

  private async updateAdminTxRecordTransferFields(
    txHash: string,
    fromAddress: string,
    toAddress: string,
    tokenId: number,
  ) {
    // if the webhook data represents event of transfer from `buy` action, discard it.
    const existingAdminTxRecord = await this.prisma.adminTxRecord.findUnique({
      where: { txHash },
    });

    if (existingAdminTxRecord) {
      await this.prisma.adminTxRecord.update({
        where: { txHash },
        data: {
          fromAddress,
          toAddress,
          tokenId,
        },
      });
    }
  }
}
