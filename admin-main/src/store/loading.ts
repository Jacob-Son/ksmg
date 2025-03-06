import { create } from "zustand";

interface LoadingStore {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const useLoadinStore = create<LoadingStore>()((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));

export default useLoadinStore;
