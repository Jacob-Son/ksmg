import { TCreateNftStates } from './createNft.types';

export const initialCreateNftState: TCreateNftStates = {
  currentStep: 1,
  category: null,
  theme: null,
  name: null,
  description: null,
  amount: null,
  detail: {
    text: null,
    image: null,
  },
  covers: [],
  pages: [],
  price: null,
  royalty: null,
  attributes: [],
};
