import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { breakpoints, mediaQuery, mq } from 'src/styles/mediaQuery';

export const ProductItemImgWrapperCSS = css({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: 266,
  background: color.background.container.imageWrapper,
  lineHeight: '130%',
  overflow: 'hidden',

  '& img': {
    borderRadius: 3.228,
    boxShadow: `-6px 8px 7.2px 0px rgba(0, 0, 0, 0.36)`,
    objectFit: 'cover',
  },
});

export const SoldOutTagCSS = css({
  position: 'absolute',
  color: '#fff',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '100%',
  zIndex: 1,

  [mq.mobile]: {
    padding: '14px 16px',
    width: '100%',
    bottom: 0,
    boxSizing: 'border-box',
    textAlign: 'center',
    backdropFilter: 'blur(10px)',
    background: 'rgba(27, 27, 27, 0.60)',
  },
  [mediaQuery.up(breakpoints.mb_600)]: {
    background: color.background.container.black,
    padding: '10px 16px',
    top: 0,
    right: 0,
  },
});

export const ProductItemInfoCSS = css({
  marginTop: 12,
  color: color.purple,
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '120%',
});

export const ProductItemTitleCSS = css({
  marginTop: 4,
  fontSize: 18,
  fontWeight: 600,
  lineHeight: '110%',
});

export const ProductItemPriceCSS = css({
  marginTop: 8,
  fontWeight: 600,
  lineHeight: '100%',
});
