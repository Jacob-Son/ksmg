export type TProfileState = {
  nickname?: string;
  image?: string;
  isNicknameValid?: boolean;
  isComplete: boolean;
};

export type TProfileActions = {
  setNickname: (nickname: string) => void;
  setImage: (image: string) => void;
  setIsNicknameValid: (isNicknameValid: boolean) => void;
  setIsComplete: (isCompleted: boolean) => void;
  checkNickname: (nickname: string) => Promise<boolean>;
  resetProfileStore: () => void;
};

export type TProfileStore = TProfileState & TProfileActions;
