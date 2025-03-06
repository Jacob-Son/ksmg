import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CombineService } from './combine.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { UserRole } from '@prisma/client';
import { RolesGuard } from 'src/roles/roles.guard';
import { NftsService } from 'src/nfts/nfts.service';

@Controller('combine')
@UseGuards(RolesGuard)
export class CombineController {
  constructor(
    private readonly combineService: CombineService,
    private readonly nftsService: NftsService,
  ) {}

  @Get('/:combineId')
  @ApiTags('combine')
  @ApiOperation({
    summary: 'Get combine',
    description: '조합을 가져옵니다.',
  })
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async getCombineDetail(@Param('combineId') combineId: number) {
    const result = await this.combineService.getCombineDetail(combineId);

    return {
      success: true,
      error: null,
      data: result,
    };
  }

  @Get('/user/:userAddress')
  @ApiTags('combine')
  @ApiOperation({
    summary: 'Get combine',
    description: '조합 목록을 가져옵니다.',
  })
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async getCombine(
    @Param('userAddress') userAddress: string,
    @Query('page') page: string,
  ) {
    const result = await this.combineService.getCombine(
      userAddress,
      Number(page),
    );

    return {
      success: true,
      error: null,
      data: result,
    };
  }

  @Get('/nfts/:userAddress')
  @ApiTags('combine')
  @ApiOperation({
    summary: 'Get combine',
    description: '조합 가능한 NFT 목록을 가져옵니다.',
  })
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async getCombineNfts(@Param('userAddress') userAddress: string) {
    const result = await this.combineService.getCombineNfts(userAddress);

    return {
      success: true,
      error: null,
      data: result,
    };
  }

  @Post('/')
  @ApiTags('combine')
  @ApiOperation({
    summary: 'Create combine',
    description: '조합을 생성합니다.',
  })
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async createCombine(
    @Body('userAddress') userAddress: string,
    @Body('nftIds') nftIds: number[],
  ) {
    const checkNfts = await this.combineService.checkNfts(nftIds, userAddress);
    if (!checkNfts.success) {
      return {
        success: false,
        error: checkNfts.error,
        data: null,
      };
    }
    const result = await this.combineService.createCombine(userAddress, nftIds);
    return {
      success: result.success,
      error: result.error,
      data: result.data,
    };
  }

  @Post('/:combineId/mint')
  @ApiTags('combine')
  @ApiOperation({
    summary: 'Mint  combine',
    description: '추가 조합을 생성합니다.',
  })
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async mintCombine(
    @Param('combineId') combineId: number,
    @Body('userAddress') userAddress: string,
    @Body('collectionAddress') collectionAddress: string,
    @Body('description') description: string,
    @Body('name') name: string,
    @Body('nftImages') nftImages: string[],
    @Body('nftDetailImage') nftDetailImage: string,
    @Body('nftDetailDescription') nftDetailDescription: string,
    @Body('price') price: number,
    @Body('royalty') royalty: number,
  ) {
    const nftIds = await this.combineService.getNftIds(Number(combineId));
    const bookImages = await this.combineService.extractBookPage(nftIds);
    const nfts = await this.nftsService.createNft(
      collectionAddress,
      description,
      userAddress,
      nftImages,
      nftDetailImage,
      nftDetailDescription,
      [],
      name,
      '출판도서',
      undefined,
      bookImages,
      1,
      Number(price),
      royalty,
    );
    if (!nfts.success) {
      return {
        success: false,
        error: nfts.error,
        data: null,
      };
    }
    const result = await this.combineService.mintCombine(
      Number(combineId),
      userAddress,
      nfts.data.nfts[0].nftId,
    );
    return {
      success: result.success,
      error: result.error,
      data: { ...result.data, nftId: nfts.data.nfts[0].nftId },
    };
  }

  @Post('/:combineId/delivery')
  @ApiTags('combine')
  @ApiOperation({
    summary: 'Delivery combine',
    description: '추가 조합을 배송합니다.',
  })
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async deliveryCombine(
    @Param('combineId') combineId: number,
    @Body('userAddress') userAddress: string,
    @Body('name') name: string,
    @Body('phoneNumber') phoneNumber: string,
    @Body('postCode') postCode: string,
    @Body('mainAddress') mainAddress: string,
    @Body('detailAddress') detailAddress: string,
  ) {
    const result = await this.combineService.deliveryCombine(
      Number(combineId),
      userAddress,
      name,
      phoneNumber,
      postCode,
      mainAddress,
      detailAddress,
    );
    return {
      success: result.success,
      error: result.error,
      data: result.data,
    };
  }
}
