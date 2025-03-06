import { SaleType } from '../types/history';

export const getHistoryType = (
  userAddress: string,
  creatorAddress: string,
  sellerAddress: string,
) => {
  if (userAddress === sellerAddress && userAddress === creatorAddress) {
    return SaleType.OWNER;
  }
  if (userAddress === creatorAddress) {
    return SaleType.CREATOR;
  }
  return SaleType.SELLER;
};
