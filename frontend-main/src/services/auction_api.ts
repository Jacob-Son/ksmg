import { IApiResponse } from '~/types/api';
import serviceApi from './api';
import { Bid, IAuction } from '~/types/auction';

const getOngoingAuction = async () => {
  const response =
    await serviceApi.get<IApiResponse<IAuction>>(`/auctions/ongoing`);
  return response.data;
};

const getAuction = async (id: string) => {
  const response = await serviceApi.get<IApiResponse<IAuction>>(
    `/auctions/${id}`,
  );
  return response.data;
};

const getBids = async (id: string) => {
  const response = await serviceApi.get<IApiResponse<Bid[]>>(
    `/auctions/${id}/bids`,
  );
  return response.data;
};

const rapidPlaceBid = async (
  id: string,
  userAddress: string,
  price: number,
) => {
  const response = await serviceApi.post<
    IApiResponse<{
      highestPrice: number;
      highestBidder: string;
    }>
  >(`/auctions/${id}/rapid-bid`, {
    userAddress,
    price,
  });
  return response.data;
};

const upperPlaceBid = async (
  id: string,
  userAddress: string,
  price: number,
) => {
  const response = await serviceApi.post<
    IApiResponse<{
      highestPrice: number;
      highestBidder: string;
    }>
  >(`/auctions/${id}/upper-bid`, {
    userAddress,
    price,
  });
  return response.data;
};

const getAuctionLike = async (id: number, userAddress: string) => {
  const response = await serviceApi.get<IApiResponse<boolean>>(
    `/auctions/${id}/like`,
    {
      params: {
        userAddress,
      },
    },
  );
  return response.data;
};

const addAuctionLike = async (id: number, userAddress: string) => {
  const response = await serviceApi.patch<IApiResponse<null>>(
    `/auctions/${id}/like`,
    {
      userAddress,
    },
  );
  return response.data;
};

const addAuctionViewCount = async (id: number) => {
  const response = await serviceApi.patch<IApiResponse<null>>(
    `/auctions/${id}/view`,
  );
  return response.data;
};

export const auctionApi = {
  getAuction,
  getBids,
  rapidPlaceBid,
  upperPlaceBid,
  getAuctionLike,
  addAuctionLike,
  addAuctionViewCount,
  getOngoingAuction,
};
