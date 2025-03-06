import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAuctionDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Name of the auction',
    example: 'test',
  })
  @ApiPropertyOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Description of the auction',
    example: 'test',
  })
  @ApiPropertyOptional()
  readonly description?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'Start price of the auction',
    example: '1000',
  })
  @ApiPropertyOptional()
  readonly startPrice?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'Estimated price of the auction',
    example: '1000',
  })
  @ApiPropertyOptional()
  readonly estimatedPrice?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Start time of the auction',
    example: '2021-08-01 00:00:00',
  })
  @ApiPropertyOptional()
  readonly startTime?: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'End time of the auction',
    example: '2021-08-01 00:00:00',
  })
  @ApiPropertyOptional()
  readonly endTime?: Date;

  @IsOptional()
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
  @ApiPropertyOptional()
  images?: any[];

  @IsOptional()
  @ApiProperty({
    description: 'Detail image of the auction item',
    example: 'detailImage',
    type: 'file',
    format: 'binary',
  })
  @ApiPropertyOptional()
  detailImage?: any;
}
