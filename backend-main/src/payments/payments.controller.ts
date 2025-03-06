import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { RankService } from 'src/rank/rank.service';
import { OrdersService } from 'src/orders/orders.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly ordersService: OrdersService,
    private readonly rankService: RankService,
    private readonly prismaservice: PrismaService,
  ) {}

  @Get('/')
  @ApiTags('payments')
  @ApiOperation({
    summary: 'Get payments',
    description: '결제 정보를 가져옵니다.',
  })
  @ApiQuery({
    name: 'imp_uid',
    description: '아임포트 고유번호',
    required: true,
  })
  async getPayments(@Query('imp_uid') imp_uid: string) {
    return await this.paymentsService.getPayment(imp_uid);
  }

  @Post('/complete')
  @ApiTags('payments')
  async completePayment(
    @Body('imp_uid') imp_uid: string,
    @Body('merchant_uid') merchant_uid: string,
    @Body('status') status: string,
  ) {
    await this.prismaservice.paymentLog.create({
      data: {
        impUid: imp_uid,
        merchantUid: merchant_uid,
        status,
      },
    });
    if (status !== 'paid') {
      return {
        success: false,
        error: 'status is not paid',
      };
    }
    const result = await this.ordersService.completeOrder(
      merchant_uid,
      imp_uid,
    );
    await this.rankService.handleBest();
    return {
      success: result.success,
      error: result.error,
      data: result.data,
    };
  }
}
