import React from 'react';
import ModalPortal from 'src/components/common/Portal';
import {
  AlertModalBackdropCSS,
  DesktopModalContainerCSS,
  ModalDesktopButtonCSS,
} from 'src/components/common/Modal/AlertModal.styles';
import { css } from '@emotion/react';
import XIcon from 'src/icons/XIcon';
import {
  InfoCSS,
  ModalButtonsRowCSS,
  ModalTitleCSS,
  ProductTitleTextCSS,
  ProductTypeTextCSS,
} from './PriceInputModal.styles';
import Image from 'next/image';
import { addComma, onlyNumber } from 'src/utils/format';
import Button from 'src/components/common/Button/Button';
import {
  PriceInputCSS,
  TextFieldCSS,
} from 'src/components/common/TextField/TextField.styles';
import { Nft } from '~/types/nft';

interface IPriceInputModalProps {
  isShow: boolean;
  data: Nft;
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
    if (!inputPrice || inputPrice === '0') return alert('금액을 입력해주세요');
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
            gap: 20,
          })}
        >
          <p css={ModalTitleCSS}>판매하실 금액을 입력해주세요</p>

          <div css={InfoCSS}>
            <Image
              src={props.data.nftImagePath}
              alt={'product image'}
              width={76}
              height={76}
            />

            <div>
              <p css={ProductTypeTextCSS}>
                {props.data?.theme ? props.data.theme : props.data.category}
              </p>
              <p css={ProductTitleTextCSS}>{props.data.name}</p>
            </div>
          </div>

          <div css={PriceInputCSS}>
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

        <div css={ModalButtonsRowCSS}>
          <Button onClick={handleCancel} css={ModalDesktopButtonCSS}>
            취소
          </Button>
          <Button
            layout="contained"
            onClick={handleConfirm}
            css={ModalDesktopButtonCSS}
          >
            판매하기
          </Button>
        </div>
      </div>
    </ModalPortal>
  );
}
