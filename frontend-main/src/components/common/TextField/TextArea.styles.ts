import { css } from '@emotion/react';
import { TextFieldCSS } from './TextField.styles';

export const TextAreaCSS = [
  TextFieldCSS,
  css({
    padding: '20px',
    height: 'auto',
    resize: 'none',

    '&::-webkit-scrollbar': {
      display: 'none',
    },
  }),
];
