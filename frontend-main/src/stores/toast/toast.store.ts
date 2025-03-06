import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { IToastStore, ToastPosition } from './toast.types';
import { TCreateStore } from '../store.types';

const createStore = (set: TCreateStore<IToastStore>) => {
  return {
    message: '',
    options: {
      position: ToastPosition.BOTTOM,
      speed: 250,
      duration: 4000,
    },
    toastOpen: false,
    showToast: (message, options) =>
      set((state) => ({
        message,
        options: { ...state.options, ...options },
        toastOpen: true,
      })),
    closeToast: () => set({ toastOpen: false }),
  };
};

export const useToast = createWithEqualityFn<IToastStore>(createStore, shallow);
