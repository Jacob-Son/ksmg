import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from 'src/roles/roles.guard';
import { NftsService } from './nfts.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiResponseType } from 'src/common/types/api';
import { UserRole } from '@prisma/client';
import { CreateNftDto } from './dto/create-nft-dto';
import { Roles } from 'src/roles/roles.decorator';
import { SetNftPriceDto } from './dto/set-nft-price-dto';
import { LikeNftDto } from './dto/like-nft-dto';
import { GetNftResponseData } from './type/response';
import { ViewNftDto } from './dto/view-nft-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SimpleNftType } from 'src/common/types/nft';
import { AuthService } from 'src/auth/auth.service';

@Controller('nfts')
@UseGuards(RolesGuard)
export class NftsController {
  constructor(
    private readonly nftsService: NftsService,
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('/')
  @ApiTags('nfts')
  @ApiOperation({
    summary: 'Get nfts',
    description: 'NFT 목록을 가져옵니다.',
  })
  async getNfts(
    @Query('page') page: string,
    @Query('category') category?: string,
    @Query('theme') theme?: string,
    @Query('search') search?: string,
  ): Promise<ApiResponseType<any>> {
    const result = await this.nftsService.getNfts(
      Number(page),
      category,
      theme,
      search,
    );
    return {
      success: result.success,
      error: result.error,
      data: result.data,
    };
  }

  @Get('/nft-create-unit/:nftCreateUnitId')
  @ApiTags('nfts')
  @ApiOperation({
    summary: 'Get same theme nfts',
    description: '같은 상품의 NFT 목록을 가져옵니다.',
  })
  @ApiParam({
    name: 'nftCreateUnitId',
    description: 'NFT 생성 단위 아이디',
    required: true,
  })
  async getSameCreateUnitNfts(
    @Param('nftCreateUnitId') nftCreateUnitId: string,
    @Query('page') page: string,
  ): Promise<
    ApiResponseType<{
      totalCount: number;
      totalPage: number;
      nfts: SimpleNftType[];
    }>
  > {
    const result = await this.nftsService.getSameCreateUnitNfts(
      Number(nftCreateUnitId),
      Number(page),
    );
    return {
      success: result.success,
      error: result.error,
      data: result.data,
    };
  }

  @Get('/:collectionAddress/:tokenId')
  @ApiTags('nfts')
  @ApiOperation({
    summary: 'Get nft',
    description: 'NFT 정보를 가져옵니다.',
  })
  async getNft(
    @Param('collectionAddress') collectionAddress: string,
    @Param('tokenId') tokenId: string,
  ): Promise<ApiResponseType<GetNftResponseData | null>> {
    const result = await this.nftsService.getNft(collectionAddress, tokenId);
    return {
      success: result.success,
      error: result.error,
      data: result.data,
    };
  }

  @Get('/:collectionAddress/:tokenId/relative')
  @ApiTags('nfts')
  @ApiOperation({
    summary: 'Get relative nfts',
    description: '비슷한 NFT 정보를 가져옵니다.',
  })
  async getSimilarNfts(
    @Param('collectionAddress') collectionAddress: string,
    @Param('tokenId') tokenId: string,
  ): Promise<
    ApiResponseType<{
      nfts: SimpleNftType[];
      isTheme: boolean;
    }>
  > {
    const result = await this.nftsService.getSimilarNfts(
      collectionAddress,
      tokenId,
    );
    return {
      success: result.success,
      error: result.error,
      data: result.data,
    };
  }

  @Post('/')
  @ApiTags('nfts')
  @ApiOperation({
    summary: 'Create nft',
    description: 'NFT를 생성합니다.',
  })
  @Roles(UserRole.ADMIN, UserRole.CREATOR)
  async createNft(@Body() body: CreateNftDto) {
    const result = await this.nftsService.createNft(
      body.collectionAddress,
      body.description,
      body.creatorAddress,
      body.nftImages,
      body.nftDetailImage,
      body.nftDetailDescription,
      body.nftAttributes,
      body.name,
      body.category,
      body.theme,
      body.bookImages,
      body.count,
      Number(body.price),
      Number(body.royalty),
      body.preAudio,
      body.fullAudio,
    );

    if (!result.success) {
      return {
        success: false,
        error: result.error,
        data: null,
      };
    }

    return {
      success: result.success,
      error: result.error,
      data: result.data,
    };
  }

  @Patch('/transfer')
  @ApiTags('nfts')
  @ApiOperation({
    summary: 'Transfer nft',
    description: 'NFT를 전송합니다.',
  })
  @Roles(UserRole.ADMIN)
  async transferNFT(
    @Body('collectionAddress') collectionAddress: string,
    @Body('tokenId') tokenId: string,
    @Body('toAddress') toAddress: string,
  ) {
    const res = await this.nftsService.transferNft(
      collectionAddress,
      tokenId,
      toAddress,
    );

    return {
      success: res.success,
      error: res.error,
      data: res.data,
    };
  }

  @Delete('/burn')
  @ApiTags('nfts')
  @ApiOperation({
    summary: 'Transfer nft',
    description: 'NFT를 제거합니다.',
  })
  @Roles(UserRole.ADMIN)
  async burnNFT(
    @Query('collectionAddress') collectionAddress: string,
    @Query('tokenId') tokenId: string,
  ) {
    const res = await this.nftsService.burnNft(collectionAddress, tokenId);
    if (!res.success) {
      return {
        success: false,
        error: res.error,
        data: null,
      };
    }

    return {
      success: res.success,
      error: res.error,
      data: res.data,
    };
  }

  @Patch('/price')
  @ApiTags('nfts')
  @ApiOperation({
    summary: 'Set nft price',
    description: 'NFT의 가격을 설정합니다.',
  })
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async setNftPrice(
    @Headers('authorization') authorization: string,
    @Body() body: SetNftPriceDto,
  ) {
    const user = await this.authService.getUser(authorization);
    if (user.userAddress !== body.sellerAddress) {
      return {
        success: false,
        error: '권한이 없습니다.',
        data: null,
      };
    }
    const res = await this.nftsService.setNftPrice(
      body.sellerAddress,
      body.collectionAddress,
      body.tokenId,
      body.price,
    );

    return {
      success: res.success,
      error: res.error,
      data: body.price,
    };
  }

  @Get('/like')
  @ApiTags('nfts')
  @ApiOperation({
    summary: 'Get like',
    description: 'NFT 좋아요 여부를 가져옵니다.',
  })
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async getLike(@Query() query: LikeNftDto) {
    const isLiked = await this.nftsService.getLike(
      query.collectionAddress,
      query.tokenId,
      query.userAddress,
    );

    return {
      success: true,
      error: null,
      data: isLiked,
    };
  }

  @Patch('/like')
  @ApiTags('nfts')
  @ApiOperation({
    summary: 'Like nft',
    description: 'NFT를 좋아요 합니다.',
  })
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async likeNft(@Body() body: LikeNftDto) {
    await this.nftsService.likeNft(
      body.collectionAddress,
      body.tokenId,
      body.userAddress,
    );

    return {
      success: true,
      error: null,
      data: null,
    };
  }

  @Delete('/like')
  @ApiTags('nfts')
  @ApiOperation({
    summary: 'Unlike nft',
    description: 'NFT 좋아요를 취소합니다.',
  })
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async unlikeNft(@Body() body: LikeNftDto) {
    await this.nftsService.unlikeNft(
      body.collectionAddress,
      body.tokenId,
      body.userAddress,
    );

    return {
      success: true,
      error: null,
      data: null,
    };
  }

  @Patch('/view')
  @ApiTags('nfts')
  @ApiOperation({
    summary: 'View nft',
    description: 'NFT를 조회수를 올립니다.',
  })
  async viewNft(@Body() body: ViewNftDto) {
    await this.nftsService.viewNft(body.collectionAddress, body.tokenId);

    return {
      success: true,
      error: null,
      data: null,
    };
  }

  @Get('/theme')
  @ApiTags('nfts')
  @ApiOperation({
    summary: 'Get theme',
    description: 'NFT 테마를 가져옵니다.',
  })
  async getTheme() {
    const themes = await this.prisma.theme.findMany();
    return {
      success: true,
      error: null,
      data: themes.map((theme) => theme.name),
    };
  }
}
