export enum Bank {
  BNP = 'BNP',
  BOA = 'BOA',
  BOK = 'BOK',
  BUSAN = 'BUSAN',
  CITI = 'CITI',
  CREDIT_UNION = 'CREDIT_UNION',
  DAEGU = 'DAEGU',
  DAISHIN_SB = 'DAISHIN_SB',
  DEUTSCHE = 'DEUTSCHE',
  EIB = 'EIB',
  EPOST = 'EPOST',
  FSB = 'FSB',
  GWANGJU = 'GWANGJU',
  GYEONGNAM = 'GYEONGNAM',
  HANA = 'HANA',
  HK_SB = 'HK_SB',
  HSBC = 'HSBC',
  IBK = 'IBK',
  JEJU = 'JEJU',
  JEONBUK = 'JEONBUK',
  JPMC = 'JPMC',
  KAKAO = 'KAKAO',
  KB = 'KB',
  KBANK = 'KBANK',
  KDB = 'KDB',
  KFCC = 'KFCC',
  MISC = 'MISC',
  MIZUHO = 'MIZUHO',
  MORGAN_STANLEY = 'MORGAN_STANLEY',
  MUFG = 'MUFG',
  NFCF = 'NFCF',
  NH = 'NH',
  REGIONAL_NH = 'REGIONAL_NH',
  SBI_SB = 'SBI_SB',
  SCB = 'SCB',
  SHINHAN = 'SHINHAN',
  SHINHAN_SB = 'SHINHAN_SB',
  SUHYUP = 'SUHYUP',
  TOSS_BANK = 'TOSS_BANK',
  WELCOME_SB = 'WELCOME_SB',
  WOORI = 'WOORI',
}

export const converBankEnum = (bank: string) => {
  switch (bank) {
    case '한국은행':
      return Bank.BOK;
    case '산업은행':
      return Bank.KDB;
    case '기업은행':
      return Bank.IBK;
    case '국민은행':
      return Bank.KB;
    case '수협은행':
      return Bank.SUHYUP;
    case '수출입은행':
      return Bank.EIB;
    case 'NH농협은행':
      return Bank.NH;
    case '지역농축협':
      return Bank.REGIONAL_NH;
    case '우리은행':
      return Bank.WOORI;
    case 'SC제일은행':
      return Bank.SCB;
    case '한국씨티은행':
      return Bank.CITI;
    case '대구은행':
      return Bank.DAEGU;
    case '부산은행':
      return Bank.BUSAN;
    case '광주은행':
      return Bank.GWANGJU;
    case '제주은행':
      return Bank.JEJU;
    case '전북은행':
      return Bank.JEONBUK;
    case '경남은행':
      return Bank.GYEONGNAM;
    case '새마을금고':
      return Bank.KFCC;
    case '신협':
      return Bank.CREDIT_UNION;
    case '저축은행':
      return Bank.FSB;
    case '기타 외국계은행(중국 농업은행 등)':
      return Bank.MISC;
    case '모간스탠리은행':
      return Bank.MORGAN_STANLEY;
    case 'HSBC은행':
      return Bank.HSBC;
    case '도이치은행':
      return Bank.DEUTSCHE;
    case '제이피모간체이스은행':
      return Bank.JPMC;
    case '미즈호은행':
      return Bank.MIZUHO;
    case '엠유에프지은행':
      return Bank.MUFG;
    case 'BOA은행':
      return Bank.BOA;
    case '비엔피파리바은행':
      return Bank.BNP;
    case '산림조합중앙회':
      return Bank.NFCF;
    case '우체국':
      return Bank.EPOST;
    case '하나은행':
      return Bank.HANA;
    case '신한은행':
      return Bank.SHINHAN;
    case '케이뱅크':
      return Bank.KBANK;
    case '카카오뱅크':
      return Bank.KAKAO;
    case '토스뱅크':
      return Bank.TOSS_BANK;
    case '대신저축은행':
      return Bank.DAISHIN_SB;
    case '에스비아이저축은행':
      return Bank.SBI_SB;
    case '에이치케이저축은행':
      return Bank.HK_SB;
    case '웰컴저축은행':
      return Bank.WELCOME_SB;
    case '신한저축은행':
      return Bank.SHINHAN_SB;
    default:
      return Bank.MISC;
  }
};
