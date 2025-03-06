import { css } from '@emotion/react';
import { IconButtonCSS } from 'src/components/common/Button/Button.styles';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';
import { maxWidth } from 'src/styles/styles';

export const ProductsContainerCSS = css({
  margin: '0 auto',
  padding: '0 30px 180px 30px',
  width: '100%',
  maxWidth: maxWidth,
  minHeight: 999,
  boxSizing: 'border-box',

  [mq.mobile]: {
    padding: '0 20px 40px 20px',
  },
});

export const ProductsHeadCSS = css({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
});

export const ProductsNameCSS = css({
  fontSize: 20,
  fontWeight: 600,
  lineHeight: '120%',
});

export const ProductsLengthCSS = css({
  fontWeight: 600,
  lineHeight: '100%',
  color: color.text.secondary,
});

export const CombinationBtnCSS = css({
  marginLeft: 'auto',
  fontSize: 14,
  height: 40,
});

export const ProductsBodyCSS = css({
  marginTop: 13,
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '20px 4px',

  [mq.tablet]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  [mq.mobile]: {
    marginTop: 20,
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});

export const ProductItemCSS = css({
  paddingBottom: 12,
});

export const ProductItemImgWrapperCSS = css({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: 266,
  background: color.background.container.imageWrapper,
  fontSize: 14,
  lineHeight: '130%',

  '& img': {
    borderRadius: 3.228,
    boxShadow: `-6px 8px 7.2px 0px rgba(0, 0, 0, 0.36)`,
    objectFit: 'cover',
  },
});

export const SellButtonCSS = [
  IconButtonCSS,
  css({
    padding: 9,
    position: 'absolute',
    top: 0,
    right: 0,

    '&:hover > svg > path': {
      fill: color.purple,
      stroke: color.purple,
      transition: 'color 0.3s ease-in-out',
    },
  }),
];

export const ProductDescriptionCSS = css({
  marginTop: 10,
  fontSize: 14,
  fontWeight: 300,
  lineHeight: '120%',
  color: color.purple,
});

export const ProductItemTitleCSS = css({
  marginTop: 4,
  fontSize: 18,
  fontWeight: 600,
  lineHeight: '110%',
});

export const ProductItemPriceCSS = css({
  marginTop: 4,
  lineHeight: '130%',

  '& span': {
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '110%',
  },
});

export const ProductsNotFoundCSS = css({
  marginTop: 13,
  padding: '120px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 36,

  '& p': {
    textAlign: 'center',
    lineHeight: '130%',
  },
});

export const ThreeDotsMenuCSS = css`
  position: absolute;
  top: 12px;
  right: 8px;

  & > div {
    display: none;
  }
  &:hover {
    & svg path {
      fill: ${color.purple};
    }
    & > div {
      display: block;
    }
  }
`;

export const ThreeDotsDropdownCSS = css`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: calc(100% + 4px);
`;
