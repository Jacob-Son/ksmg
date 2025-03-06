import { HttpException, Injectable } from '@nestjs/common';
import { Auction, Bid } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { convertPathToUrl } from 'src/common/services/image';
import { AuctionsGateway } from './auctions.gateway';
import { decryptText } from 'src/common/utils/crypto';

@Injectable()
export class AuctionsService {
  constructor(
    private readonly auctionsGateway: AuctionsGateway,
    private readonly prisma: PrismaService,
  ) {}
  async getAuctions(): Promise<{
    success: boolean;
    error: string | null;
    data: any | null;
  }> {
    try {
      const auctions = await this.prisma.auction.findMany({
        include: {
          images: true,
          auctionLikes: true,
        },
      });
      const filteredAuctions = auctions.map((auction) => {
        const { images, detailImagePath, ...filteredAuction } = auction;
        return {
          ...filteredAuction,
          detailImage: convertPathToUrl(detailImagePath),
          images: images.map((image) => convertPathToUrl(image.imagePath)),
        };
      });
      return {
        success: true,
        error: null,
        data: filteredAuctions,
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: '경매를 가져오는데 실패했습니다.',
        data: null,
      };
    }
  }
  async getOngoingAuctions(): Promise<{
    success: boolean;
    error: string | null;
    data: any | null;
  }> {
    try {
      const auctions = await this.prisma.auction.findMany({
        take: 1,
        orderBy: {
          createdAt: 'desc',
        },
      });
      if (auctions.length === 0) {
        return {
          success: false,
          error: 'auction not found',
          data: null,
        };
      }
      return {
        success: true,
        error: null,
        data: auctions[0].auctionId,
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: '경매를 가져오는데 실패했습니다.',
        data: null,
      };
    }
  }
  async createAuction(auctionData: {
    name: string;
    description: string;
    startPrice: number;
    estimatedPrice: number;
    startTime: Date;
    endTime: Date;
    imagePaths: string[];
    detailImagePath: string;
  }): Promise<{
    success: boolean;
    error: string | null;
    data:
      | (Auction & {
          imageUrls: string[];
        })
      | null;
  }> {
    try {
      const auction = await this.prisma.auction.create({
        data: {
          name: auctionData.name,
          description: auctionData.description,
          startPrice: Number(auctionData.startPrice),
          estimatedPrice: Number(auctionData.estimatedPrice),
          startTime: new Date(auctionData.startTime),
          endTime: new Date(auctionData.endTime),
          originEndTime: new Date(auctionData.endTime),
          detailImagePath: auctionData.detailImagePath,
        },
      });
      const imageUrls: string[] = [];
      for (let i = 0; i < auctionData.imagePaths.length; i++) {
        const res = await this.prisma.auctionImage.create({
          data: {
            auctionId: auction.auctionId,
            imagePath: auctionData.imagePaths[i],
          },
        });
        imageUrls.push(res.imagePath);
      }
      return {
        success: true,
        error: null,
        data: {
          ...auction,
          imageUrls: imageUrls,
        },
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: '경매를 생성하는데 실패했습니다.',
        data: null,
      };
    }
  }

  async getAuctionById(auctionId: number): Promise<{
    success: boolean;
    error: string | null;
    data: any | null;
  }> {
    try {
      const auction = await this.prisma.auction.findUnique({
        where: {
          auctionId: Number(auctionId),
        },
        include: {
          images: true,
          auctionLikes: true,
        },
      });
      if (!auction) {
        return {
          success: false,
          error: 'auction not found',
          data: null,
        };
      }
      const highestBid = await this.prisma.bid.findFirst({
        where: {
          auctionId: auction.auctionId,
        },
        orderBy: {
          price: 'desc',
        },
      });
      const { images, detailImagePath, ...filteredAuction } = auction;
      return {
        success: true,
        error: null,
        data: {
          ...filteredAuction,
          detailImageUrls: convertPathToUrl(detailImagePath),
          imageUrls: images.map((image) => convertPathToUrl(image.imagePath)),
          totalLikeCount: auction.auctionLikes.length,
          highestPrice: highestBid
            ? highestBid.price
            : filteredAuction.startPrice,
          highestBidder: highestBid ? highestBid.userAddress : '',
        },
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: '경매를 가져오는데 실패했습니다.',
        data: null,
      };
    }
  }

