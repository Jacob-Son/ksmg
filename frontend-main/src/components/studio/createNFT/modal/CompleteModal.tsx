import React from 'react';
import {
  ImageWrapperCSS,
  ModalBodyCSS,
  ModalTitleCSS,
} from './CompleteModal.styles';
import {
  StudioProductItemCSS,
  StudioProductItemPriceCSS,
  StudioProductItemTitleCSS,
} from '../../products/StudioProducts.styles';
import Image from 'next/image';
import { css } from '@emotion/react';
import { addComma } from 'src/utils/format';
import Button from 'src/components/common/Button/Button';
import ModalPortal from 'src/components/common/Portal';
import { AlertModalBackdropCSS } from 'src/components/common/Modal/AlertModal.styles';
import XIcon from 'src/icons/XIcon';

interface ICompleteModalProps {
  data: {
    nftId: number;
    covers: string[];
    name: string;
    category: string;
    theme: string;
    amount: number;
    price: number;
  };
  open: boolean;
  onClose: () => void;
}

export default function CompleteModal({
  data,
  open,
  onClose,
}: ICompleteModalProps) {
  const [copied, setCopied] = React.useState(false);

  if (!open) return null;
  return (
    <ModalPortal>
      <div css={AlertModalBackdropCSS} onClick={onClose} />
      <div css={ModalBodyCSS}>
        <div
          css={css({
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
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
            })}
          >
            <XIcon />
          </button>
          <p css={ModalTitleCSS}>
            축하합니다 🎉
            <br />
            작품이 완성되었습니다
          </p>
          <div
            css={css({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            })}
          >
            <div
              css={[
                StudioProductItemCSS,
                css({ maxWidth: 360, width: '100%' }),
              ]}
            >
              <div css={ImageWrapperCSS}>
                <Image
                  alt="nft cover"
                  src={data.covers[0]}
                  width={154}
                  height={217}
                />
              </div>
              <p css={StudioProductItemTitleCSS}>{data.name}</p>
              <p css={css({ marginTop: 10 })}>
                카테고리: {data.category} &gt; {data?.theme ?? ''}
              </p>
              <p css={css({ marginTop: 4 })}>재고: {data.amount}</p>
              <p
                css={[
                  StudioProductItemPriceCSS,
                  css({
                    marginTop: 10,
                    fontSize: 24,
                  }),
                ]}
              >
                {addComma(data.price)}원
              </p>
            </div>
            <Button
              layout="contained"
              onClick={() => {
                const url = `${process.env.NEXT_PUBLIC_DOMAIN}/store/${data.nftId}`;
                if (window.navigator.share) {
                  window.navigator.share({
                    url: url,
                  });
                } else {
                  window.navigator.clipboard.writeText(url);
                }
                setCopied(true);
              }}
              endAdornment={
                copied ? (
                  <Image
                    alt="checked"
                    src="/icons/ic_checked_purple.svg"
                    width={18}
                    height={19}
                    css={css({
                      marginLeft: 10,
                    })}
                  />
                ) : null
              }
              css={css({
                margin: '40px auto 0 auto',
                padding: '10px 100px',
                fontSize: 18,
                lineHeight: '110%',
                height: 50,
              })}
            >
              {copied ? '링크 복사 완료' : '공유하기'}
            </Button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
