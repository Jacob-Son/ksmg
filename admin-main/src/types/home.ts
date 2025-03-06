export type Banner = {
  bannerId: number;
  imagePath: string;
  mobileImagePath: string;
  link: string;
  order: number;
};

export type ThemeInfo = {
  theme: string;
  count: number;
};

export type Recommend = {
  recommendId: number;
  author: string;
  profileImagePath: string;
  intro: string;
  description: string;
  backgroundColor: string;
  nftId: number;
  createdAt: Date;
  updatedAt: Date;
};
