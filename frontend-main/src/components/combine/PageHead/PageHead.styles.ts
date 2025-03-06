import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const HeadCSS = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 40,
});

export const TitleCSS = css({
  fontSize: 34,
  fontWeight: 600,
  lineHeight: '38px',
  letterSpacing: '-0.6px',
  color: '#fff',

  [mq.mobile]: {
    fontSize: 24,
    lineHeight: '120%',
  },
});

export const DescriptionCSS = css({
  marginTop: 12,
  fontSize: 16,
  lineHeight: '130%',
  color: color.text.secondary,
});
