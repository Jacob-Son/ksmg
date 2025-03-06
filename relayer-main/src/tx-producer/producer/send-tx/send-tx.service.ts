import { Injectable } from '@nestjs/common';
import { SignedTx } from '../interfaces/signedTx.interface';
import { QueueService } from 'src/tx-producer/queue/queue.service';
import { SignedTxQueueData } from 'src/tx-producer/queue/queue.interface';

@Injectable()
export class SendTxService {
  constructor(private readonly queueService: QueueService) {}

  // TODO: specify return type
  async sendSignedTx(signedTx: SignedTx, txHash: string) {
    try {
      // ADD a job to the queue
      console.log('>>> adding a job in the queue...');
      const queueData: SignedTxQueueData = {
        data: {
          relayerId: 1, // FIXME: hard-coded
          txHash: txHash,
          signedTx: signedTx,
        },
      };
      this.queueService.addEbookSignedTxQueueData(queueData);
      console.log('>>> queue job added: ', queueData);

      return queueData;
    } catch (e) {
      throw new Error(e);
    }
  }
}
