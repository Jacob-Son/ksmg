import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export const ModalTitleCSS = css({
  fontSize: 22,
  fontWeight: 600,
  lineHeight: '100%',
  letterSpacing: '-0.165px',
});

export const InfoCSS = css({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  padding: '6px 12px',
  gap: 10,
  background: color.background.container.primary,
  borderRadius: 12,
  boxSizing: 'border-box',
  textAlign: 'left',

  '& img': {
    background: color.background.container.image,
    borderRadius: 6.52,
    width: 76,
    height: 76,
  },
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
