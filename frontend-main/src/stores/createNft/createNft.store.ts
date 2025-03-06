import { TCreateStore, TSetterKeys } from '../store.types';
import {
  TCreateNftSetStates,
  TCreateNftStates,
  TCreateNftStore,
} from './createNft.types';
import { initialCreateNftState } from './createNft.constants';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

const createStore = (set: TCreateStore<TCreateNftStore>) => {
  const initialCreateNftSetStates = {} as TCreateNftSetStates;
  for (const key in initialCreateNftState) {
    const keyName = `set${key[0].toUpperCase()}${key.slice(
      1,
    )}` as TSetterKeys<TCreateNftStates>;
    initialCreateNftSetStates[keyName] = (state) =>
      set(() => ({ [key]: state }));
  }
  return {
    ...initialCreateNftState,
    ...initialCreateNftSetStates,
    setDetail: (detail: { text?: string; image?: string }) => {
      set((state) => ({
        detail: {
          ...state.detail,
          ...detail,
        },
      }));
    },
    resetCreateNftStore: () => set(() => initialCreateNftState),
  };
};

export const useCreateNftStore = createWithEqualityFn<TCreateNftStore>(
  createStore,
  shallow,
);
