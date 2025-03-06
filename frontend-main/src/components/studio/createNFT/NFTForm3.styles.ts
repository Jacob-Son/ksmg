import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const InstructionsCSS = css({
  marginTop: 60,
  fontSize: 18,
  lineHeight: '140%',
});

export const PagesGridCSS = css({
  marginTop: 20,
  gap: '20px 40px',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, 170px)',

  [mq.mobile]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});

export const PageItemContainerCSS = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 9,
});

export const PageInputCSS = css({
  padding: '4px 12px',
  background: color.background.container.gray,
  border: 'none',
  borderRadius: 3,
  width: '3ch',
  fontWeight: 600,
  lineHeight: '100%',
  textAlign: 'center',
  color: color.text.secondary,
  // boxSizing: 'border-box',

  '&:focus': {
    color: color.blue.main,
    outline: `1.4px solid ${color.blue.main}`,
  },
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
  },
});
