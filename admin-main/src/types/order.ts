import { User } from "@/type/user";
import { Shipping } from "./shipping";

export enum OrderStatus {
  READY = "READY",
  PAID = "PAID",
  CANCEL = "CANCEL",
  REFUND = "REFUND",
  CONFIRM = "CONFIRM",
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
  ON_SALE = "ON_SALE",
  TRADING = "TRADING",
  SOLD_OUT = "SOLD_OUT",
  CONFIRM = "CONFIRM",
  REFUND = "REFUND",
  SETTLED = "SETTLED",
  SETTLE_PENDING = "SETTLE_PENDING",
}

export enum SaleType {
  BUYER = "BUYER",
  SELLER = "SELLER",
  CREATOR = "CREATOR",
  OWNER = "OWNER", // seller이자 creator인경우
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

  nftId: number;
  orderId?: number;
  cartId?: number;

  platformFee: number;
  creatorFee: number;
  txHash?: string;
};

export type NftSaleForAdmin = {
  nftSaleId: number;
  sellerName: string;
  sellerAddress: string;
  buyerName?: string;
  buyerAddress?: string;
  price: number;
  status: SaleStatus;

  soldAt?: Date;
  confirmAt?: Date;

  nftId: number;
  tokenId: number;
  nftName: string;
  category: string;

  orderId?: number;
  cartId?: number;

  delivery: Delivery;

  txHash?: string;

  buyer: User & { shippingInfo: Shipping };
  seller: User & { shippingInfo: Shipping };
};

export type Delivery = {
  buyingDeliveryId: number;
  userAddress: string;
  name: string;
  phoneNumber: string;
  postCode: string;
  mainAddress: string;
  detailAddress: string;
  status: DeliveryStatus;
  bookImages?: string[];
};

export enum DeliveryStatus {
  READY,
  CONFIRM,
  DELIVERED,
}

export type NftSaleHistory = NftSale & {
  saleType: SaleType;
  settlePrice: number;
  nft: {
    name: string;
    creatorAddress: string;
  };
};
