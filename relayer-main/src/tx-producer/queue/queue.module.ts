import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { QueueService } from './queue.service';

@Module({
  imports: [
    BullModule.registerQueue(
      {
        prefix: '{ebook}',
        name: 'sendSignedTx',
      },
      // below for the seperated queue for each tx type
      //   {
      //     prefix: 'ebook:tx',
      //     name: 'buy',
      //   },
      //   {
      //     prefix: 'ebook:tx',
      //     name: 'transfer',
      //   },
      //   {
      //     prefix: 'ebook:tx',
      //     name: 'burn',
      //   },
    ),
  ],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
