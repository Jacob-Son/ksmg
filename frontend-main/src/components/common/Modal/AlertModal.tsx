import React from 'react';
import ModalPortal from '../Portal';
import {
  AlertModalBackdropCSS,
  DesktopModalContainerCSS,
  ModalButtonCSS,
  ModalContainerCSS,
  ModalDesktopButtonCSS,
} from './AlertModal.styles';
import parse from 'html-react-parser';
import { color } from 'src/styles/colors';
import Button from '../Button/Button';
import { css } from '@emotion/react';
import XIcon from 'src/icons/XIcon';

interface IModalProps {
  title?: string;
  description?: string;
  isShow: boolean;
  cancelText?: React.ReactNode;
  confirmText?: React.ReactNode;
  layout?: 'normal' | 'desktop';
  isCloseButtonVisible?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function AlertModal({
  title,
  description,
  isShow,
  cancelText = '취소',
  confirmText = '확인',
  layout = 'normal',
  isCloseButtonVisible = true,
  onCancel,
  onConfirm,
}: IModalProps) {
  const handleCancel = (e) => {
    e.stopPropagation();
    onCancel();
  };
  const handleConfirm = (e) => {
    e.stopPropagation();
    onConfirm();
  };
  if (!isShow) return null;
  return (
    <ModalPortal>
      <div css={AlertModalBackdropCSS} onClick={handleCancel} />
      {layout === 'normal' ? (
        <div css={ModalContainerCSS}>
          <div
            css={{
              padding:
                title && description
                  ? '22px 20px 26px 20px'
                  : '34px 20px 30px 20px',
              textAlign: 'center',
              fontSize: '17px',
              lineHeight: '140%',
              letterSpacing: '-0.165px',
            }}
          >
            {title && <p css={{ fontWeight: 600 }}>{title}</p>}
            {description && (
              <p
                css={{
                  marginTop: title ? 12 : 0,
                  '& span': { color: color.purple },
                }}
              >
                {parse(description.replace(/\n/g, '<br/>'))}
              </p>
            )}
          </div>
          <div
            css={{
              display: 'grid',
              borderTop: `1px solid ${color.border.primary}`,
              backgroundColor: color.border.primary,
              gap: 1,
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
          >
            <button type="button" css={ModalButtonCSS} onClick={handleCancel}>
              {cancelText || '취소'}
            </button>
            <button type="button" css={ModalButtonCSS} onClick={handleConfirm}>
              {confirmText || '확인'}
            </button>
          </div>
        </div>
      ) : (
        <div css={DesktopModalContainerCSS}>
          <div
            css={css({
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              marginBottom: 40,
            })}
          >
            {isCloseButtonVisible && (
              <button
                type="button"
                onClick={handleCancel}
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
            )}
            {title && <p css={css({ fontWeight: 600 })}>{title}</p>}
            {description && <p>{parse(description.replace(/\n/g, '<br/>'))}</p>}
          </div>
          <div
            css={{
              display: 'flex',
              justifyContent: 'center',
              gap: 10,
              padding: '0 20px',
            }}
          >
            <Button onClick={handleCancel} css={ModalDesktopButtonCSS}>
              {cancelText || '취소'}
            </Button>
            <Button
              layout="contained"
              onClick={handleConfirm}
              css={ModalDesktopButtonCSS}
            >
              {confirmText || '확인'}
            </Button>
          </div>
        </div>
      )}
    </ModalPortal>
  );
}
