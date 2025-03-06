export enum SaleStatus {
  ON_SALE = 'ON_SALE',
  TRADING = 'TRADING',
  SOLD_OUT = 'SOLD_OUT',
}

export interface ICartItemProps {
  collectionAddress: string;
  tokenId: string;
  image: string;
  title: string;
  price: number;
  isChecked?: boolean;
  status: SaleStatus;
  nftSaleId: number;
}
