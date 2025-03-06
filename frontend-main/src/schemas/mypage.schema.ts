import { object, string } from 'yup';

export const mypageAddressFormSchema = object({
  name: string().required(),
  phoneNumber: object({
    first: string().required(),
    second: string().required(),
    third: string().required(),
  }).required(),
  address: object({
    zonecode: string().required(),
    address: string().required(),
    detailAddress: string().required(),
  }).required(),
});

export const mypageBankFormSchema = object({
  bank: object({
    bankName: string().required(),
    accountNumber: string().required(),
    accountOwner: string().required(),
  }).required(),
});

export const mypagePrivacyFormSchema = object({
  profileImage: string(),
  name: string().required(),
  creatorName: string(),
  phoneNumber: object({
    first: string().required(),
    second: string().required(),
    third: string().required(),
  }).required(),
});
