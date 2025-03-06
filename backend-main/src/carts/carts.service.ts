import { Injectable } from '@nestjs/common';
import { convertPathToUrl } from 'src/common/services/image';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async getCart(userAddress: string) {
    try {
      const cart = await this.prisma.cart.findUnique({
        where: {
          userAddress,
        },
      });
      if (!cart) {
        await this.prisma.cart.create({
          data: {
            userAddress,
          },
        });
        return {
          success: true,
          error: null,
          data: [],
        };
      }
      const cartItems = await this.prisma.cartItem.findMany({
        where: {
          cartId: cart.cartId,
          nftSale: {
            status: 'ON_SALE',
          },
        },
        include: {
          nftSale: {
            include: {
              nft: true,
            },
          },
        },
      });
      return {
        success: true,
        error: null,
        data: cartItems.map(({ nftSale: saleInfo }) => ({
          collectionAddress: saleInfo.nft.collectionAddress,
          tokenId: saleInfo.nft.tokenId,
          image: convertPathToUrl(saleInfo.nft.nftImagePath),
          title: saleInfo.nft.name,
          status: saleInfo.status,
          price: saleInfo.price,
          nftSaleId: saleInfo.nftSaleId,
        })),
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: '카트 정보를 가져오는데 실패했습니다.',
        data: null,
      };
    }
  }

  async addNftToCart(userAddress: string, nftSaleId: number) {
    try {
      const cart = await this.prisma.cart.findUnique({
        where: {
          userAddress,
        },
      });

      if (!cart) {
        await this.prisma.cart.create({
          data: {
            userAddress,
          },
        });
      }

      const isExist = await this.prisma.cartItem.findFirst({
        where: {
          cartId: cart.cartId,
          nftSaleId,
        },
      });
      if (isExist) {
        return {
          success: true,
          error: null,
          data: null,
        };
      }

      const cartNft = await this.prisma.cartItem.create({
        data: {
          cart: {
            connect: {
              userAddress,
            },
          },
          nftSale: {
            connect: {
              nftSaleId,
            },
          },
        },
      });

      return {
        success: true,
        error: null,
        data: cartNft,
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: '카트에 NFT를 추가하는데 실패했습니다.',
        data: null,
      };
    }
  }

  async deleteNftFromCart(nftSaleId: number, userAddress: string) {
    try {
      const cart = await this.prisma.cart.findUnique({
        where: {
          userAddress,
        },
      });

      if (!cart) {
        return {
          success: true,
          error: null,
          data: null,
        };
      }

      const cartNft = await this.prisma.cartItem.delete({
        where: {
          cartId_nftSaleId: {
            cartId: cart.cartId,
            nftSaleId,
          },
        },
      });

      return {
        success: true,
        error: null,
        data: cartNft,
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: '카트에서 NFT를 삭제하는데 실패했습니다.',
        data: null,
      };
    }
  }
}
