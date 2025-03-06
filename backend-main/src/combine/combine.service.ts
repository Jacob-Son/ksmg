import { Injectable } from '@nestjs/common';
import { BizService } from 'src/biz/biz.service';
import { convertPathToUrl } from 'src/common/services/image';
import { SimpleNftType } from 'src/common/types/nft';
import { decryptText } from 'src/common/utils/crypto';
import { NftsService } from 'src/nfts/nfts.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CombineService {
  constructor(
    private readonly nftService: NftsService,
    private readonly bizService: BizService,
    private readonly prisma: PrismaService,
  ) {}
  async getCombineDetail(combineId: number) {
    try {
      const combine = await this.prisma.combineLog.findUnique({
        where: {
          combineLogId: Number(combineId),
        },
        include: {
          combineMint: true,
          combineDelivery: true,
        },
      });
      return combine;
    } catch (e) {
      console.log(e);
    }
  }

  async getCombine(userAddress: string, page: number) {
    try {
      const count = 12;
      const res = await this.prisma.combineLog.findMany({
        where: {
          userAddress,
        },
        skip: (page - 1) * count,
        take: count,
        include: {
          combineMint: true,
          combineDelivery: true,
          burnedNfts: true,
        },
      });
      const totalCount = await this.prisma.combineLog.count({
        where: {
          userAddress,
        },
      });

      return {
        totalCount,
        totalPage: Math.ceil(totalCount / count),
        data: res.map((combine) => {
          return {
            ...combine,
            combinedNft: combine.burnedNfts.map((nft) => {
              return {
                ...nft,
                nftImagePath: convertPathToUrl(nft.nftImagePath),
              };
            }),
          };
        }),
      };
    } catch (e) {
      console.log(e);
    }
  }

  async getCombineNfts(userAddress: string) {
    try {
      const ownedNfts = await this.prisma.nft.findMany({
        distinct: ['nftCreateUnitId'],
        where: {
          ownerAddress: userAddress,
          combineMint: null,
          NOT: {
            creatorAddress: userAddress,
          },
          category: '육필 시',
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

      return parsedLikeNfts;
    } catch (e) {
      console.log(e);
    }
  }

  async getNftIds(combineId: number) {
    try {
      const res = await this.prisma.combineLog.findUnique({
        where: {
          combineLogId: combineId,
        },
        select: {
          burnedNfts: {
            select: {
              nftId: true,
            },
          },
        },
      });
      return res.burnedNfts.map((nft) => nft.nftId);
    } catch (e) {
      console.log(e);
    }
  }

  async checkNfts(nftIds: number[], userAddress: string) {
    try {
      //nftIds가 20개인지 체크
      if (nftIds.length !== 20) {
        return {
          success: false,
          error: 'nftIds length is not 20',
          data: null,
        };
      }
      //nftIds가 유저 소유인지 체크
      const nfts = await this.prisma.nft.findMany({
        where: {
          nftId: {
            in: nftIds,
          },
        },
      });
      const nftOwners = nfts.map((nft) => nft.ownerAddress);
      if (nftOwners.some((owner) => owner !== userAddress)) {
        return {
          success: false,
          error: 'nftIds is not user owned',
          data: null,
        };
      }
      //nftIds가 다 다른 nftCreateUnitId인지 체크
      const nftCreateUnitIds = nfts.map((nft) => nft.nftCreateUnitId);
      if (new Set(nftCreateUnitIds).size !== nftCreateUnitIds.length) {
        return {
          success: false,
          error: 'nftIds is not unique',
          data: null,
        };
      }
      return {
        success: true,
        error: null,
        data: null,
      };
    } catch (e) {
      console.log(e);
    }
  }

  async extractBookPage(nftIds: number[]) {
    try {
      const nfts = await this.prisma.burnedNft.findMany({
        where: {
          nftId: {
            in: nftIds,
          },
        },
        select: {
          book: {
            select: {
              pages: true,
            },
          },
        },
      });

      const bookPages = nfts.map((nft) => nft.book.pages).flat();
      return bookPages.map((page) => page.imagePath);
    } catch (e) {
      console.log(e);
    }
  }

  async createCombine(userAddress: string, nftIds: number[]) {
    try {
      const nfts = await this.prisma.nft.findMany({
        where: {
          nftId: {
            in: nftIds,
          },
        },
      });
      if (nfts.length !== 20) {
        return {
          success: false,
          error: 'nftIds length is not 20',
          data: null,
        };
      }
      const res = await this.prisma.combineLog.create({
        data: {
          userAddress,
          burnedNfts: {
            createMany: {
              data: nfts,
            },
          },
        },
      });
      const burnPromises = nfts.map((nft) =>
        this.nftService.burnNft(nft.collectionAddress, nft.tokenId),
      );
      await Promise.all(burnPromises);
      return {
        success: true,
        error: null,
        data: res[0],
      };
    } catch (e) {
      console.log(e);
    }
  }

  async mintCombine(
    combineId: number,
    userAddress: string,
    mintedNftId: number,
  ) {
    try {
      const res = await this.prisma.combineLog.update({
        where: {
          combineLogId: combineId,
        },
        data: {
          userAddress,
          combineMint: {
            create: {
              mintedNftId,
              userAddress,
            },
          },
        },
      });
      return {
        success: true,
        error: null,
        data: res,
      };
    } catch (e) {
      console.log(e);
    }
  }

  async deliveryCombine(
    combineId: number,
    userAddress: string,
    name: string,
    phoneNumber: string,
    postCode: string,
    mainAddress: string,
    detailAddress: string,
  ) {
    try {
      const res = await this.prisma.combineLog.update({
        where: {
          combineLogId: combineId,
        },
        data: {
          userAddress,
          combineDelivery: {
            create: {
              name,
              phoneNumber,
              postCode,
              mainAddress,
              detailAddress,
              userAddress,
            },
          },
        },
      });

      const user = await this.prisma.user.findUnique({
        where: {
          userAddress,
        },
        select: {
          name: true,
          phoneNumber: true,
          email: true,
          loginType: true,
        },
      });

      const realPhoneNumber = await decryptText({
        prisma: this.prisma,
        content: user.phoneNumber,
      });

      const deliveryAddress = await this.prisma.combineDelivery.findUnique({
        where: {
          combineLogId: res.combineLogId,
        },
        select: {
          mainAddress: true,
          detailAddress: true,
        },
      });

      await this.bizService.sendConbineResult(realPhoneNumber, {
        name: user.name + '님',
        deliveryAddress: `${deliveryAddress.mainAddress} ${deliveryAddress.detailAddress}`,
      });

      return {
        success: true,
        error: null,
        data: res,
      };
    } catch (e) {
      console.log(e);
    }
  }
}
