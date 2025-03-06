import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export const PriceInputCSS = css({
  position: 'relative',
  width: '100%',

  '& input:not(:placeholder-shown)': {
    paddingRight: 40,
  },

  '&:has(input:not(:placeholder-shown))': {
    '&::after': {
      content: '"원"',
      position: 'absolute',
      top: '50%',
      right: 16,
      fontSize: 16,
      fontWeight: 600,
      transform: 'translateY(-50%)',
    },
  },
});

export const TextFieldCSS = css({
  padding: '0 16px 0 20px',
  width: '100%',
  height: 68,
  boxSizing: 'border-box',
  border: `1px solid ${color.border.primary}`,
  borderRadius: 8,
  fontSize: 18,
  fontWeight: 600,
  lineHeight: '100%',
  letterSpacing: '-0.165px',
  outline: 'none',
  '&:focus': {
    border: `1px solid ${color.border.secondary}`,
  },
  '&::placeholder': {
    color: color.text.secondary,
    fontSize: 16,
  },
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
  },
});

export const TextFieldInfoCSS = css({
  display: 'flex',
  color: color.text.secondary,

  '& p': {
    marginTop: 4,
    padding: '0 6px',
  },
});
