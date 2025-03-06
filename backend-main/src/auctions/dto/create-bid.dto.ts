import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBidDto {
  @IsString()
  @ApiProperty({
    description: 'Address of the user',
    example: '0xtest',
  })
  readonly userAddress: string;

  @IsString()
  @ApiProperty({
    description: 'price of the bid',
    example: '1000',
  })
  readonly price: number;
}
