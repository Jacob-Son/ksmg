import { Injectable } from '@nestjs/common';
import {
  CombineDelivery,
  DeliveryStatus,
  SaleStatus,
  Settle,
  SettleStatus,
  SettleType,
  User,
} from '@prisma/client';
import { BizService } from 'src/biz/biz.service';
import { CombineService } from 'src/combine/combine.service';
import { convertPathToUrl } from 'src/common/services/image';
import { decryptText, encryptText } from 'src/common/utils/crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NftSaleForAdmin } from './type/order';
import { NftsService } from 'src/nfts/nfts.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly bizService: BizService,
    private readonly prisma: PrismaService,
    private readonly combineService: CombineService,
    private readonly nftService: NftsService,
    private readonly userService: UsersService,
  ) {}

  async createBanner(
    imagePath: string,
    mobileImagePath: string,
    link?: string,
  ) {
    try {
      const lastBanner = await this.prisma.banner.findFirst({
        orderBy: {
          order: 'desc',
        },
      });
      await this.prisma.banner.create({
        data: {
          imagePath,
          mobileImagePath,
          link,
          order: lastBanner ? lastBanner.order + 1 : 0,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteBanner(bannerId: string) {
    try {
      await this.prisma.banner.delete({
        where: {
          bannerId: Number(bannerId),
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async updateBannerOrder(bannerInfos: { bannerId: number; order: number }[]) {
    try {
      const promises = bannerInfos.map((bannerInfo) => {
        return this.prisma.banner.update({
          where: {
            bannerId: bannerInfo.bannerId,
          },
          data: {
            order: bannerInfo.order,
          },
        });
      });
      await Promise.all(promises);
    } catch (e) {
      console.log(e);
    }
  }

  async createRecommend(
    profileImagePath: string,
    author: string,
    intro: string,
    description: string,
    backgroundColor: string,
    tokenId: string,
  ) {
    try {
      await this.prisma.recommend.create({
        data: {
          profileImagePath,
          author,
          intro,
          description,
          backgroundColor,
          nft: {
            connect: {
              collectionAddress_tokenId: {
                collectionAddress: '0xtest',
                tokenId: tokenId,
              },
            },
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async updateRecommendOrder(
    recommendInfos: {
      recommendId: number;
      order: number;
    }[],
  ) {
    try {
      const promises = recommendInfos.map((recommendInfo) => {
        return this.prisma.recommend.update({
          where: {
            recommendId: recommendInfo.recommendId,
          },
          data: {
            order: recommendInfo.order,
          },
        });
      });
      await Promise.all(promises);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteRecommend(recommendId: string) {
    try {
      await this.prisma.recommend.delete({
        where: {
          recommendId: Number(recommendId),
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getPlatformFee() {
    try {
      const platformFee = await this.prisma.config.findUnique({
        where: {
          key: 'platformFee',
        },
        select: {
          value: true,
        },
      });
      return platformFee.value;
    } catch (e) {
      console.log(e);
    }
  }

  async updatePlatformFee(platformFee: number) {
    try {
      await this.prisma.config.update({
        where: {
          key: 'platformFee',
        },
        data: {
          value: String(platformFee),
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async hideNftCreateUnit(nftCreateUnitId: string, isHidden: boolean) {
    try {
      await this.prisma.nftCreateUnit.update({
        where: {
          nftCreateUnitId: Number(nftCreateUnitId),
        },
        data: {
          isHidden,
        },
      });

      const rank = await this.prisma.rank.findFirst({
        select: {
          hotRank: true,
          bestRank: true,
        },
      });
      const hotRank = rank.hotRank
        .split(',')
        .map((item) => Number(item))
        .filter((item) => item !== Number(nftCreateUnitId));
      const bestRank = rank.bestRank
        .split(',')
        .map((item) => Number(item))
        .filter((item) => item !== Number(nftCreateUnitId));
      await this.prisma.rank.update({
        where: {
          rankId: 1,
        },

        data: {
          hotRank: hotRank.join(','),
          bestRank: bestRank.join(','),
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteNftCreateUnit(nftCreateUnitId: string) {
    try {
      await this.prisma.nftSale.deleteMany({
        where: {
          nft: {
            nftCreateUnitId: Number(nftCreateUnitId),
          },
        },
      });
      await this.prisma.likeNft.deleteMany({
        where: {
          nft: {
            nftCreateUnitId: Number(nftCreateUnitId),
          },
        },
      });
      await this.prisma.nftAttribute.deleteMany({
        where: {
          NftCreateUnitId: Number(nftCreateUnitId),
        },
      });
      await this.prisma.nft.deleteMany({
        where: {
          nftCreateUnitId: Number(nftCreateUnitId),
        },
      });
      try {
        await this.prisma.nftCreateUnit.delete({
          where: {
            nftCreateUnitId: Number(nftCreateUnitId),
          },
        });
      } catch (e) {
        console.log(e);
      }
      const rank = await this.prisma.rank.findFirst({
        select: {
          hotRank: true,
          bestRank: true,
        },
      });
      const hotRank = rank.hotRank
        .split(',')
        .map((item) => Number(item))
        .filter((item) => item !== Number(nftCreateUnitId));
      const bestRank = rank.bestRank
        .split(',')
        .map((item) => Number(item))
        .filter((item) => item !== Number(nftCreateUnitId));
      if (
        hotRank.join(',') !== rank.hotRank ||
        bestRank.join(',') !== rank.bestRank
      ) {
        await this.prisma.rank.update({
          where: {
            rankId: 1,
          },
          data: {
            hotRank: hotRank.join(','),
            bestRank: bestRank.join(','),
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getNftCreateUnits(page: number) {
    try {
      const count = 12;
      const nftCreateUnits = await this.prisma.nftCreateUnit.findMany({
        skip: (page - 1) * count,
        take: count,
        orderBy: {
          nftCreateUnitId: 'desc',
        },
      });

      const totalCount = await this.prisma.nftCreateUnit.count();
      return {
        data: nftCreateUnits.map((nftCreateUnit) => {
          return {
            ...nftCreateUnit,
            imagePath: convertPathToUrl(nftCreateUnit.imagePath),
          };
        }),
        totalCount,
        totalPage: Math.ceil(totalCount / count),
      };
    } catch (e) {
      console.log(e);
    }
  }

  async getSettle(isSettled: string) {
    try {
      const userMap: {
        [key: string]: (Settle & {
          settledAmount: number;
          user: User;
        })[];
      } = {};
      const settles = await this.prisma.settle.findMany({
        where: {
          status:
            isSettled === 'true' ? SettleStatus.SETTLED : SettleStatus.REQUEST,
        },
        include: {
          user: true,
          nftSale: {
            select: {
              platformFee: true,
              creatorFee: true,
              price: true,
              nft: true,
            },
          },
        },
      });
      for (const settle of settles) {
        if (!userMap[settle.userAddress]) {
          userMap[settle.userAddress] = [];
        }
        const settledAmount =
          (settle.nftSale.price *
            (settle.type === SettleType.SELLER
              ? 100 - settle.nftSale.platformFee - settle.nftSale.creatorFee
              : settle.nftSale.creatorFee)) /
          100;
        userMap[settle.userAddress].push({
          ...settle,
          settledAmount,
        });
      }

      const returnData = [];
      for (const [key, value] of Object.entries(userMap)) {
        const item = value[0];
        const userName = await decryptText({
          prisma: this.prisma,
          content: item.user.name,
        });
        const userPhoneNumber = await decryptText({
          prisma: this.prisma,
          content: item.user.phoneNumber,
        });
        const accountNumber = await decryptText({
          prisma: this.prisma,
          content: item.user.accountNumber,
        });
        const user = {
          ...item.user,
          name: userName,
          phoneNumber: userPhoneNumber,
          accountNumber,
        };
        returnData.push({
          userAddress: key,
          settle: value,
          user,
        });
      }

      return {
        data: returnData,
      };
    } catch (e) {
      console.log(e);
    }
  }

  async getSettleList(settleIds: string[]) {
    try {
      const settle: any = await this.prisma.settle.findMany({
        where: {
          settleId: {
            in: settleIds.map((settleId) => Number(settleId)),
          },
        },
        include: {
          user: true,
          nftSale: {
            select: {
              platformFee: true,
              creatorFee: true,
              price: true,
              nft: true,
            },
          },
        },
      });

      for (const item of settle) {
        const userName = await decryptText({
          prisma: this.prisma,
          content: item.user.name,
        });
        const userPhoneNumber = await decryptText({
          prisma: this.prisma,
          content: item.user.phoneNumber,
        });
        const accountNumber = await decryptText({
          prisma: this.prisma,
          content: item.user.accountNumber,
        });
        const settledAmount =
          (item.nftSale.price *
            (item.type === SettleType.SELLER
              ? 100 - item.nftSale.platformFee - item.nftSale.creatorFee
              : item.nftSale.creatorFee)) /
          100;
        item.user = {
          ...item.user,
          name: userName,
          phoneNumber: userPhoneNumber,
          accountNumber,
        };
        item.settledAmount = settledAmount;
      }

      return {
        data: settle,
      };
    } catch (e) {
      console.log(e);
    }
  }

  async confirmSettle(settleIds: string[]) {
    let currentIdx = 0;
    try {
      for (const settleId of settleIds) {
        await this.confirmSettleOne(settleId);
        currentIdx++;
      }
    } catch (e) {
      for (let i = currentIdx; i < settleIds.length; i++) {
        await this.prisma.settle.update({
          where: {
            settleId: Number(settleIds[i]),
          },
          data: {
            status: SettleStatus.REQUEST,
          },
        });
      }
      console.log(e);
    }
  }

  async confirmSettleOne(settleId: string) {
    await this.prisma.settle.update({
      where: {
        settleId: Number(settleId),
      },
      data: {
        status: SettleStatus.SETTLED,
      },
    });
  }

  async rejectSettle(settleId: string, reason?: string) {
    try {
      const settle = await this.prisma.settle.findUnique({
        where: {
          settleId: Number(settleId),
        },
        include: {
          nftSale: {
            select: {
              nft: {
                select: {
                  name: true,
                },
              },
            },
          },
          user: {
            select: {
              phoneNumber: true,
              name: true,
            },
          },
        },
      });
      const realPhoneNumber = await decryptText({
        prisma: this.prisma,
        content: settle.user.phoneNumber,
      });
      await this.bizService.rejectSettle(realPhoneNumber, {
        reason: reason ? reason : '관리자 거부',
        productName: settle.nftSale.nft.name,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getDelivery() {
    try {
      const deliveries = await this.prisma.combineDelivery.findMany({});

      const returnData = [];

      for (const delivery of deliveries) {
        const nftIds = await this.combineService.getNftIds(
          Number(delivery.combineLogId),
        );
        const bookImages = await this.combineService.extractBookPage(nftIds);
        returnData.push({
          ...delivery,
          bookImages: bookImages.map((bookImage) => {
            return convertPathToUrl(bookImage);
          }),
        });
      }

      return {
        data: returnData,
      };
    } catch (e) {
      console.log(e);
    }
  }

  async updateDelivery(deliveryId: string, data: Partial<CombineDelivery>) {
    try {
      await this.prisma.combineDelivery.update({
        where: {
          combineDeliveryId: Number(deliveryId),
        },
        data: {
          ...data,
        },
      });
      return {
        success: true,
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
      };
    }
  }

  async sendAuctionResult(auctionId: number) {
    try {
      const bids = await this.prisma.bid.findMany({
        where: {
          auctionId,
        },
        orderBy: {
          price: 'desc',
        },
        take: 20,
      });
      for (let i = 0; i < bids.length; i++) {
        const user = await this.prisma.user.findUnique({
          where: {
            userAddress: bids[i].userAddress,
          },
          select: {
            phoneNumber: true,
            email: true,
            name: true,
            loginType: true,
          },
        });
        const realUserName = await decryptText({
          prisma: this.prisma,
          content: user.name,
        });
        const realPhoneNumber = await decryptText({
          prisma: this.prisma,
          content: user.phoneNumber,
        });
        await this.bizService.sendAuctionResult(realPhoneNumber, {
          name: realUserName,
          link: 'https://pickapen.io/auction/' + auctionId,
        });
      }

      return {
        success: true,
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
      };
    }
  }

  async getOrders(
    page: number,
    limit: number,
    startDate?: string,
    endDate?: string,
    nftSaleId?: number,
    buyerAddress?: string,
    sellerAddress?: string,
    tokenId?: string,
    status?: string,
    category?: string,
    nftName?: string,
    buyerName?: string,
    sellerName?: string,
    isDelivery?: boolean,
  ): Promise<{
    data: NftSaleForAdmin[];
    totalCount: number;
    totalPage: number;
  }> {
    try {
      const count = limit;
      const where: any = {
        NOT: {
          status: {
            in: [SaleStatus.ON_SALE, SaleStatus.TRADING],
          },
        },
      };
      if (nftSaleId) {
        where.nftSaleId = nftSaleId;
      }
      if (buyerAddress) {
        where.buyerAddress = buyerAddress;
      }
      if (sellerAddress) {
        where.sellerAddress = sellerAddress;
      }
      if (tokenId) {
        where.nft = {
          tokenId,
        };
      }
      if (category) {
        where.nft = {
          ...where.nft,
          category,
        };
      }
      if (nftName) {
        where.nft = {
          ...where.nft,
          name: {
            contains: nftName,
          },
        };
      }
      if (status) {
        where.status = status;
      }
      if (startDate) {
        where.soldAt = {
          gte: new Date(startDate),
        };
      }
      if (endDate) {
        where.soldAt = {
          ...where?.soldAt,
          lte: new Date(endDate),
        };
      }
      if (isDelivery) {
        where.NOT = {
          buyingDelivery: null,
        };
      }

      if (buyerName) {
        const encryptedName = buyerName
          ? (await encryptText(this.prisma, buyerName)).content
          : '';
        const user = await this.prisma.user.findMany({
          where: {
            name: encryptedName,
          },
          select: {
            userAddress: true,
          },
        });
        where.buyerAddress = {
          in: user.map((item) => item.userAddress),
        };
      }

      if (sellerName) {
        const encryptedName = sellerName
          ? (await encryptText(this.prisma, sellerName)).content
          : '';
        const user = await this.prisma.user.findMany({
          where: {
            name: encryptedName,
          },
          select: {
            userAddress: true,
          },
        });
        where.sellerAddress = {
          in: user.map((item) => item.userAddress),
        };
      }

      const orders = await this.prisma.nftSale.findMany({
        where,
        skip: (page - 1) * count,
        take: count,
        orderBy: {
          soldAt: 'desc',
        },
        include: {
          buyingDelivery: true,
          nft: true,
        },
      });

      const totalCount = await this.prisma.nftSale.count({
        where,
      });

      const formatOrders: NftSaleForAdmin[] = [];

      for (const order of orders) {
        const buyer = await this.userService.getUserByAddress(
          order.buyerAddress,
        );

        const seller = await this.userService.getUserByAddress(
          order.sellerAddress,
        );

        let bookImages = undefined;
        if (order.buyingDelivery) {
          bookImages = await this.nftService.extractBookPage([order.nftId]);
          bookImages = bookImages.map((bookImage) => {
            return convertPathToUrl(bookImage);
          });
        }

        formatOrders.push({
          nftSaleId: order.nftSaleId,
          sellerName: seller?.name,
          buyerName: buyer?.name ?? '탈퇴한 회원',
          seller,
          buyer,
          sellerAddress: order.sellerAddress,
          buyerAddress: order.buyerAddress,
          price: order.price,
          status: order.status,
          soldAt: order.soldAt,
          confirmAt: order.confirmAt,
          nftId: order.nftId,
          tokenId: order.nft.tokenId,
          nftName: order.nft?.name,
          category: order.nft.category,
          orderId: order.orderId,
          cartId: order.cartId,
          delivery: {
            ...order.buyingDelivery,
            bookImages,
          },
          txHash: order.txHash,
        });
      }

      return {
        data: formatOrders,
        totalCount,
        totalPage: Math.ceil(totalCount / count),
      };
    } catch (e) {
      console.log(e);
    }
  }

  async updateNftSaleDeliveryStatus(
    nftSaleId: number,
    status: DeliveryStatus,
  ): Promise<{
    success: boolean;
  }> {
    try {
      await this.prisma.buyingDelivery.update({
        where: {
          nftSaleId,
        },
        data: {
          status,
        },
      });
      return {
        success: true,
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
      };
    }
  }

  async deleteNotValideSale() {
    try {
      const allSale = await this.prisma.nftSale.findMany({
        where: {
          status: SaleStatus.ON_SALE,
        },
        include: {
          nft: true,
        },
      });
      for (const sale of allSale) {
        if (sale.sellerAddress !== sale.nft.ownerAddress) {
          await this.prisma.nftSale.delete({
            where: {
              nftSaleId: sale.nftSaleId,
            },
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getUser(userAddress: string) {
    return await this.userService.getUserByAddress(userAddress);
  }
}
