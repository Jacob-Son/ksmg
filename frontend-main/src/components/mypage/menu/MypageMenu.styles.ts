import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const MenusContainerCSS = css({
  padding: '0 20px',

  [mq.mobile]: {
    padding: 0,
  },
});

export const MenuNameCSS = css({
  padding: '9px 0',
  fontSize: 18,
  fontWeight: 600,
  lineHeight: '110%',
  borderBottom: '2px solid #000',
});

export const LinkListCSS = css({
  marginTop: 10,
  width: '100%',
});

export const LinkItemCSS = css({
  display: 'flex',
  padding: '16px 6px',
  justifyContent: 'space-between',
  color: color.text.primary,
  lineHeight: '130%',
  textDecoration: 'none',
  borderBottom: `0.5px solid ${color.line.secondary}`,
});
