import { ApiProperty } from '@nestjs/swagger';
import { ServiceType, FunctionType, TxStatus } from '@prisma/client';

export class CreateUserTxRecordDto {
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
  relayerId: number; // TODO: check if this is determined by the relayer

  @ApiProperty()
  txHash: string;

  @ApiProperty()
  data: Buffer;

  @ApiProperty({ required: false, nullable: true })
  blockNumber: number | null;
}

// FIXME:
export class UserTxRecordResponseBaseDto {
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
  blockNumber: number | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ required: false, nullable: true })
  updatedAt: Date | null;
}
