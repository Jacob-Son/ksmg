import React, { useEffect } from 'react';
import ModalPortal from '../Portal';
import { useToast } from 'src/stores/toast/toast.store';
import { ToastCSS } from './Toast.styles';
import { ToastPosition } from 'src/stores/toast/toast.types';
import { css } from '@emotion/react';

export default function Toast() {
  const { message, options, toastOpen, closeToast } = useToast((state) => ({
    message: state.message,
    options: state.options,
    toastOpen: state.toastOpen,
    closeToast: state.closeToast,
  }));
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    if (!toastOpen) return;
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, options.duration);
    setTimeout(() => {
      closeToast();
    }, options.duration + options.speed);
  }, [toastOpen]);

  if (!toastOpen) return null;
  return (
    <ModalPortal>
      <div
        css={[
          ToastCSS,
          css({
            transitionDuration: `${options.speed}ms`,
            ...(isVisible && {
              opacity: 1,
            }),
            ...(options.position === ToastPosition.TOP
              ? {
                  top: isVisible ? 140 : 120,
                }
              : {
                  bottom: isVisible ? 110 : 90,
                }),
          }),
        ]}
      >
        <p>{message}</p>
      </div>
    </ModalPortal>
  );
}
