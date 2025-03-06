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

// export const banks = [
//   { label: '한국은행', value: '001' },
//   { label: '산업은행', value: '002' },
//   { label: '기업은행', value: '003' },
//   { label: '국민은행', value: '004' },
//   { label: '외환은행', value: '005' },
//   { label: '수협중앙회', value: '007' },
//   { label: '수출입은행', value: '008' },
//   { label: '농협은행', value: '011' },
//   { label: '지역농.축협', value: '012' },
//   { label: '우리은행', value: '020' },
//   { label: 'SC은행', value: '023' },
//   { label: '한국씨티은행', value: '027' },
//   { label: '대구은행', value: '031' },
//   { label: '부산은행', value: '032' },
//   { label: '광주은행', value: '034' },
//   { label: '제주은행', value: '035' },
//   { label: '전북은행', value: '037' },
//   { label: '경남은행', value: '039' },
//   { label: '새마을금고중앙회', value: '045' },
//   { label: '신협중앙회', value: '048' },
//   { label: '상호저축은행', value: '050' },
//   { label: '중국은행', value: '051' },
//   { label: '모건슨탠리은행', value: '052' },
//   { label: 'HSBC은행', value: '054' },
//   { label: '도이치은행', value: '055' },
//   { label: '알비에스피엘씨은행', value: '056' },
//   { label: '제이피모간체이스은행', value: '057' },
//   { label: '미즈호은행', value: '058' },
//   { label: '미쓰비시도쿄UFJ은행', value: '059' },
//   { label: 'BOA은행', value: '060' },
//   { label: '비엔피파리바은행', value: '061' },
//   { label: '중국공상은행', value: '062' },
//   { label: '중국은행', value: '063' },
//   { label: '산림조합중앙회', value: '064' },
//   { label: '대화은행', value: '065' },
//   { label: '교통은행', value: '066' },
//   { label: '우체국', value: '071' },
//   { label: '신용보증기금', value: '076' },
//   { label: '기술보증기금', value: '077' },
//   { label: 'KEB하나은행', value: '081' },
//   { label: '신한은행', value: '088' },
//   { label: '케이뱅크', value: '089' },
//   { label: '카카오뱅크', value: '090' },
//   { label: '토스뱅크', value: '092' },
//   { label: '한국주택금융공사', value: '093' },
//   { label: '서울보증보험', value: '094' },
//   { label: '경찰청', value: '095' },
//   { label: '한국전자금융(주)', value: '096' },
//   { label: '금융결제원', value: '099' },
//   { label: '대신저축은행', value: '102' },
//   { label: '에스비아이저축은행', value: '103' },
//   { label: '에이치케이저축은행', value: '104' },
//   { label: '월컴저축은행', value: '105' },
//   { label: '신한저축은행', value: '106' },
//   { label: '유안타증권', value: '209' },
//   { label: '현대증권', value: '218' },
//   { label: '골든브리지투자증권', value: '221' },
//   { label: '한양증권', value: '222' },
//   { label: '리딩투자증권', value: '223' },
//   { label: 'BNK투자증권', value: '224' },
//   { label: 'IBK투자증권', value: '225' },
//   { label: 'KB투자증권', value: '226' },
//   { label: 'KTB투자증권', value: '227' },
//   { label: '미래에셋증권', value: '230' },
//   { label: '대우증권', value: '238' },
//   { label: '삼성증권', value: '240' },
//   { label: '한국투자증권', value: '243' },
//   { label: '교보증권', value: '261' },
//   { label: '하이투자증권', value: '262' },
//   { label: 'HMC투자증권', value: '263' },
//   { label: '키움증권', value: '264' },
//   { label: '이베스트투자증권', value: '265' },
//   { label: 'SK증권', value: '266' },
//   { label: '대신증권', value: '267' },
//   { label: '한화투자증권', value: '269' },
//   { label: '하나대투증권', value: '270' },
//   { label: '신한금융투자', value: '278' },
//   { label: 'DB금융투자', value: '279' },
//   { label: '유진투자증권', value: '280' },
//   { label: '메리츠종합금융증권', value: '287' },
//   { label: 'NH투자증권', value: '289' },
//   { label: '부국증권', value: '290' },
//   { label: '신영증권', value: '291' },
//   { label: '엘아이지투자증권', value: '292' },
//   { label: '한국증권금융', value: '293' },
//   { label: '펀드온라인코리아', value: '294' },
//   { label: '우리종합금융', value: '295' },
//   { label: '삼성선물', value: '296' },
//   { label: '외환선물', value: '297' },
//   { label: '현대선물', value: '298' },
// ];

export const banks = [
  { label: '한국은행', value: Bank.BOK },
  { label: '산업은행', value: Bank.KDB },
  { label: '기업은행', value: Bank.IBK },
  { label: '국민은행', value: Bank.KB },
  { label: '수협중앙회', value: Bank.SUHYUP },
  { label: '수출입은행', value: Bank.EIB },
  { label: '농협은행', value: Bank.NH },
  { label: '지역농.축협', value: Bank.REGIONAL_NH },
  { label: '우리은행', value: Bank.WOORI },
  { label: 'SC은행', value: Bank.SCB },
  { label: '한국씨티은행', value: Bank.CITI },
  { label: '대구은행', value: Bank.DAEGU },
  { label: '부산은행', value: Bank.BUSAN },
  { label: '광주은행', value: Bank.GWANGJU },
  { label: '제주은행', value: Bank.JEJU },
  { label: '전북은행', value: Bank.JEONBUK },
  { label: '경남은행', value: Bank.GYEONGNAM },
  { label: '새마을금고중앙회', value: Bank.KFCC },
  { label: '신협중앙회', value: Bank.CREDIT_UNION },
  { label: '상호저축은행', value: Bank.FSB },
  { label: '모건슨탠리은행', value: Bank.MORGAN_STANLEY },
  { label: 'HSBC은행', value: Bank.HSBC },
  { label: '도이치은행', value: Bank.DEUTSCHE },
  { label: '알비에스피엘씨은행', value: Bank.BNP },
  { label: '제이피모간체이스은행', value: Bank.JPMC },
  { label: '미즈호은행', value: Bank.MIZUHO },
  { label: '미쓰비시도쿄UFJ은행', value: Bank.MUFG },
  { label: 'BOA은행', value: Bank.BOA },
  { label: '비엔피파리바은행', value: Bank.BNP },
  { label: '산림조합중앙회', value: Bank.NFCF },
  { label: '대화은행', value: Bank.NFCF },
  { label: '교통은행', value: Bank.NFCF },
  { label: '우체국', value: Bank.EPOST },
  { label: '신한은행', value: Bank.SHINHAN },
  { label: '케이뱅크', value: Bank.KBANK },
  { label: '카카오뱅크', value: Bank.KAKAO },
  { label: '토스뱅크', value: Bank.TOSS_BANK },
  { label: '대신저축은행', value: Bank.DAISHIN_SB },
  { label: '에스비아이저축은행', value: Bank.SBI_SB },
  { label: '에이치케이저축은행', value: Bank.HK_SB },
  { label: '월컴저축은행', value: Bank.WELCOME_SB },
  { label: '신한저축은행', value: Bank.SHINHAN_SB },
];

export const bankOptions = banks.map((bank) => ({
  label: bank.label,
  value: bank.label,
}));

export const getBankCode = (bankName: string) => {
  const bank = banks.find((bank) => bank.label === bankName);
  return bank?.value;
};

export const getBankName = (bankCode: string) => {
  const bank = banks.find((bank) => bank.value === bankCode);
  return bank?.label;
};
