import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { IButtonProps } from './Button';

export const NormalButtonCSS = (layout: IButtonProps['layout']) =>
  css({
    padding: '10px 16px',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '100%',
    letterSpacing: '-0.165px',
    borderRadius: 8,
    height: 60,
    cursor: 'pointer',
    ...(layout === 'outlined'
      ? {
          border: `1px solid ${color.icon.primary}`,
          background: '#fff',
          color: color.text.primary,

          '&[disabled]': {
            background: color.icon.secondary,
            color: color.text.secondary,
          },
        }
      : {
          border: 'none',
          background: color.text.neutral[7][100],
          color: '#fff',

          '&[disabled]': {
            background: color.icon.secondary,
            color: '#fff',
          },
        }),
  });

export const ReaderButtonCSS = css({
  padding: '8px 12px',
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  borderRadius: '99px',
  border: `0.5px solid ${color.line.primary}`,
  background: '#FFFFFF59',
  backdropFilter: 'blur(10px)',
  fontSize: '15px',
  fontWeight: 600,
  lineHeight: '100%',
  letterSpacing: '0.165px',
});

export const IconButtonCSS = css({
  background: 'transparent',
  border: 'none',
  padding: '0',
  cursor: 'pointer',

  '&:focus': {
    border: 'none',
    outline: 'none',
  },
  '&[disabled]': {
    cursor: 'auto',
  },
});
