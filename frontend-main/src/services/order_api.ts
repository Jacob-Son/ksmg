import { IApiResponse } from '~/types/api';
import serviceApi from './api';
import { IOrder } from '~/types/order';
import { IUser } from '~/types/user';
import { GetNftResponseData } from '~/types/nft';
import { SaleStatus } from '~/types/cart';

const createOrder = async (
  merchantUid: string,
  nftSaleIds: number[],
  userAddress: string,
) => {
  const response = await serviceApi.post<
    IApiResponse<
      IOrder & {
        user: IUser;
      }
    >
  >(`/orders`, {
    merchantUid,
    nftSaleIds,
    userAddress,
  });
  return response.data;
};

const getOrder = async (orderId: number) => {
  const response = await serviceApi.get<
    IApiResponse<
      IOrder & {
        nftSales: {
          status: SaleStatus;
          nftSaleId: number;
          price: number;
          nft: GetNftResponseData;
        }[];
      }
    >
  >(`/orders/${orderId}`);
  return response.data;
};

const checkPaidOrder = async (merchantUid: string, impUid: string) => {
  const response = await serviceApi.get<
    IApiResponse<{
      isPaid: boolean;
      order: IOrder;
    }>
  >(`/orders/paid`, {
    params: {
      merchantUid,
      impUid,
    },
  });
  return response.data;
};

const freeBuyOrder = async (orderId: number) => {
  const response = await serviceApi.patch<IApiResponse<IOrder>>(
    `/orders/${orderId}/free-buy`,
  );
  return response.data;
};

const refundOrder = async (orderId: number, nftSaleId: number) => {
  const response = await serviceApi.patch<IApiResponse<IOrder>>(
    `/orders/${orderId}/refund`,
    {
      nftSaleId,
    },
  );
  return response.data;
};

const confirmOrder = async (orderId: number, nftSaleId: number) => {
  const response = await serviceApi.patch<IApiResponse<IOrder>>(
    `/orders/${orderId}/confirm`,
    {
      nftSaleId,
    },
  );
  return response.data;
};

export const orderApi = {
  createOrder,
  getOrder,
  checkPaidOrder,
  refundOrder,
  confirmOrder,
  freeBuyOrder,
};
