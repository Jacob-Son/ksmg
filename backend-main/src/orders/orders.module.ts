import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PaymentsModule } from 'src/payments/payments.module';
import { PaymentsService } from 'src/payments/payments.service';
import { NftsService } from 'src/nfts/nfts.service';
import { NftsModule } from 'src/nfts/nfts.module';
import { RankService } from 'src/rank/rank.service';

@Module({
  controllers: [OrdersController],
  imports: [PaymentsModule, NftsModule],
  providers: [OrdersService, PaymentsService, NftsService, RankService],
  exports: [OrdersService],
})
export class OrdersModule {}
