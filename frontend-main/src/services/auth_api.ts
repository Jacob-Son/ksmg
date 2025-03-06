import { IApiResponse } from '~/types/api';
import serviceApi from './api';
import { IUser } from '~/types/user';

const signIn = async (accessToken: string) => {
  const response = await serviceApi.post<
    IApiResponse<{
      userInfo: IUser;
      isNewUser: boolean;
    }>
  >(
    `/auth/signIn`,
    {},
    {
      headers: {
        authorization: accessToken,
      },
    },
  );
  return response.data;
};

const makeWallet = async (
  accessToken: string,
  password: string,
  phoneNumber: string,
  shippingInfo: {
    name: string;
    phoneNumber: string;
    mainAddress: string;
    detailAddress: string;
    postCode: string;
  },
) => {
  const response = await serviceApi.patch<IApiResponse<null>>(
    `/auth/make-wallet`,
    {
      password,
      phoneNumber,
      shippingInfo,
    },
    {
      headers: {
        authorization: accessToken,
      },
    },
  );
  return response.data;
};

const resetWalletPassword = async (accessToken: string, password: string) => {
  const response = await serviceApi.patch<IApiResponse<null>>(
    `/auth/reset-wallet-password`,
    {
      password,
    },
    {
      headers: {
        authorization: accessToken,
      },
    },
  );
  return response.data;
};

const checkPassword = async (accessToken: string, password: string) => {
  const response = await serviceApi.post<
    IApiResponse<{
      success: boolean;
      error: string;
    }>
  >(
    `/auth/password-check`,
    {
      password,
    },
    {
      headers: {
        authorization: accessToken,
      },
    },
  );
  return response.data;
};

const sendCertificationNumber = async (phoneNumber: string, code: string) => {
  const response = await serviceApi.post<IApiResponse<null>>(
    `/auth/certification-number`,
    {
      code,
      phoneNumber,
    },
  );
  return response.data;
};

const signMessage = async (
  accessToken: string,
  message: string,
  password: string,
) => {
  const response = await serviceApi.post<IApiResponse<string>>(
    `/auth/sign-message`,
    {
      message,
      password,
    },
    {
      headers: {
        authorization: accessToken,
      },
    },
  );
  return response.data;
};

export const authApi = {
  signIn,
  makeWallet,
  signMessage,
  checkPassword,
  resetWalletPassword,
  sendCertificationNumber,
};
