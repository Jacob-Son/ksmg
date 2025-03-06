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
} from '@nestjs/common';
import { StudioService } from './studio.service';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/roles/roles.decorator';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';

@Controller('studio')
export class StudioController {
  constructor(
    private readonly studioService: StudioService,
    private readonly authService: AuthService,
  ) {}

  @Get('/creator/:creatorAddress')
  @ApiTags('studio')
  @ApiOperation({
    summary: 'Get studio',
    description: '스튜디오 정보를 가져옵니다.',
  })
  @ApiParam({
    name: 'creatorAddress',
    description: 'creator address',
    required: true,
  })
  @Roles(UserRole.ADMIN, UserRole.CREATOR)
  async getStudioByCreatorAddress(
    @Param('creatorAddress') creatorAddress: string,
    @Query('page') page: string,
  ) {
    const studio = await this.studioService.getStudioByCreatorAddress(
      creatorAddress,
      page ? Number(page) : 1,
    );
    return {
      success: studio.success,
      error: studio.error,
      data: studio.data,
    };
  }

  @Patch('/:nftCreateUnitId/price')
  @ApiTags('studio')
  @ApiOperation({
    summary: 'Set nft price',
    description: 'NFT 가격을 설정합니다.',
  })
  @ApiParam({
    name: 'nftCreateUnitId',
    description: 'nft create unit id',
    required: true,
  })
  @Roles(UserRole.ADMIN, UserRole.CREATOR)
  async setNftPrice(
    @Param('nftCreateUnitId') nftCreateUnitId: string,
    @Body('price') price: number,
  ) {
    const result = await this.studioService.setNftPrice(nftCreateUnitId, price);
    return {
      success: result.success,
      error: result.error,
      data: null,
    };
  }

  @Delete('/:createUnitId')
  @ApiTags('studio')
  @ApiOperation({
    summary: 'Delete nft',
    description: '팔리지 않은 NFT를 삭제합니다.',
  })
  @ApiParam({
    name: 'createUnitId',
    description: 'create unit id',
    required: true,
  })
  @Roles(UserRole.ADMIN, UserRole.CREATOR)
  async deleteNft(
    @Headers('authorization') authorization: string,
    @Param('createUnitId') createUnitId: string,
  ) {
    const isOwned = await this.studioService.isOwned(
      authorization,
      createUnitId,
    );
    if (!isOwned.result) {
      return {
        success: false,
        error: '권한이 없습니다.',
        data: null,
      };
    }
    const result = await this.studioService.deleteNft(
      createUnitId,
      isOwned.data,
    );
    return {
      success: result.success,
      error: result.error,
      data: null,
    };
  }

  @Get('/creator/name/:creatorName')
  @ApiTags('studio')
  @ApiOperation({
    summary: 'Check creator name',
    description: '크리에이터 이름 중복 체크',
  })
  @ApiParam({
    name: 'creatorName',
    description: 'creator name',
    required: true,
  })
  @Roles(UserRole.ADMIN, UserRole.CREATOR)
  async checkCreatorName(@Param('creatorName') creatorName: string) {
    const result = await this.studioService.checkCreatorName(creatorName);
    return {
      success: result.success,
      error: result.error,
      data: null,
    };
  }

  @Post('/creator/:creatorAddress/profile')
  @ApiTags('studio')
  @ApiOperation({
    summary: 'Set creator profile',
    description: '크리에이터 프로필을 설정합니다.',
  })
  @ApiParam({
    name: 'creatorAddress',
    description: 'creator address',
    required: true,
  })
  @Roles(UserRole.ADMIN, UserRole.CREATOR)
  async setCreatorProfile(
    @Headers('authorization') authorization: string,
    @Param('creatorAddress') creatorAddress: string,
    @Body('creatorName') creatorName: string,
  ) {
    const user = await this.authService.getUser(authorization);
    if (user.userAddress !== creatorAddress) {
      return {
        success: false,
        error: '권한이 없습니다.',
        data: null,
      };
    }
    const result = await this.studioService.setCreatorProfile(
      creatorAddress,
      creatorName,
    );
    return {
      success: result.success,
      error: result.error,
      data: null,
    };
  }
}
