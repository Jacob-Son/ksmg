export interface IPaginationDotsProps {
  total: number;
  dotSize?: number;
  gap?: number;
  current: number;
  onClick: (index: number) => void;
}
