import { create } from "zustand";

export enum UserRole {
  USER = "USER",
  CREATOR = "CREATOR",
  ADMIN = "ADMIN",
}

export enum LoginType {
  KAKAO = "KAKAO",
  GOOGLE = "GOOGLE",
  APPLE = "APPLE",
}

export type IUser = {
  userAddress: string;
  name: string;
  phoneNumber: string;
  email: string;
  loginType: LoginType;

  locationAddress: string;
  securityNumber: string;
  userProfileUrl: string;
  role: UserRole;

  accountNumber: string;
  bankName: string;

  creatorName: string;

  createdAt: Date;
  updatedAt: Date;
  isMasterAdmin: boolean;
};

export type UserStore = {
  user: IUser | undefined;
  setUser: (user: IUser) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>()((set) => ({
  user: undefined,
  setUser: (user: IUser) => set(() => ({ user })),
  clearUser: () => set({ user: undefined }),
}));
