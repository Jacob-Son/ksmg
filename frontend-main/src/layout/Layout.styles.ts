import { css } from '@emotion/react';
import { mq } from 'src/styles/mediaQuery';
import { maxWidth } from 'src/styles/styles';

export const ContainerCSS = css({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: maxWidth,
  margin: '0 auto',
  paddingTop: 70,
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',

  [mq.mobile]: {
    paddingTop: 56,
  },
});
