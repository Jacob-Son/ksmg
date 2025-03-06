import React from 'react';
import { IIconProps } from '../icons.types';
import { color as theme } from 'src/styles/colors';

export default function HeartIcon({ color = theme.icon.sub }: IIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
    >
      <path
        d="M14.1876 2.71484C12.5614 2.71484 11.1375 4.31463 10.25 5.42878C9.36243 4.31463 7.93858 2.71484 6.31234 2.71484C5.01783 2.71622 3.77675 3.20152 2.8614 4.06427C1.94604 4.92702 1.43115 6.09677 1.42969 7.31689C1.42969 12.5127 9.60341 16.7184 9.95149 16.8921C10.0432 16.9386 10.1458 16.963 10.25 16.963C10.3541 16.963 10.4567 16.9386 10.5484 16.8921C10.8965 16.7184 19.0702 12.5127 19.0702 7.31689C19.0688 6.09677 18.5539 4.92702 17.6385 4.06427C16.7232 3.20152 15.4821 2.71622 14.1876 2.71484Z"
        fill={color}
      />
    </svg>
  );
}
