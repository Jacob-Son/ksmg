import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { SignedTxQueueData } from './queue.interface';
@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('sendSignedTx') private readonly sendSignedTxQueue: Queue,
  ) {}

  // TODO: how to identify from which service the queue request is coming from?
  async addEbookSignedTxQueueData(queueData: SignedTxQueueData) {
    try {
      const job = await this.sendSignedTxQueue.add(queueData);
      return job;
    } catch (e) {
      throw new Error(e);
    }
  }
}
