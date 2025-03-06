import {
  UserTxRecord,
  TxStatus,
  ServiceType,
  FunctionType,
} from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserTxRecordEntity implements UserTxRecord {
  @ApiProperty()
  id: number;

  @ApiProperty()
  status: TxStatus;

  @ApiProperty()
  serviceType: ServiceType;

  @ApiProperty()
  functionType: FunctionType;

  @ApiProperty()
  buyerAddress: string;

  @ApiProperty()
  sellerAddress: string;

  @ApiProperty()
  tokenId: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  royalty: number;

  @ApiProperty()
  orderType: number;

  @ApiProperty()
  relayerId: number;

  @ApiProperty()
  txHash: string;

  @ApiProperty()
  data: Buffer;

  @ApiProperty({ required: false, nullable: true })
  blockNumber: number | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
