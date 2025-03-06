export type NftCreateUnit = {
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
  isHidden: boolean;
};
