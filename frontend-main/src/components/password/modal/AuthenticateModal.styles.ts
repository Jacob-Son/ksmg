import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export const ButtonFlexCSS = css({
  marginTop: 40,
  display: 'flex',
  width: '100%',
});

export const FindPasswordButtonCSS = css({
  margin: '0 auto',
  width: 'fit-content',
  color: color.purple,
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '100%',
  border: 'none',
  background: 'none',

  '&:active': {
    border: 'none',
    background: 'none',
  },
});

export const CheckFlexCSS = css({
  marginTop: 12,
  gap: 6,
  display: 'flex',
});

export const CheckTextsFlexCSS = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  fontSize: 12,
  lineHeight: '120%',
  color: color.text.secondary,
});

export const CheckTextMainCSS = css({
  color: color.text.primary,
  fontSize: 14,
});
