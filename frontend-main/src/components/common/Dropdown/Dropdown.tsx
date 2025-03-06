import React from 'react';
import { DropdownCSS } from './Dropdown.styles';

export default function Dropdown({
  children,
  ...rest
}: {
  children: React.ReactNode;
  [key: string]: unknown;
}) {
  return (
    <div css={DropdownCSS} {...rest}>
      <ul>{children}</ul>
    </div>
  );
}
