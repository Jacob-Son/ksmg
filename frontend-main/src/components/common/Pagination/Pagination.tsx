import React from 'react';
import { PaginationCSS, PaginationButtonCSS } from './Pagination.styles';
import { IconButtonCSS } from '../Button/Button.styles';
import Image from 'next/image';

interface IPaginationProps {
  currentPage: number;
  lastPage: number;
  range?: number;
  layout?: 'normal' | 'dark';
  onClick: (page: number) => void;
  [key: string]: unknown;
}

export default function Pagination({
  currentPage,
  lastPage,
  range = 2,
  layout = 'normal',
  onClick,
  ...rest
}: IPaginationProps) {
  const createButton = (val: number, idx?: number) => {
    return (
      <button
        type="button"
        key={idx}
        onClick={() => onClick(val)}
        css={PaginationButtonCSS({
          layout,
          isCurrent: currentPage === val,
        })}
      >
        {val}
      </button>
    );
  };
  const pages = (() => {
    if (lastPage < range * 2 + 3) {
      return Array.from({ length: lastPage }).map((_, index) =>
        createButton(index + 1, index),
      );
    } else {
      if (currentPage > range + 2 && currentPage < lastPage - range - 1) {
        return (
          <>
            {createButton(1, 0)}
            <span>...</span>
            {Array.from({ length: range * 2 + 1 }).map((_, index) =>
              createButton(currentPage - range + index, index + 1),
            )}
            <span>...</span>
            {createButton(lastPage)}
          </>
        );
      } else if (currentPage <= range + 2) {
        return (
          <>
            {Array.from({ length: range * 2 + 1 }).map((_, index) =>
              createButton(index + 1, index),
            )}
            <span>...</span>
            {createButton(lastPage)}
          </>
        );
      } else {
        return (
          <>
            {createButton(1)}
            <span>...</span>
            {Array.from({ length: range * 2 + 1 }).map((_, index) =>
              createButton(lastPage - range * 2 + index, index + 1),
            )}
          </>
        );
      }
    }
  })();
  return (
    <div css={PaginationCSS} {...rest}>
      <button
        type="button"
        onClick={() => currentPage > 1 && onClick(currentPage - 1)}
        css={IconButtonCSS}
      >
        <Image
          alt="chevron left icon"
          src="/icons/ic_chevron_left_gray.svg"
          width={21}
          height={21}
          css={{ opacity: currentPage === 1 ? 0.3 : 1 }}
        />
      </button>
      {pages}
      <button
        type="button"
        onClick={() => currentPage < lastPage && onClick(currentPage + 1)}
        css={IconButtonCSS}
      >
        <Image
          alt="chevron right icon"
          src="/icons/ic_chevron_right_gray.svg"
          width={21}
          height={21}
          css={{ opacity: currentPage === lastPage ? 0.3 : 1 }}
        />
      </button>
    </div>
  );
}
