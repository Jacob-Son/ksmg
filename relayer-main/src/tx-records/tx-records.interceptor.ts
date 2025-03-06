import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserTxRecordResponseBaseDto } from './dto/user.tx-records.dto';
import { UserTxRecordEntity } from './entities/user.tx-records.entity';
import { BuyNFTInfo } from 'src/tx-producer/producer/dto/ebook/tx-producer.dto';
import { ApiProperty } from '@nestjs/swagger';
import { TxParserService } from 'src/tx-records/parsers/tx-parser.service';
import { ServiceType, FunctionType } from '@prisma/client';

// Note: only UserTxRecords use this interceptor
// AdminTxRecords get field data from the event logs
class TxRecordResponse<T> extends UserTxRecordResponseBaseDto {
  @ApiProperty()
  // Common properties for all transaction types can be added here

  // Properties specific to each transaction type
  txSpecificInfo: T;

  constructor(
    public serviceType: ServiceType,
    public functionType: FunctionType,
  ) {
    super();
    // Set common properties or perform any common initialization here
  }
}

// EBOOK BUY
type EbookBuyTxSpecificInfo = {
  buyerAddress: string;
  buyNftInfoArray: BuyNFTInfo[];
  totalPrice: number;
  numberOfNfts: number;
};

@Injectable()
export class TxRecordTransformInterceptor<T>
  implements NestInterceptor<T, TxRecordResponse<T>[]>
{
  constructor(private readonly txParserService: TxParserService) {}

  private _transformAll(
    txRecords: UserTxRecordEntity[],
  ): TxRecordResponse<T>[] {
    return txRecords.map((txRecord) => this._transform(txRecord));
  }

  // TODO: check - async?
  private _transform(txRecord: UserTxRecordEntity): TxRecordResponse<T> {
    const callDataBuffer = txRecord.data;
    const callData = callDataBuffer.toString();
    const callValue = 0n; // set to 0 as no direct payment is involved by the user nor by the relayer

    let transformedTxRecord: TxRecordResponse<any>;

    // Fill in txSpecificInfo based on ServiceType and FunctionType
    switch (txRecord.serviceType) {
      case ServiceType.EBOOK:
        switch (txRecord.functionType) {
          case FunctionType.BUY:
            transformedTxRecord = new TxRecordResponse<EbookBuyTxSpecificInfo>(
              ServiceType.EBOOK,
              FunctionType.BUY,
            );
            transformedTxRecord.txSpecificInfo =
              this.txParserService.parseTxData(
                callData,
                callValue,
                ServiceType.EBOOK,
                FunctionType.BUY,
              );
            break;

          default:
            break;
        }
    }

    // Fill in common properties
    const txRecordResponseBase: UserTxRecordResponseBaseDto = {
      id: txRecord.id,
      txHash: txRecord.txHash,
      status: txRecord.status,
      // requestUserId: txRecord.requestUserId,
      serviceType: txRecord.serviceType,
      functionType: txRecord.functionType,
      relayerId: txRecord.relayerId,
      blockNumber: txRecord.blockNumber,
      createdAt: txRecord.createdAt,
      updatedAt: txRecord.updatedAt,
    };

    transformedTxRecord = {
      ...transformedTxRecord,
      ...txRecordResponseBase,
    };

    return transformedTxRecord;
  }

  // TODO: check - async?
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<TxRecordResponse<T>[]> {
    return next.handle().pipe(map((data) => this._transformAll(data)));
  }
}
