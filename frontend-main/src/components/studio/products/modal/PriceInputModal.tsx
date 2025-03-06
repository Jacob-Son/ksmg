import React from 'react';
import ModalPortal from 'src/components/common/Portal';
import {
  AlertModalBackdropCSS,
  DesktopModalContainerCSS,
  ModalDesktopButtonCSS,
} from 'src/components/common/Modal/AlertModal.styles';
import { css } from '@emotion/react';
import XIcon from 'src/icons/XIcon';
import { CurrentPriceCSS, ModalTitleCSS } from './PriceInputModal.styles';
import { addComma, onlyNumber } from 'src/utils/format';
import Button from 'src/components/common/Button/Button';
import {
  PriceInputCSS,
  TextFieldCSS,
} from 'src/components/common/TextField/TextField.styles';
import { color } from 'src/styles/colors';

interface IPriceInputModalProps {
  isShow: boolean;
  price: number;
  onCancel: () => void;
  onConfirm: (price: number) => Promise<void>;
}

export default function PriceInputModal(props: IPriceInputModalProps) {
  const [inputPrice, setInputPrice] = React.useState('');

  const handleCancel = (e) => {
    e.stopPropagation();
    props.onCancel();
  };
  const handleChange = (e) => {
    e.preventDefault();
    const value = onlyNumber(e.target.value);

    setInputPrice(value);
    e.target.value = addComma(value);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  const handleConfirm = async (e) => {
    e.stopPropagation();
    await props.onConfirm(Number(inputPrice));
  };

  if (!props.isShow) return null;
  return (
    <ModalPortal>
      <div css={AlertModalBackdropCSS} onClick={handleCancel} />
      <div
        css={[
          DesktopModalContainerCSS,
          css({
            padding: '12px 20px 20px 20px',
            maxWidth: 380,
            width: 'calc(100% - 40px)',
            boxSizing: 'border-box',
          }),
        ]}
      >
        <div
          css={css({
            display: 'flex',
          })}
        >
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
        </div>
        <div
          css={css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            letterSpacing: '-0.165px',
          })}
        >
          <p css={ModalTitleCSS}>가격 수정하기</p>
          <p css={CurrentPriceCSS}>현재 가격 : {addComma(props.price)}원</p>

          <div
            css={css({
              marginTop: 40,
              gap: 12,
              display: 'flex',
              flexDirection: 'column',
              padding: '0 8px',
              textAlign: 'left',
              letterSpacing: '-0.165px',
            })}
          >
            <p
              css={css({
                fontWeight: 600,
                lineHeight: '100%',
                '& span': { color: color.text.secondary },
              })}
            >
              수정 금액 <span>(원 단위)</span>
            </p>
            <p css={css({ color: color.text.secondary, lineHeight: '130%' })}>
              보유하신 재고에 일괄 적용됩니다.
            </p>
          </div>

          <div css={[PriceInputCSS, css({ marginTop: 8 })]}>
            <input
              type="text"
              placeholder="판매하실 금액을 입력해주세요"
              maxLength={50}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              css={[TextFieldCSS, css({ textAlign: 'right' })]}
            />
          </div>
        </div>

        <Button
          layout="contained"
          onClick={handleConfirm}
          css={[ModalDesktopButtonCSS, css({ marginTop: 50, width: '100%' })]}
        >
          적용하기
        </Button>
      </div>
    </ModalPortal>
  );
}
