import { DeliveryStatus, SaleStatus, User } from '@prisma/client';

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
  tokenId: string;
  nftName: string;
  category: string;

  orderId?: number;
  cartId?: number;

  delivery: Delivery & { bookImages: string[] };

  buyer: User;
  seller: User;

  txHash?: string;
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
};
