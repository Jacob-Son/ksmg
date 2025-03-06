import { ApiResponseOptions } from '@nestjs/swagger';

export const getNotesResponse: ApiResponseOptions = {
  status: 200,
  description: 'The notes are successfully retrieved.',
  content: {
    'application/json': {
      example: {
        success: true,
        error: null,
        data: {
          noteId: 1,
          bookId: 1,
          userAddress: '0xtest',
          pageNumber: 1,
          notePositionX: 0.5,
          notePositionY: 0.5,
          noteContent: 'This is a note',
          createdAt: '2023-11-05 04:30:36.324',
          updatedat: '2023-11-05 04:30:36.324',
        },
      },
    },
  },
};

export const createNoteResponse: ApiResponseOptions = {
  status: 200,
  description: 'The note is successfully created.',
  content: {
    'application/json': {
      example: {
        success: true,
        error: null,
        data: {
          noteId: 1,
          bookId: 1,
          userAddress: '0xtest',
          pageNumber: 1,
          notePositionX: 0.5,
          notePositionY: 0.5,
          noteContent: 'This is a note',
          createdAt: '2023-11-05 04:30:36.324',
          updatedAt: '2023-11-05 04:30:36.324',
        },
      },
    },
  },
};

export const updateNoteResponse: ApiResponseOptions = {
  status: 200,
  description: 'The note is successfully updated.',
  content: {
    'application/json': {
      example: {
        success: true,
        error: null,
        data: {
          noteId: 1,
          bookId: 1,
          userAddress: '0xtest',
          pageNumber: 1,
          notePositionX: 0.5,
          notePositionY: 0.5,
          noteContent: 'This is a note',
          createdAt: '2023-11-05 04:30:36.324',
          updatedAt: '2023-11-05 04:30:36.324',
        },
      },
    },
  },
};

export const deleteNoteResponse: ApiResponseOptions = {
  status: 200,
  description: 'The note is successfully deleted.',
  content: {
    'application/json': {
      example: {
        success: true,
        error: null,
        data: null,
      },
    },
  },
};
