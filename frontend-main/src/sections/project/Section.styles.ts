import { css } from '@emotion/react';
import { mq } from 'src/styles/mediaQuery';

export const SectionContainerCSS = css({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 110px',
  boxSizing: 'border-box',

  [mq.tablet]: {
    padding: '0 40px',
  },
  [mq.mobile]: {
    padding: '0 20px',
  },
});