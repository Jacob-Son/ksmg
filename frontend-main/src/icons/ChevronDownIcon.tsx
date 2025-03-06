import React from 'react';
import { IIconProps } from './icons.types';

export default function ChevronDownIcon({ color = 'black' }: IIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M11.992 15.9837C11.8872 15.985 11.7833 15.9639 11.6869 15.9218C11.5906 15.8797 11.5039 15.8175 11.4326 15.7391L4.23976 8.40217C3.92008 8.07609 3.92008 7.57065 4.23976 7.24457C4.55944 6.91848 5.05494 6.91848 5.37463 7.24457L12.008 14.0109L18.6254 7.26087C18.9451 6.93478 19.4406 6.93478 19.7602 7.26087C20.0799 7.58696 20.0799 8.09239 19.7602 8.41848L12.5674 15.7554C12.4076 15.9185 12.1998 16 12.008 16L11.992 15.9837Z"
        fill={color}
      />
    </svg>
  );
}