  async updateAuction(
    auctionId: number,
    auctionData: {
      name?: string;
      description?: string;
      startPrice?: number;
      estimatedPrice?: number;
      startTime?: Date;
      endTime?: Date;
      imagePaths?: string[];
      detailImagePath?: string;
    },
  ): Promise<{
    success: boolean;
    error: string | null;
    data:
      | (Auction & {
          imageUrls: string[];
        })
      | null;
  }> {
    try {
      if (Object.keys(auctionData).length === 0) {
        return {
          success: false,
          error: '수정할 내용이 없습니다.',
          data: null,
        };
      }
      const currentAuction = await this.prisma.auction.findUnique({
        where: {
          auctionId: Number(auctionId),
        },
      });
      if (!currentAuction) {
        return {
          success: false,
          error: 'auction not found',
          data: null,
        };
      }

      const auction = await this.prisma.auction.update({
        where: {
          auctionId: Number(auctionId),
        },
        data: {
          name: auctionData.name,
          description: auctionData.description,
          startPrice: Number(auctionData.startPrice),
          estimatedPrice: Number(auctionData.estimatedPrice),
          startTime: new Date(auctionData.startTime),
          endTime: new Date(auctionData.endTime),
          detailImagePath: auctionData.detailImagePath,
        },
      });
      if (auctionData.imagePaths) {
        await this.prisma.auctionImage.deleteMany({
          where: {
            auctionId: auctionId,
          },
        });
        for (let i = 0; i < auctionData.imagePaths.length; i++) {
          await this.prisma.auctionImage.create({
            data: {
              auctionId: auction.auctionId,
              imagePath: auctionData.imagePaths[i],
            },
          });
        }
      }
      return {
        success: true,
        error: null,
        data: {
          ...auction,
          imageUrls: auctionData.imagePaths,
        },
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: '경매를 수정하는데 실패했습니다.',
        data: null,
      };
    }
  }

  async deleteAuction(auctionId: number): Promise<{
    success: boolean;
    error: string | null;
    data: null;
  }> {
    const currentAuction = await this.prisma.auction.findUnique({
      where: {
        auctionId: Number(auctionId),
      },
    });
    if (!currentAuction) {
      return {
        success: false,
        error: 'auction not found',
        data: null,
      };
    }
    try {
      await this.prisma.auction.delete({
        where: {
          auctionId: Number(auctionId),
        },
      });
      return {
        success: true,
        error: null,
        data: null,
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: '경매를 삭제하는데 실패했습니다.',
        data: null,
      };
    }
  }

  async getBidsByAuctionId(auctionId: number): Promise<{
    success: boolean;
    error: string | null;
    data: Bid[] | null;
  }> {
    try {
      const bids: any = await this.prisma.bid.findMany({
        where: {
          auctionId: auctionId,
        },
        orderBy: {
          price: 'desc',
        },
      });
      for (let i = 0; i < bids.length; i++) {
        const user = await this.prisma.user.findUnique({
          where: {
            userAddress: bids[i].userAddress,
          },
          select: {
            name: true,
            email: true,
            loginType: true,
          },
        });
        bids[i].userName = await decryptText({
          prisma: this.prisma,
          content: user.name,
        });
        bids[i].userName = bids[i].userName
          .replace(bids[i].userName[1], 'O')
          .slice(0, 4);
      }

      return {
        success: true,
        error: null,
        data: bids,
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: '경매의 비딩 목록을 가져오는데 실패했습니다.',
        data: null,
      };
    }
  }

