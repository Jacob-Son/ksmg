import { Nft, NftAttribute } from '@prisma/client';

export type GetNftResponseData = Nft &
  NftAttribute[] & {
    totalLikeCount: number;
    price: number;
    creatorName: string;
    nftSaleId: number;
    totalNftCount: number;
  };
