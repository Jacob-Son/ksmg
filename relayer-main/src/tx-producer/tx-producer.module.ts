import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { QueueModule } from './queue/queue.module';
import { TxRecordsModule } from '../tx-records/tx-records.module';
import { TxProducerController } from './tx-producer.controller';
import { TxProducerService } from './tx-producer.service';
import { PopulateTxService } from './producer/populate-tx/populate-tx.service';
import { PopulateBuyService } from './producer/populate-tx/ebook/buy/populate.buy.service';
import { PopulateTransferService } from './producer/populate-tx/ebook/transfer/populate.transfer.service';
import { PopulateBurnService } from './producer/populate-tx/ebook/burn/populate.burn.service';
import { PopulateRoyaltyService } from './producer/populate-tx/ebook/royalty/populate.royalty.service';
import { PopulateMintService } from './producer/populate-tx/ebook/mint/populate.mint.service';
import { SignTxService } from './producer/sign-tx/sign-tx.service';
import { SendTxService } from './producer/send-tx/send-tx.service';
import { ProviderService } from './provider/provider.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProviderCache } from './cache/provider.cache';
import { GasService } from './gas/gas.service';

@Module({
  imports: [UsersModule, QueueModule, TxRecordsModule, PrismaModule],
  controllers: [TxProducerController],
  providers: [
    TxProducerService,
    ProviderService,
    PopulateTxService,
    PopulateBuyService,
    PopulateTransferService,
    PopulateBurnService,
    PopulateRoyaltyService,
    PopulateMintService,
    SignTxService,
    SendTxService,
    ProviderCache,
    GasService,
  ],
})
export class TxProducerModule {}
