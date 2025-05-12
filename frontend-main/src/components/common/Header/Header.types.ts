export enum HeaderLayoutEnum {
  NORMAL = 'normal',
  DARK = 'dark',
}
// Header.types.ts
export interface IHeaderProps {
  layout?: HeaderLayoutEnum;
  title?: string;
  showTitle?: boolean;
  showPrev?: boolean;
  onClickPrev?: () => void;
  language?: string; // ✅ 추가
  onLanguageChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void; // ✅ 추가
}
