import { Module } from '@nestjs/common';
import { TxRecordsController } from './tx-records.controller';
import { AdminTxRecordsService } from './admin.tx-records.service';
import { UserTxRecordsService } from './user.tx-records.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TxParserService } from './parsers/tx-parser.service';
import { TxRecordTransformInterceptor } from './tx-records.interceptor';

@Module({
  imports: [PrismaModule],
  controllers: [TxRecordsController],
  providers: [
    AdminTxRecordsService,
    UserTxRecordsService,
    TxParserService,
    TxRecordTransformInterceptor,
  ],
  exports: [AdminTxRecordsService, UserTxRecordsService],
})
export class TxRecordsModule {}
