import { IApiResponse } from '~/types/api';
import serviceApi from './api';
import { GetBookReponseData } from '~/types/book';

const createNote = async (
  bookId: number,
  userAddress: string,
  pageNumber: number,
  notePositionX: number,
  notePositionY: number,
  noteContent: string,
) => {
  const response = await serviceApi.post<IApiResponse<GetBookReponseData>>(
    `/notes`,
    {
      bookId,
      userAddress,
      pageNumber,
      notePosition: {
        x: notePositionX,
        y: notePositionY,
      },
      noteContent,
    },
  );
  return response.data;
};

const updateNote = async (
  noteId: number,
  notePositionX: number,
  notePositionY: number,
  noteContent: string,
) => {
  const response = await serviceApi.patch<IApiResponse<GetBookReponseData>>(
    `/notes/` + noteId,
    {
      notePosition: {
        x: notePositionX,
        y: notePositionY,
      },
      noteContent,
    },
  );
  return response.data;
};

const deleteNote = async (noteId: number) => {
  const response = await serviceApi.delete<IApiResponse<GetBookReponseData>>(
    `/notes/` + noteId,
  );
  return response.data;
};

export const noteApi = {
  createNote,
  updateNote,
  deleteNote,
};
