import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';
import { maxWidth } from 'src/styles/styles';

export const LayoutCSS = css({
  marginTop: 100,
  paddingLeft: 30,
  paddingRight: 30,
  paddingBottom: 400,
  gap: 40,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: maxWidth,
  boxSizing: 'border-box',
  letterSpacing: '-0.165px',

  [mq.mobile]: {
    marginTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export const ButtonWrapperCSS = css({
  marginTop: 20,
  display: 'flex',
  justifyContent: 'center',
  width: '100%',

  [mq.mobile]: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    borderTop: `1px solid ${color.border.primary}`,
    background: '#fff',
    padding: '12px 20px 30px 20px',
    boxSizing: 'border-box',
  },
});

export const ButtonCSS = css({
  width: '100%',
  maxWidth: 308,
  [mq.mobile]: {
    maxWidth: 'none',
    height: 50,

    '&[disabled]': {
      background: color.background.container.gray,
      color: color.text.primary,
    },
  },
});

export const FormNameCSS = css({
  fontWeight: 600,
  lineHeight: '100%',
  color: color.text.secondary,
});

export const FormWrapperCSS = css({
  padding: '0 16px',
  [mq.mobile]: {
    padding: 0,
  },
});
