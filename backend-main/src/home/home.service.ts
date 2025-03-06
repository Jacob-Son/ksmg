import { Injectable } from '@nestjs/common';
import { EventType, Recommend, SaleStatus } from '@prisma/client';
import { convertPathToUrl } from 'src/common/services/image';
import { SimpleNftType } from 'src/common/types/nft';
import { NftsService } from 'src/nfts/nfts.service';
import { RankSort } from './type/rank';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomeService {
  constructor(
    private readonly nftService: NftsService,
    private readonly prisma: PrismaService,
  ) {}
  async getBanner() {
    try {
      const banners = await this.prisma.banner.findMany({
        orderBy: {
          order: 'desc',
        },
      });
      const imageFormatedBanners = banners.map((banner) => {
        return {
          ...banner,
          imagePath: convertPathToUrl(banner.imagePath),
          mobileImagePath: convertPathToUrl(banner.mobileImagePath),
        };
      });
      return imageFormatedBanners;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async getHot() {
    try {
      const hotRankString = await this.prisma.rank.findFirst({
        select: {
          hotRank: true,
        },
      });
      if (!hotRankString) {
        return [];
      }
      const hotRank = hotRankString.hotRank
        .split(',')
        .map((item) => Number(item));
      const parsedHot: SimpleNftType[] = [];
      for (let i = 0; i < hotRank.length; i++) {
        const lowestNft = await this.nftService.findLowestPriceNft(hotRank[i]);
        if (!lowestNft) continue;
        const simpleNft = await this.nftService.parseNftToSimpleNftType(
          lowestNft,
          true,
        );
        parsedHot.push(simpleNft);
      }

      return parsedHot;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async getRecommend() {
    try {
      const recommend = await this.prisma.recommend.findMany({
        orderBy: {
          order: 'desc',
        },
        take: 5,
        include: {
          nft: {
            select: {
              nftImagePath: true,
              tokenId: true,
            },
          },
        },
      });
      const parsedRecommend: {
        recommend: Recommend;
        nftImagePath: string;
        tokenId: string;
      }[] = [];
      for (let i = 0; i < recommend.length; i++) {
        const { nft, ...recommendData } = recommend[i];
        parsedRecommend.push({
          recommend: {
            ...recommendData,
            profileImagePath: convertPathToUrl(recommendData.profileImagePath),
          },
          nftImagePath: convertPathToUrl(nft.nftImagePath),
          tokenId: nft.tokenId,
        });
      }
      return parsedRecommend;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async getCurrentEvent() {
    try {
      const currentEvent = await this.prisma.event.findMany({
        where: {
          eventType: EventType.EVENT,
          startDay: {
            lte: new Date(),
          },
          endDay: {
            gte: new Date(),
          },
        },
        take: 4,
      });
      return currentEvent.map((event) => {
        return {
          ...event,
          imagePath: convertPathToUrl(event.imagePath),
        };
      });
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async getCultureEvent() {
    try {
      const cultureEvent = await this.prisma.event.findMany({
        where: {
          eventType: EventType.CULTURE,
          startDay: {
            lte: new Date(),
          },
          endDay: {
            gte: new Date(),
          },
        },
        take: 4,
      });
      return cultureEvent.map((event) => {
        return {
          ...event,
          imagePath: convertPathToUrl(event.imagePath),
        };
      });
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async getBest() {
    try {
      const bestRankString = await this.prisma.rank.findFirst({
        select: {
          bestRank: true,
        },
      });
      if (!bestRankString) {
        return [];
      }
      const bestRank = bestRankString.bestRank
        .split(',')
        .map((item) => Number(item));

      const parsedBest: SimpleNftType[] = [];
      for (let i = 0; i < bestRank.length; i++) {
        const lowestNft = await this.nftService.findLowestPriceNft(bestRank[i]);
        if (!lowestNft) continue;
        const simpleNft = await this.nftService.parseNftToSimpleNftType(
          lowestNft,
          true,
        );
        parsedBest.push(simpleNft);
      }

      return parsedBest;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async getPopularTheme() {
    try {
      const themes = await this.prisma.theme.findMany();

      const sortedThemesByTotal = themes
        .sort((a, b) => {
          return (
            b.like * 0.4 +
            b.view * 0.1 +
            b.sale * 0.5 -
            (a.like * 0.4 + a.view * 0.1 + a.sale * 0.5)
          );
        })
        .map((theme) => {
          return {
            theme: theme.name,
            count: theme.count,
          };
        });

      const sortedThemesByLike = themes
        .sort((a, b) => {
          return b.like - a.like;
        })
        .map((theme) => {
          return {
            theme: theme.name,
            count: theme.count,
          };
        });

      const sortedThemesBySales = themes
        .sort((a, b) => {
          return b.sale - a.sale;
        })
        .map((theme) => {
          return {
            theme: theme.name,
            count: theme.count,
          };
        });

      const sortedThemesByViews = themes
        .sort((a, b) => {
          return b.view - a.view;
        })
        .map((theme) => {
          return {
            theme: theme.name,
            count: theme.count,
          };
        });

      return {
        [RankSort.Total]: sortedThemesByTotal,
        [RankSort.Likes]: sortedThemesByLike,
        [RankSort.Sales]: sortedThemesBySales,
        [RankSort.Views]: sortedThemesByViews,
      };
    } catch (e) {
      console.log(e);
      return {
        [RankSort.Total]: [],
        [RankSort.Likes]: [],
        [RankSort.Sales]: [],
        [RankSort.Views]: [],
      };
    }
  }

  async getRecentSale() {
    try {
      const recentSale = await this.prisma.nftSale.findMany({
        where: {
          status: {
            notIn: [SaleStatus.TRADING, SaleStatus.ON_SALE],
          },
        },
        orderBy: {
          soldAt: 'desc',
        },
        take: 20,
        select: {
          nft: true,
          price: true,
        },
      });
      const parsedRecentSale: SimpleNftType[] = [];
      for (let i = 0; i < recentSale.length; i++) {
        const simpleNft = await this.nftService.parseNftToSimpleNftType(
          recentSale[i].nft,
          false,
        );
        parsedRecentSale.push({
          ...simpleNft,
          // 여기서 가격은 최근에 팔린 가격으로 변경
          price: recentSale[i].price,
        });
      }
      return parsedRecentSale;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}
