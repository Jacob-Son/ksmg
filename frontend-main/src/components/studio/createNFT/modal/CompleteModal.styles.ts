import { css } from '@emotion/react';
import { StudioProductItemImgWrapperCSS } from '../../products/StudioProducts.styles';
import { DesktopModalContainerCSS } from 'src/components/common/Modal/AlertModal.styles';

export const ModalTitleCSS = css({
  fontSize: 28,
  fontWeight: 600,
  lineHeight: '120%',
  textAlign: 'center',
  margin: 'auto',
});

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

export const ImageWrapperCSS = [
  StudioProductItemImgWrapperCSS,
  css({
    height: 330,
  }),
];
ModalTitleCSS;
