import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const ProductCarouselCSS = (perPage: number) =>
  css({
    display: 'flex',
    alignItems: 'center',
    overflowX: 'scroll',
    marginTop: 24,
    marginBottom: 24, /* 기존보다 조금 더 넓게 조정 */
    gap: 24,

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

    [mq.desktop]: {
      display: 'grid',
      overflow: 'hidden',
      gridTemplateColumns: `repeat(${perPage}, 1fr)`,
    },
  });

export const CarouselSortTabCSS = css({
  color: color.text.secondary,
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '100%',
  letterSpacing: '-0.165px',
});

export const ProductCarouselItemCSS = css({
  display: 'block',
  flexShrink: 0,
  cursor: 'pointer',
  color: color.text.primary,
  textDecoration: 'none',
  letterSpacing: '-0.165px',

  '& p': {
    padding: '0 6px',
  },
});

export const CarouselItemImgWrapperCSS = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: 'auto',
  // background: color.background.container.imageWrapper,
  // background: color.background.container.imageWrapper,
  fontSize: 14,
  lineHeight: '100%',

  '& img': {
    borderRadius: 3.228,
    // boxShadow: `-6px 8px 7.2px 0px rgba(0, 0, 0, 0.36)`,
    objectFit: 'cover', // ✅ 비율 유지하며 꽉 차게
    width: '100%', // ✅ 부모 크기에 맞추기
    height: '100%', // ✅ 부모 크기에 맞추기
  },
});

export const ProductCarouselRankCSS = css({
  position: 'absolute',
  bottom: 10,
  left: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 47,
  height: 49,
  borderRadius: 8.62,
  background: 'rgba(0, 0, 0, 0.17)',
  backdropFilter: 'blur(25px)',

  '& p': {
    color: '#fff',
    textShadow: '0px 2px 4px rgba(0, 0, 0, 0.13)',
    fontFamily: "'Source Serif 4', serif",
    fontSize: 39.78,
    fontWeight: 600,
    lineHeight: '100%',
    letterSpacing: '-0.789px',
  },
});

export const RankItemImageWrapperCSS = (width: number, height: number) =>
  css({
    position: 'relative',
    width: width,
    height: height,
    background: color.background.container.imageWrapper,
    overflow: 'hidden',

    [mq.desktop]: {
      width: '100%',
      aspectRatio: `${width} / ${height}`,
      height: 'fit-content',
    },
  });
