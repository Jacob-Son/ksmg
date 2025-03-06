import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User location address',
    example: '서울시 강남구 역삼동 123-456',
  })
  @ApiPropertyOptional()
  @IsOptional()
  locationAddress?: string;

  @ApiProperty({
    description: '주민번호 앞자리',
    example: '991010-1',
  })
  @ApiPropertyOptional()
  @IsOptional()
  securityNumber?: string;
}
