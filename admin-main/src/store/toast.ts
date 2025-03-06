import { create } from "zustand";

export type ToastType = "success" | "error";

export interface IToast {
  message: string;
  type: ToastType;
}

interface ToastStore {
  toastMap: Map<number, IToast>;
  addToast: ({ message, type }: { message: string; type: ToastType }) => void;
}

const useToastStore = create<ToastStore>()((set, get) => ({
  toastMap: new Map<number, IToast>(),

  addToast: ({ message, type }: { message: string; type: ToastType }) => {
    const timeStamp = new Date().getTime();

    const list = get().toastMap;
    set({ toastMap: list.set(timeStamp, { message, type }) });

    setTimeout(() => {
      const list = get().toastMap;
      list.delete(timeStamp);
      set({ toastMap: list });
    }, 2000);
  },
}));

export default useToastStore;
