export const SUPPORTED_LANGUAGES = {
  ENGLISH: 'en',
  ARABIC: 'ar',
  CHINESE: 'zh',
  JAPANESE: 'ja',
  MALAY: 'ms',
  KOREAN: 'ko', // 기본 언어
} as const;

export type TargetLanguage =
  (typeof SUPPORTED_LANGUAGES)[keyof typeof SUPPORTED_LANGUAGES];
