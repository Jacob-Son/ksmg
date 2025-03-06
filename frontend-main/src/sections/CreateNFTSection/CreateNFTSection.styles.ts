import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const HeaderCSS = css({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 2,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  background: '#fff',
  boxSizing: 'border-box',
  padding: '16px 20px',
});

export const ProgressTextCSS = css({
  color: color.text.secondary,
  fontSize: 18,
  lineHeight: '140%',
});

export const TitleCSS = css({
  marginTop: 12,
  fontSize: 40,
  lineHeight: '120%',
});

export const DescriptionCSS = css({
  marginTop: 12,
  fontSize: 18,
  lineHeight: '140%',

  '& span': {
    color: color.purple,
  },
});

export const ButtonsFlexCSS = css({
  gap: 20,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const PrevBtnCSS = css({
  background: color.background.container.gray,
  width: 60,

  [mq.mobile]: {
    display: 'none',
  },
});

export const NextBtnCSS = css({
  width: 288,
  [mq.mobile]: {
    width: '100%',
  },
});
