import React from 'react';
import { BadgeCSS } from './Badge.styles';

export interface IBadgeProps {
  type: 'new' | 'discount';
  children: React.ReactNode;
  [key: string]: unknown;
}

export default function Badge({ type, children, ...rest }: IBadgeProps) {
  return (
    <div css={BadgeCSS(type)} {...rest}>
      {children}
    </div>
  );
}
