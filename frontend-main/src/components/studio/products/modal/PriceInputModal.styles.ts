import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export const ModalTitleCSS = css({
  fontSize: 22,
  fontWeight: 600,
  lineHeight: '100%',
});

export const CurrentPriceCSS = css({
  marginTop: 12,
  paddingBottom: 10,
  color: color.purple,
  lineHeight: '130%',
  width: '100%',
  textAlign: 'left',
  borderBottom: `1px solid ${color.border.primary}`,
});

export const ProductTypeTextCSS = css({
  color: color.purple,
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '100%',
  letterSpacing: '-0.165px',
});

export const ProductTitleTextCSS = css({
  marginTop: 8,
  fontSize: 22,
  fontWeight: 600,
  lineHeight: '100%',
  letterSpacing: '-0.165px',
});

export const ModalButtonsRowCSS = css({
  marginTop: 50,
  gap: 10,
  display: 'flex',
});
