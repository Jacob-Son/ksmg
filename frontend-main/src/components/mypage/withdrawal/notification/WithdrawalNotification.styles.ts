import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const NotificationContainerCSS = css({
  padding: '0 16px',
  lineHeight: '130%',

  [mq.mobile]: {
    padding: 0,
  },
});

export const NotificationListCSS = css({
  marginTop: 20,
  display: 'flex',
  flexDirection: 'column',
  listStyleType: '"·  "',
  paddingLeft: 18,
  gap: 8,

  '& li': {
    color: color.text.secondary,
    fontSize: 12,
    lineHeight: '120%',
  },
});
