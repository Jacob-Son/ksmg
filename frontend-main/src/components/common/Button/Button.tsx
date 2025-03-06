import React from 'react';
import { NormalButtonCSS, ReaderButtonCSS } from './Button.styles';

export interface IButtonProps {
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent) => void;
  layout?: 'reader' | 'outlined' | 'contained';
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  [key: string]: unknown;
}

export default function Button({
  children,
  onClick = () => {},
  layout = 'outlined',
  startAdornment,
  endAdornment,
  ...rest
}: IButtonProps) {
  if (layout === 'reader')
    return (
      <button type="button" onClick={onClick} css={ReaderButtonCSS} {...rest}>
        {startAdornment && startAdornment}
        {children}
        {endAdornment && endAdornment}
      </button>
    );
  return (
    <button
      type="button"
      onClick={onClick}
      css={NormalButtonCSS(layout)}
      {...rest}
    >
      {startAdornment && startAdornment}
      {children}
      {endAdornment && endAdornment}
    </button>
  );
}
