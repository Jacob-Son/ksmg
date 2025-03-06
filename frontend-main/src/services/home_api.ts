import { IApiResponse } from '~/types/api';
import serviceApi from './api';
import { Banner, Recommend, ThemeInfo } from '~/types/home';
import { SimpleNftType } from '~/types/nft';
import { IEvent } from '~/types/event';

const getBanner = async () => {
  const response = await serviceApi.get<IApiResponse<Banner[]>>(`/home/banner`);
  return response.data;
};

const getHotNft = async () => {
  const response =
    await serviceApi.get<IApiResponse<SimpleNftType[]>>(`/home/hot-nft`);
  return response.data;
};

const getRecommend = async () => {
  const response = await serviceApi.get<
    IApiResponse<
      {
        recommend: Recommend;
        nftImagePath: string;
        tokenId: string;
      }[]
    >
  >(`/home/recommend`);
  return response.data;
};

const getCurrentEvent = async () => {
  const response =
    await serviceApi.get<IApiResponse<IEvent[]>>(`/home/current-event`);
  return response.data;
};

const getCultureEvent = async () => {
  const response =
    await serviceApi.get<IApiResponse<IEvent[]>>(`/home/culture-event`);
  return response.data;
};

const getBestNft = async () => {
  const response =
    await serviceApi.get<IApiResponse<SimpleNftType[]>>(`/home/best-nft`);
  return response.data;
};

const getPopularTheme = async () => {
  const response = await serviceApi.get<
    IApiResponse<{
      [key: string]: ThemeInfo[];
    }>
  >(`/home/popular-theme`);
  return response.data;
};

const getRecentSale = async () => {
  const response =
    await serviceApi.get<IApiResponse<SimpleNftType[]>>(`/home/recent-sale`);
  return response.data;
};

export const homeApi = {
  getBanner,
  getHotNft,
  getRecommend,
  getCurrentEvent,
  getCultureEvent,
  getBestNft,
  getPopularTheme,
  getRecentSale,
};
