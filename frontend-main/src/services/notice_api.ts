import { IApiResponse } from '~/types/api';
import serviceApi from './api';

export type Notice = {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  noticeId: number;
};

const getNotices = async () => {
  const response = await serviceApi.get<IApiResponse<Notice[]>>(`/notices`);
  return response.data;
};

export const noticeApi = {
  getNotices,
};
