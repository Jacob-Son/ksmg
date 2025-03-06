import { ApiProperty } from '@nestjs/swagger';
import { ServiceType, FunctionType, TxStatus } from '@prisma/client';

export class CreateAdminTxRecordDto {
  @ApiProperty()
  serviceType: ServiceType;

  @ApiProperty()
  functionType: FunctionType;

  @ApiProperty({ required: false, nullable: true })
  fromAddress?: string | null;

  @ApiProperty({ required: false, nullable: true })
  toAddress?: string | null;

  @ApiProperty({ required: false, nullable: true })
  tokenId?: number | null;

  @ApiProperty()
  relayerId: number; // TODO: check if this is determined by the relayer

  @ApiProperty()
  txHash: string;

  @ApiProperty()
  data: Buffer;

  @ApiProperty({ required: false, nullable: true })
  blockNumber: number | null;
}

// FIXME:
export class AdminTxRecordResponseBaseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  txHash: string;

  @ApiProperty()
  status: TxStatus;

  // @ApiProperty()
  // requestUserId: string;

  @ApiProperty()
  serviceType: ServiceType;

  @ApiProperty()
  functionType: FunctionType;

  @ApiProperty()
  relayerId: number;

  @ApiProperty({ required: false, nullable: true })
  blockNumber?: number | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ required: false, nullable: true })
  updatedAt?: Date | null;
}
