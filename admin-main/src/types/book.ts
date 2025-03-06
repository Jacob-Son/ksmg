import { INote } from './note';

export type GetBookReponseData = {
  bookId: number;
  title: string;
  maxPageNumber: number;
  bookImages: string[];
};

export type GetBookImageByPageData = {
  bookImage: string;
};

export type GetNotesResponseData = {
  notes: INote[];
};
