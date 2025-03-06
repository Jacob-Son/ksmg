import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export const InfoCardHeadCSS = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const EditLinkCSS = css({
  color: `${color.purple} !important`,
  fontSize: 14,
  lineHeight: '120%',
  letterSpacing: '-0.165px',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',

  '& svg': {
    transform: 'scale(0.9)',
    width: 21.6,
    height: 21.6,
  },
});
