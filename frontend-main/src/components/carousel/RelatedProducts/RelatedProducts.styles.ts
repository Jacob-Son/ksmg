import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const RelatedProductsCarouselCSS = css({
  display: 'flex',
  alignItems: 'center',
  overflowX: 'scroll',
  marginTop: 34,
  marginBottom: 200,
  gap: 34,

  '&::-webkit-scrollbar': {
    height: 7,
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: 5,
    background: 'transparent',
  },

  '&:hover': {
    '&::-webkit-scrollbar-thumb': {
      background: color.icon.tertiary,
    },
  },

  [mq.mobile]: {
    marginTop: 12,
    marginBottom: 100,
    padding: '0 20px',
    gap: 20,
  },
});

export const RelatedProductsCarouselItemCSS = css({
  display: 'block',
  width: 140,
  flexShrink: 0,
  cursor: 'pointer',
  color: color.text.primary,
  textDecoration: 'none',
  letterSpacing: '-0.165px',
  overflowY: 'hidden',

  '& img': {
    borderRadius: 12,
    width: 140,
    height: 196,
    aspectRatio: '1 / 1',
  },
  '& p': {
    padding: '0 4px',
  },
});
