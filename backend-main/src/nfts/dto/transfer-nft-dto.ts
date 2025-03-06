import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TransferNftDto {
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
    description: 'Address of the sender',
    example: '0xtest',
  })
  readonly fromAddress: string;

  @IsString()
  @ApiProperty({
    description: 'Address of the receiver',
    example: '0xtest',
  })
  readonly toAddress: string;
}
