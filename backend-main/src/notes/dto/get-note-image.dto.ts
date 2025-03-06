import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetNoteImageDto {
  @IsString()
  @ApiProperty({
    description: 'id of the book',
    example: '5',
  })
  readonly bookId: string;

  @IsString()
  @ApiProperty({
    description: 'Address of the collection',
    example: '0xtest',
  })
  readonly userAddress: string;

  @IsString()
  @ApiProperty({
    description: 'Page number of the book',
    example: '2',
  })
  readonly pageNumber: string;
}
