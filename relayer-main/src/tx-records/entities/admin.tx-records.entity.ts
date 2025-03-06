import {
  AdminTxRecord,
  TxStatus,
  ServiceType,
  FunctionType,
} from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class AdminTxRecordEntity implements AdminTxRecord {
  @ApiProperty()
  id: number;

  @ApiProperty()
  status: TxStatus;

  @ApiProperty()
  serviceType: ServiceType;

  @ApiProperty()
  functionType: FunctionType;

  @ApiProperty({ required: false, nullable: true })
  fromAddress: string | null;

  @ApiProperty({ required: false, nullable: true })
  toAddress: string | null;

  @ApiProperty({ required: false, nullable: true })
  tokenId: number | null;

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
