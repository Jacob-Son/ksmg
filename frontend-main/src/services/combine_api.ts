import { IApiResponse } from '~/types/api';
import serviceApi from './api';
import { TCombine } from '~/types/combine';
import { SimpleNftType } from '~/types/nft';

const getCombine = async (userAddress: string, page: string) => {
  const response = await serviceApi.get<
    IApiResponse<{
      totalCount: number;
      totalPage: number;
      data: TCombine[];
    }>
  >(`/combine/user/${userAddress}`, {
    params: {
      page,
    },
  });
  return response.data;
};

const getCombineDetail = async (combineId: number) => {
  const response = await serviceApi.get<IApiResponse<TCombine>>(
    `/combine/${combineId}`,
  );
  return response.data;
};

const getCombineNfts = async (userAddress: string) => {
  const response = await serviceApi.get<IApiResponse<SimpleNftType[]>>(
    `/combine/nfts/${userAddress}`,
  );
  return response.data;
};

const createCombine = async (userAddress: string, nftIds: number[]) => {
  const response = await serviceApi.post<IApiResponse<TCombine>>(`/combine`, {
    userAddress,
    nftIds,
  });
  return response.data;
};

const mintCombine = async (
  combineId: number,
  {
    userAddress,
    collectionAddress,
    description,
    name,
    nftImages,
    nftDetailImage,
    nftDetailDescription,
    price,
    royalty,
  }: {
    userAddress: string;
    collectionAddress: string;
    description: string;
    name: string;
    nftImages: string[];
    nftDetailImage: string;
    nftDetailDescription: string;
    price: number;
    royalty: number;
  },
) => {
  const response = await serviceApi.post<IApiResponse<{ nftId: number }>>(
    `/combine/${combineId}/mint`,
    {
      userAddress,
      collectionAddress,
      description,
      name,
      nftImages,
      nftDetailImage,
      nftDetailDescription,
      price,
      royalty,
    },
  );
  return response.data;
};

const deliveryCombine = async (
  combineId: number,
  {
    userAddress,
    name,
    phoneNumber,
    postCode,
    mainAddress,
    detailAddress,
  }: {
    userAddress: string;
    phoneNumber: string;
    name: string;
    postCode: string;
    mainAddress: string;
    detailAddress: string;
  },
) => {
  const response = await serviceApi.post<IApiResponse<null>>(
    `/combine/${combineId}/delivery`,
    {
      userAddress,
      name,
      phoneNumber,
      postCode,
      mainAddress,
      detailAddress,
    },
  );
  return response.data;
};

export const combineApi = {
  getCombine,
  createCombine,
  mintCombine,
  deliveryCombine,
  getCombineNfts,
  getCombineDetail,
};
