import { Nft } from "./nft";

export type TCombine = {
  combineLogId: number;
  createdAt: Date;
  updatedAt: Date;
  userAddress: string;
  combineDelivery?: CombineDelivery;
  combineMint?: ComeMint;
  combinedNft?: Nft[];
};

export enum DeliveryStatus {
  READY = "READY",
  CONFIRM = "CONFIRM",
  DELIVERED = "DELIVERED",
}

export type CombineDelivery = {
  combineDeliveryId: number;
  userAddress: string;
  phoneNumber: string;
  name: string;
  postCode: string;
  mainAddress: string;
  detailAddress: string;
  createdAt: Date;
  updatedAt: Date;
  combineLogId: number;
  status: DeliveryStatus;
  bookImages: string[];
};

export type ComeMint = {
  comeMintId: number;
  userAddress: string;
  combineLogId: number;
  combinedNftId: number;
  createdAt: Date;
  updatedAt: Date;
};
