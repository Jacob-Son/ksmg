import { css } from '@emotion/react';

const LoadingCSS = css({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0, 0, 0, 0.5)',
});

const SpinCSS = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: 'rotate 1s infinite linear',
  '@keyframes rotate': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
});

export { LoadingCSS, SpinCSS };
