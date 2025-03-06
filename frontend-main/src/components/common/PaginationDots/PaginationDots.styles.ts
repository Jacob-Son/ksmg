import { css } from '@emotion/react';
import { transitionSpeed } from './PaginationDots.constants';
import { color } from 'src/styles/colors';

export const PaginationDotsWrapperCSS = css({
  position: 'relative',
});

export const DotCSS = (isCurrent: boolean, dotSize: number) =>
  css({
    position: 'absolute',
    top: 0,
    width: dotSize,
    height: dotSize,
    borderRadius: dotSize,
    backgroundColor: isCurrent
      ? color.background.container.black
      : color.icon.tertiary,
    cursor: 'pointer',
    transition: `all ${transitionSpeed}ms ease-out`,
  });
