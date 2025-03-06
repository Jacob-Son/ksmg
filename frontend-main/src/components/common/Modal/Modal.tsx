import React from 'react';
import ModalPortal from '../Portal';
import {
  AlertModalBackdropCSS,
  ModalDesktopButtonCSS,
} from './AlertModal.styles';
import parse from 'html-react-parser';
import Button from '../Button/Button';
import { css } from '@emotion/react';
import XIcon from 'src/icons/XIcon';
import { ModalContainerCSS } from './Modal.styles';

interface IModalProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  isShow: boolean;
  leftText?: React.ReactNode;
  rightText?: React.ReactNode;
  rightButtonDisabled?: boolean;
  rightButtonColor?: string;
  showLeftButton?: boolean;
  showRightButton?: boolean;
  onClose: () => void;
  onClickLeft?: () => void;
  onClickRight?: () => void;
  [key: string]: unknown;
}

export default function Modal({
  title,
  description,
  children,
  isShow,
  leftText = '취소',
  rightText = '확인',
  rightButtonDisabled = false,
  rightButtonColor,
  showLeftButton = true,
  showRightButton = true,
  onClose,
  onClickLeft,
  onClickRight,
  ...props
}: IModalProps) {
  const handleClickLeft = (e) => {
    e.stopPropagation();
    onClickLeft();
  };
  const handleClickRight = (e) => {
    e.stopPropagation();
    onClickRight();
  };
  if (!isShow) return null;
  return (
    <ModalPortal>
      <div css={AlertModalBackdropCSS} onClick={onClose} />
      <div css={ModalContainerCSS} {...props}>
        <div
          css={css({
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            marginBottom: 40,
          })}
        >
          <button
            type="button"
            onClick={onClose}
            css={css({
              border: 'none',
              background: 'transparent',
              padding: 4,
              marginLeft: 'auto',
              height: 23,
              marginBottom: -6,
            })}
          >
            <XIcon />
          </button>
          {title && <p css={css({ fontSize: 24, fontWeight: 600 })}>{title}</p>}
          {description && <p>{parse(description.replace(/\n/g, '<br/>'))}</p>}
          {children}
        </div>
        <div
          css={{
            display: 'flex',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          {showLeftButton && (
            <Button onClick={handleClickLeft} css={[ModalDesktopButtonCSS]}>
              {leftText}
            </Button>
          )}
          {showRightButton && (
            <Button
              layout="contained"
              onClick={handleClickRight}
              disabled={rightButtonDisabled}
              css={[
                ModalDesktopButtonCSS,
                css({
                  ...(rightButtonColor && { background: rightButtonColor }),
                }),
              ]}
            >
              {rightText}
            </Button>
          )}
        </div>
      </div>
    </ModalPortal>
  );
}
