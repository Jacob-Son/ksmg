import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { TextFieldCSS as TextFieldCommonCSS } from './NFTForm.styles';
import { mq } from 'src/styles/mediaQuery';

export const TextFieldCSS = [
  TextFieldCommonCSS,
  css({
    marginTop: 20,
    fontWeight: 500,
  }),
];

export const RadioFormCSS = css({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 20,
  gap: 16,
});

export const RadioFlexCSS = css({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  fontSize: 18,
  lineHeight: '140%',
});

export const RadioCSS = css({
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none',
  margin: 2,
  width: 20,
  height: 20,
  boxShadow: `0 0 0 1px ${color.icon.secondary}`,
  borderRadius: '50%',

  '&:checked': {
    boxShadow: `0 0 0 1px ${color.purple}`,
    border: '3.5px solid #fff',
    background: color.purple,
  },
});

export const ImageUploadFlexCSS = css({
  display: 'flex',
  gap: 50,

  [mq.mobile]: {
    gap: 40,
    flexDirection: 'column',
  },
});

export const ImageUploadCSS = css({
  [mq.mobile]: {
    width: '100%',
  },
});

export const CoversGridCSS = css({
  display: 'grid',
  flex: 1,
  gridTemplateColumns: 'repeat(auto-fill, 170px)',
  gap: '4px 20px',

  [mq.mobile]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});
