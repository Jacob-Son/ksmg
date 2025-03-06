import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class NftToCartDto {
  @IsString()
  @ApiProperty({
    description: 'Id of the nft sale',
    example: 1,
  })
  readonly nftSaleId: number;

  @IsString()
  @ApiProperty({
    description: 'Address of the user',
    example: '0xtest',
  })
  readonly userAddress: string;
}
