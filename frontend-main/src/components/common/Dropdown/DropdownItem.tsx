import React from 'react';
import { DropdownItemCSS } from './Dropdown.styles';

export default function DropdownItem({
  children,
}: {
  children: React.ReactNode;
}) {
  return <li css={DropdownItemCSS}>{children}</li>;
}
