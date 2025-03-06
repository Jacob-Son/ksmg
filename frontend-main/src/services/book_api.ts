import { IApiResponse } from '~/types/api';
import serviceApi from './api';
import {
  GetBookImageByPageData,
  GetBookReponseData,
  GetNotesResponseData,
} from '~/types/book';

const getBook = async (
  collectionAddress: string,
  tokenId: string,
  userAddress: string,
) => {
  const response = await serviceApi.get<IApiResponse<GetBookReponseData>>(
    `/books`,
    {
      params: {
        collectionAddress,
        tokenId,
        userAddress,
      },
    },
  );
  return response.data;
};

const getBookImageByPage = async (
  collectionAddress: string,
  tokenId: string,
  pageNumber: number,
) => {
  const response = await serviceApi.get<IApiResponse<GetBookImageByPageData>>(
    `/books/pages`,
    {
      params: {
        collectionAddress,
        tokenId,
        pageNumber,
      },
    },
  );
  return response.data;
};

const getNotes = async (
  bookId: number,
  userAddress: string,
  pageNumber: number,
) => {
  const response = await serviceApi.get<IApiResponse<GetNotesResponseData>>(
    `/notes`,
    {
      params: {
        bookId,
        userAddress,
        pageNumber: String(pageNumber),
      },
    },
  );
  return response.data;
};

export const bookApi = {
  getBook,
  getBookImageByPage,
  getNotes,
};
