import { Controller, Get, Param, UseInterceptors, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminTxRecordsService } from './admin.tx-records.service';
import { UserTxRecordsService } from './user.tx-records.service';
import { TxRecordTransformInterceptor } from './tx-records.interceptor';
import { Public } from 'src/auth/auth.decorator';
import { GetAllDto } from './dto/query.dto';

@Controller('tx-records')
@ApiTags('tx-records')
export class TxRecordsController {
  constructor(
    private readonly adminTxRecordsService: AdminTxRecordsService,
    private readonly userTxRecordsService: UserTxRecordsService,
  ) {}

  // TODO: 리턴 타입 지정 (TxRecordResponse<T>[]?)
  @Get('user/all/:address')
  @Public()
  @ApiOperation({
    summary:
      '`address`에 해당하는 계정과 관련된 모든 UserTxRecord(buy) 조회 (페이징, 정렬, 필터링 가능)',
  })
  @UseInterceptors(TxRecordTransformInterceptor)
  async getUserTxRecords(
    @Param('address') address: string,
    @Query() dto: GetAllDto,
  ): Promise<any> {
    return await this.userTxRecordsService.findAllByAddress(address, dto);
  }

  @Get('user/:txHash')
  @Public()
  @ApiOperation({
    summary:
      '`txHash`에 해당하는 UserTxRecord 레코드 목록 조회 (주의: 1개 이상)',
  })
  @UseInterceptors(TxRecordTransformInterceptor)
  async getUserTxRecordsByTxHash(@Param('txHash') txHash: string) {
    return await this.userTxRecordsService.findManyByTxHash(txHash);
  }

  // TODO: 리턴 타입 지정 (TxRecordResponse<T>[]?)
  @Get('admin/all/:address')
  @Public()
  @ApiOperation({
    summary:
      '`address`에 해당하는 계정과 관련된 모든 AdminTxRecord(mint, transfer, burn, set royalty) 조회 (페이징, 정렬, 필터링 가능)',
  })
  // @UseInterceptors(TxRecordTransformInterceptor)
  async getAdminTxRecords(
    @Param('address') address: string,
    @Query() dto: GetAllDto,
  ): Promise<any> {
    return await this.adminTxRecordsService.findAllByAddress(address, dto);
  }

  @Get('admin/:txHash')
  @Public()
  @ApiOperation({
    summary:
      '`txHash`에 해당하는 AdminTxRecord 레코드 조회 (주의: 1개만 존재 가능)',
  })
  // @UseInterceptors(TxRecordTransformInterceptor)
  async getAdminTxRecordByTxHash(@Param('txHash') txHash: string) {
    return await this.adminTxRecordsService.findOneByTxHash(txHash);
  }
}
