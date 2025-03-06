import { css } from '@emotion/react';
import React from 'react';
import {
  AlertModalBackdropCSS,
  DesktopModalContainerCSS,
} from 'src/components/common/Modal/AlertModal.styles';
import ModalPortal from 'src/components/common/Portal';
import XIcon from 'src/icons/XIcon';

export default function InstructionModal(props: {
  open: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  onClose: () => void;
}) {
  if (!props.open) return null;
  return (
    <ModalPortal>
      <div css={AlertModalBackdropCSS} onClick={props.onClose} />
      <div
        css={[
          DesktopModalContainerCSS,
          css({
            textAlign: 'left',
            letterSpacing: '-0.165px',
            width: 'calc(100% - 40px)',
            maxWidth: 380,
            boxSizing: 'border-box',
          }),
        ]}
      >
        <div
          css={css({
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          })}
        >
          <button
            type="button"
            onClick={props.onClose}
            css={css({
              border: 'none',
              background: 'transparent',
              padding: 4,
              marginLeft: 'auto',
              height: 23,
            })}
          >
            <XIcon />
          </button>
        </div>
        {props.title && (
          <p
            css={css({
              marginTop: 4,
              fontSize: 22,
              fontWeight: 600,
              lineHeight: '100%',
            })}
          >
            {props.title}
          </p>
        )}
        {props.description && (
          <p css={css({ marginTop: 20, lineHeight: '130%' })}>
            {props.description}
          </p>
        )}
        {props.children}
      </div>
    </ModalPortal>
  );
}