  async createRapidBid(
    auctionId: number,
    bidData: {
      userAddress: string;
      price: number;
    },
  ): Promise<{
    success: boolean;
    error: string | null;
    data: {
      highestPrice: number;
      highestBidder: string;
    } | null;
  }> {
    try {
      const auction = await this.prisma.auction.findUnique({
        where: {
          auctionId: Number(auctionId),
        },
      });
      if (!auction) {
        return {
          success: false,
          error: 'auction not found',
          data: null,
        };
      }

      const highestBid = await this.prisma.bid.findFirst({
        where: {
          auctionId: auction.auctionId,
        },
        orderBy: {
          price: 'desc',
        },
      });

      // 등록된 비드가 없으면 바로 등록
      if (!highestBid) {
        const res = await this.createBid(auctionId, {
          auctionId: auction.auctionId,
          userAddress: bidData.userAddress,
          price: bidData.price,
        });
        if (!res.success) {
          return res;
        }

        return {
          success: true,
          error: null,
          data: {
            highestPrice: bidData.price,
            highestBidder: bidData.userAddress,
          },
        };
      }

      // 상한가보다 낮으면 실패
      if (highestBid.price > bidData.price) {
        return {
          success: false,
          error: 'highest bid exists',
          data: {
            highestPrice: highestBid.price,
            highestBidder: highestBid.userAddress,
          },
        };
      }

      // 빠른 비드 등록
      const res = await this.createBid(auctionId, {
        auctionId: auction.auctionId,
        userAddress: bidData.userAddress,
        price: bidData.price,
      });
      if (!res.success) {
        return res;
      }

      // 자동 입찰 로직 실행
      await this.autoBid(auction.auctionId);

      // 자동 입찰 후 상한가 측정
      const highestInfo = await this.prisma.bid.findFirst({
        where: {
          auctionId: auction.auctionId,
        },
        orderBy: {
          price: 'desc',
        },
      });

      return {
        success: true,
        error: null,
        data: {
          highestPrice: highestInfo.price,
          highestBidder: highestInfo.userAddress,
        },
      };
    } catch (e) {
      return {
        success: false,
        error: '빠른 비딩을 등록하는데 실패했습니다.',
        data: null,
      };
    }
  }

  async createUpperBid(
    auctionId: number,
    bidData: {
      userAddress: string;
      price: number;
    },
  ): Promise<{
    success: boolean;
    error: string | null;
    data: {
      highestPrice: number;
      highestBidder: string;
    } | null;
  }> {
    try {
      const auction = await this.prisma.auction.findUnique({
        where: {
          auctionId: Number(auctionId),
        },
      });

      if (!auction) {
        return {
          success: false,
          error: 'auction not found',
          data: null,
        };
      }
      // 상한가보다 낮으면 실패
      const highestBid = await this.prisma.bid.findFirst({
        where: {
          auctionId: auction.auctionId,
        },
        orderBy: {
          price: 'desc',
        },
      });

      // 등록된 비드가 없으면 바로 등록
      if (!highestBid) {
        const res = await this.createBid(auctionId, {
          auctionId: auction.auctionId,
          userAddress: bidData.userAddress,
          price: bidData.price,
        });
        if (!res.success) {
          return res;
        }
        return {
          success: true,
          error: null,
          data: {
            highestPrice: bidData.price,
            highestBidder: bidData.userAddress,
          },
        };
      }

      if (highestBid.price >= bidData.price * 1.03) {
        return {
          success: false,
          error: 'highest bid exists',
          data: {
            highestPrice: highestBid.price,
            highestBidder: highestBid.userAddress,
          },
        };
      }

      // 상한가 비드 등록
      await this.prisma.upperBid.upsert({
        where: {
          auctionId_userAddress: {
            auctionId: auction.auctionId,
            userAddress: bidData.userAddress,
          },
        },
        create: {
          auctionId: auction.auctionId,
          userAddress: bidData.userAddress,
          price: bidData.price,
        },
        update: {
          price: bidData.price,
        },
      });

      await this.autoBid(auction.auctionId);

      // 자동 입찰 후 상한가 측정
      const highestInfo = await this.prisma.bid.findFirst({
        where: {
          auctionId: auction.auctionId,
        },
        orderBy: {
          price: 'desc',
        },
      });

      return {
        success: true,
        error: null,
        data: {
          highestPrice: highestInfo.price,
          highestBidder: highestInfo.userAddress,
        },
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: '상한가 비딩을 등록하는데 실패했습니다.',
        data: null,
      };
    }
  }

