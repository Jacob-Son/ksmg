import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const CardWrapperCSS = css({
  background: '#0D1114',
  borderRadius: 13,
  padding: '30px 30px 21px 30px',
  opacity: 0,
  transition: '0.3s all ease-in-out',
  transform: 'translateY(10%)',

  '&.show': {
    opacity: 1,
    transform: 'translateY(0)',
  },

  [mq.mobile]: {
    opacity: 1,
    transition: 'none',
    transform: 'translateY(0)',
  },
});

export const CardContentTextCSS = css({
  color: color.text.secondary,
  fontSize: 20,
  lineHeight: '140%',
});

export const CardProfileFlexCSS = css({
  marginBottom: 20,
  gap: 20,
  display: 'flex',
  alignItems: 'center',
});

export const CardProfileTextColumnCSS = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
});

export const NameCSS = css({
  fontSize: 18,
  fontWeight: 600,
  lineHeight: '120%',
});

export const IntroductionCSS = css({
  color: color.text.secondary,
  fontSize: 14,
  lineHeight: '120%',
});
