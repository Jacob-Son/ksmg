import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetNftDto {
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
}
