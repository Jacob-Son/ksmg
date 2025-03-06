import { TCreateStore, TSetterKeys } from '../store.types';
import { TProfileActions, TProfileState, TProfileStore } from './profile.types';
import { initialProfileState } from './profile.constants';
import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { studioApi } from 'src/services/studio_api';

const createStore = (set: TCreateStore<TProfileStore>) => {
  const initialProfileActions = {} as TProfileActions;
  for (const key in initialProfileState) {
    const keyName = `set${key[0].toUpperCase()}${key.slice(
      1,
    )}` as TSetterKeys<TProfileState>;
    initialProfileActions[keyName] = (state) => set(() => ({ [key]: state }));
  }
  return {
    ...initialProfileState,
    ...initialProfileActions,
    checkNickname: async (nickname: string) => {
      const isCheck = await studioApi.checkCreatorNameDuplicate(nickname);

      if (!isCheck.success) {
        alert('이미 사용중인 닉네임입니다.');
        set(() => ({ isNicknameValid: false }));
        return false;
      }
      set(() => ({ isNicknameValid: true }));
      return true;
    },
    resetProfileStore: () => set(() => initialProfileState),
  };
};

export const useProfileStore = createWithEqualityFn<TProfileStore>(
  createStore,
  shallow,
);