  async getBidById(bidId: number): Promise<{
    success: boolean;
    error: string | null;
    data: Bid | null;
  }> {
    try {
      const bid = await this.prisma.bid.findUnique({
        where: {
          bidId: Number(bidId),
        },
      });
      return {
        success: true,
        error: null,
        data: bid,
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: '비딩을 가져오는데 실패했습니다.',
        data: null,
      };
    }
  }

  async autoBid(auctionId: number) {
    const currentHightestBid = await this.prisma.bid.findFirst({
      where: {
        auctionId: auctionId,
      },
      orderBy: {
        price: 'desc',
      },
    });
    let _highestPrice = currentHightestBid.price;
    let _highestBidder = currentHightestBid.userAddress;

    const upperBids = await this.prisma.upperBid.findMany({
      where: {
        auctionId: auctionId,
        price: {
          gt: _highestPrice,
        },
      },
    });

    if (upperBids.length === 0) return;

    for (let i = 0; i < upperBids.length; i++) {
      if (upperBids[i].price >= _highestPrice * 1.03) {
        _highestPrice = _highestPrice * 1.03;
        _highestBidder = upperBids[i].userAddress;

        await this.createBid(auctionId, {
          auctionId: auctionId,
          userAddress: _highestBidder,
          price: _highestPrice,
        });
      }
    }
  }

  async getLikeByAuctionId(auctionId: number, userAddress: string) {
    try {
      const auctionLike = await this.prisma.auctionLike.findUnique({
        where: {
          auctionId_userAddress: {
            auctionId: auctionId,
            userAddress: userAddress,
          },
        },
      });
      if (!auctionLike) {
        return {
          success: true,
          error: null,
          data: false,
        };
      } else {
        return {
          success: true,
          error: null,
          data: true,
        };
      }
    } catch (e) {
      console.log(e);
      throw new HttpException(e, 500);
    }
  }

  async likeAuction(auctionId: number, userAddress: string) {
    try {
      const auctionLike = await this.prisma.auctionLike.findUnique({
        where: {
          auctionId_userAddress: {
            auctionId: auctionId,
            userAddress: userAddress,
          },
        },
      });
      if (auctionLike) {
        await this.prisma.auctionLike.delete({
          where: {
            auctionId_userAddress: {
              auctionId: auctionId,
              userAddress: userAddress,
            },
          },
        });
        return {
          success: true,
          error: null,
          data: false,
        };
      } else {
        await this.prisma.auctionLike.create({
          data: {
            auctionId: auctionId,
            userAddress: userAddress,
          },
        });
        return {
          success: true,
          error: null,
          data: true,
        };
      }
    } catch (e) {
      console.log(e);
      throw new HttpException(e, 500);
    }
  }

  async viewAuction(auctionId: number) {
    try {
      await this.prisma.auction.update({
        where: {
          auctionId: auctionId,
        },
        data: {
          totalViewCount: {
            increment: 1,
          },
        },
      });
      return {
        success: true,
        error: null,
        data: true,
      };
    } catch (e) {
      console.log(e);
      throw new HttpException(e, 500);
    }
  }

  async createBid(auctionId: number, bidData: any) {
    try {
      const auction = await this.prisma.auction.findUnique({
        where: {
          auctionId: Number(auctionId),
        },
      });

      if (auction.endTime.getTime() < new Date().getTime()) {
        return {
          success: false,
          error: '경매가 종료되었습니다.',
          data: null,
        };
      }

      const bid = await this.prisma.bid.create({
        data: bidData,
      });

      if (
        auction.endTime.getTime() - bid.updatedAt.getTime() < 1000 * 60 * 5 &&
        auction.endTime.getTime() - auction.originEndTime.getTime() <
          1000 * 60 * 60 * 24 * 7
      ) {
        await this.prisma.auction.update({
          where: {
            auctionId: Number(auctionId),
          },
          data: {
            endTime: new Date(auction.endTime.getTime() + 1000 * 60 * 10),
          },
        });
      }

      this.auctionsGateway.updateBid(auctionId.toString(), bidData);

      return {
        success: true,
        error: null,
        data: null,
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: '비딩을 등록하는데 실패했습니다.',
        data: null,
      };
    }
  }
}
