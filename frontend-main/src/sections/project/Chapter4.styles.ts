import { css } from '@emotion/react';
import { mq } from 'src/styles/mediaQuery';

export const CardFlexCSS = css({
  marginTop: 40,
  gap: 20,
  display: 'flex',

  [mq.mobile]: {
    flexDirection: 'column',
  },
  [mq.desktop]: {
    marginTop: 50,
    padding: '0 20px',
  },
});

export const CardColumnCSS = css({
  flex: 1,
  gap: 20,
  display: 'flex',
  flexDirection: 'column',
});

