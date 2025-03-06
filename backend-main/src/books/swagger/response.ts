import { ApiResponseOptions } from '@nestjs/swagger';

export const getBookReponse: ApiResponseOptions = {
  status: 200,
  description: 'The book id is successfully retrieved.',
  content: {
    'application/json': {
      example: {
        success: true,
        error: null,
        data: {
          bookId: 1,
          title: 'test',
          maxPageNumber: 10,
          bookImages: [
            'https://test.com/image1',
            'https://test.com/image2',
            'https://test.com/image3',
          ],
        },
      },
    },
  },
};
