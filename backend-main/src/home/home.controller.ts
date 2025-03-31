import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Banner, Event, Recommend } from '@prisma/client';
import { SimpleNftType } from 'src/common/types/nft';
import { ApiResponseType } from 'src/common/types/api';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('/banner')
  @ApiTags('home')
  @ApiOperation({
    summary: 'Get banner',
    description: '배너를 가져옵니다.',
  })
  async getBanner(): Promise<ApiResponseType<Banner[]>> {
    const res = await this.homeService.getBanner();
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Get('/hot-nft')
  @ApiTags('home')
  @ApiOperation({
    summary: 'Get hot',
    description: '인기 급상승 작품들을 가져옵니다.',
  })
  async getHot(): Promise<ApiResponseType<SimpleNftType[]>> {
    const res = await this.homeService.getHot();
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Get('/recommend')
  @ApiTags('home')
  @ApiOperation({
    summary: 'Get recommend',
    description: '추천 작품들을 가져옵니다.',
  })
  async getRecommend(): Promise<
    ApiResponseType<
      {
        recommend: Recommend;
        nftImagePath: string;
        tokenId: string;
      }[]
    >
  > {
    const res = await this.homeService.getRecommend();
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Get('/current-event')
  @ApiTags('home')
  @ApiOperation({
    summary: 'Get current-event',
    description: '진행중인 이벤트를 가져옵니다.',
  })
  async getCurrentEvent(): Promise<ApiResponseType<Event[]>> {
    const res = await this.homeService.getCurrentEvent();
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Get('/culture-event')
  @ApiTags('home')
  @ApiOperation({
    summary: 'Get culture-event',
    description: '할인 행사를 가져옵니다.',
  })
  async getCultureEvent(): Promise<ApiResponseType<Event[]>> {
    const res = await this.homeService.getCultureEvent();
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Get('/best-nft')
  @ApiTags('home')
  @ApiOperation({
    summary: 'Get best',
    description: '베스트 작품들을 가져옵니다.',
  })
  async getBest(): Promise<ApiResponseType<SimpleNftType[]>> {
    const res = await this.homeService.getBest();
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Get('/popular-theme')
  @ApiTags('home')
  @ApiOperation({
    summary: 'Get popular-theme',
    description: '인기 테마를 가져옵니다.',
  })
  async getPopularTheme(): Promise<
    ApiResponseType<{
      [key: string]: {
        theme: string;
        count: number;
      }[];
    }>
  > {
    const res = await this.homeService.getPopularTheme();
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Get('/recent-sale')
  @ApiTags('home')
  @ApiOperation({
    summary: 'Get recent-sale',
    description: '최근 판매된 작품들을 가져옵니다.',
  })
  async getRecentSale(): Promise<ApiResponseType<SimpleNftType[]>> {
    const res = await this.homeService.getRecentSale();
    return {
      success: true,
      error: null,
      data: res,
    };
  }
}
