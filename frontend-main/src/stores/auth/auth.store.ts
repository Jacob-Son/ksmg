import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

const createStore = (set) => {
  return {
    beforeRoutePath: '',
    loginModalOpen: false,
    toggleLoginModal: () =>
      set((state) => ({
        loginModalOpen: !state.loginModalOpen,
      })),
    setBeforeRoutePath: (path) => set(() => ({ beforeRoutePath: path })),
  };
};

export const useAuthStore = createWithEqualityFn(createStore, shallow);
