import { css } from '@emotion/react';
import { mq } from 'src/styles/mediaQuery';

export const BidButtonsSectionCSS = css({
  background: 'white',
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '20px 12px',
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

export const BidButtonCSS = css({
  // flexShrink: 0,
  width: '100%',
  [mq.mobile]: {
    flex: 1,
    height: 50,
  },
});

export const LikeButtonCSS = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
