import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export const PasswordContainerCSS = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const PasswordInputTextCSS = css({
  fontSize: 20,
  fontWeight: 600,
  lineHeight: '120%',
});

export const DotsFlexCSS = css({
  marginTop: 20,
  display: 'flex',
  gap: 16,
});

export const PasswordDotCSS = (isFilled: boolean) =>
  css({
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: isFilled ? color.purple : color.line.secondary,
  });

export const ButtonsGridCSS = css({
  marginTop: 50,
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 20,
});

export const InputButtonCSS = css({
  width: 74,
  height: 74,
  border: 'none',
  borderRadius: 99,
  background: color.background.default,
  fontSize: 28,
  fontWeight: 600,
  lineHeight: '120%',
  color: color.text.primary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.2s ease-in-out',

  '&:active': {
    background: color.icon.secondary,
  },
});
