import { css } from '@emotion/react';
import { mq } from 'src/styles/mediaQuery';
import { maxWidth } from 'src/styles/styles';

export const ContainerCSS = css({
  margin: '0 auto',
  padding: '0 30px 180px 30px',
  width: '100%',
  maxWidth: maxWidth,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',

  [mq.mobile]: {
    padding: '0 20px 40px 20px',
  },
});

export const HeadCSS = css({
  fontSize: 20,
  fontWeight: 600,
  lineHeight: '120%',
});

export const PaginationCSS = css({
  margin: '46px auto 0 auto',
  gap: 6,

  [mq.mobile]: {
    width: '100%',
    margin: 0,
    padding: '60px 20px',
    boxSizing: 'border-box',
  },
});
