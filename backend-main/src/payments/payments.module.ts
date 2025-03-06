import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { OrdersService } from 'src/orders/orders.service';
import { RankService } from 'src/rank/rank.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PaymentsService, OrdersService, RankService, PrismaService],
  exports: [PaymentsService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
