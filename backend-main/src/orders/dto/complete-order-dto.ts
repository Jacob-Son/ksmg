import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CompleteOrderDto {
  @IsString()
  @ApiProperty({
    description: 'merchant_uid of the payment',
    example: '0xtest',
  })
  readonly merchantUid: string;

  @IsString()
  @ApiProperty({
    description: 'imp_uid of the payment',
    example: '0xtest',
  })
  readonly impUid: string;
}
