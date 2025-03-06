import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  NftType,
  Order,
  OrderStatus,
  SaleStatus,
  SettleStatus,
  SettleType,
} from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { BizService } from 'src/biz/biz.service';
import { decryptText } from 'src/common/utils/crypto';
import { NftsService } from 'src/nfts/nfts.service';
import { GetNftResponseData } from 'src/nfts/type/response';
import { PaymentsService } from 'src/payments/payments.service';
import { WalletService } from 'src/wallet/wallet.service';

@Injectable()
export class OrdersService {
  constructor(
    readonly paymentsService: PaymentsService,
    readonly nftsService: NftsService,
    readonly walletService: WalletService,
    readonly bizService: BizService,
    readonly prisma: PrismaService,
  ) {}

  async getOrder(orderId: number): Promise<{
    success: boolean;
    error?: string;
    data?: Order & {
      nftSales: {
        status: SaleStatus;
        nftSaleId: number;
        price: number;
        nft: GetNftResponseData;
      }[];
    };
  }> {
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          orderId,
        },
        include: {
          nftSales: {
            include: {
              nft: true,
            },
          },
        },
      });

      if (!order) {
        return {
          success: false,
          error: '주문이 존재하지 않습니다.',
          data: null,
        };
      }

      const nftList = [];

      for (const nftSale of order.nftSales) {
        const nft = await this.nftsService.getNft(
          nftSale.nft.collectionAddress,
          nftSale.nft.tokenId,
        );
        nftList.push(nft.data);
      }

      return {
        success: true,
        data: {
          ...order,
          nftSales: order.nftSales.map((nftSale) => {
            return {
              ...nftSale,
              nft: nftList.find(
                (nft) =>
                  nft.collectionAddress === nftSale.nft.collectionAddress &&
                  nft.tokenId === nftSale.nft.tokenId,
              ),
            };
          }),
        },
      };
    } catch (e) {
      return {
        success: false,
        error: "Can't get order",
        data: null,
      };
    }
  }

  async checkPaidOrder(merchantUid: string): Promise<{
    success: boolean;
    error?: string;
    data?: {
      order: Order;
      isPaid: boolean;
    };
  }> {
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          merchantUid,
        },
        include: {
          nftSales: {
            include: {
              nft: true,
            },
          },
        },
      });
      if (!order) {
        return {
          success: false,
          error: '주문이 존재하지 않습니다.',
          data: null,
        };
      }

      const isPaid = order.status === OrderStatus.PAID;

      return {
        success: true,
        data: {
          order: order,
          isPaid,
        },
      };
    } catch (e) {
      await this.prisma.log.create({
        data: {
          name: 'checkPaidOrderError',
          data: JSON.stringify({
            e,
            merchantUid,
          }),
        },
      });
      return {
        success: false,
        error: "Can't check paid order",
        data: null,
      };
    }
  }

  async freeBuyOrder(
    orderId: number,
  ): Promise<{ success: boolean; error?: string; data?: Order }> {
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          orderId,
        },
        include: {
          nftSales: {
            include: {
              nft: true,
            },
          },
        },
      });
      if (!order) {
        return {
          success: false,
          error: '주문이 존재하지 않습니다.',
          data: null,
        };
      }

      if (order.paidAmount !== 0) {
        return {
          success: false,
          error: '결제된 주문이 아닙니다.',
          data: null,
        };
      }

      try {
        await this.completeOrder(order.merchantUid, 'free_' + orderId);

        return {
          success: true,
          data: order,
        };
      } catch (e) {
        return {
          success: false,
          error: "Can't complete order",
          data: null,
        };
      }
    } catch (e) {
      return {
        success: false,
        error: "Can't get order",
        data: null,
      };
    }
  }

  async deleteOrder(
    merchantUid: string,
  ): Promise<{ success: boolean; error?: string; data?: null }> {
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          merchantUid,
        },
        include: {
          nftSales: true,
        },
      });
      if (!order) {
        return {
          success: false,
          error: '주문이 존재하지 않습니다.',
          data: null,
        };
      }

      try {
        await this.changeSaleStatus({
          orderId: order.orderId,
          targetStatus: SaleStatus.ON_SALE,
        });
        await this.prisma.deletedOrder.create({
          data: {
            deletedOrderId: order.orderId,
            merchantUid,
            impUid: order.impUid,
            orderName: order.orderName,
            paidAmount: order.paidAmount,
            userAddress: order.userAddress,
            status: order.status,
            nftSales: JSON.stringify(order.nftSales),
          },
        });

        return {
          success: true,
          data: null,
        };
      } catch (e) {
        return {
          success: false,
          error: "Can't delete order",
          data: null,
        };
      }
    } catch (e) {
      return {
        success: false,
        error: "Can't get order",
        data: null,
      };
    }
  }

  async createOrder(
    userAddress: string,
    merchantUid: string,
    nftSaleIds: number[],
  ) {
    try {
      if (nftSaleIds.length === 0) {
        return {
          success: false,
          error: 'NFT가 존재하지 않습니다.',
          data: null,
        };
      }
      const nftSales = await this.prisma.nftSale.findMany({
        where: {
          nftSaleId: {
            in: nftSaleIds,
          },
        },
        include: {
          nft: true,
        },
      });
      if (nftSales.length === 0) {
        return {
          success: false,
          error: '판매 중인 NFT 중 일부가 존재하지 않습니다.',
          data: null,
        };
      }

      for (const nftSale of nftSales) {
        if (nftSale.status !== SaleStatus.ON_SALE) {
          return {
            success: false,
            error: '판매 중인 NFT가 아닙니다.',
            data: null,
          };
        }
      }

      let nftSalesAmount: number = 0;
      for (const nftSale of nftSales) {
        await this.prisma.nftSale.update({
          where: {
            nftSaleId: nftSale.nftSaleId,
          },
          data: {
            status: SaleStatus.TRADING,
          },
        });
        nftSalesAmount += nftSale.price;
      }

      const orderName =
        nftSales.length === 1
          ? nftSales[0].nft.name
          : nftSales[0].nft.name + ' 외 ' + String(nftSales.length - 1) + '개';

      try {
        const order = await this.prisma.order.create({
          data: {
            user: {
              connect: {
                userAddress,
              },
            },
            orderName,
            merchantUid,
            paidAmount: nftSalesAmount,
            nftSales: {
              connect: nftSaleIds.map((nftSaleId) => ({
                nftSaleId,
              })),
            },
          },
          include: {
            user: true,
          },
        });
        return {
          success: true,
          error: null,
          data: order,
        };
      } catch (e) {
        console.log(e);
        await this.prisma.nftSale.updateMany({
          where: {
            nftSaleId: {
              in: nftSaleIds,
            },
          },
          data: {
            status: SaleStatus.ON_SALE,
          },
        });
        return {
          success: false,
          error: "Can't create order",
          data: null,
        };
      }
    } catch (e) {
      return {
        success: false,
        error: "Can't create order",
        data: null,
      };
    }
  }

  async completeOrder(
    merchantUid: string,
    impUid: string,
  ): Promise<{ success: boolean; error?: string; data?: Order }> {
    try {
      const orderInfo = await this.prisma.order.findUnique({
        where: {
          merchantUid,
        },
        include: {
          nftSales: {
            include: {
              nft: true,
            },
          },
        },
      });
      if (!orderInfo) {
        return {
          success: false,
          error: '주문이 존재하지 않습니다.',
          data: null,
        };
      }
      const isCart = await this.prisma.cart.findUnique({
        where: {
          userAddress: orderInfo.userAddress,
        },
      });
      if (isCart) {
        await this.prisma.cartItem.deleteMany({
          where: {
            cartId: isCart.cartId,
            nftSale: {
              nftSaleId: {
                in: orderInfo.nftSales.map((nftSale) => nftSale.nftSaleId),
              },
            },
          },
        });
      }

      try {
        const order = await this.prisma.order.update({
          where: {
            merchantUid,
          },
          data: {
            impUid,
            status: OrderStatus.PAID,
          },
        });
        await this.changeSaleStatus({
          merchantUid,
          targetStatus: SaleStatus.SOLD_OUT,
          buyerAddress: orderInfo.userAddress,
        });
        const nftsInfo = orderInfo.nftSales.map((nftSale) => {
          return {
            collectionAddress: nftSale.nft.collectionAddress,
            tokenId: nftSale.nft.tokenId,
          };
        });
        const txHashList = await this.nftsService.batchTransferNft(
          nftsInfo,
          order.userAddress,
        );
        if (!txHashList.success) {
          await this.changeSaleStatus({
            merchantUid,
            targetStatus: SaleStatus.ON_SALE,
          });
          await this.prisma.order.update({
            where: {
              merchantUid,
            },
            data: {
              status: OrderStatus.READY,
            },
          });
          await this.prisma.nftSale.updateMany({
            where: {
              nftSaleId: {
                in: orderInfo.nftSales.map((nftSale) => nftSale.nftSaleId),
              },
            },
            data: {
              status: SaleStatus.ON_SALE,
            },
          });
          return {
            success: false,
            error: txHashList.error,
            data: null,
          };
        }
        for (let i = 0; i < orderInfo.nftSales.length; i++) {
          await this.prisma.nftSale.update({
            where: {
              nftSaleId: orderInfo.nftSales[i].nftSaleId,
            },
            data: {
              txHash: txHashList.data[i],
            },
          });
        }

        const user = await this.prisma.user.findUnique({
          where: {
            userAddress: orderInfo.userAddress,
          },
          select: {
            phoneNumber: true,
            email: true,
            loginType: true,
          },
        });

        const realPhoneNumber = await decryptText({
          prisma: this.prisma,
          content: user.phoneNumber,
        });

        await this.bizService.sendBuyResult(realPhoneNumber, {
          name: orderInfo.orderName,
        });

        return {
          success: true,
          data: order,
        };
      } catch (e) {
        await this.prisma.log.create({
          data: {
            name: 'completeOrderError',
            data: JSON.stringify(e),
          },
        });
        await this.changeSaleStatus({
          merchantUid,
          targetStatus: SaleStatus.ON_SALE,
        });
        return {
          success: false,
          error: "Can't complete order",
          data: null,
        };
      }
    } catch (e) {
      return {
        success: false,
        error: "Can't complete order",
        data: null,
      };
    }
  }

  async refundOrder(
    orderId: string,
    nftSaleId: number,
  ): Promise<{ success: boolean; error?: string; data?: any }> {
    try {
      const orderInfo = await this.getOrder(Number(orderId));
      if (!orderInfo.success) {
        return {
          success: false,
          error: orderInfo.error,
          data: null,
        };
      }
      const impUid = orderInfo.data.impUid;
      const merchantUid = orderInfo.data.merchantUid;

      const isPaid = await this.paymentsService.checkPaid(impUid, merchantUid);
      if (!isPaid) {
        return {
          success: false,
          error: '결제가 완료되지 않았습니다.',
          data: null,
        };
      }
      const order = await this.prisma.order.findUnique({
        where: {
          orderId: Number(orderId),
        },
        select: {
          nftSales: true,
        },
      });
      if (!order) {
        return {
          success: false,
          error: '주문이 존재하지 않습니다.',
          data: null,
        };
      }

      const nftSale = await this.prisma.nftSale.findUnique({
        where: {
          nftSaleId,
        },
        include: {
          nft: true,
        },
      });

      if (nftSale.status !== SaleStatus.SOLD_OUT) {
        return {
          success: false,
          error: '판매 중인 NFT가 아닙니다.',
          data: null,
        };
      }
      const amount = order.nftSales.find(
        (nft) => nft.nftSaleId === nftSaleId,
      ).price;

      try {
        await this.prisma.refundedNftSale.create({
          data: {
            nftSaleId: nftSaleId,
            sellerAddress: nftSale.sellerAddress,
            buyerAddress: nftSale.buyerAddress,
            price: nftSale.price,
            soldAt: nftSale.soldAt,
            nftId: nftSale.nftId,
            orderId: Number(orderId),
            platformFee: nftSale.platformFee,
            creatorFee: nftSale.creatorFee,
          },
        });
        const saleInfo = await this.prisma.nftSale.update({
          where: {
            nftSaleId,
          },
          data: {
            buyerAddress: null,
            soldAt: null,
            status: SaleStatus.ON_SALE,
          },
        });
        await this.prisma.nft.update({
          where: {
            nftId: saleInfo.nftId,
          },
          data: {
            ownerAddress: saleInfo.sellerAddress,
          },
        });
        if (amount > 0) {
          const refundResult = await this.paymentsService.refundPayment(
            impUid,
            merchantUid,
            amount,
          );
          if (!refundResult) {
            return {
              success: false,
              error: '환불에 실패했습니다. 고객센터에 문의하세요',
              data: null,
            };
          }
        }
        const user = await this.prisma.user.findUnique({
          where: {
            userAddress: nftSale.buyerAddress,
          },
          select: {
            phoneNumber: true,
            email: true,
            loginType: true,
          },
        });

        const realPhoneNumber = await decryptText({
          prisma: this.prisma,
          content: user.phoneNumber,
        });
        await this.bizService.sendRefundResult(realPhoneNumber, {
          name: nftSale.nft.name,
          amount,
        });
        return {
          success: true,
          data: {
            ...order,
            nftSales: [saleInfo],
          },
        };
      } catch (e) {
        await this.prisma.log.create({
          data: {
            name: 'refundOrderError',
            data: JSON.stringify(e),
          },
        });
        return {
          success: false,
          error: "Can't refund order",
          data: null,
        };
      }
    } catch (e) {
      await this.prisma.log.create({
        data: {
          name: 'refundOrderError',
          data: JSON.stringify(e),
        },
      });
      return {
        success: false,
        error: "Can't refund order",
        data: null,
      };
    }
  }

  async confirmOrder(orderId: string, nftSaleId: number) {
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          orderId: Number(orderId),
        },
        select: {
          nftSales: true,
          userAddress: true,
          orderName: true,
        },
      });
      if (!order) {
        return {
          success: false,
          error: '주문이 존재하지 않습니다.',
          data: null,
        };
      }

      const nftSale = await this.prisma.nftSale.findUnique({
        where: {
          nftSaleId,
        },
      });

      if (nftSale.status !== SaleStatus.SOLD_OUT) {
        return {
          success: false,
          error: '판매 중인 NFT가 아닙니다.',
          data: null,
        };
      }
      try {
        const res = await this.confirmOrderStatus(nftSaleId);
        return {
          success: res.success,
          data: res.data,
          error: res.error,
        };
      } catch (e) {
        return {
          success: false,
          error: "Can't confirm order",
          data: null,
        };
      }
    } catch (e) {
      return {
        success: false,
        error: "Can't confirm order",
        data: null,
      };
    }
  }

  async confirmOrderStatus(nftSaleId: number) {
    const nftSale = await this.prisma.nftSale.findUnique({
      where: {
        nftSaleId,
      },
      select: {
        sellerAddress: true,
        buyerAddress: true,
        creatorFee: true,
        price: true,
        nft: {
          select: {
            creatorAddress: true,
            collectionAddress: true,
            nftId: true,
            type: true,
            tokenId: true,
            name: true,
          },
        },
      },
    });
    const requiredNft = await this.nftsService.checkDeliverRequiredNft(
      nftSale.nft.collectionAddress,
      nftSale.nft.tokenId,
    );
    try {
      if (!nftSale) {
        return {
          success: false,
          error: '주문이 존재하지 않습니다.',
          data: null,
        };
      }

      let txHash = '';

      if (nftSale.nft.type === NftType.NORMAL) {
        txHash = await this.walletService.transferNft(
          nftSale.buyerAddress,
          nftSale.nft.collectionAddress,
          nftSale.nft.tokenId,
        );
      } else if (nftSale.nft.type === NftType.LAZY) {
        txHash = await this.walletService.mintNft(
          nftSale.nft.creatorAddress,
          nftSale.nft.collectionAddress,
          nftSale.buyerAddress,
          nftSale.nft.tokenId,
          nftSale.creatorFee,
        );
      } else {
        return {
          success: false,
          error: '지원하지 않는 타입입니다.',
          data: null,
        };
      }
      await this.prisma.nft.update({
        where: {
          nftId: nftSale.nft.nftId,
        },
        data: {
          type: NftType.NORMAL,
        },
      });

      if (nftSale.price > 0) {
        await this.prisma.nftSale.update({
          where: {
            nftSaleId,
          },
          data: {
            status: SaleStatus.CONFIRM,
            confirmAt: new Date(),
            txHash,
            settles: {
              createMany: {
                data: [
                  {
                    userAddress: nftSale.sellerAddress,
                    type: SettleType.SELLER,
                  },
                  {
                    userAddress: nftSale.nft.creatorAddress,
                    type: SettleType.CREATOR,
                  },
                ],
              },
            },
          },
        });
      } else {
        await this.prisma.nftSale.update({
          where: {
            nftSaleId,
          },
          data: {
            status: SaleStatus.CONFIRM,
            confirmAt: new Date(),
            txHash,
          },
        });
      }

      const user = await this.prisma.user.findUnique({
        where: {
          userAddress: nftSale.buyerAddress,
        },
        select: {
          phoneNumber: true,
          email: true,
          loginType: true,
          name: true,
          shippingInfo: {
            select: {
              postCode: true,
              mainAddress: true,
              detailAddress: true,
            },
          },
        },
      });

      const realPhoneNumber = await decryptText({
        prisma: this.prisma,
        content: user.phoneNumber,
      });

      const realUserName = await decryptText({
        prisma: this.prisma,
        content: user.name,
      });

      await this.bizService.sendConfirmResult(realPhoneNumber, {
        name: nftSale.nft.name,
      });

      if (requiredNft.isDeliverRequired) {
        try {
          await this.prisma.buyingDelivery.create({
            data: {
              buyingDeliveryId: nftSale.nft.nftId,
              userAddress: nftSale.buyerAddress,
              name: realUserName,
              phoneNumber: realPhoneNumber,
              postCode: user.shippingInfo.postCode,
              mainAddress: user.shippingInfo.mainAddress,
              detailAddress: user.shippingInfo.detailAddress,
              type: requiredNft.type,
              nftSaleId: nftSaleId,
            },
          });
          await this.bizService.sendConbineResult(realPhoneNumber, {
            name: realUserName + '님',
            deliveryAddress:
              user.shippingInfo.mainAddress +
              ' ' +
              user.shippingInfo.detailAddress,
          });
        } catch (e) {
          await this.prisma.log.create({
            data: {
              name: 'buyingDeliveryError',
              data: JSON.stringify({
                nftId: nftSale.nft.nftId,
                userAddress: nftSale.buyerAddress,
              }),
            },
          });
          console.log(e);
        }
      }

      return {
        success: true,
        data: null,
      };
    } catch (e) {
      console.log(e);
      await this.prisma.nft.update({
        where: {
          nftId: nftSale.nft.nftId,
        },
        data: {
          type: NftType.LAZY,
        },
      });
      return {
        success: false,
        error: "Can't confirm order",
        data: null,
      };
    }
  }

  async changeSaleStatus({
    orderId,
    merchantUid,
    targetStatus,
    buyerAddress,
  }: {
    orderId?: number;
    merchantUid?: string;
    targetStatus: SaleStatus;
    buyerAddress?: string;
  }) {
    try {
      if (!orderId && !merchantUid) {
        return {
          success: false,
          error: '주문이 존재하지 않습니다.',
          data: null,
        };
      }
      let order: {
        orderId?: number;
        merchantUid?: string;
        nftSales: {
          nftSaleId: number;
        }[];
      };
      if (!orderId) {
        order = await this.prisma.order.findUnique({
          where: {
            merchantUid,
          },
          select: {
            orderId: true,
            nftSales: {
              select: {
                nftSaleId: true,
              },
            },
          },
        });
        if (!order) {
          return {
            success: false,
            error: '주문이 존재하지 않습니다.',
            data: null,
          };
        }
        orderId = order.orderId;
      } else if (!merchantUid) {
        order = await this.prisma.order.findUnique({
          where: {
            orderId,
          },
          select: {
            merchantUid: true,
            nftSales: {
              select: {
                nftSaleId: true,
              },
            },
          },
        });
        if (!order) {
          return {
            success: false,
            error: '주문이 존재하지 않습니다.',
            data: null,
          };
        }
        merchantUid = order.merchantUid;
      }

      if (!order) {
        return {
          success: false,
          error: '주문이 존재하지 않습니다.',
          data: null,
        };
      }

      try {
        const updateData = {
          status: targetStatus,
        };
        // if (targetStatus === SaleStatus.ON_SALE) {
        //   updateData['order'] = null;
        // }
        if (targetStatus === SaleStatus.SOLD_OUT) {
          updateData['buyerAddress'] = buyerAddress;
          updateData['soldAt'] = new Date();
        }
        // if (targetStatus === SaleStatus.REFUND) {
        //   updateData['refundAt'] = new Date();
        // }
        if (targetStatus === SaleStatus.CONFIRM) {
          updateData['confirmAt'] = new Date();
        }
        await this.prisma.nftSale.updateMany({
          where: {
            nftSaleId: {
              in: order.nftSales.map((nftSale) => nftSale.nftSaleId),
            },
          },
          data: updateData,
        });
        return {
          success: true,
          data: null,
        };
      } catch (e) {
        return {
          success: false,
          error: "Can't change sale status",
          data: null,
        };
      }
    } catch (e) {
      return {
        success: false,
        error: "Can't change sale status",
        data: null,
      };
    }
  }

  async requestSettlement({ settleIds }: { settleIds: number[] }) {
    try {
      await this.prisma.settle.updateMany({
        where: {
          settleId: {
            in: settleIds,
          },
        },
        data: {
          status: SettleStatus.REQUEST,
        },
      });
      return {
        success: true,
        data: null,
        error: null,
      };
    } catch (e) {
      return {
        success: false,
        data: null,
        error: "Can't request settlement",
      };
    }
  }

  @Cron(CronExpression.EVERY_HOUR, {
    name: 'order cancel',
    timeZone: 'Asia/Seoul',
  })
  async handleOrderCancel() {
    try {
      const orders = await this.prisma.order.findMany({
        where: {
          status: OrderStatus.READY,
          createdAt: {
            lte: new Date(new Date().getTime() - 1000 * 60 * 20),
          },
        },
        select: {
          orderId: true,
          impUid: true,
          merchantUid: true,
          nftSales: {
            select: {
              nftSaleId: true,
            },
          },
        },
      });

      for (const order of orders) {
        try {
          const checkPaid = await this.paymentsService.checkPaid(
            order.impUid,
            order.merchantUid,
          );
          if (checkPaid) {
            continue;
          }
        } catch (e) {}
        try {
          await this.changeSaleStatus({
            orderId: order.orderId,
            targetStatus: SaleStatus.ON_SALE,
          });
          await this.deleteOrder(order.merchantUid);
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_10AM, {
    name: 'order confirm',
    timeZone: 'Asia/Seoul',
  })
  async handleOrderConfirm() {
    const date = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7);
    try {
      const nftSales = await this.prisma.nftSale.findMany({
        where: {
          status: SaleStatus.SOLD_OUT,
          soldAt: {
            lte: date,
          },
        },
        select: {
          nftSaleId: true,
        },
      });
      for (const nftSale of nftSales) {
        await this.confirmOrderStatus(nftSale.nftSaleId);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getOrderUserAddress(orderId: number) {
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          orderId,
        },
        select: {
          userAddress: true,
        },
      });
      return order.userAddress;
    } catch (e) {
      return null;
    }
  }

  async getMerchantUidUserAddress(merchantUid: string) {
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          merchantUid,
        },
        select: {
          userAddress: true,
        },
      });
      return order.userAddress;
    } catch (e) {
      return null;
    }
  }
}
