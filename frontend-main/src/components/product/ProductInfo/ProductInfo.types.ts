import { IAuction } from '~/types/auction';
import { GetNftResponseData } from '~/types/nft';

export interface IProductInfoProps {
  data: Partial<GetNftResponseData> | IAuction;
  children: React.ReactNode;
  nftDetails?: {
    address: string;
    tokenId: number;
    standard: string;
    network: string;
    updatedAt: Date;
    royaltyFee: number;
  };
  transactions?: {
    id: string;
    from: string;
    to: string;
    price: number;
    date: Date;
  }[];
  related?: {
    id: number;
    src: string;
    title: string;
    price: number;
  }[];
}
