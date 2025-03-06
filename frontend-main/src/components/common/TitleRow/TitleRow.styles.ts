import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export const TitleCSS = css({
  fontSize: 22,
  fontWeight: 600,
  lineHeight: '100%',
  letterSpacing: '-0.165px',
});

export const SortTabCSS = css({
  color: color.text.secondary,
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '100%',
  letterSpacing: '-0.165px',
});

export const NavigatorCSS = css({
  marginLeft: 'auto',
  display: 'flex',
  gap: 6,
  height: 'fit-content',
  fontSize: 14,
  lineHeight: '20px',
  letterSpacing: '-0.165px',

  '& button': {
    height: 'fit-content',
  },
  '& p': {
    minWidth: 42,
    textAlign: 'center',
  },
  '& span': {
    color: color.text.secondary,
  },
});
