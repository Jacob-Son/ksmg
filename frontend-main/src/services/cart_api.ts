import { IApiResponse } from '~/types/api';
import serviceApi from './api';
import { SaleStatus } from '~/types/cart';
import { queryClient } from 'src/pages/_app';

const getCart = async (userAddress: string) => {
  const response = await serviceApi.get<
    IApiResponse<
      {
        collectionAddress: string;
        tokenId: string;
        image: string;
        title: string;
        price: number;
        nftSaleId: number;
        status: SaleStatus;
      }[]
    >
  >(`/carts`, {
    params: {
      userAddress,
    },
  });
  return response.data;
};

const addCart = async (userAddress: string, nftSaleId: number) => {
  const response = await serviceApi.patch<IApiResponse<null>>(`/carts`, {
    userAddress,
    nftSaleId,
  });
  await queryClient.invalidateQueries({
    queryKey: ['cart', userAddress],
  });
  return response.data;
};

const deleteCart = async (userAddress: string, nftSaleId: number) => {
  const response = await serviceApi.delete<IApiResponse<null>>(`/carts`, {
    params: {
      nftSaleId,
      userAddress,
    },
  });
  await queryClient.invalidateQueries({
    queryKey: ['cart', userAddress],
  });
  return response.data;
};

export const cartApi = {
  getCart,
  addCart,
  deleteCart,
};
