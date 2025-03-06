import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SetCreatedNftPriceDto {
  @IsString()
  @ApiProperty({
    description: 'Address of the collection',
    example: '0xtest',
  })
  readonly collectionAddress: string;

  @IsString()
  @ApiProperty({
    description: 'Id of the token',
    example: '1',
  })
  readonly tokenId: string;

  @IsString()
  @ApiProperty({
    description: 'Price of the token',
    example: 10000,
  })
  readonly price: number;

  @IsString()
  @ApiProperty({
    description: 'Address of seller',
    example: '0xtest',
  })
  readonly sellerAddress: string;
}
