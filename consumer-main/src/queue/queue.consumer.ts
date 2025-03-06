import { Injectable } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { QueueService } from './queue.service';

@Injectable()
@Processor('sendSignedTx')
export class QueueConsumer {
  constructor(private readonly queueService: QueueService) {}

  // @Process()
  // async broadcastTx(job: Job) {
  //   await this.queueService.broadcastTx(job.data);
  // }

  @Process()
  async broadcastTx(job: Job) {
    await this.queueService.broadcastTx(job.data);
  }
}
