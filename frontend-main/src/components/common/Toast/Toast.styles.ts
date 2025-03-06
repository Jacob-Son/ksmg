import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export const ToastCSS = css({
  padding: '10px 30px',
  position: 'fixed',
  left: '50%',
  opacity: 0,
  transform: 'translateX(-50%)',
  transitionProperty: 'transform, opacity, top, bottom',
  transitionTimingFunction: 'ease-in-out',
  lineHeight: '130%',
  letterSpacing: '-0.165px',
  color: '#fff',
  background: `${color.icon.primary}E5`,
  borderRadius: 8,
});
