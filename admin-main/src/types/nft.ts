export enum NftType {
  LAZY = 'LAZY',
  NORMAL = 'NORMAL',
}

export enum NftStatus {
  NON_SALE = 'NON_SALE',

  ON_SALE = 'ON_SALE',
  TRADING = 'TRADING',
  SOLD_OUT = 'SOLD_OUT',
  CONFIRM = 'CONFIRM',
  SETTLE_PENDING = 'SETTLE_PENDING',
  SETTLED = 'SETTLED',
  REFUND = 'REFUND',
}

export type NftAttribute = {
  nftAttributeId: number;
  collectionAddress: string;
  tokenId: string;
  key: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
  nft: Nft;
};

export type GetNftResponseData = Nft & {
  nftAttributes: NftAttribute[];
  totalLikeCount: number;
  nftSaleId: number;
  creatorName: string;
};

export type Nft = {
  nftId: number;
  creatorAddress: string;
  ownerAddress: string;
  collectionAddress: string;
  tokenId: string;
  numbering: number;

  category: string;
  theme: string;
  name: string;
  description: string;

  totalViewCount: number;
  royalty: number;
  hide: boolean;
  type: NftType;

  price: number;
  status: NftStatus;

  createdAt: Date;
  updatedAt: Date;

  nftImagePath: string;
  nftDetailImagePath?: string;
  detailDescription?: string;

  nftCreateUnitId: number;

  totalLikeCount: number;
};

export type SimpleNftType = {
  nftId: number;
  theme: string;
  category?: string;
  collectionAddress: string;
  tokenId: string;
  name: string;
  nftImagePath: string;

  price: number | null;
  status: NftStatus;
};
