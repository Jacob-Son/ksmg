import { css } from '@emotion/react';
import { IconButtonCSS } from 'src/components/common/Button/Button.styles';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const StudioProductsContainerCSS = css({
  marginTop: 50,
  padding: '40px 30px 100px 30px',
  background: color.background.container.primary,
  minHeight: 999,
  boxSizing: 'border-box',

  [mq.mobile]: {
    marginTop: 40,
    padding: 20,
  },
});

export const StudioProductsHeadCSS = css({
  margin: '0 10px',
  fontSize: 28,
  fontWeight: 600,
  lineHeight: '120%',

  [mq.mobile]: {
    margin: 0,
  },
});

export const StudioProductsBodyCSS = css({
  marginTop: 40,
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '20px 6px',

  [mq.mobile]: {
    marginTop: 10,
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '40px 6px',
  },
});

export const StudioProductItemCSS = css({
  padding: '10px 0',
});

export const StudioProductItemImgWrapperCSS = css({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: 266,
  background: color.background.container.imageWrapper,
  fontSize: 14,
  lineHeight: '130%',
  overflow: 'hidden',

  '& img': {
    borderRadius: 3.228,
    boxShadow: `-6px 8px 7.2px 0px rgba(0, 0, 0, 0.36)`,
    objectFit: 'cover',
  },
});

export const DeleteButtonCSS = [
  IconButtonCSS,
  css({
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 24,
    height: 24,

    '& > svg > path': {
      fill: color.line.primary,
    },
    '&:hover > svg > path': {
      fill: color.purple,
      transition: 'fill 0.3s',
    },
  }),
];

export const StudioProductItemTitleCSS = css({
  marginTop: 12,
  fontSize: 18,
  fontWeight: 600,
  lineHeight: '120%',
});

export const StudioProductItemPriceCSS = css({
  fontSize: 18,
  fontWeight: 600,
  lineHeight: '120%',
  letterSpacing: '-0.6px',
});

export const PriceEditButtonCSS = css({
  background: 'transparent',
  padding: '8px 12px',
  height: 32,
  borderRadius: 6,
  fontSize: 14,
});

export const StudioProductsNotFoundCSS = css({
  padding: '50px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 40,

  '& p': {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: '140%',
  },
});
