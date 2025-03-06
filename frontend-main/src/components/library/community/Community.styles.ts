import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { breakpoints, mediaQuery, mq } from 'src/styles/mediaQuery';

export const BodyCSS = css({
  marginTop: 13,
  padding: '120px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  [mq.mobile]: {
    marginTop: 20,
    padding: '0 0 120px 0',
    alignItems: 'flex-start',
  },
});

export const ImageWrapperCSS = css({
  marginTop: 20,
  padding: '19px 30px',
  width: '100%',
  boxSizing: 'border-box',
  position: 'relative',
  '& > div': {
    width: '100%',
    aspectRatio: '475 / 242',
  },
});

export const TextCSS = css({
  lineHeight: '130%',

  [mediaQuery.up(breakpoints.mb_600)]: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export const RouteBtnCSS = css({
  margin: '20px auto 0 auto',
  background: color.purple,
  borderRadius: '99px',
  width: '100%',
  maxWidth: 288,
});

export const SocialNetworkCSS = css({
  marginTop: 40,
  justifyContent: 'center',

  [mq.mobile]: {
    margin: '60px auto 0 auto',
  },
});
