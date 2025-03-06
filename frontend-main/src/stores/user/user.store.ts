import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { TUserStore } from './user.types';
import { TCreateStore } from '../store.types';
import { IUser } from '~/types/user';

const createStore = (set: TCreateStore<TUserStore>) => {
  return {
    user: undefined,
    setUser: (user: IUser) => set(() => ({ user })),
    clearUser: () => set(() => ({ user: null })),
  };
};

export const useUserStore = createWithEqualityFn<TUserStore>(
  createStore,
  shallow,
);
