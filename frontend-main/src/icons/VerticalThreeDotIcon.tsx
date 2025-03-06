import React from 'react';
import { IIconProps } from './icons.types';
import { color as theme } from 'src/styles/colors';

export default function VerticalThreeDotIcon({
  color = theme.icon.secondary,
}: IIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
    >
      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
    </svg>
  );
}
