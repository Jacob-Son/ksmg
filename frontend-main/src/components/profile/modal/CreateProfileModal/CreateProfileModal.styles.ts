import { css } from '@emotion/react';
import { DesktopModalContainerCSS } from 'src/components/common/Modal/AlertModal.styles';
import { color } from 'src/styles/colors';

export const ModalBodyCSS = [
  DesktopModalContainerCSS,
  css({
    padding: '12px 20px 20px 20px',
    maxWidth: 500,
    width: 'calc(100% - 40px)',
    maxHeight: 'calc(100vh - 40px)',
    boxSizing: 'border-box',
    textAlign: 'left',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  }),
];

export const ModalTitleCSS = css({
  marginTop: 4,
  fontSize: 22,
  fontWeight: 600,
  lineHeight: '100%',
  letterSpacing: '-0.165px',
});

export const ModalTextCSS = css({
  lineHeight: '130%',
  letterSpacing: '-0.165px',
});

export const WarningListCSS = css({
  margin: 0,
  paddingLeft: 20,
  color: color.text.secondary,
  '& li': {
    marginTop: 21,
  },
});
