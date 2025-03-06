import { IUser } from '~/types/user';

export type TUserStore = {
  user: IUser;
  setUser: (user: IUser) => void;
  clearUser: () => void;
};
