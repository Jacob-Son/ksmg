import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const CartItemWrapperCSS = css({
  display: 'flex',
  padding: 12,
  gap: 6,
  background: color.background.container.primary,
  borderRadius: 6,

  '& img': {
    background: color.background.container.image,
    borderRadius: 10,
    width: 90,
    height: 90,
  },
  [mq.mobile]: {
    background: '#fff',
  },
});

export const ItemTypeTextCSS = css({
  color: color.purple,
  fontSize: 14,
  fontWeight: 300,
  lineHeight: '120%',
  letterSpacing: '-0.165px',
});

export const ItemTitleTextCSS = css({
  marginTop: 2,
  fontWeight: 600,
  lineHeight: '100%',
  letterSpacing: '-0.165px',
});

export const ItemPriceTextCSS = css({
  marginTop: 8,
  fontSize: 18,
  fontWeight: 600,
  lineHeight: '100%',
  letterSpacing: '-0.165px',

  '& span': {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '130%',
    letterSpacing: '-0.165px',
  },
});
