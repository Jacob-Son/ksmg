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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import {
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { auctionIdParam } from './swagger/param';
import {
  createAuctionResponse,
  createBidResponse,
  deleteAuctionResponse,
  getAuctionByIdResponse,
  getBidsByAuctionIdResponse,
  updateAuctionResponse,
} from './swagger/response';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { uploadFile } from 'src/common/services/image';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('auctions')
@UseGuards(RolesGuard)
export class AuctionsController {
  constructor(private readonly auctionService: AuctionsService) {}

  @Get('/')
  @ApiTags('auctions')
  @ApiOperation({
    summary: 'Get auctions',
    description: '경매 목록을 가져옵니다.',
  })
  @ApiResponse(getAuctionByIdResponse)
  @Roles(UserRole.ADMIN)
  async getAuctions(): Promise<any> {
    return await this.auctionService.getAuctions();
  }

  @Get('/ongoing')
  @ApiTags('auctions')
  @ApiOperation({
    summary: 'Get ongoing auctions',
    description: '진행중인 경매를 가져옵니다.',
  })
  @ApiResponse(getAuctionByIdResponse)
  async getOngoingAuctions(): Promise<any> {
    return await this.auctionService.getOngoingAuctions();
  }

  @Post('/')
  @ApiTags('auctions')
  @ApiOperation({
    summary: 'Create auction',
    description: '경매를 생성합니다.',
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 5 },
      { name: 'detailImage', maxCount: 1 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  @ApiResponse(createAuctionResponse)
  @Roles(UserRole.ADMIN)
  async createAuction(
    @Body() body: CreateAuctionDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<any> {
    try {
      const images: string[] = [];
      for (const image of files['images']) {
        const _imagePath = await uploadFile(image, 'auction/image');
        images.push(_imagePath);
      }
      const detailImagePath = await uploadFile(
        files['detailImage'][0],
        'auction/detailImage',
      );
      return await this.auctionService.createAuction({
        name: body.name,
        description: body.description,
        startPrice: body.startPrice,
        estimatedPrice: body.estimatedPrice,
        startTime: body.startTime,
        endTime: body.endTime,
        imagePaths: images,
        detailImagePath: detailImagePath,
      });
    } catch (e) {
      console.log(e);
    }
  }

  @Get('/:id')
  @ApiTags('auctions')
  @ApiOperation({
    summary: 'Get auction by id',
    description: '경매를 가져옵니다.',
  })
  @ApiParam(auctionIdParam)
  @ApiResponse(getAuctionByIdResponse)
  async getAuctionById(@Param('id') auctionId: number): Promise<any> {
    const res = await this.auctionService.getAuctionById(auctionId);
    return res;
  }

  @Patch('/:id')
  @ApiTags('auctions')
  @ApiOperation({
    summary: 'Update auction',
    description: '경매를 수정합니다.',
  })
  @ApiParam(auctionIdParam)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 5 },
      { name: 'detailImage', maxCount: 1 },
    ]),
  )
  @ApiResponse(updateAuctionResponse)
  @Roles(UserRole.ADMIN)
  async updateAuction(
    @Param('id') auctionId: number,
    @Body() body: UpdateAuctionDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<any> {
    try {
      const images: string[] = [];

      if (files['images']) {
        for (const image of files['images']) {
          const _imagePath = await uploadFile(image, 'auction/image');
          images.push(_imagePath);
        }
      }
      let detailImage: string;
      if (files['detailImage']) {
        detailImage = await uploadFile(
          files['detailImage'],
          'auction/detailImage',
        );
      }
      const updateData = {};
      for (const key in body) {
        if (body[key] !== undefined) {
          updateData[key] = body[key];
        }
      }
      if (images.length > 0) {
        updateData['imagePaths'] = images;
      }
      if (detailImage) {
        updateData['detailImagePath'] = detailImage;
      }

      if (Object.keys(updateData).length === 0) {
        return {
          success: false,
          error: '수정할 내용이 없습니다.',
          data: null,
        };
      }

      return await this.auctionService.updateAuction(auctionId, updateData);
    } catch (e) {
      console.log(e);
    }
  }

  @Delete('/:id')
  @ApiTags('auctions')
  @ApiOperation({
    summary: 'Delete auction',
    description: '경매를 삭제합니다.',
  })
  @ApiParam(auctionIdParam)
  @ApiResponse(deleteAuctionResponse)
  @Roles(UserRole.ADMIN)
  async deleteAuction(@Param('id') auctionId: number): Promise<any> {
    return await this.auctionService.deleteAuction(auctionId);
  }

  @Get('/:id/bids')
  @ApiTags('auctions')
  @ApiOperation({
    summary: 'Get bids by auction id',
    description: '경매의 비딩 목록을 가져옵니다.',
  })
  @ApiParam(auctionIdParam)
  @ApiResponse(getBidsByAuctionIdResponse)
  async getBidsByAuctionId(@Param('id') auctionId: number): Promise<any> {
    return await this.auctionService.getBidsByAuctionId(Number(auctionId));
  }

  @Post('/:id/rapid-bid')
  @ApiTags('auctions')
  @ApiOperation({
    summary: 'Create rapid bid',
    description: '경매에 빠른 입찰을 합니다.',
  })
  @ApiParam(auctionIdParam)
  @ApiResponse(createBidResponse)
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async createRapidBid(
    @Param('id') auctionId: number,
    @Body() body: CreateBidDto,
  ): Promise<any> {
    return await this.auctionService.createRapidBid(auctionId, {
      price: body.price,
      userAddress: body.userAddress,
    });
  }

  @Post('/:id/upper-bid')
  @ApiTags('auctions')
  @ApiOperation({
    summary: 'Create upper bid',
    description: '경매에 상한가 응찰을 합니다.',
  })
  @ApiParam(auctionIdParam)
  @ApiResponse(createBidResponse)
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async createUpperBid(
    @Param('id') auctionId: number,
    @Body() body: CreateBidDto,
  ): Promise<any> {
    return await this.auctionService.createUpperBid(auctionId, {
      price: body.price,
      userAddress: body.userAddress,
    });
  }

  @Get('/:id/like')
  @ApiTags('auctions')
  @ApiOperation({
    summary: 'Get like',
    description: '경매 좋아요 여부를 가져옵니다.',
  })
  @ApiParam(auctionIdParam)
  async getLike(
    @Param('id') auctionId: number,
    @Query('userAddress') userAddress: string = '',
  ): Promise<{
    success: boolean;
    error: string;
    data: boolean;
  }> {
    if (!userAddress) {
      return {
        success: true,
        error: null,
        data: false,
      };
    }
    return await this.auctionService.getLikeByAuctionId(
      Number(auctionId),
      userAddress,
    );
  }

  @Patch('/:id/like')
  @ApiTags('auctions')
  @ApiOperation({
    summary: 'Like auction',
    description: '경매를 좋아요 합니다.',
  })
  @ApiParam(auctionIdParam)
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async likeAuction(
    @Param('id') auctionId: number,
    @Body('userAddress') userAddress: string = '',
  ): Promise<{
    success: boolean;
    error: string;
    data: boolean;
  }> {
    if (!userAddress) {
      return {
        success: false,
        error: 'userAddress가 없습니다.',
        data: false,
      };
    }
    return await this.auctionService.likeAuction(
      Number(auctionId),
      userAddress,
    );
  }

  @Patch('/:id/view')
  @ApiTags('auctions')
  @ApiOperation({
    summary: 'View auction',
    description: '경매 조회수를 올립니다.',
  })
  @ApiParam(auctionIdParam)
  async viewAuction(@Param('id') auctionId: number): Promise<{
    success: boolean;
    error: string;
    data: boolean;
  }> {
    return await this.auctionService.viewAuction(Number(auctionId));
  }
}
