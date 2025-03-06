import { IApiResponse } from '~/types/api';
import serviceApi from './api';
import { SimpleNftType } from '~/types/nft';
import { IUser } from '~/types/user';
import { Shipping } from '~/types/shipping';
import { NftSaleHistory } from '~/types/order';

const getOwnedNfts = async (userAddress: string, page?: number) => {
  const response = await serviceApi.get<
    IApiResponse<{
      nfts: SimpleNftType[];
      totalCount: number;
      totalPage: number;
    }>
  >(`/users/${userAddress}/nfts`, {
    params: { page },
  });
  return response.data;
};

const getLikedNfts = async (userAddress: string, page: number) => {
  const response = await serviceApi.get<
    IApiResponse<{
      nfts: SimpleNftType[];
      totalCount: number;
      totalPage: number;
    }>
  >(`/users/${userAddress}/like`, {
    params: { page },
  });
  return response.data;
};

const getUserBuyHistories = async (userAddress: string, page: number) => {
  const response = await serviceApi.get<
    IApiResponse<{
      histories: NftSaleHistory[];
      totalCount: number;
      totalPage: number;
    }>
  >(`/users/${userAddress}/history/buy`, {
    params: { page },
  });
  return response.data;
};

const getUserSellHistories = async (userAddress: string, page: number) => {
  const response = await serviceApi.get<
    IApiResponse<{
      histories: NftSaleHistory[];
      totalCount: number;
      totalPage: number;
    }>
  >(`/users/${userAddress}/history/sell`, {
    params: { page },
  });
  return response.data;
};

const getUserSettleInfo = async (userAddress: string) => {
  const response = await serviceApi.get<IApiResponse<number>>(
    `/users/${userAddress}/settle`,
  );
  return response.data;
};

const requestSettle = async (address: string) => {
  const response = await serviceApi.patch<IApiResponse<null>>(
    `/users/${address}/settle`,
  );
  return response.data;
};

const getUserInfo = async (userAddress: string) => {
  const response = await serviceApi.get<IApiResponse<IUser>>(
    `/users/${userAddress}`,
  );
  return response.data;
};

const updateProfile = async (userAddress: string, profile: FormData) => {
  const response = await serviceApi.patch<IApiResponse<IUser>>(
    `/users/${userAddress}/profile`,
    profile,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

const updateUserAccount = async (
  userAddress: string,
  account: {
    accountNumber: string;
    bankName: string;
    accountOwner: string;
  },
) => {
  const response = await serviceApi.patch<IApiResponse<IUser>>(
    `/users/${userAddress}/account`,
    account,
  );
  return response.data;
};

const getUserShppingInfo = async (userAddress: string) => {
  const response = await serviceApi.get<IApiResponse<Shipping>>(
    `/users/${userAddress}/shipping`,
  );
  return response.data;
};

const updateShippingInfo = async (
  userAddress: string,
  shippingInfo: {
    name: string;
    phoneNumber: string;
    postCode: string;
    mainAddress: string;
    detailAddress: string;
  },
) => {
  const response = await serviceApi.patch<IApiResponse<IUser>>(
    `/users/${userAddress}/shipping`,
    shippingInfo,
  );
  return response.data;
};

const deleteUser = async (userAddress: string) => {
  const response = await serviceApi.delete<IApiResponse<IUser>>(
    `/users/${userAddress}`,
  );
  return response.data;
};

export const userApi = {
  getOwnedNfts,
  getUserBuyHistories,
  getUserSellHistories,
  updateProfile,
  updateUserAccount,
  updateShippingInfo,
  deleteUser,
  getUserInfo,
  getUserShppingInfo,
  getUserSettleInfo,
  requestSettle,
  getLikedNfts,
};
