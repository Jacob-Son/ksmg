import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateAuctionDto {
  @IsString()
  @ApiProperty({
    description: 'Name of the auction',
    example: 'name',
  })
  readonly name: string;

  @IsString()
  @ApiProperty({
    description: 'Description of the auction',
    example: 'test',
  })
  readonly description: string;

  @IsNumber()
  @ApiProperty({
    description: 'Start price of the auction',
    example: '1000',
  })
  readonly startPrice: number;

  @IsNumber()
  @ApiProperty({
    description: 'Estimated price of the auction',
    example: '1000',
  })
  readonly estimatedPrice: number;

  @IsString()
  @ApiProperty({
    description: 'Start time of the auction',
    example: '2021-08-01 00:00:00',
  })
  readonly startTime: Date;

  @IsString()
  @ApiProperty({
    description: 'End time of the auction',
    example: '2021-08-01 00:00:00',
  })
  readonly endTime: Date;

  @ApiProperty({
    description: 'Images of the auction item',
    type: 'array',
    items: {
      type: 'file',
      format: 'binary',
    },
    example: ['image1', 'image2', 'image3'],
    maxItems: 4,
  })
  images: any[];

  @ApiProperty({
    description: 'Detail image of the auction item',
    example: 'detailImage',
    type: 'file',
    format: 'binary',
  })
  detailImage: any;
}
