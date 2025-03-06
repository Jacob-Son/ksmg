import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SaleStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { DAY } from 'src/common/constant/day';

@Injectable()
export class RankService {
  constructor(private readonly prisma: PrismaService) {}

  async handleBest() {
    try {
      const units = await this.prisma.nftCreateUnit.findMany({
        where: {
          isHidden: false,
        },
      });

      const hotScore: {
        nftCreateUnitId: number;
        score: number;
      }[] = [];
      const bestScore: {
        nftCreateUnitId: number;
        score: number;
      }[] = [];

      for (const unit of units) {
        // 7일간 좋아요 수
        const like = await this.prisma.likeNft.count({
          where: {
            nft: {
              nftCreateUnitId: unit.nftCreateUnitId,
              nftCreateUnit: {
                isHidden: false,
              },
            },
            createdAt: {
              gte: new Date(new Date().getTime() - 7 * DAY),
            },
          },
        });
        // 7일간 판매 수
        const weeklySale = await this.prisma.nftSale.count({
          where: {
            nft: {
              nftCreateUnitId: unit.nftCreateUnitId,
              nftCreateUnit: {
                isHidden: false,
              },
            },
            status: {
              in: [SaleStatus.SOLD_OUT, SaleStatus.CONFIRM],
            },
            createdAt: {
              gte: new Date(new Date().getTime() - 7 * DAY),
            },
          },
        });
        // 30일간 판매 수
        const monthlySale = await this.prisma.nftSale.count({
          where: {
            nft: {
              nftCreateUnitId: unit.nftCreateUnitId,
              nftCreateUnit: {
                isHidden: false,
              },
            },
            status: {
              in: [SaleStatus.SOLD_OUT, SaleStatus.CONFIRM],
            },
            createdAt: {
              gte: new Date(new Date().getTime() - 30 * DAY),
            },
          },
        });
        const hotScoreValue = like * 0.6 + weeklySale * 0.4;

        const isHotSale = await this.prisma.nftSale.findFirst({
          where: {
            nft: {
              nftCreateUnitId: unit.nftCreateUnitId,
              nftCreateUnit: {
                isHidden: false,
              },
            },
            status: {
              in: [SaleStatus.ON_SALE],
            },
          },
        });
        if (isHotSale) {
          hotScore.push({
            nftCreateUnitId: unit.nftCreateUnitId,
            score: hotScoreValue,
          });
        }

        const bestScoreValue = monthlySale;
        bestScore.push({
          nftCreateUnitId: unit.nftCreateUnitId,
          score: bestScoreValue,
        });
      }
      const hot = hotScore.map((item) => item.nftCreateUnitId).slice(0, 20);
      const hotString = hot.join(',');
      const best = bestScore.map((item) => item.nftCreateUnitId).slice(0, 20);
      const bestString = best.join(',');

      await this.prisma.rank.upsert({
        where: {
          rankId: 1,
        },
        update: {
          hotRank: hotString,
          bestRank: bestString,
        },
        create: {
          hotRank: hotString,
          bestRank: bestString,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'theme rank',
    timeZone: 'Asia/Seoul',
  })
  async handleThemeRank() {
    try {
      const themes = await this.prisma.theme.findMany();
      for (const theme of themes) {
        const nfts = await this.prisma.nft.findMany({
          where: {
            theme: theme.name,
            nftCreateUnit: {
              isHidden: false,
            },
          },
          include: {
            likeNfts: true,
            nftSale: {
              where: {
                NOT: {
                  status: {
                    in: [SaleStatus.TRADING, SaleStatus.ON_SALE],
                  },
                },
              },
            },
          },
        });
        const like = nfts.reduce((acc, cur) => acc + cur.likeNfts.length, 0);
        const view = nfts.reduce((acc, cur) => acc + cur.totalViewCount, 0);
        const sale = nfts.reduce((acc, cur) => acc + cur.nftSale.length, 0);
        const nftCreateUnits = await this.prisma.nftCreateUnit.findMany({
          where: {
            theme: theme.name,
            isHidden: false,
          },
        });
        const count = nftCreateUnits.length;
        await this.prisma.theme.update({
          where: {
            themeId: theme.themeId,
          },
          data: {
            like,
            view,
            sale,
            count,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
}
