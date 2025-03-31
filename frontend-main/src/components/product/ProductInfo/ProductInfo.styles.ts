import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { breakpoints, mediaQuery, mq } from 'src/styles/mediaQuery';

export const ProductInfoContainerCSS = css({
  display: 'flex',
  width: '100%',
  height: 'fit-content',
  boxSizing: 'border-box',
  gap: 50,
  marginTop: 16,

  [mq.mobile]: {
    flexDirection: 'column',
    padding: '0 20px 16px 20px',
    gap: 0,
    borderBottom: `8px solid ${color.background.container.primary}`,
  },
  [mediaQuery.between(breakpoints.tb_768, breakpoints.tb_1076)]: {
    paddingTop: '16px',
  },
});

export const ImageSectionCSS = css({
  position: 'relative',
  width: '100%',
  height: 'auto',
  flexShrink: 0,

  [mediaQuery.up(breakpoints.mb_600)]: {
    width: '45%',
    maxWidth: 470,
    height: 'auto', // 모바일에서 자동 높이 조정
    marginBottom: 'auto',
  },


  '& img': {
    width: '100%',
    height: 'auto',
    objectFit: 'contain', // ✨ 비율 유지하면서 꽉 차게 조정
    borderRadius: 10, // 모서리 둥글게 (필요하면 추가)
  },

  '& .badge-section': {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 7,
    top: 24,
    left: 23,
  },
});

export const InfoSectionCSS = css({
  marginTop: 20,
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  gap: 16,

  [mq.mobile]: {
    marginTop: 16,
  },
});

export const ProductTypeCSS = css({
  color: color.purple,
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '100%',
  letterSpacing: '-0.165px',
});

export const ProductTitleCSS = css({
  marginTop: 10,
  color: color.text.primary,
  fontSize: 28,
  fontWeight: 600,
  lineHeight: '120%',
  letterSpacing: '-0.165px',
});

export const ProductCreatorNameCSS = css({
  marginTop: 4,
  color: color.text.secondary,
  fontSize: 16,
  fontWeight: 400,
  lineHeight: '130%',
  letterSpacing: '-0.165px',
});

export const SimilarProductsLinkWrapperCSS = css({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  paddingTop: 16,
  borderTop: `1px solid ${color.line.secondary}`,
});

export const SimilarProductsLinkCSS = css({
  display: 'flex',
  alignItems: 'center',
  fontSize: 16,
  fontWeight: 400,
  lineHeight: '120%',
  color: color.purple,
  gap: 6,

  [mq.mobile]: {
    fontSize: 16,
    textDecoration: 'none',
    color: color.text.secondary,
  },
});

export const StatisticsCSS = css({
  display: 'flex',
  gap: 20,
  color: color.text.primary,

  '& div': {
    display: 'flex',
    alignItems: 'center',
    gap: 4,

    '& p': {
      marginTop: 2,
      fontWeight: 400,
      lineHeight: '130%',
      letterSpacing: '-0.165px',
    },
  },
});

export const ProductPriceCSS = css({
  display: 'none',
  color: color.text.primary,
  fontSize: '24px',
  fontWeight: 600,
  lineHeight: '100%',
  letterSpacing: '-0.165px',

  '& span': {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '130%',
  },
  [mq.mobile]: {
    display: 'block',
  },
});

export const ProductDescriptionCSS = css({
  color: color.text.secondary,
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '130%',
  letterSpacing: '-0.165px',
});
