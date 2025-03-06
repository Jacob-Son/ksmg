import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @ApiProperty({
    description: 'ID of the book',
    example: '1',
  })
  readonly bookId: string;

  @IsString()
  @ApiProperty({
    description: 'Address of the user',
    example: '0xtest',
  })
  readonly userAddress: string;

  @IsNumber()
  @ApiProperty({
    description: 'Number of the page',
    example: '1',
  })
  readonly pageNumber: number;

  @ApiProperty({
    description: 'Position of the note',
    example: {
      x: 0.5,
      y: 0.5,
    },
  })
  readonly notePosition: {
    x: number;
    y: number;
  };

  @IsString()
  @ApiProperty({
    description: 'Content of the note',
    example: 'This is a note',
  })
  readonly noteContent: string;
}
