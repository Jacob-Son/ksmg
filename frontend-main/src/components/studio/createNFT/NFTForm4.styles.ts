import { css } from '@emotion/react';
import { TextFieldCSS as TextFieldCommonCSS } from './NFTForm.styles';
import { color } from 'src/styles/colors';

export const TextFieldCSS = [
  TextFieldCommonCSS,
  css({
    marginTop: 20,
    fontWeight: 500,
  }),
];

export const BankFormGridCSS = css({
  marginTop: 20,
  gap: 10,
  display: 'grid',
  gridTemplateColumns: '100px 1fr',

  '& p': {
    fontWeight: 600,
    color: color.text.secondary,
  },
});

export const BankSelectCSS = css({
  background:
    "#fff url('/icons/select/ic_dropdown_arrow.svg') no-repeat center right 16px",
  paddingRight: 32,
});
