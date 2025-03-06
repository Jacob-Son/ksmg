export type IAuction = {
  auctionId: number;
  createdAt: string;
  description: string;
  detailImageUrls: string;
  endTime: string;
  estimatedPrice: number;
  highestBidder: string | null;
  highestPrice: number | null;
  imageUrls: string[];
  startPrice: number;
  startTime: string;
  name: string;
  totalViewCount: number;
  totalLikeCount: number;
  updatedAt: string;
};

export type Bid = {
  bidId: number;
  auctionId: number;
  userAddress: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  userName: string;
};
