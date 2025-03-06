import React from 'react';
import { DotCSS, PaginationDotsWrapperCSS } from './PaginationDots.styles';
import { IPaginationDotsProps } from './PaginationDots.types';
import { css } from '@emotion/react';

export default function PaginationDots({
  dotSize = 8,
  gap = 8,
  ...props
}: IPaginationDotsProps) {
  return (
    <div
      css={[
        PaginationDotsWrapperCSS,
        css({
          width: props.total * (dotSize + gap) - gap,
          height: dotSize,
        }),
      ]}
    >
      {Array.from({ length: props.total - 1 }, (_, idx) => (
        <div
          key={`pagination_dot_${idx}`}
          css={[
            DotCSS(false, dotSize),
            css({
              ...(idx < props.current && {
                left: idx * (dotSize + gap),
              }),
              ...(idx >= props.current && {
                left: (idx + 1) * (dotSize + gap),
              }),
            }),
          ]}
          onClick={() => props.onClick(idx >= props.current ? idx + 1 : idx)}
        />
      ))}
      <div
        css={[
          DotCSS(true, dotSize),
          css({
            left: props.current * (dotSize + gap),
          }),
        ]}
      />
    </div>
  );
}
