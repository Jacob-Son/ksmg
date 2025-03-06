import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetBookInfoDto {
  @IsString()
  @ApiProperty({
    description: 'Address of the collection',
    example: '0xtest',
  })
  readonly collectionAddress: string;

  @IsString()
  @ApiProperty({
    description: 'Token ID of the book',
    example: '1',
  })
  readonly tokenId: string;

  @IsString()
  @ApiProperty({
    description: 'Address of the user',
    example: '0xtest',
  })
  readonly userAddress: string;
}
