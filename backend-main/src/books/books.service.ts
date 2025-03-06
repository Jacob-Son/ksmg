import { Injectable } from '@nestjs/common';
import { SaleStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class BooksService {
  constructor(
    private readonly orderService: OrdersService,
    private readonly prisma: PrismaService,
  ) {}
  async getBookInfo(
    collectionAddress: string,
    tokenId: string,
  ): Promise<{
    success: boolean;
    error: string | null;
    data: {
      bookId: number;
      title: string;
      maxPageNumber: number;
      coverImage: string;
      fullAudioPath?: string;
    } | null;
  }> {
    try {
      const nft = await this.prisma.nft.findUnique({
        where: {
          collectionAddress_tokenId: {
            collectionAddress,
            tokenId,
          },
        },
        select: {
          bookId: true,
          name: true,
          nftImagePath: true,
        },
      });
      const book = await this.prisma.book.findUnique({
        where: {
          bookId: nft.bookId,
        },
        select: {
          bookId: true,
          maxPageNumber: true,
          fullAudioPath: true,
        },
      });
      if (!book) {
        return {
          success: false,
          error: '책 정보를 찾을 수 없습니다.',
          data: null,
        };
      }
      return {
        success: true,
        error: null,
        data: {
          bookId: book.bookId,
          maxPageNumber: book.maxPageNumber,
          title: nft.name,
          coverImage: nft.nftImagePath,
          fullAudioPath: book.fullAudioPath,
        },
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: '책 정보를 가져오는데 실패했습니다.',
        data: null,
      };
    }
  }
  async getBookImage(imagePrefix: string, bookId: number) {
    try {
      const pages = await this.prisma.page.findMany({
        where: {
          bookId,
        },
        orderBy: {
          pageNumber: 'asc',
        },
      });
      return pages.map((p) => `${imagePrefix}/${p.imagePath}`);
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async checkBookOwnership(
    collectionAddress: string,
    tokenId: string,
    userAddress: string,
  ): Promise<boolean> {
    try {
      const nft = await this.prisma.nft.findUnique({
        where: {
          collectionAddress_tokenId: {
            collectionAddress,
            tokenId,
          },
        },
        select: {
          ownerAddress: true,
          creatorAddress: true,
          nftSale: {
            where: {
              buyerAddress: userAddress,
            },
            orderBy: {
              confirmAt: 'desc',
            },
          },
        },
      });

      if (
        nft.ownerAddress === nft.creatorAddress &&
        nft.ownerAddress === userAddress
      ) {
        return true;
      }

      if (nft.nftSale.length > 0) {
        if (
          nft.ownerAddress === userAddress &&
          nft.nftSale[0].status !== SaleStatus.SOLD_OUT
        )
          return true;
      } else {
        if (nft.ownerAddress === userAddress) return true;
      }

      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async checkOrderStatusAndSettle(
    collectionAddress: string,
    tokenId: string,
    userAddress: string,
  ): Promise<boolean> {
    try {
      const nft = await this.prisma.nft.findUnique({
        where: {
          collectionAddress_tokenId: {
            collectionAddress,
            tokenId,
          },
        },
        select: {
          nftSale: {
            where: {
              buyerAddress: userAddress,
            },
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      });
      if (nft.nftSale[0].status === SaleStatus.CONFIRM) return true;

      const res = await this.orderService.confirmOrderStatus(
        nft.nftSale[0].nftSaleId,
      );
      if (!res.success) return false;
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
