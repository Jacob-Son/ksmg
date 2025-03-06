export type TCreateNftStates = {
  currentStep: number;
  nftId?: number;
  category: string | null;
  theme: string | null;
  name: string | null;
  description: string | null;
  amount: number | null;
  detail: {
    text: string | null;
    image: string | null;
  };
  covers: string[];
  pages: string[];
  price: number | null;
  royalty: number | null;
  attributes: {
    key: string;
    value: string;
  }[];
};

export type TCreateNftSetStates = {
  setCurrentStep: (currentStep: number) => void;
  setNftId: (nftId: number) => void;
  setCategory: (category: string) => void;
  setTheme: (theme: string) => void;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setAmount: (amount: number) => void;
  setDetail: (detail?: { text?: string; image?: string }) => void;
  setCovers: (covers: string[]) => void;
  setPages: (pages: string[]) => void;
  setPrice: (price: number) => void;
  setRoyalty: (royalty: number) => void;
  setAttributes: (
    attributes: {
      key?: string;
      value?: string;
    }[],
  ) => void;
};

export type TCreateNftStore = TCreateNftStates &
  TCreateNftSetStates & {
    resetCreateNftStore: () => void;
  };
