import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { breakpoints, mediaQuery } from 'src/styles/mediaQuery';

export const DetailsContainerCSS = css({
  padding: '26px 24px',
  display: 'grid',
  gridTemplateColumns: '1fr 108px',
  borderRadius: '12px',
  background: color.background.container.primary,
  gap: '14px 24px',

  [mediaQuery.up(breakpoints.mb_600)]: {
    width: '370px',
    boxSizing: 'border-box',
  },
});

export const LabelCSS = css({
  fontWeight: 600,
  lineHeight: '100%',
  letterSpacing: '-0.165px',
});

export const ValueCSS = css({
  color: color.blue.main,
  fontWeight: 400,
  lineHeight: '130%',
  letterSpacing: '-0.165px',
});
