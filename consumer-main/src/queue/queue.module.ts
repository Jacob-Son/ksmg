import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueService } from './queue.service';
import { QueueConsumer } from './queue.consumer';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    BullModule.registerQueue({
      prefix: '{ebook}',
      name: 'sendSignedTx',
    }),
    PrismaModule,
  ],
  providers: [QueueService, QueueConsumer],
})
export class QueueModule {}
