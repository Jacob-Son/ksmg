import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const NoticesColumnCSS = css({
  marginTop: 12,
  paddingTop: 12,
  gap: 12,
  display: 'flex',
  flexDirection: 'column',
  borderTop: '3px solid #000',
});

export const NoticeItemCSS = css({
  // maxWidth: 600,
  padding: '10px 0px 10px 0px',
  display: 'flex',
  boxSizing: 'border-box',
  textDecoration: 'none',
  color: color.text.secondary,
  letterSpacing: '-0.165px',
  fontWeight: 300,
  lineHeight: '120%',

  '& img': {
    borderRadius: 3,
    background: color.skeleton,
    // marginRight: 20,
  },
  [mq.mobile]: {
    flexDirection: 'column',

    '& img': {
      width: '100%',
      height: 'auto',
      maxWidth: '100%',
      objectFit: 'cover',
    },
  },
});

export const NoticeItemTitleCSS = css({
  color: color.text.primary,
  fontWeight: 600,
  lineHeight: '100%',
  maxWidth: 165,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});

export const NoticeItemDateCSS = css({
  fontSize: 12,
});

export const NoticeItemDescriptionCSS = css({
  marginTop: 8,
  fontSize: 14,
  maxWidth: 250,
  width: '100%',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});
