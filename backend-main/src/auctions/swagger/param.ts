import { ApiParamOptions } from '@nestjs/swagger';

export const auctionIdParam: ApiParamOptions = {
  name: 'id',
  description: 'auction id',
  example: 1,
};
