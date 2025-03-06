import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiConsumes, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { convertPathToUrl, uploadFile } from 'src/common/services/image';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { userAddressParam } from './swagger/param';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { UserRole } from '@prisma/client';
import { ApiResponseType } from 'src/common/types/api';
import { SimpleNftType } from 'src/common/types/nft';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/')
  @ApiTags('users')
  @ApiOperation({
    summary: 'Get users',
    description: '유저 목록을 가져옵니다.',
  })
  @Roles(UserRole.ADMIN)
  async getUsers(
    @Query('page') page: string,
    @Query('searchType') searchType: string,
    @Query('searchKeyword') searchKeyword: string,
  ) {
    const users = await this.usersService.getUsers(
      Number(page ?? 1),
      searchType,
      searchKeyword,
    );
    return {
      success: true,
      error: null,
      data: users,
    };
  }

  @Get('/:address')
  @ApiTags('users')
  @ApiOperation({
    summary: 'Get user by address',
    description: '유저 정보를 가져옵니다.',
  })
  @ApiParam(userAddressParam)
  @Roles(UserRole.ADMIN, UserRole.USER, UserRole.CREATOR)
  async getUserByAddress(
    @Param('address') address: string,
    @Headers('authorization') authorization: string,
  ) {
    const userInfo = await this.authService.getUser(authorization);
    if (userInfo.userAddress !== address) {
      return {
        success: false,
        error: '권한이 없습니다.',
        data: null,
      };
    }
    const user = await this.usersService.getUserByAddress(address);
    return {
      success: true,
      error: null,
      data: user,
    };
  }

  @Get('/:address/nfts')
  @ApiTags('users')
  @ApiOperation({
    summary: 'Get user nfts',
    description: '유저가 소유한 NFT 목록을 가져옵니다.',
  })
  @ApiParam(userAddressParam)
  @Roles(UserRole.ADMIN, UserRole.USER, UserRole.CREATOR)
  async getUserNfts(
    @Param('address') address: string,
    @Query('page') page?: string,
  ): Promise<
    ApiResponseType<{
      nfts: SimpleNftType[];
      totalCount: number;
      totalPage: number;
    }>
  > {
    const ownedNftInfo = await this.usersService.getUserNfts(address, page);
    return {
      success: true,
      error: null,
      data: {
        nfts: ownedNftInfo.nfts,
        totalCount: ownedNftInfo.totalCount,
        totalPage: ownedNftInfo.totalPage,
      },
    };
  }

  @Get('/:address/like')
  @ApiTags('users')
  @ApiOperation({
    summary: 'Get user like nfts',
    description: '유저가 좋아요한 NFT 목록을 가져옵니다.',
  })
  @ApiParam(userAddressParam)
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async getUserLikeNfts(
    @Param('address') address: string,
    @Query('page') page: string,
  ): Promise<
    ApiResponseType<{
      nfts: SimpleNftType[];
      totalCount: number;
      totalPage: number;
    }>
  > {
    const likeNftInfo = await this.usersService.getUserLikeNfts(address, page);
    return {
      success: true,
      error: null,
      data: {
        nfts: likeNftInfo.nfts,
        totalCount: likeNftInfo.totalCount,
        totalPage: likeNftInfo.totalPage,
      },
    };
  }

  @Get('/:address/history/buy')
  @ApiTags('users')
  @ApiOperation({
    summary: 'Get user buy orders',
    description: '유저가 구매한 주문 목록을 가져옵니다.',
  })
  @ApiParam(userAddressParam)
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async getUserBuyHistories(
    @Param('address') address: string,
    @Query('page') page: string,
  ): Promise<ApiResponseType<any>> {
    const orderInfo = await this.usersService.getUserBuyHistories(
      address,
      page,
    );
    return {
      success: true,
      error: null,
      data: {
        histories: orderInfo.histories,
        totalCount: orderInfo.totalCount,
        totalPage: orderInfo.totalPage,
      },
    };
  }

  @Get('/:address/history/sell')
  @ApiTags('users')
  @ApiOperation({
    summary: 'Get user sell orders',
    description: '유저가 판매한 주문 목록을 가져옵니다.',
  })
  @ApiParam(userAddressParam)
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async getUserSellHistories(
    @Param('address') address: string,
    @Query('page') page: string,
  ): Promise<ApiResponseType<any>> {
    const orderInfo = await this.usersService.getUserSellHistories(
      address,
      page,
    );
    return {
      success: true,
      error: null,
      data: {
        histories: orderInfo.histories,
        totalCount: orderInfo.totalCount,
        totalPage: orderInfo.totalPage,
      },
    };
  }

  @Patch('/role')
  @ApiTags('users')
  @ApiOperation({
    summary: 'Update user role by address',
    description: '유저 권한을 수정합니다.',
  })
  @ApiParam(userAddressParam)
  @Roles(UserRole.ADMIN)
  async updateUserRoleByAddress(@Body() body: UpdateUserRoleDto) {
    const user = await this.usersService.updateUserRoleByAddress(
      body.email,
      body.loginType,
      body.role,
    );
    return user;
  }

  @Patch('/:address/profile')
  @ApiTags('users')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('profileImage'))
  @ApiOperation({
    summary: 'Update user profile by address',
    description: '유저 프로필을 수정합니다.',
  })
  @ApiParam(userAddressParam)
  @Roles(UserRole.USER, UserRole.CREATOR, UserRole.ADMIN)
  async updateUserProfileByAddress(
    @Headers('authorization') authorization: string,
    @Param('address') address: string,
    @Body() body: UpdateUserProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const user = await this.authService.getUser(authorization);
      if (user.userAddress !== address) {
        return {
          success: false,
          error: '권한이 없습니다.',
          data: null,
        };
      }

      let profileImagePath = null;
      if (file) {
        profileImagePath = await uploadFile(file, 'user/profileImage');
        profileImagePath = convertPathToUrl(profileImagePath);
      } else {
        if (body.profileImage) profileImagePath = body.profileImage;
      }
      const res = await this.usersService.updateUserProfileByAddress(
        address,
        profileImagePath,
        body.name,
        body.creatorName,
        body.phoneNumber,
      );
      return {
        success: res.success,
        error: res.error,
        data: res.data,
      };
    } catch (e) {
      console.log(e);
    }
  }

  @Patch('/:address/account')
  @ApiTags('users')
  @ApiOperation({
    summary: 'Update user account by address',
    description: '유저 계좌번호을 수정합니다.',
  })
  @ApiParam(userAddressParam)
  @Roles(UserRole.USER, UserRole.CREATOR, UserRole.ADMIN)
  async updateUserAccountByAddress(
    @Headers('authorization') authorization: string,
    @Param('address') address: string,
    @Body('accountNumber') accountNumber: string,
    @Body('accountOwner') accountOwner: string,
    @Body('bankName') bankName: string,
  ) {
    const user = await this.authService.getUser(authorization);
    if (user.userAddress !== address) {
      return {
        success: false,
        error: '권한이 없습니다.',
        data: null,
      };
    }
    const res = await this.usersService.updateUserAccountByAddress(
      address,
      accountNumber,
      bankName,
      accountOwner,
    );
    return {
      success: res.success,
      error: res.error,
      data: res.data,
    };
  }

  @Get('/:address/shipping')
  @ApiTags('users')
  @ApiOperation({
    summary: 'Get user shipping info by address',
    description: '유저 배송 정보를 가져옵니다.',
  })
  @ApiParam(userAddressParam)
  @Roles(UserRole.USER, UserRole.CREATOR, UserRole.ADMIN)
  async getShippingByAddress(
    @Headers('authorization') authorization: string,
    @Param('address') address: string,
  ) {
    const user = await this.authService.getUser(authorization);
    if (user.userAddress !== address) {
      return {
        success: false,
        error: '권한이 없습니다.',
        data: null,
      };
    }
    const res = await this.usersService.getShippingByAddress(address);
    return {
      success: res.success,
      error: res.error,
      data: res.data,
    };
  }

  @Patch('/:address/shipping')
  @ApiTags('users')
  @ApiOperation({
    summary: 'Update user shipping info by address',
    description: '유저 배송 정보를 수정합니다.',
  })
  @ApiParam(userAddressParam)
  @Roles(UserRole.USER, UserRole.CREATOR, UserRole.ADMIN)
  async updateUserAddressByAddress(
    @Headers('authorization') authorization: string,
    @Param('address') address: string,
    @Body('name') name: string,
    @Body('phoneNumber') phoneNumber: string,
    @Body('postCode') postCode: string,
    @Body('mainAddress') mainAddress: string,
    @Body('detailAddress') detailAddress: string,
  ) {
    const user = await this.authService.getUser(authorization);
    if (user.userAddress !== address) {
      return {
        success: false,
        error: '권한이 없습니다.',
        data: null,
      };
    }
    const res = await this.usersService.updateUserAddressByAddress(
      address,
      name,
      phoneNumber,
      postCode,
      mainAddress,
      detailAddress,
    );
    return {
      success: res.success,
      error: res.error,
      data: res.data,
    };
  }

  @Delete('/:address')
  @ApiTags('users')
  @ApiOperation({
    summary: 'Delete user by address',
    description: '유저를 삭제합니다.',
  })
  @ApiParam(userAddressParam)
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async deleteUserByAddress(
    @Headers('authorization') authorization: string,
    @Param('address') address: string,
  ) {
    const user = await this.authService.getUser(authorization);
    if (user.userAddress !== address) {
      return {
        success: false,
        error: '권한이 없습니다.',
        data: null,
      };
    }
    // NOTE: wallet에서도 삭제하는 기능이 추가되면 주석 해제
    // await this.usersService.deleteUserByAddress(address);
    return {
      success: true,
      error: null,
      data: null,
    };
  }

  @Get('/:address/settle')
  @ApiTags('users')
  @ApiOperation({
    summary: 'Get user settlement by address',
    description: '유저 정산 정보를 가져옵니다.',
  })
  @ApiParam(userAddressParam)
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async getUserSettlementByAddress(@Param('address') address: string) {
    const res = await this.usersService.getUserSettlementByAddress(address);
    return {
      success: res.success,
      error: res.error,
      data: res.data,
    };
  }

  @Patch('/:address/settle')
  @ApiTags('orders')
  @ApiOperation({
    summary: 'Request settle order',
    description: '정산을 요청합니다.',
  })
  @Roles(UserRole.USER, UserRole.ADMIN, UserRole.CREATOR)
  async settleOrder(
    @Headers('authorization') authorization: string,
    @Param('address') address: string,
  ): Promise<{
    success: boolean;
    error?: string;
    data?: any;
  }> {
    const user = await this.authService.getUser(authorization);
    if (user.userAddress !== address) {
      return {
        success: false,
        error: '권한이 없습니다.',
        data: null,
      };
    }
    const result = await this.usersService.settleOrder(address);
    return {
      success: result.success,
      error: result.error,
      data: result.data,
    };
  }
}
