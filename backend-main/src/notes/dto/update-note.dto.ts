import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateNoteDto {
  @ApiProperty({
    description: 'Position of the note',
    example: {
      x: 0.7,
      y: 0.8,
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
