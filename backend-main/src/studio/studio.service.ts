import { Injectable } from '@nestjs/common';
import { NftCreateUnit } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { convertPathToUrl } from 'src/common/services/image';
import { WalletService } from 'src/wallet/wallet.service';

@Injectable()
export class StudioService {
  constructor(
    private readonly walletService: WalletService,
    private readonly prisma: PrismaService,
  ) {}
  async getStudioByCreatorAddress(creatorAddress: string, page: number) {
    const count = 12;
    try {
      const artworkArray: (NftCreateUnit & {
        tokenId?: string;
        count?: number;
      })[] = await this.prisma.nftCreateUnit.findMany({
        where: {
          creatorAddress,
        },
        skip: (Number(page) - 1) * count,
        take: count,
      });

      if (artworkArray.length === 0) {
        return {
          success: true,
          error: null,
          data: {
            data: [],
            totalCount: 0,
            totalPage: 0,
          },
        };
      }

      for (let i = 0; i < artworkArray.length; i++) {
        const artwork = artworkArray[i];
        const stock = await this.prisma.nft.count({
          where: {
            nftCreateUnitId: artwork.nftCreateUnitId,
            ownerAddress: creatorAddress,
          },
        });
        const nft = await this.prisma.nft.findFirst({
          where: {
            nftCreateUnitId: artwork.nftCreateUnitId,
            ownerAddress: creatorAddress,
          },
          orderBy: {
            tokenId: 'desc',
          },
          select: {
            tokenId: true,
          },
        });
        artwork.count = stock;
        artwork.imagePath = convertPathToUrl(artwork.imagePath);
        artwork.tokenId = nft?.tokenId ?? null;
      }

      const totalCount = await this.prisma.nftCreateUnit.count({
        where: {
          creatorAddress,
        },
      });
      return {
        success: true,
        error: null,
        data: {
          data: artworkArray,
          totalCount,
          totalPage: Math.ceil(totalCount / count),
        },
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: '스튜디오 정보를 가져오는데 실패했습니다.',
        data: null,
      };
    }
  }

  async setNftPrice(nftCreateUnitId: string, price: number) {
    try {
      const creatorInfo = await this.prisma.nftCreateUnit.update({
        where: {
          nftCreateUnitId: Number(nftCreateUnitId),
        },
        data: {
          price,
        },
      });

      await this.prisma.nftSale.updateMany({
        where: {
          nft: {
            nftCreateUnitId: Number(nftCreateUnitId),
          },
          sellerAddress: creatorInfo.creatorAddress,
        },
        data: {
          price,
        },
      });
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: '가격 설정에 실패했습니다.',
        data: null,
      };
    }

    return {
      success: true,
      error: null,
    };
  }

  async checkCreatorName(creatorName: string) {
    try {
      const creator = await this.prisma.user.findMany({
        where: {
          creatorName,
        },
      });
      if (creator.length !== 0) {
        return {
          success: false,
          error: '이미 존재하는 크리에이터 이름입니다.',
          data: null,
        };
      }
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: '크리에이터 이름 중복 체크에 실패했습니다.',
        data: null,
      };
    }

    return {
      success: true,
      error: null,
    };
  }

  async setCreatorProfile(creatorAddress: string, creatorName: string) {
    try {
      await this.prisma.user.update({
        where: {
          userAddress: creatorAddress,
        },
        data: {
          creatorName,
        },
      });
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: '프로필 설정에 실패했습니다.',
        data: null,
      };
    }

    return {
      success: true,
      error: null,
    };
  }

  async isOwned(token: string, createUnitId: string) {
    try {
      const user = await this.walletService.getUser(token);
      const nft = await this.prisma.nftCreateUnit.findUnique({
        where: {
          nftCreateUnitId: Number(createUnitId),
        },
      });
      if (user.userAddress === nft.creatorAddress) {
        return {
          data: user.userAddress,
          result: true,
        };
      }
      return {
        data: null,
        result: false,
      };
    } catch (e) {
      console.log(e);
      return {
        data: null,
        result: false,
      };
    }
  }

  async deleteNft(createUnitId: string, creatorAddress: string) {
    try {
      await this.prisma.nftSale.deleteMany({
        where: {
          nft: {
            nftCreateUnitId: Number(createUnitId),
            ownerAddress: creatorAddress,
          },
        },
      });
      await this.prisma.nft.deleteMany({
        where: {
          nftCreateUnitId: Number(createUnitId),
          ownerAddress: creatorAddress,
        },
      });
      const isNft = await this.prisma.nft.findFirst({
        where: {
          nftCreateUnitId: Number(createUnitId),
        },
      });
      if (!isNft) {
        await this.prisma.nftCreateUnit.delete({
          where: {
            nftCreateUnitId: Number(createUnitId),
          },
        });
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
        .filter((item) => item !== Number(createUnitId));
      const bestRank = rank.bestRank
        .split(',')
        .map((item) => Number(item))
        .filter((item) => item !== Number(createUnitId));
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
      return {
        success: false,
        error: 'NFT 삭제에 실패했습니다.',
        data: null,
      };
    }
    return {
      success: true,
      error: null,
    };
  }
}
