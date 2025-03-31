export const SUPPORTED_LANGUAGES = {
    ENGLISH: 'en',
    ARABIC: 'ar',
    CHINESE: 'zh',
    JAPANESE: 'ja',
    MALAY: 'ms',
  } as const;
  
  export type TargetLanguage = keyof typeof SUPPORTED_LANGUAGES;