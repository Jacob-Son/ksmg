import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { MakeOrderDto } from './dto/make-order-dto';
import { Order, UserRole } from '@prisma/client';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RankService } from 'src/rank/rank.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('orders')
@UseGuards(RolesGuard)
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly rankService: RankService,
    private readonly authService: AuthService,
  ) {}

  @Post('/')
  @ApiTags('orders')
  @ApiOperation({
    summary: 'Create order',
    description: '주문을 생성합니다.',
  })
  @Roles(UserRole.USER, UserRole.ADMIN, UserRole.CREATOR)
  async createOrder(
    @Body() body: MakeOrderDto,
  ): Promise<{ success: boolean; error?: string; data?: Order }> {
    const result = await this.ordersService.createOrder(
      body.userAddress,
      body.merchantUid,
      body.nftSaleIds,
    );
    return {
      success: result.success,
      error: result.error,
      data: result.data,
    };
  }

  @Get('/paid')
  @ApiTags('orders')
  @ApiOperation({
    summary: 'Get paid orders',
    description: '결제 완료 여부를 확인합니다.',
  })
  @Roles(UserRole.USER, UserRole.ADMIN, UserRole.CREATOR)
  async checkPaidOrder(@Query('merchantUid') merchantUid: string): Promise<{
    success: boolean;
    error?: string;
    data?: {
      isPaid: boolean;
      order: Order;
    };
  }> {
    const result = await this.ordersService.checkPaidOrder(merchantUid);
    return {
      success: result.success,
      error: result.error,
      data: result.data,
    };
  }

  @Get('/:id')
  @ApiTags('orders')
  @ApiOperation({
    summary: 'Get order',
    description: '주문 상세 정보를 가져옵니다.',
  })
  @ApiParam({
    name: 'id',
    description: '주문 아이디',
    required: true,
  })
  @Roles(UserRole.USER, UserRole.ADMIN, UserRole.CREATOR)
  async getOrder(
    @Param('id') orderId: string,
  ): Promise<{ success: boolean; error?: string; data?: Order }> {
    const result = await this.ordersService.getOrder(Number(orderId));
    return {
      success: result.success,
      error: result.error,
      data: result.data,
    };
  }

  @Patch('/:orderId/free-buy')
  @ApiTags('orders')
  @ApiOperation({
    summary: 'Free buy order',
    description: '무료 구매를 합니다.',
  })
  @Roles(UserRole.USER, UserRole.ADMIN, UserRole.CREATOR)
  async freeBuyOrder(
    @Headers('authorization') token: string,
    @Param('orderId') orderId: string,
  ): Promise<{ success: boolean; error?: string; data?: Order }> {
    const user = await this.authService.getUser(token);
    const orderUser = await this.ordersService.getOrderUserAddress(
      Number(orderId),
    );
    if (user.userAddress !== orderUser) {
      return {
        success: false,
        error: '권한이 없습니다.',
        data: null,
      };
    }
    const result = await this.ordersService.freeBuyOrder(Number(orderId));
    return {
      success: result.success,
      error: result.error,
      data: result.data,
    };
  }

  @Patch('/:orderId/refund')
  @ApiTags('orders')
  @ApiOperation({
    summary: 'Refund order',
    description: '결제를 환불합니다.',
  })
  @Roles(UserRole.USER, UserRole.ADMIN, UserRole.CREATOR)
  async refundOrder(
    @Headers('authorization') token: string,
    @Param('orderId') orderId: string,
    @Body('nftSaleId') nftSaleId: number,
  ): Promise<{ success: boolean; error?: string; data?: Order }> {
    const user = await this.authService.getUser(token);
    const orderUser = await this.ordersService.getOrderUserAddress(
      Number(orderId),
    );
    if (user.userAddress !== orderUser) {
      return {
        success: false,
        error: '권한이 없습니다.',
        data: null,
      };
    }
    const result = await this.ordersService.refundOrder(orderId, nftSaleId);
    return {
      success: result.success,
      error: result.error,
      data: result.data,
    };
  }

  @Patch('/:orderId/confirm')
  @ApiTags('orders')
  @ApiOperation({
    summary: 'Confirm order',
    description: '결제를 확정합니다.',
  })
  @Roles(UserRole.USER, UserRole.ADMIN, UserRole.CREATOR)
  async confirmOrder(
    @Headers('authorization') token: string,
    @Param('orderId') orderId: string,
    @Body('nftSaleId') nftSaleId: number,
  ): Promise<{ success: boolean; error?: string; data?: Order }> {
    const user = await this.authService.getUser(token);
    const orderUser = await this.ordersService.getOrderUserAddress(
      Number(orderId),
    );
    if (user.userAddress !== orderUser) {
      return {
        success: false,
        error: '권한이 없습니다.',
        data: null,
      };
    }
    const result = await this.ordersService.confirmOrder(orderId, nftSaleId);
    await this.rankService.handleBest();
    return {
      success: result.success,
      error: result.error,
      data: result.data,
    };
  }

  // @Patch('/order-cancel')
  // @ApiTags('orders')
  // @ApiOperation({
  //   summary: 'Cancel order',
  //   description: '주문을 취소합니다.',
  // })
  // async cancelOrder() {
  //   await this.ordersService.handleOrderCancel();
  // }
}
