type NftCreateUnit = {
  nftCreateUnitId: number;
  creatorAddress: string;
  imagePath: string;
  name: string;
  category: string;
  theme: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  creatorFee: number;
};

export type NftStudioUnit = NftCreateUnit & {
  count: number;
  tokenId: number;
};
