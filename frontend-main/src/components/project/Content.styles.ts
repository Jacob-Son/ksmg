import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const ContentFlexCSS = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',

  [mq.mobile]: {
    alignItems: 'center',
  },
});

export const ContentDecorationCSS = css({
  width: 39,
  borderTop: '4px solid #fff',
});

export const ContentTitleCSS = css({
  marginTop: 30,
  fontSize: 22,
  fontWeight: 600,
  lineHeight: '100%',

  [mq.mobile]: {
    marginTop: 14,
    fontSize: 18,
    lineHeight: '110%',
  },
});

export const ContentDescriptionCSS = css({
  marginTop: 16,
  color: color.text.secondary,
  lineHeight: '130%',

  '& span': {
    color: '#fff',
  },

  [mq.mobile]: {
    marginTop: 14,
  },
});
