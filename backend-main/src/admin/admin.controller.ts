import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { uploadFile } from 'src/common/services/image';
import { Roles } from 'src/roles/roles.decorator';
import { CombineDelivery, DeliveryStatus, UserRole } from '@prisma/client';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/banner')
  @ApiTags('admin')
  @ApiOperation({
    summary: 'Create banner',
    description: '배너를 생성합니다.',
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'mobileImage', maxCount: 1 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  @Roles(UserRole.ADMIN)
  async createBanner(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('link') link?: string,
  ) {
    let imagePath = '';
    try {
      imagePath = await uploadFile(files['image'][0], 'banner');
    } catch (e) {
      return {
        success: false,
        error: e.message,
        data: null,
      };
    }
    let mobileImagePath = '';
    try {
      mobileImagePath = await uploadFile(
        files['mobileImage'][0],
        'banner/mobile',
      );
    } catch (e) {
      return {
        success: false,
        error: e.message,
        data: null,
      };
    }

    const res = await this.adminService.createBanner(
      imagePath,
      mobileImagePath,
      link,
    );
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Delete('/banner/:bannerId')
  @ApiTags('admin')
  @ApiOperation({
    summary: 'Delete banner',
    description: '배너를 삭제합니다.',
  })
  @Roles(UserRole.ADMIN)
  async deleteBanner(@Param('bannerId') bannerId: string) {
    const res = await this.adminService.deleteBanner(bannerId);
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Patch('/banner/order')
  @ApiTags('admin')
  @ApiOperation({
    summary: 'Update banner order',
    description: '배너 순서를 수정합니다.',
  })
  @Roles(UserRole.ADMIN)
  async updateBannerOrder(
    @Body('bannerInfos')
    bannerInfos: {
      bannerId: number;
      order: number;
    }[],
  ) {
    const res = await this.adminService.updateBannerOrder(bannerInfos);
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Post('/recommend')
  @ApiTags('admin')
  @ApiOperation({
    summary: 'Create recommend',
    description: '추천을 생성합니다.',
  })
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'profileImagePath', maxCount: 1 }]),
  )
  @ApiConsumes('multipart/form-data')
  @Roles(UserRole.ADMIN)
  async createRecommend(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('author') author: string,
    @Body('intro') intro: string,
    @Body('description') description: string,
    @Body('backgroundColor') backgroundColor: string,
    @Body('tokenId') tokenId: string,
  ) {
    let profileImagePath = '';
    try {
      profileImagePath = await uploadFile(
        files['profileImagePath'][0],
        'recommend',
      );
    } catch (e) {
      return {
        success: false,
        error: e.message,
        data: null,
      };
    }

    const res = await this.adminService.createRecommend(
      profileImagePath,
      author,
      intro,
      description,
      backgroundColor,
      tokenId,
    );
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Patch('/recommend/order')
  @ApiTags('admin')
  @ApiOperation({
    summary: 'Update recommend order',
    description: '추천 순서를 수정합니다.',
  })
  @Roles(UserRole.ADMIN)
  async updateRecommendOrder(
    @Body('recommendInfos')
    recommendInfos: {
      recommendId: number;
      order: number;
    }[],
  ) {
    const res = await this.adminService.updateRecommendOrder(recommendInfos);
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Delete('/recommend/:recommendId')
  @ApiTags('admin')
  @ApiOperation({
    summary: 'Delete recommend',
    description: '추천을 삭제합니다.',
  })
  @Roles(UserRole.ADMIN)
  async deleteRecommend(@Param('recommendId') recommendId: string) {
    const res = await this.adminService.deleteRecommend(recommendId);
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Get('/platform-fee')
  @ApiTags('admin')
  @ApiOperation({
    summary: 'Get platform fee',
    description: '플랫폼 수수료를 가져옵니다.',
  })
  @Roles(UserRole.ADMIN)
  async getPlatformFee() {
    const res = await this.adminService.getPlatformFee();
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Patch('/platform-fee')
  @ApiTags('admin')
  @ApiOperation({
    summary: 'Update platform fee',
    description: '플랫폼 수수료를 수정합니다.',
  })
  @Roles(UserRole.ADMIN)
  async updatePlatformFee(@Body('platformFee') platformFee: number) {
    const res = await this.adminService.updatePlatformFee(platformFee);
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Patch('/nft-create-unit/:nftCreateUnitId/hide')
  @ApiTags('admin')
  @ApiOperation({
    summary: 'Hide nft create unit',
    description: 'NFT 생성 유닛을 숨깁니다.',
  })
  @Roles(UserRole.ADMIN)
  async hideNftCreateUnit(
    @Param('nftCreateUnitId') nftCreateUnitId: string,
    @Body('isHidden') isHidden: boolean,
  ) {
    const res = await this.adminService.hideNftCreateUnit(
      nftCreateUnitId,
      isHidden,
    );
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Delete('/nft-create-unit/:nftCreateUnitId')
  @ApiTags('admin')
  @ApiOperation({
    summary: 'Delete nft create unit',
    description: 'NFT 생성 유닛을 삭제합니다.',
  })
  @Roles(UserRole.ADMIN)
  async deleteNftCreateUnit(@Param('nftCreateUnitId') nftCreateUnitId: string) {
    const res = await this.adminService.deleteNftCreateUnit(nftCreateUnitId);
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Get('/nft-create-unit')
  @ApiTags('admin')
  @ApiOperation({
    summary: 'Get nft create unit',
    description: 'NFT 생성 유닛을 가져옵니다.',
  })
  @Roles(UserRole.ADMIN)
  async getNftCreateUnit(@Query('page') page: string) {
    const res = await this.adminService.getNftCreateUnits(
      page ? Number(page) : 1,
    );
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Get('/settle/request')
  @ApiTags('admin')
  @ApiOperation({
    summary: 'Get settle',
    description: '정산 신청 정보를 가져옵니다.',
  })
  @Roles(UserRole.ADMIN)
  async getSettle(@Query('isSettled') isSettled: string) {
    const res = await this.adminService.getSettle(isSettled);
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Get('/settle/list')
  @ApiTags('admin')
  @ApiOperation({
    summary: 'Get settle',
    description: '정산 리스트를 가져옵니다.',
  })
  @Roles(UserRole.ADMIN)
  async getSettleList(@Query('settleIds') settleIds: string[]) {
    const res = await this.adminService.getSettleList(settleIds);
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Post('/settle/confirm')
  @ApiTags('admin')
  @ApiOperation({
    summary: 'Confirm settle status',
    description: '정산을 처리를 합니다.',
  })
  @Roles(UserRole.ADMIN)
  async confirmSettle(@Body('settleIds') settleIds: string[]) {
    const res = await this.adminService.confirmSettle(settleIds);
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Post('/settle/:settleId/reject')
  @ApiTags('admin')
  @ApiOperation({
    summary: 'Reject settle',
    description: '정산을 거부합니다.',
  })
  @Roles(UserRole.ADMIN)
  async rejectSettle(
    @Param('settleId') settleId: string,
    @Query('reason') reason?: string,
  ) {
    const res = await this.adminService.rejectSettle(settleId, reason);
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Get('/delivery')
  @ApiTags('admin')
  @ApiOperation({
    summary: 'Get delivery',
    description: '배송 정보를 가져옵니다.',
  })
  @Roles(UserRole.ADMIN)
  async getDelivery() {
    const res = await this.adminService.getDelivery();
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Patch('/delivery/:deliveryId')
  @ApiTags('admin')
  @ApiOperation({
    summary: 'Update delivery',
    description: '배송 정보를 수정합니다.',
  })
  @Roles(UserRole.ADMIN)
  async updateDelivery(
    @Param('deliveryId') deliveryId: string,
    @Body('data')
    data: Pick<
      CombineDelivery,
      'phoneNumber' | 'postCode' | 'mainAddress' | 'detailAddress'
    >,
  ) {
    const res = await this.adminService.updateDelivery(deliveryId, data);
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Post('/send-auction-result/:auctionId')
  @ApiTags('admin')
  @ApiOperation({
    summary: 'Send auction result',
    description: '경매 결과를 전송합니다.',
  })
  @Roles(UserRole.ADMIN)
  async sendAuctionResult(@Param('auctionId') auctionId: string) {
    const res = await this.adminService.sendAuctionResult(Number(auctionId));
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Get('/orders')
  @ApiTags('admin')
  @ApiOperation({
    summary: 'Get orders',
    description: '주문 정보를 가져옵니다.',
  })
  @Roles(UserRole.ADMIN)
  async getOrders(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('nftSaleId') nftSaleId?: string,
    @Query('buyerAddress') buyerAddress?: string,
    @Query('buyerName') buyerName?: string,
    @Query('sellerAddress') sellerAddress?: string,
    @Query('sellerName') sellerName?: string,
    @Query('tokenId') tokenId?: string,
    @Query('status') status?: string,
    @Query('category') category?: string,
    @Query('nftName') nftName?: string,
    @Query('isDelivery') isDelivery?: string,
  ) {
    const res = await this.adminService.getOrders(
      page ? Number(page) : 1,
      limit ? Number(limit) : 10,
      startDate,
      endDate,
      Number(nftSaleId),
      buyerAddress,
      sellerAddress,
      tokenId,
      status,
      category,
      nftName,
      buyerName,
      sellerName,
      isDelivery === 'true',
    );
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Patch('/nftSale/:nftSaleId/delivery')
  @ApiTags('admin')
  @ApiOperation({
    summary: 'Update nft sale delivery',
    description: 'NFT 판매 배송 정보를 수정합니다.',
  })
  @Roles(UserRole.ADMIN)
  async updateNftSaleDeliveryStatus(
    @Param('nftSaleId') nftSaleId: string,
    @Body('status') status: DeliveryStatus,
  ) {
    const res = await this.adminService.updateNftSaleDeliveryStatus(
      Number(nftSaleId),
      status,
    );
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @ApiTags('admin')
  @Post('/delete-not-valide-sale')
  @ApiOperation({
    summary: 'delete not valide sale',
    description: '유효하지 않은 판매를 삭제합니다.',
  })
  @Roles(UserRole.ADMIN)
  async deleteNotValideSale() {
    await this.adminService.deleteNotValideSale();
  }

  @ApiTags('admin')
  @Get('/user/:userAddress')
  @ApiOperation({
    summary: 'Get user',
    description: '유저 정보를 가져옵니다.',
  })
  @Roles(UserRole.ADMIN)
  async getUser(@Param('userAddress') userAddress: string) {
    const res = await this.adminService.getUser(userAddress);
    return {
      success: true,
      error: null,
      data: res,
    };
  }
}
