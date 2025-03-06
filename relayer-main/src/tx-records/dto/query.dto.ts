import { IsOptional, IsInt, Min, IsIn, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TxStatus, ServiceType, FunctionType } from '@prisma/client';

export class GetAllDto {
  @ApiPropertyOptional({ description: 'Page number', default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ description: 'Items per page', default: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  pageSize: number = 10;

  @ApiPropertyOptional({
    description: 'Sort field (e.g., createdAt)',
    default: 'createdAt',
  })
  @IsOptional()
  sortField: string = 'createdAt';

  @ApiPropertyOptional({
    description: 'Sort order (`asc` or `desc`)',
    default: 'desc',
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder: 'asc' | 'desc' = 'desc';

  @ApiPropertyOptional({
    description: 'Filter by status',
  })
  @IsOptional()
  @IsEnum(TxStatus, { each: true })
  status: TxStatus;

  @ApiPropertyOptional({
    description: 'Filter by service type',
  })
  @IsOptional()
  @IsEnum(ServiceType, { each: true })
  serviceType: ServiceType;

  @ApiPropertyOptional({
    description: 'Filter by function type',
  })
  @IsOptional()
  @IsEnum(FunctionType, { each: true })
  functionType: FunctionType;
}
