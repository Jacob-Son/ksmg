import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export const ModalContainerCSS = css`
  z-index: 100;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 20px 30px 20px;
  background: #fff;
  box-sizing: border-box;
  border-radius: 12px;
  width: calc(100% - 40px);
  max-width: 380px;
  letter-spacing: -0.165px;
  color: ${color.text.primary};
  overflow: hidden;
`;
