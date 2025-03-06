import { ApiParamOptions } from '@nestjs/swagger';

export const userAddressParam: ApiParamOptions = {
  name: 'address',
  description: 'user address',
  example: '0xtest',
};
