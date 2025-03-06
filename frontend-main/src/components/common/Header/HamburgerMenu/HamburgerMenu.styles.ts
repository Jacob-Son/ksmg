import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export const HamburgerMenuCSS = css({
  top: 0,
  left: '-100%',
  zIndex: 3,
  padding: '16px 20px 34px 20px',
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  width: '100%',
  height: '100vh',
  background: '#fff',
  transition: 'left 0.3s ease-in-out',
  letterSpacing: '-0.165px',
});

export const HamburgerMenuNavListCSS = css({
  marginTop: 40,
  gap: 20,
  display: 'flex',
  flexDirection: 'column',
  padding: '0 12px',
  listStyle: 'none',

  '& li': {
    color: color.text.neutral[7][100],
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '110%',
    paddingBottom: 20,
  },
  '& a': {
    boxSizing: 'border-box',
    color: color.text.neutral[7][100],
    textDecoration: 'none',
    cursor: 'pointer',
  },
});
