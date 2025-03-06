import { IApiResponse } from '~/types/api';
import serviceApi from './api';

export type Faq = {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  faqId: number;
};

const getFaqs = async () => {
  const response = await serviceApi.get<IApiResponse<Faq[]>>(`/faqs`);
  return response.data;
};

export const faqApi = {
  getFaqs,
};
