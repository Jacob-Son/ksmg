export enum UserRole {
  USER = 'USER',
  CREATOR = 'CREATOR',
  ADMIN = 'ADMIN',
}

export enum LoginType {
  KAKAO = 'KAKAO',
  GOOGLE = 'GOOGLE',
  APPLE = 'APPLE',
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
  accountOwner: string;

  creatorName: string;

  createdAt: Date;
  updatedAt: Date;
};
