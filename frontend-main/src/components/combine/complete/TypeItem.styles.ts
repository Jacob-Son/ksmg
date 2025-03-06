import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const CombineItemCSS = css({
  padding: '14px 16px 20px 16px',
  background: color.background.container.charcoal,
  borderRadius: 8,
  display: 'flex',
  flexDirection: 'column',
});

export const ImageWrapperCSS = (background: string) =>
  css({
    margin: '6px auto 0 auto',
    width: '100%',
    height: 200,
    background: `url(${background}) no-repeat center center`,
    backgroundSize: 'contain',

    [mq.mobile]: {
      height: 'auto',
      aspectRatio: '1 / 1',
    },
  });

export const TextCSS = css({
  marginTop: 10,
  fontSize: 24,
  fontWeight: 600,
  lineHeight: '120%',
  letterSpacing: '-0.6px',
  color: '#fff',

  [mq.mobile]: {
    fontSize: 20,
    lineHeight: '130%',
    letterSpacing: '-0.165px',
  },
});
