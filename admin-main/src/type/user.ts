export enum UserRole {
  ADMIN = "ADMIN",
  CREATOR = "CREATOR",
  USER = "User",
}

export enum LoginType {
  KAKAO = "KAKAO",
  GOOGLE = "GOOGLE",
  NAVER = "NAVER",
}

export type User = {
  createdAt: string;
  creatorName: string;
  email: string;
  locationAddress: string;
  loginType: LoginType;
  name: string;
  phoneNumber: string;
  role: UserRole;
  securityNumber: string;
  updatedAt: string;
  userAddress: string;
  userProfilePath: string;
};
