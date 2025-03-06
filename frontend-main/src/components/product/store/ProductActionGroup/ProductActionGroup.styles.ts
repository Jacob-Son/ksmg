import { css } from '@emotion/react';
import { mq } from 'src/styles/mediaQuery';

export const PurchaseButtonsSectionCSS = css({
  background: 'white',
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  margin: '36px 0',

  [mq.mobile]: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    margin: 0,
    gap: 10,
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px 20px 32px 20px',
  },
});

export const LikeButtonCSS = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
