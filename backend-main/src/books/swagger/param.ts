import { ApiParamOptions } from '@nestjs/swagger';

export const bookIdParam: ApiParamOptions = {
  name: 'id',
  description: 'book id',
  example: 1,
};
