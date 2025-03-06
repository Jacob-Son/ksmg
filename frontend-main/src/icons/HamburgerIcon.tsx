import React from 'react';
import { IIconProps } from './icons.types';
import { color as theme } from 'src/styles/colors';

export default function HamburgerIcon({
  color = theme.icon.primary,
}: IIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 5H21M3 11.8H21M3 18.6H21"
        stroke={color}
        strokeWidth="1.94286"
        strokeLinecap="round"
      />
    </svg>
  );
}
