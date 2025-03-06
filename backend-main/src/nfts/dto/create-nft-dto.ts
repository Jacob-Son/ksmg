import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateNftDto {
  @IsString()
  @ApiProperty({
    description: 'Address of the collection',
    example: '0xtest',
  })
  readonly collectionAddress: string;

  @IsString()
  @ApiProperty({
    description: 'Description of the token',
    example: 'This is a test token.',
  })
  readonly description: string;

  @IsString()
  @ApiProperty({
    description: 'Name of the token',
    example: 'Test token',
  })
  readonly creatorAddress: string;

  @ApiProperty({
    description: 'Image of the nft item',
    example: ['image1', 'image2', 'image3'],
    maxItems: 5,
  })
  readonly nftImages: string[];

  @IsOptional()
  @ApiProperty({
    description: 'Detail image of the nft item',
    example: 'detailImage',
  })
  readonly nftDetailImage: string;

  @IsOptional()
  @ApiProperty({
    description: 'Description of the nft item',
    example: 'This is a test nft item.',
  })
  readonly nftDetailDescription: string;

  @ApiProperty({
    description: 'Attributes of the nft item',
    example: [
      {
        key: 'category',
        value: '어머니',
      },
      {
        key: 'background',
        value: 'blue',
      },
    ],
  })
  readonly nftAttributes: Array<{
    key: string;
    value: string;
  }>;

  @ApiProperty({
    description: 'Name of the book',
    example: 'Test book',
  })
  readonly name: string;

  @ApiProperty({
    description: 'Category of the book',
    example: '육필원고',
  })
  readonly category: string;

  @ApiProperty({
    description: 'Theme of the book',
    example: 'blue',
  })
  readonly theme?: string;

  @ApiProperty({
    description: 'Images of the book',
    example: ['image1', 'image2', 'image3'],
    maxItems: 500,
  })
  readonly bookImages: string[];

  @ApiProperty({
    description: 'Number of nft to be created',
    example: 100,
  })
  readonly count: number;

  @IsNumber()
  @ApiProperty({
    description: 'Price of the nft',
    example: 100,
  })
  readonly price: number;

  @IsNumber()
  @ApiProperty({
    description: 'Royalty of the nft',
    example: 3,
  })
  readonly royalty: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'full audio path',
    example: '/audio.mp4',
  })
  readonly fullAudio?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'pre audio path',
    example: '/audio_pre.mp4',
  })
  readonly preAudio?: string;
}
