import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MakeOrderDto {
  @IsString()
  @ApiProperty({
    description: 'merchant_uid of the payment',
    example: '0xtest',
  })
  readonly merchantUid: string;

  @IsString()
  @ApiProperty({
    description: 'Array of nft sale ids',
    example: [1, 2, 3],
  })
  readonly nftSaleIds: number[];

  @IsString()
  @ApiProperty({
    description: 'Address of the user',
    example: '0xtest',
  })
  readonly userAddress: string;
}
