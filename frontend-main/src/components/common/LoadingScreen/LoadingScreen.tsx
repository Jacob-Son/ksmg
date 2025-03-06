import React from 'react';
import ModalPortal from '../Portal';
import { LoadingCSS, SpinCSS } from './LoadingScreen.styles';
import LoadingIcon from 'src/icons/LoadingIcon';

function LoadingScreen() {
  return (
    <ModalPortal>
      <div css={LoadingCSS}>
        <div css={SpinCSS}>
          <LoadingIcon />
        </div>
      </div>
    </ModalPortal>
  );
}

export default LoadingScreen;
