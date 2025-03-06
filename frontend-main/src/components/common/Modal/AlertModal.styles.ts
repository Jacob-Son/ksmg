import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export const AlertModalBackdropCSS = css`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  cursor: pointer;
`;

export const ModalContainerCSS = css`
  z-index: 100;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${color.background.container.primary};
  border-radius: 12px;
  width: 312px;
  color: ${color.text.primary};
  overflow: hidden;
`;

export const DesktopModalContainerCSS = [
  ModalContainerCSS,
  css({
    borderRadius: 8,
    width: 380,
    background: '#fff',
    padding: '20px 20px 30px 20px',
    textAlign: 'center',
    fontSize: '18px',
    lineHeight: '140%',
    letterSpacing: '-0.165px',
  }),
];

export const ModalButtonCSS = css`
  cursor: pointer;
  padding: 20px;
  border: none;
  background: #fff;
  color: ${color.text.primary};
  font-size: 17px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.165px;
`;

export const ModalDesktopButtonCSS = css`
  flex: 1;
  height: 50px;
`;
