import { Settle, SettleType } from '@prisma/client';

type CalcInputType = Settle & {
  nftSale: {
    creatorFee: number;
    price: number;
    platformFee: number;
  };
};

export const calculateCreatorFee = (settle: CalcInputType) => {
  const multiplier = settle.type === SettleType.SELLER ? -1 : 1;
  return (multiplier * settle.nftSale.creatorFee * settle.nftSale.price) / 100;
};

export const calculatePlatformFee = (settle: CalcInputType) => {
  return settle.type === SettleType.SELLER
    ? -(settle.nftSale.platformFee * settle.nftSale.price) / 100
    : 0;
};

export const calculateSellFee = (settle: CalcInputType) => {
  return settle.type === SettleType.SELLER ? settle.nftSale.price : 0;
};

export const calculateSettlePrice = (settle: CalcInputType) => {
  const creatorFee = calculateCreatorFee(settle);
  const platformFee = calculatePlatformFee(settle);
  const sellerFee = calculateSellFee(settle);
  return sellerFee + creatorFee + platformFee;
};
