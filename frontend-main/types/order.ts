export enum OrderStatus {
  READY = 'READY',
  PAID = 'PAID',
  CANCEL = 'CANCEL',
  REFUND = 'REFUND',
  CONFIRM = 'CONFIRM',
}

export type IOrder = {
  orderId: number;
  impUid: string;
  orderName: string;
  merchantUid: string;
  paidAmount: number;
  userAddress: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
};

export enum SaleStatus {
  ON_SALE = 'ON_SALE',
  TRADING = 'TRADING',
  SOLD_OUT = 'SOLD_OUT',
  CONFIRM = 'CONFIRM',
  REFUND = 'REFUND',
  SETTLED = 'SETTLED',
  SETTLE_PENDING = 'SETTLE_PENDING',
}

export enum SaleType {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  CREATOR = 'CREATOR',
  OWNER = 'OWNER', // seller이자 creator인경우
}

export type NftSale = {
  nftSaleId: number;
  sellerAddress: string;
  buyerAddress?: string;
  price: number;
  status: SaleStatus;

  createdAt: Date;

  soldAt?: Date;
  confirmAt?: Date;
  refundAt?: Date;

  nftId: number;
  orderId?: number;
  cartId?: number;

  platformFee: number;
  creatorFee: number;
  txHash?: string;
};

export type NftSaleHistory = NftSale & {
  saleType: SaleType;
  settlePrice: number;
  nft: {
    name: string;
    creatorAddress: string;
  };
};
