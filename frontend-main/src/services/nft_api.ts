import { IApiResponse } from '~/types/api';
import serviceApi from './api';
import { GetNftResponseData, SimpleNftType } from '~/types/nft';

const getNfts = async (
  pageNumber: number,
  category?: string,
  theme?: string,
  search?: string,
) => {
  const params = {};

  if (isNaN(pageNumber)) {
    params['page'] = 1;
  } else {
    params['page'] = pageNumber;
  }
  if (category !== 'undefined') {
    params['category'] = category;
  }
  if (theme !== 'undefined') {
    params['theme'] = theme;
  }
  if (search !== 'undefined') {
    params['search'] = search;
  }

  const response = await serviceApi.get<
    IApiResponse<{
      nfts: SimpleNftType[];
      totalCount: number;
      totalPage: number;
    }>
  >(`/nfts`, {
    params,
  });
  return response.data;
};

const getNftsByNftCreateUnitId = async (
  nftCreateUnitId: number,
  pageNumber: number,
) => {
  const response = await serviceApi.get<
    IApiResponse<{
      nfts: SimpleNftType[];
      totalCount: number;
      totalPage: number;
    }>
  >(`/nfts/nft-create-unit/${nftCreateUnitId}`, {
    params: {
      page: pageNumber,
    },
  });
  return response.data;
};

const getNft = async (collectionAddress: string, tokenId: string) => {
  const response = await serviceApi.get<IApiResponse<GetNftResponseData>>(
    `/nfts/${collectionAddress}/${tokenId}`,
  );
  return response.data;
};

const getRelativeNft = async (collectionAddress: string, tokenId: string) => {
  const response = await serviceApi.get<
    IApiResponse<{
      nfts: SimpleNftType[];
      isTheme: boolean;
    }>
  >(`/nfts/${collectionAddress}/${tokenId}/relative`);
  return response.data;
};

const getIsLike = async (
  collectionAddress: string,
  tokenId: string,
  userAddress: string,
) => {
  const response = await serviceApi.get<IApiResponse<boolean>>(`/nfts/like`, {
    params: {
      collectionAddress,
      tokenId,
      userAddress,
    },
  });
  return response.data;
};

const addLike = async (
  collectionAddress: string,
  tokenId: string,
  userAddress: string,
) => {
  const response = await serviceApi.patch<IApiResponse<null>>(`/nfts/like`, {
    collectionAddress,
    tokenId,
    userAddress,
  });
  return response.data;
};

const removeLike = async (
  collectionAddress: string,
  tokenId: string,
  userAddress: string,
) => {
  const response = await serviceApi.delete<IApiResponse<null>>(`/nfts/like`, {
    params: {
      collectionAddress,
      tokenId,
      userAddress,
    },
  });
  return response.data;
};

const addViewCount = async (collectionAddress: string, tokenId: string) => {
  const response = await serviceApi.patch<IApiResponse<null>>(`/nfts/view`, {
    collectionAddress,
    tokenId,
  });
  return response.data;
};

const setNftPrice = async (
  collectionAddress: string,
  tokenId: string,
  price: number,
  sellerAddress: string,
) => {
  const response = await serviceApi.patch<IApiResponse<number>>(`/nfts/price`, {
    collectionAddress,
    tokenId,
    price,
    sellerAddress,
  });
  return response.data;
};

const getTheme = async () => {
  const response = await serviceApi.get<IApiResponse<string[]>>(`/nfts/theme`);
  return response.data;
};

const createNft = async (data: {
  collectionAddress: string;
  description: string;
  creatorAddress: string;
  nftImages: string[];
  nftDetailImage: string;
  nftDetailDescription: string;
  nftAttributes: { key: string; value: string }[];
  name: string;
  category: string;
  theme: string;
  bookImages: string[];
  count: number;
  price: number;
  royalty: number;
}) => {
  const response = await serviceApi.post<IApiResponse<null>>(`/nfts`, data);
  return response.data;
};

export const nftApi = {
  getNfts,
  getNft,
  getIsLike,
  addLike,
  removeLike,
  addViewCount,
  setNftPrice,
  getTheme,
  getRelativeNft,
  createNft,
  getNftsByNftCreateUnitId,
};
