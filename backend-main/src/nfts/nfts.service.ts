import { Injectable } from '@nestjs/common';
import { SaleStatus, Nft, NftType, BuyingDeliveryType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { convertPathToUrl } from 'src/common/services/image';
import { SimpleNftType } from 'src/common/types/nft';
import { FileType, getFileType } from 'src/common/utils/file';
import { randomTokenId } from 'src/common/utils/random';
import { makeTokenName } from 'src/common/utils/token';
import { WalletService } from 'src/wallet/wallet.service';

@Injectable()
export class NftsService {
  constructor(
    private readonly walletService: WalletService,
    private readonly prisma: PrismaService,
  ) {}
  async getNfts(
    pageNumber: number,
    category?: string,
    theme?: string,
    search?: string,
  ): Promise<{
    success: boolean;
    error: string | null;
    data: {
      nfts: SimpleNftType[];
      totalCount: number;
      totalPage: number;
    } | null;
  }> {
    try {
      const whereCondition: any = {
        nftCreateUnit: {
          isHidden: false,
        },
      };

      if (category) {
        whereCondition['category'] = category;
      }
      if (theme) {
        whereCondition['theme'] = theme;
      }
      if (search) {
        whereCondition['name'] = {
          contains: search,
        };
      }

      try {
        const count = 12;

        const nfts = await this.prisma.nft.findMany({
          distinct: ['nftCreateUnitId'],
          where: whereCondition,
          skip: (pageNumber - 1) * count,
          take: count,
          orderBy: {
            createdAt: 'desc',
          },
        });
        const resultData: SimpleNftType[] = [];
        for (let i = 0; i < nfts.length; i++) {
          const lowestNft = await this.findLowestPriceNft(
            nfts[i].nftCreateUnitId,
          );
          const simpleNft = await this.parseNftToSimpleNftType(lowestNft, true);
          resultData.push(simpleNft);
        }

        const nftList = await this.prisma.nft.groupBy({
          by: ['nftCreateUnitId'],
          where: whereCondition,
        });
        const totalNumber = nftList.length;

        return {
          success: true,
          error: null,
          data: {
            nfts: resultData,
            totalCount: totalNumber,
            totalPage: Math.ceil(totalNumber / count),
          },
        };
      } catch (e) {
        console.log(e);
        return {
          success: false,
          error: 'NFT 목록을 가져오는데 실패했습니다.',
          data: null,
        };
      }
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: 'NFT 목록을 가져오는데 실패했습니다.',
        data: null,
      };
    }
  }
  async getSameCreateUnitNfts(
    nftCreateUnitId: number,
    pageNumber: number,
  ): Promise<{
    success: boolean;
    error: string | null;
    data: {
      nfts: SimpleNftType[];
      totalCount: number;
      totalPage: number;
    } | null;
  }> {
    try {
      const count = 12;

      const whereCondition: any = {
        nftCreateUnitId,
        nftCreateUnit: {
          isHidden: false,
        },
      };

      const nfts = await this.prisma.nft.findMany({
        where: whereCondition,
        skip: (pageNumber - 1) * count,
        take: count,
      });
      const resultData: SimpleNftType[] = [];

      for (let i = 0; i < nfts.length; i++) {
        const simpleNft = await this.parseNftToSimpleNftType(nfts[i], true);
        resultData.push(simpleNft);
      }

      const totalNumber = await this.prisma.nft.count({
        where: whereCondition,
      });

      return {
        success: true,
        error: null,
        data: {
          nfts: resultData,
          totalCount: totalNumber,
          totalPage: Math.ceil(totalNumber / count),
        },
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: 'NFT 목록을 가져오는데 실패했습니다.',
        data: null,
      };
    }
  }
  async getNft(collectionAddress: string, tokenId: string) {
    try {
      const nft = await this.prisma.nft.findUnique({
        where: {
          collectionAddress_tokenId: {
            collectionAddress,
            tokenId,
          },
          nftCreateUnit: {
            isHidden: false,
          },
        },
        include: {
          nftCreateUnit: {
            include: {
              nftAttributes: true,
            },
          },
          likeNfts: true,
        },
      });
      if (!nft)
        return {
          success: false,
          error: 'NFT_NOT_FOUND',
          data: null,
        };
      const creator = await this.prisma.user.findUnique({
        where: {
          userAddress: nft.creatorAddress,
        },
        select: {
          creatorName: true,
        },
      });
      const totalNftCount = await this.prisma.nft.count({
        where: {
          nftCreateUnitId: nft.nftCreateUnitId,
        },
      });

      const {
        likeNfts,
        nftImagePath,
        nftDetailImagePath,
        nftCreateUnit,
        ...filteredNft
      } = nft;
      const resultData = {
        ...filteredNft,
        nftImagePath: convertPathToUrl(nftImagePath),
        nftDetailImagePath: convertPathToUrl(nftDetailImagePath),
        nftAttributes: nftCreateUnit.nftAttributes,
        totalLikeCount: likeNfts.length,
        creatorName: creator?.creatorName ?? '',
        totalNftCount,
        preAudioPath: nftCreateUnit?.preAudioPath
          ? `${process.env.S3_PREFIX}/${nftCreateUnit.preAudioPath}`
          : null,
      };

      // 현재 판매중인지 확인
      const currentSale = await this.prisma.nftSale.findFirst({
        where: {
          sellerAddress: nft.ownerAddress,
          nftId: nft.nftId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          price: true,
          nftSaleId: true,
          status: true,
        },
      });

      const pastSale = await this.prisma.nftSale.findFirst({
        where: {
          buyerAddress: nft.ownerAddress,
          nftId: nft.nftId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          price: true,
          nftSaleId: true,
          status: true,
        },
      });

      if (currentSale) {
        resultData['status'] = currentSale.status;
        if (currentSale.status === SaleStatus.ON_SALE) {
          resultData['price'] = currentSale.price;
          resultData['nftSaleId'] = currentSale.nftSaleId;
        }
      } else if (pastSale) {
        resultData['status'] = pastSale.status;
      }

      return {
        success: true,
        error: null,
        data: resultData,
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: "Couldn't find NFT",
        data: null,
      };
    }
  }

  async getSimilarNfts(
    collectionAddress: string,
    tokenId: string,
  ): Promise<{
    success: boolean;
    error: string | null;
    data: {
      nfts: SimpleNftType[];
      isTheme: boolean;
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
      });
      if (!nft)
        return {
          success: false,
          error: 'NFT를 찾을 수 없습니다.',
          data: null,
        };
      const { theme, category } = nft;
      const standard = theme ? { theme } : { category };
      const nfts = await this.prisma.nft.findMany({
        distinct: ['nftCreateUnitId'],
        where: {
          ...standard,
          nftCreateUnit: {
            isHidden: false,
          },
          NOT: {
            nftId: nft.nftId,
          },
        },
        take: 5,
      });
      const resultData: SimpleNftType[] = [];

      for (let i = 0; i < nfts.length; i++) {
        const lowestNft = await this.findLowestPriceNft(
          nfts[i].nftCreateUnitId,
        );
        const simpleNft = await this.parseNftToSimpleNftType(lowestNft, true);
        resultData.push(simpleNft);
      }

      return {
        success: true,
        error: null,
        data: {
          nfts: resultData,
          isTheme: !!theme,
        },
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: 'NFT 목록을 가져오는데 실패했습니다.',
        data: null,
      };
    }
  }

  async checkNftNameDuplicate(nftName: string) {
    try {
      const nft = await this.prisma.nft.findMany({
        where: {
          name: nftName + ' #1',
        },
      });
      return nft.length > 0;
    } catch (e) {
      return {
        success: false,
        error: 'NFT 이름 중복 체크에 실패했습니다.',
        data: null,
      };
    }
  }

  async createNft(
    collectionAddress: string,
    description: string,
    creatorAddress: string,
    nftImages: string[],
    nftDetailImage: string,
    nftDetailDescription: string,
    nftAttributes: {
      key: string;
      value: string;
    }[],
    nftName: string,
    category: string,
    theme: string,
    bookImages: string[],
    totalCount: number,
    price: number,
    royalty: number,
    preAudio?: string,
    fullAudio?: string,
  ) {
    let book: { bookId: number };
    try {
      book = await this.prisma.book.create({
        data: {
          maxPageNumber: bookImages.length,
          pages: {
            createMany: {
              data: bookImages.map((image, idx) => ({
                pageNumber: idx + 1,
                imagePath: image,
              })),
            },
          },
          fullAudioPath: fullAudio,
        },
        select: {
          bookId: true,
        },
      });
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: "Couldn't create book",
        data: null,
      };
    }

    try {
      const nftsData = [...Array.from({ length: totalCount })].map(
        (_, index) => {
          const numbering = index + 1;
          const tokenId = randomTokenId(numbering);
          return {
            tokenId: tokenId,
            collectionAddress,
            description,
            creatorAddress,
            numbering,
            ownerAddress: creatorAddress,
            nftImagePath: nftImages[index % nftImages.length],
            nftDetailImagePath: nftDetailImage,
            detailDescription: nftDetailDescription,
            name: makeTokenName(nftName, numbering),
            category,
            theme,
            bookId: book.bookId,
            royalty,
          };
        },
      );

      const nftResult = await this.prisma.nftCreateUnit.create({
        data: {
          creatorAddress,
          name: nftName,
          category,
          theme,
          price,
          imagePath: nftImages[0],
          nftAttributes: {
            createMany: {
              data: nftAttributes,
            },
          },
          nfts: {
            createMany: {
              data: nftsData,
            },
          },
          preAudioPath: preAudio,
        },
        select: {
          nfts: {
            select: {
              nftId: true,
            },
          },
        },
      });

      const platformFee = (
        await this.prisma.config.findUnique({
          where: {
            key: 'platformFee',
          },
          select: {
            value: true,
          },
        })
      ).value;

      await this.prisma.nftSale.createMany({
        data: nftsData.map((nft, idx) => ({
          sellerAddress: creatorAddress,
          nftId: nftResult.nfts[idx].nftId,
          price,
          creatorFee: royalty,
          platformFee: Number(platformFee),
        })),
      });

      return {
        success: true,
        error: null,
        data: nftResult,
      };
    } catch (e) {
      await this.prisma.book.delete({
        where: {
          bookId: book.bookId,
        },
      });
      console.log(e);
      return {
        success: false,
        error: 'NFT를 생성하는데 실패했습니다.',
        data: null,
      };
    }
  }

  async transferNft(
    collectionAddress: string,
    tokenId: string,
    toAddress: string,
  ) {
    const currentOrder = await this.prisma.nftSale.findMany({
      where: {
        nft: {
          collectionAddress: collectionAddress,
          tokenId: tokenId,
        },
        status: SaleStatus.TRADING,
      },
    });

    if (currentOrder.length > 0) {
      return {
        success: false,
        error: 'NFT_IS_TRADING',
        data: null,
      };
    }
    try {
      const pastNft = await this.prisma.nft.findUnique({
        where: {
          collectionAddress_tokenId: {
            collectionAddress,
            tokenId,
          },
        },
      });
      if (!pastNft) {
        return {
          success: false,
          error: 'NFT_NOT_FOUND',
          data: null,
        };
      }
      try {
        //기존에 등록되어 있는 nftSale있으면
        await this.prisma.nftSale.deleteMany({
          where: {
            status: SaleStatus.ON_SALE,
            nft: {
              collectionAddress: collectionAddress,
              tokenId: tokenId,
            },
          },
        });

        const nft = await this.prisma.nft.update({
          where: {
            collectionAddress_tokenId: {
              collectionAddress,
              tokenId,
            },
          },
          data: {
            ownerAddress: toAddress,
          },
        });

        if (nft.type === NftType.NORMAL) {
          await this.walletService.transferNft(
            collectionAddress,
            tokenId,
            toAddress,
          );
        }
        return {
          success: true,
          error: null,
          data: nft,
        };
      } catch (e) {
        console.log(e);
        return {
          success: false,
          error: "Couldn't transfer NFT",
          data: null,
        };
      }
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: "Couldn't transfer NFT",
        data: null,
      };
    }
  }

  async burnNft(collectionAddress: string, tokenId: string) {
    try {
      const nft = await this.prisma.nft.findUnique({
        where: {
          collectionAddress_tokenId: {
            collectionAddress,
            tokenId,
          },
        },
      });
      if (!nft) {
        return {
          success: false,
          error: 'NFT_NOT_FOUND',
          data: null,
        };
      }
      try {
        await this.prisma.nft.delete({
          where: {
            collectionAddress_tokenId: {
              collectionAddress,
              tokenId,
            },
          },
        });
        if (nft.type === NftType.NORMAL) {
          await this.walletService.burnNft(collectionAddress, tokenId);
        }
        return {
          success: true,
          error: null,
          data: null,
        };
      } catch (e) {}
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: "Couldn't burn NFT",
        data: null,
      };
    }
  }

  async setNftPrice(
    sellerAddress: string,
    collectionAddress: string,
    tokenId: string,
    price: number,
  ) {
    try {
      const nft = await this.prisma.nft.findUnique({
        where: {
          collectionAddress_tokenId: {
            collectionAddress,
            tokenId,
          },
        },
        include: {
          nftCreateUnit: true,
        },
      });
      const currentSale = await this.prisma.nftSale.findFirst({
        where: {
          nftId: nft.nftId,
          status: SaleStatus.ON_SALE,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const platformFee = (
        await this.prisma.config.findUnique({
          where: {
            key: 'platformFee',
          },
          select: {
            value: true,
          },
        })
      ).value;

      if (!currentSale) {
        await this.prisma.nftSale.create({
          data: {
            sellerAddress,
            nft: {
              connect: {
                collectionAddress_tokenId: {
                  collectionAddress,
                  tokenId,
                },
              },
            },
            price,
            creatorFee: nft.nftCreateUnit.creatorFee,
            platformFee: Number(platformFee),
          },
        });
        return {
          success: true,
          error: null,
          data: null,
        };
      } else {
        await this.prisma.nftSale.update({
          where: {
            nftSaleId: currentSale.nftSaleId,
          },
          data: {
            price,
          },
        });
        return {
          success: true,
          error: null,
          data: null,
        };
      }
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: "Couldn't set NFT price",
        data: null,
      };
    }
  }

  async getLike(
    collectionAddress: string,
    tokenId: string,
    userAddress: string,
  ): Promise<boolean> {
    try {
      const likeNft = await this.prisma.likeNft.findUnique({
        where: {
          userAddress_tokenId_collectionAddress: {
            userAddress,
            tokenId,
            collectionAddress,
          },
        },
      });
      return likeNft !== null;
    } catch (e) {
      return false;
    }
  }

  async likeNft(
    collectionAddress: string,
    tokenId: string,
    userAddress: string,
  ) {
    if (!userAddress || !tokenId || !collectionAddress) {
      return {
        success: false,
        error: 'INVALID_INPUT',
        data: null,
      };
    }
    try {
      const likeNft = await this.prisma.likeNft.upsert({
        where: {
          userAddress_tokenId_collectionAddress: {
            userAddress,
            tokenId,
            collectionAddress,
          },
        },
        create: {
          user: {
            connect: {
              userAddress,
            },
          },
          nft: {
            connect: {
              collectionAddress_tokenId: {
                collectionAddress,
                tokenId,
              },
            },
          },
        },
        update: {
          user: {
            connect: {
              userAddress,
            },
          },
          nft: {
            connect: {
              collectionAddress_tokenId: {
                collectionAddress,
                tokenId,
              },
            },
          },
        },
      });
      return {
        success: true,
        error: null,
        data: likeNft,
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: "Couldn't like NFT",
        data: null,
      };
    }
  }

  async unlikeNft(
    collectionAddress: string,
    tokenId: string,
    userAddress: string,
  ) {
    try {
      if (!userAddress || !tokenId || !collectionAddress) {
        return {
          success: false,
          error: 'INVALID_INPUT',
          data: null,
        };
      }
      const likeNft = await this.prisma.likeNft.findUnique({
        where: {
          userAddress_tokenId_collectionAddress: {
            userAddress,
            tokenId,
            collectionAddress,
          },
        },
      });
      if (!likeNft) {
        return {
          success: false,
          error: 'LIKE_NFT_NOT_FOUND',
          data: null,
        };
      }
      try {
        const likeNft = await this.prisma.likeNft.delete({
          where: {
            userAddress_tokenId_collectionAddress: {
              userAddress,
              tokenId,
              collectionAddress,
            },
          },
        });
        return {
          success: true,
          error: null,
          data: likeNft,
        };
      } catch (e) {
        console.log(e);
        return {
          success: false,
          error: "Couldn't unlike NFT",
          data: null,
        };
      }
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: "Couldn't unlike NFT",
        data: null,
      };
    }
  }

  async viewNft(collectionAddress: string, tokenId: string) {
    try {
      const viewNft = await this.prisma.nft.update({
        where: {
          collectionAddress_tokenId: {
            collectionAddress,
            tokenId,
          },
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
        data: viewNft,
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: "Couldn't view NFT",
        data: null,
      };
    }
  }

  makeMetadata(
    name: string,
    description: string,
    attributes: {
      key: string;
      value: string;
    }[],
    website: string,
    image: string,
  ) {
    const attributeArray = [];
    for (let i = 0; i < attributes.length; i++) {
      attributeArray.push({
        trait_type: attributes[i].key,
        value: attributes[i].value,
      });
    }
    const metadata = {
      name,
      description,
      external_url: website,
      attributes: attributeArray,
    };

    if (getFileType(image) === FileType.IMAGE) {
      metadata['image'] = image;
    } else if (getFileType(image) === FileType.VIDEO) {
      metadata['animation_url'] = image;
    }

    return metadata;
  }

  async batchTransferNft(
    nftInfo: {
      collectionAddress: string;
      tokenId: string;
    }[],
    toAddress: string,
  ) {
    const txHashList = [];
    let transferedIndex = 0;
    try {
      for (let i = 0; i < nftInfo.length; i++) {
        await this.prisma.nft.update({
          where: {
            collectionAddress_tokenId: {
              collectionAddress: nftInfo[i].collectionAddress,
              tokenId: nftInfo[i].tokenId,
            },
          },
          data: {
            ownerAddress: toAddress,
          },
        });
        const txHash = await this.walletService.transferNft(
          nftInfo[i].collectionAddress,
          nftInfo[i].tokenId,
          toAddress,
        );
        txHashList.push(txHash);
        transferedIndex++;
      }
      return {
        success: true,
        error: null,
        data: txHashList,
      };
    } catch (e) {
      // rollback
      for (let i = 0; i < transferedIndex; i++) {
        await this.prisma.nft.update({
          where: {
            collectionAddress_tokenId: {
              collectionAddress: nftInfo[i].collectionAddress,
              tokenId: nftInfo[i].tokenId,
            },
          },
          data: {
            ownerAddress: toAddress,
          },
        });
      }

      return {
        success: false,
        error: "Couldn't transfer NFT",
        data: null,
      };
    }
  }

  async parseNftToSimpleNftType(
    nft: Nft,
    isPresent: boolean,
  ): Promise<SimpleNftType> {
    try {
      const { nftImagePath, ...filteredNft } = nft;
      // 현재 판매중인지 확인
      const currentSale = await this.prisma.nftSale.findFirst({
        where: {
          nftId: nft.nftId,
          sellerAddress: nft.ownerAddress,
          status: SaleStatus.ON_SALE,
        },
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          price: true,
          status: true,
        },
      });
      const pastSale = await this.prisma.nftSale.findFirst({
        where: {
          buyerAddress: nft.ownerAddress,
          nftId: nft.nftId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          price: true,
          status: true,
          nft: {
            select: {
              nftCreateUnit: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      let nftCreateUnitName = null;
      if (isPresent) {
        const presentNft = await this.prisma.nft.findUnique({
          where: {
            nftId: nft.nftId,
          },
          select: {
            nftCreateUnit: {
              select: {
                name: true,
              },
            },
          },
        });
        nftCreateUnitName = presentNft.nftCreateUnit.name;
      }
      return {
        nftId: filteredNft.nftId,
        theme: filteredNft.theme,
        category: filteredNft.category,
        collectionAddress: filteredNft.collectionAddress,
        tokenId: filteredNft.tokenId,
        name: isPresent ? nftCreateUnitName : filteredNft.name,
        price: currentSale ? currentSale.price : null,
        nftImagePath: convertPathToUrl(nftImagePath),
        nftCreateUnitId: filteredNft.nftCreateUnitId,
        status: currentSale
          ? currentSale.status
          : pastSale
          ? pastSale.status
          : SaleStatus.ON_SALE,
      };
    } catch (e) {
      console.log(e);
      return {
        nftId: 0,
        theme: '',
        category: '',
        collectionAddress: '',
        tokenId: '',
        name: '',
        price: 0,
        nftImagePath: '',
        nftCreateUnitId: 0,
        status: null,
      };
    }
  }

  async findLowestPriceNft(nftCreateUnitId: number): Promise<Nft | null> {
    try {
      const nft = await this.prisma.nftSale.findFirst({
        where: {
          nft: {
            nftCreateUnitId,
          },
          status: SaleStatus.ON_SALE,
        },
        orderBy: {
          price: 'asc',
        },
        select: {
          nft: true,
        },
      });
      if (!nft) {
        const nft = await this.prisma.nft.findFirst({
          where: {
            nftCreateUnitId,
          },
          orderBy: {
            tokenId: 'asc',
          },
        });
        return nft;
      }
      return nft.nft;
    } catch (e) {
      return null;
    }
  }

  async checkDeliverRequiredNft(
    collectionAddress: string,
    tokenId: string,
  ): Promise<{
    type: BuyingDeliveryType | null;
    isDeliverRequired: boolean;
  }> {
    try {
      const nft = await this.prisma.nft.findUnique({
        where: {
          collectionAddress_tokenId: {
            collectionAddress,
            tokenId,
          },
        },
        include: {
          nftCreateUnit: {
            select: {
              name: true,
            },
          },
        },
      });
      if (nft.type !== NftType.LAZY) {
        return {
          type: null,
          isDeliverRequired: false,
        };
      }

      if (nft.category === '육필 시 노트') {
        return {
          type: BuyingDeliveryType.NOTE,
          isDeliverRequired: true,
        };
      }

      if (nft.nftCreateUnit.name === '산도화') {
        return {
          type: BuyingDeliveryType.COMBINE,
          isDeliverRequired: true,
        };
      }

      return {
        type: null,
        isDeliverRequired: false,
      };
    } catch (e) {
      return {
        type: null,
        isDeliverRequired: false,
      };
    }
  }

  async extractBookPage(nftIds: number[]) {
    try {
      const nfts = await this.prisma.nft.findMany({
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
}
