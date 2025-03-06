import { SaleStatus } from '@prisma/client';

export type SimpleNftType = {
  nftId: number;
  theme: string;
  category?: string;
  collectionAddress: string;
  tokenId: string;
  name: string;
  price?: number | null;
  nftImagePath: string;
  status: SaleStatus;
  nftCreateUnitId: number;
};
