export interface CreateAuctionRequest {
  title: string;
  description: string;
  startPrice: number;
  estimatedPrice: number;
  startTime: string;
  endTime: string;
  images: File[];
  detailImage: File;
}
