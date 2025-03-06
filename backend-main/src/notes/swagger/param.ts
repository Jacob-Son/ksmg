import { ApiParamOptions } from '@nestjs/swagger';

export const noteIdParam: ApiParamOptions = {
  name: 'id',
  description: 'note id',
  example: 1,
};
