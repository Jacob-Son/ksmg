import { Injectable } from '@nestjs/common';
import {
  LoginType,
  Prisma,
  SaleStatus,
  SettleStatus,
  SettleType,
  UserRole,
} from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { BizService } from 'src/biz/biz.service';
import { SaleType } from 'src/common/types/history';
import { SimpleNftType } from 'src/common/types/nft';
import { decryptText, encryptText } from 'src/common/utils/crypto';
import { calculateSettlePrice } from 'src/common/utils/fee';
import { getHistoryType } from 'src/common/utils/history';
import { NftsService } from 'src/nfts/nfts.service';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly nftService: NftsService,
    private readonly orderService: OrdersService,
    private readonly bizService: BizService,
    private readonly prisma: PrismaService,
  ) {}
  async getUsers(page: number, searchType: string, searchKeyword: string) {
    try {
      const count = 12;
      let decyptKeyword: string = searchKeyword;

      if (
        (searchType === 'name' || searchType === 'phoneNumber') &&
        searchKeyword !== ''
      ) {
        decyptKeyword = (await encryptText(this.prisma, searchKeyword)).content;
      }

      const condition =
        decyptKeyword?.length > 0
          ? {
              [searchType]: decyptKeyword,
            }
          : undefined;
      const users = await this.prisma.user.findMany({
        where: condition,
        skip: (page - 1) * count,
        take: count,
      });
      const totalCount = await this.prisma.user.count({
        where: condition,
      });
      const totalPage = Math.ceil(totalCount / count);
      const decryptedUsers = await this.decryptUsers(users);
      return {
        users: decryptedUsers,
        totalCount,
        totalPage,
      };
    } catch (e) {
      console.log(e);
      return {
        users: [],
        totalCount: 0,
        totalPage: 0,
      };
    }
  }

  async decryptUsers(users: Prisma.UserUncheckedCreateInput[]) {
    try {
      const decryptedUsers = [];
      for (const user of users) {
        const decryptedName = user.name
          ? await decryptText({
              prisma: this.prisma,
              content: user.name,
            })
          : '';

        const decryptedPhoneNumber = user.phoneNumber
          ? await decryptText({
              prisma: this.prisma,
              content: user.phoneNumber,
            })
          : '';

        const decryptedAccountNumber = user.accountNumber
          ? await decryptText({
              prisma: this.prisma,
              content: user.accountNumber,
            })
          : '';

        decryptedUsers.push({
          ...user,
          name: decryptedName,
          phoneNumber: decryptedPhoneNumber,
          accountNumber: decryptedAccountNumber,
        });
      }
      return decryptedUsers;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async getUserByAddress(address: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { userAddress: address },
        include: {
          shippingInfo: true,
        },
      });
      if (!user) return null;

      return {
        ...user,
        name: user.name
          ? await decryptText({ prisma: this.prisma, content: user.name })
          : '',
        phoneNumber: user.phoneNumber
          ? await decryptText({
              prisma: this.prisma,
              content: user.phoneNumber,
            })
          : '',
        accountNumber: user.accountNumber
          ? await decryptText({
              prisma: this.prisma,
              content: user.accountNumber,
            })
          : '',
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getUserNfts(address: string, page: string) {
    try {
      const count = 12;
      const ownedNfts = await this.prisma.nft.findMany({
        distinct: ['nftCreateUnitId'],
        where: {
          ownerAddress: address,
        },
        skip: (Number(page) - 1) * count,
        take: count,
      });

      const totaNft = await this.prisma.nft.groupBy({
        by: ['nftCreateUnitId'],
        where: {
          ownerAddress: address,
        },
      });

      const parsedLikeNfts: SimpleNftType[] = [];

      for (let i = 0; i < ownedNfts.length; i++) {
        const parsedNft = await this.nftService.parseNftToSimpleNftType(
          ownedNfts[i],
          false,
        );
        parsedLikeNfts.push(parsedNft);
      }

      return {
        nfts: parsedLikeNfts,
        totalCount: totaNft.length,
        totalPage: Math.ceil(totaNft.length / count),
      };
    } catch (e) {
      console.log(e);
      return {
        nfts: [],
        totalCount: 0,
        totalPage: 0,
      };
    }
  }

  async getUserLikeNfts(address: string, page: string) {
    try {
      const count = 12;
      const likeNfts = await this.prisma.nft.findMany({
        distinct: ['nftCreateUnitId'],
        where: {
          likeNfts: {
            some: {
              userAddress: address,
            },
          },
        },
        skip: (Number(page) - 1) * count,
        take: count,
      });
      const parsedLikeNfts: SimpleNftType[] = [];

      for (let i = 0; i < likeNfts.length; i++) {
        const lowestNft = await this.nftService.findLowestPriceNft(
          likeNfts[i].nftCreateUnitId,
        );
        const parsedNft = await this.nftService.parseNftToSimpleNftType(
          lowestNft,
          true,
        );
        parsedLikeNfts.push(parsedNft);
      }

      const totalCount = await this.prisma.nft.count({
        where: {
          likeNfts: {
            some: {
              userAddress: address,
            },
          },
        },
      });

      return {
        nfts: parsedLikeNfts,
        totalCount,
        totalPage: Math.ceil(totalCount / count),
      };
    } catch (e) {
      console.log(e);
      return {
        nfts: [],
        totalCount: 0,
        totalPage: 0,
      };
    }
  }

  async getUserBuyHistories(address: string, page: string) {
    try {
      const count = 12;
      const condition: Prisma.NftSaleWhereInput = {
        buyerAddress: address,
        status: {
          in: [SaleStatus.SOLD_OUT, SaleStatus.CONFIRM],
        },
      };
      const res = await this.prisma.nftSale.findMany({
        where: condition,
        skip: (Number(page) - 1) * count,
        take: count,
        include: {
          nft: {
            select: {
              name: true,
              creatorAddress: true,
            },
          },
        },
        orderBy: {
          soldAt: 'desc',
        },
      });
      const totalCount = await this.prisma.nftSale.count({
        where: condition,
      });

      return {
        histories: res.map((history) => {
          return {
            ...history,
            price: -history.price,
            settlePrice: -history.price,
            historyType: SaleType.BUYER,
            platformFee: (history.platformFee * history.price) / 100,
            creatorFee: (history.creatorFee * history.price) / 100,
          };
        }),
        totalCount,
        totalPage: Math.ceil(totalCount / count),
      };
    } catch (e) {
      console.log(e);
      return {
        histories: [],
        totalCount: 0,
        totalPage: 0,
      };
    }
  }

  async getUserSellHistories(address: string, page: string) {
    try {
      const count = 12;
      const condition: Prisma.NftSaleWhereInput = {
        sellerAddress: address,
        status: {
          in: [SaleStatus.SOLD_OUT, SaleStatus.CONFIRM],
        },
        OR: [
          {
            sellerAddress: address,
          },
          {
            nft: {
              creatorAddress: address,
            },
          },
        ],
      };
      const res = await this.prisma.nftSale.findMany({
        where: condition,
        skip: (Number(page) - 1) * count,
        take: count,
        include: {
          nft: {
            select: {
              name: true,
              creatorAddress: true,
            },
          },
          settles: {
            where: {
              userAddress: address,
            },
          },
        },
        orderBy: {
          soldAt: 'desc',
        },
      });
      const totalCount = await this.prisma.nftSale.count({
        where: condition,
      });

      return {
        histories: res.map((history) => {
          const type = getHistoryType(
            address,
            history.nft.creatorAddress,
            history.sellerAddress,
          );
          const creatorFee =
            ((type === SaleType.SELLER
              ? -1
              : type === SaleType.CREATOR
              ? 1
              : 0) *
              (history.creatorFee * history.price)) /
            100;
          const platformFee =
            type === SaleType.CREATOR
              ? 0
              : -(history.platformFee * history.price) / 100;
          const sellFee = type !== SaleType.CREATOR ? history.price : 0;
          const settlePrice = sellFee + creatorFee + platformFee;

          const onSettle =
            history.settles.length > 0
              ? history.settles[0].status === SettleStatus.REQUEST
                ? 'SETTLE_PENDING'
                : history.settles[0].status === SettleStatus.SETTLED
                ? 'SETTLED'
                : false
              : false;
          return {
            ...history,
            settlePrice,
            platformFee,
            creatorFee,
            historyType: type,
            status: onSettle ? onSettle : history.status,
          };
        }),
        totalCount,
        totalPage: Math.ceil(totalCount / count),
      };
    } catch (e) {
      console.log(e);
      return {
        histories: [],
        totalCount: 0,
        totalPage: 0,
      };
    }
  }

  async updateUserRoleByAddress(
    email: string,
    loginType: LoginType,
    newRole: UserRole,
  ) {
    try {
      await this.prisma.user.update({
        where: { email_loginType: { email, loginType } },
        data: { role: newRole },
      });
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async updateUserProfileByAddress(
    address: string,
    newProfilePath?: string,
    newProfileName?: string,
    newCreatorName?: string,
    newPhoneNumber?: string,
  ) {
    try {
      const updateData: {
        userProfileUrl?: string;
        name?: string;
        creatorName?: string;
        phoneNumber?: string;
      } = {};
      if (newProfilePath) {
        updateData.userProfileUrl = newProfilePath;
      } else {
        updateData.userProfileUrl = '';
      }

      if (newProfileName) {
        const _newProfileName = await encryptText(this.prisma, newProfileName);
        updateData.name = _newProfileName.content;
      }
      if (newCreatorName) {
        updateData.creatorName = newCreatorName;
      }
      if (newPhoneNumber) {
        const _newPhoneNumber = await encryptText(this.prisma, newPhoneNumber);
        updateData.phoneNumber = _newPhoneNumber.content;
      }
      await this.prisma.user.update({
        where: { userAddress: address },
        data: updateData,
      });
      return {
        success: true,
        error: null,
        data: null,
      };
    } catch (e) {
      return {
        success: false,
        error: "Can't update user profile",
        data: null,
      };
    }
  }

  async updateUserAccountByAddress(
    address: string,
    newAccountNumber?: string,
    newBankName?: string,
    newAccountOwner?: string,
  ) {
    try {
      const updateData: {
        accountNumber?: string;
        bankName?: string;
        accountOwner?: string;
      } = {};
      if (newAccountNumber) {
        updateData.accountNumber = (
          await encryptText(this.prisma, newAccountNumber)
        ).content;
      }
      if (newBankName) {
        updateData.bankName = newBankName;
      }
      if (newAccountOwner) {
        updateData.accountOwner = newAccountOwner;
      }
      await this.prisma.user.update({
        where: { userAddress: address },
        data: updateData,
      });
      return {
        success: true,
        error: null,
        data: null,
      };
    } catch (e) {
      return {
        success: false,
        error: "Can't update user account",
        data: null,
      };
    }
  }

  async getShippingByAddress(address: string) {
    try {
      const shippingInfo = await this.prisma.shippingInfo.findUnique({
        where: { userAddress: address },
      });
      return {
        success: true,
        error: null,
        data: shippingInfo,
      };
    } catch (e) {
      return {
        success: false,
        error: "Can't get shipping info",
        data: null,
      };
    }
  }

  async updateUserAddressByAddress(
    address: string,
    name: string,
    phoneNumber: string,
    postCode: string,
    mainAddress: string,
    detailAddress: string,
  ) {
    try {
      const user = await this.prisma.shippingInfo.upsert({
        where: { userAddress: address },
        update: {
          name,
          phoneNumber,
          postCode,
          mainAddress,
          detailAddress,
        },
        create: {
          userAddress: address,
          name,
          phoneNumber,
          postCode,
          mainAddress,
          detailAddress,
        },
      });
      return {
        success: true,
        error: null,
        data: user,
      };
    } catch (e) {
      return {
        success: false,
        error: "Can't update user address",
        data: null,
      };
    }
  }

  async deleteUserByAddress(address: string) {
    try {
      await this.prisma.user.delete({
        where: { userAddress: address },
      });
      return null;
    } catch (e) {
      return e;
    }
  }

  async getUserRole(email: string, loginType: LoginType) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email_loginType: { email, loginType } },
      });
      return user.role;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getUserSettlementByAddress(address: string) {
    try {
      const settleInfos = await this.prisma.settle.findMany({
        where: {
          userAddress: address,
          status: SettleStatus.READY,
        },
        include: {
          nftSale: {
            select: {
              price: true,
              platformFee: true,
              creatorFee: true,
            },
          },
        },
      });

      let totalSettlePrice = 0;
      for (const settle of settleInfos) {
        totalSettlePrice += calculateSettlePrice(settle);
      }
      return {
        success: true,
        error: null,
        data: totalSettlePrice,
      };
    } catch (e) {
      return {
        success: false,
        error: "Can't get user settlement",
        data: null,
      };
    }
  }

  async settleOrder(address: string) {
    try {
      const settles = await this.prisma.settle.findMany({
        where: {
          userAddress: address,
          status: SettleStatus.READY,
        },
        select: {
          settleId: true,
        },
      });

      const settleIds = settles.map((settle) => settle.settleId);
      const result = await this.orderService.requestSettlement({ settleIds });

      const user = await this.prisma.user.findUnique({
        where: { userAddress: address },
        select: {
          phoneNumber: true,
          email: true,
          name: true,
          loginType: true,
        },
      });

      const realUserName = user?.name
        ? await decryptText({ prisma: this.prisma, content: user.name })
        : '';

      const realPhoneNumber = user?.phoneNumber
        ? await decryptText({ prisma: this.prisma, content: user.phoneNumber })
        : '';

      const totalSettlePrice = await this.getTotalSettlePrice(settleIds);

      await this.bizService.sendRequestSettle(realPhoneNumber, {
        userName: realUserName,
        charge: totalSettlePrice,
      });

      if (!result.success) {
        return {
          success: false,
          error: result.error,
          data: null,
        };
      }

      return {
        success: true,
        error: null,
        data: null,
      };
    } catch (e) {
      return {
        success: false,
        error: "Can't settle order",
        data: null,
      };
    }
  }

  async getTotalSettlePrice(settleIds: number[]) {
    try {
      const settle: any = await this.prisma.settle.findMany({
        where: {
          settleId: {
            in: settleIds.map((settleId) => settleId),
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

      let totalSettlePrice = 0;

      for (const item of settle) {
        const settledAmount =
          (item.nftSale.price *
            (item.type === SettleType.SELLER
              ? 100 - item.nftSale.platformFee - item.nftSale.creatorFee
              : item.nftSale.creatorFee)) /
          100;
        totalSettlePrice += settledAmount;
      }

      return totalSettlePrice;
    } catch (e) {
      console.log(e);
    }
  }
}
