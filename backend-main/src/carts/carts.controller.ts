import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { UserRole } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { NftToCartDto } from './dto/nft-to-cart-dto';
import { DeleteNftFromCartDto } from './dto/delete-nft-from-cart-dto';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('carts')
@UseGuards(RolesGuard)
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get('/')
  @ApiTags('carts')
  @ApiOperation({
    summary: 'Get cart',
    description: '장바구니를 가져옵니다.',
  })
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async getCart(@Query('userAddress') userAddress: string) {
    const result = await this.cartsService.getCart(userAddress);

    return {
      success: result.success,
      error: result.error,
      data: result.data,
    };
  }

  @Patch('/')
  @ApiTags('carts')
  @ApiOperation({
    summary: 'Add nft to cart',
    description: 'NFT를 장바구니에 추가합니다.',
  })
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async addNftToCart(@Body() body: NftToCartDto) {
    await this.cartsService.addNftToCart(body.userAddress, body.nftSaleId);

    return {
      success: true,
      error: null,
      data: null,
    };
  }

  @Delete('/')
  @ApiTags('carts')
  @ApiOperation({
    summary: 'Delete nft from cart',
    description: 'NFT를 장바구니에서 삭제합니다.',
  })
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async deleteNftFromCart(@Query() query: DeleteNftFromCartDto) {
    await this.cartsService.deleteNftFromCart(
      Number(query.nftSaleId),
      query.userAddress,
    );

    return {
      success: true,
      error: null,
      data: null,
    };
  }
}
