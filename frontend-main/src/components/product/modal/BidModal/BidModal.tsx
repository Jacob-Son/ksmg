import { css } from '@emotion/react';
import React from 'react';
import Button from 'src/components/common/Button/Button';
import {
  AlertModalBackdropCSS,
  DesktopModalContainerCSS,
} from 'src/components/common/Modal/AlertModal.styles';
import ModalPortal from 'src/components/common/Portal';
import XIcon from 'src/icons/XIcon';
import { addComma, onlyNumber } from 'src/utils/format';
import {
  PriceInputCSS,
  TextFieldCSS,
} from 'src/components/common/TextField/TextField.styles';
import {
  BidInfoGridCSS,
  BidInputNoticeCSS,
  BidModalContainerCSS,
  BidModalSectionTitleCSS,
  BidNoticesCSS,
  DividerCSS,
  QuickBidBtnsFlexCSS,
  QuickBidButtonCSS,
} from './BidModal.styles';
import { color } from 'src/styles/colors';
import { bidNotice } from './BidModal.constants';
import AlertModal from 'src/components/common/Modal/AlertModal';
import useAccount from 'src/hooks/common/useAccount';
import { useRouter } from 'next/router';
import { auctionApi } from 'src/services/auction_api';

interface IBidModalProps {
  currentPrice: number;
  show: boolean;
  closedAt: Date;
  remainingTime: string;
  onClose: () => void;
  refreshPrice: (newPrice: number) => void;
}

enum BidType {
  QUICK = 'quick',
  MAX = 'max',
}

enum Step {
  INIT = 'init',
  CHECK = 'check',
  SUCCESS = 'success',
  FAIL = 'fail',
}

export default function BidModal(props: IBidModalProps) {
  const router = useRouter();
  const { id } = router.query;
  const { address } = useAccount();

  const [step, setStep] = React.useState<Step>(Step.INIT);
  const [bid, setBid] = React.useState<number | null>(null);
  const [bidType, setBidType] = React.useState<BidType>(null);
  const [higherBid, setHigherBid] = React.useState<number>(0);

  const handleClickQuickBid = (price: number) => {
    setBid(price);
    setBidType(BidType.QUICK);
    setStep(Step.CHECK);
  };
  const handleChange = (e) => {
    e.preventDefault();
    const value = onlyNumber(e.target.value);
    setBid(Number(value));
    e.target.value = addComma(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  const handleUpperBid = () => {
    setBidType(BidType.MAX);
    setStep(Step.CHECK);
  };

  const handleCancel = () => {
    setStep(Step.INIT);
    props.onClose();
  };
  const handleEdit = () => {
    setStep(Step.INIT);
  };
  const handleSubmit = async () => {
    if (bidType === BidType.QUICK) {
      const res = await auctionApi.rapidPlaceBid(String(id), address, bid);
      if (res.success === false) {
        if (res.error === 'highest bid exists') {
          setStep(Step.FAIL);
          setHigherBid(res.data.highestPrice);
          props.refreshPrice(res.data.highestPrice);
        } else {
          alert(res.error);
          console.log(res.error);
          window.location.reload();
        }
      } else {
        props.refreshPrice(res.data.highestPrice);
        setStep(Step.SUCCESS);
      }
    } else if (bidType === 'max') {
      const res = await auctionApi.upperPlaceBid(String(id), address, bid);
      if (res.success === false) {
        if (res.error === 'highest bid exists') {
          setStep(Step.FAIL);
          setHigherBid(res.data.highestPrice);
          props.refreshPrice(res.data.highestPrice);
        } else {
          alert(res.error);
          console.log(res.error);
          window.location.reload();
        }
      } else {
        props.refreshPrice(res.data.highestPrice);
        setStep(Step.SUCCESS);
      }
    }
  };

  const handleRetry = () => {
    setStep(Step.INIT);
  };

  if (!props.show) return null;

  const step0 = (
    <>
      <p css={[BidModalSectionTitleCSS, css({ fontSize: 22 })]}>
        입찰에 참가하기
      </p>
      <p
        css={css({
          marginTop: 12,
          lineHeight: '130%',
          letterSpacing: '-0.165px',
          color: color.purple,
        })}
      >
        현재 최고 입찰가: {addComma(Math.round(props.currentPrice))}원
      </p>

      <div css={DividerCSS} />

      <p css={BidModalSectionTitleCSS}>빠른 응찰</p>
      <div css={QuickBidBtnsFlexCSS}>
        {[
          {
            price: props.currentPrice * 1.1,
            text: '10% 인상',
          },
          {
            price: props.currentPrice * 1.2,
            text: '20% 인상',
          },
          {
            price: props.currentPrice * 1.3,
            text: '30% 인상',
          },
        ].map((item) => (
          <Button
            key={`bid button ${item.text}`}
            onClick={() => handleClickQuickBid(Math.round(item.price))}
            css={QuickBidButtonCSS}
          >
            <p css={css({ fontSize: 14, lineHeight: '100%' })}>
              {addComma(Math.round(item.price))}원
            </p>
            <p
              css={css({
                marginTop: 8,
                fontSize: 12,
                fontWeight: 300,
                lineHeight: '120%',
              })}
            >
              {item.text}
            </p>
          </Button>
        ))}
      </div>

      <p css={BidModalSectionTitleCSS}>상한가 응찰</p>
      <p css={BidInputNoticeCSS}>
        적어주신 최대금액에 도달 할 때까지
        <br />
        현재 호가에 자동으로 <span>5%</span>씩 높여 응찰됩니다.
      </p>

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

      <Button
        onClick={handleUpperBid}
        disabled={bid === null}
        layout="contained"
        css={css({ marginTop: 20, width: '100%' })}
      >
        응찰하기
      </Button>
    </>
  );

  const step1 = (
    <>
      <p css={[BidModalSectionTitleCSS, css({ fontSize: 22 })]}>입찰 검토</p>

      <div css={BidInfoGridCSS}>
        <p>현재 입찰가</p>
        <p>{addComma(props.currentPrice)}원</p>

        <p>내 최고 입찰</p>
        <p>{bid && addComma(bid)}원</p>

        <p>남은 시간</p>
        <p>{props.remainingTime}</p>
      </div>

      <ul css={BidNoticesCSS}>
        {bidNotice.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div
        css={css({
          display: 'flex',
          gap: 10,
          marginTop: 20,
          '& button': { flex: 1, height: 50 },
        })}
      >
        <Button onClick={handleEdit}>입찰 편집</Button>
        <Button onClick={handleSubmit} layout="contained">
          응찰하기
        </Button>
      </div>
    </>
  );

  if (step === 'success') {
    return (
      <AlertModal
        isShow={props.show}
        description="응찰이 성공적으로 완료되었습니다"
        onCancel={handleCancel}
        onConfirm={handleCancel}
      />
    );
  }

  if (step === 'fail') {
    return (
      <AlertModal
        isShow={props.show}
        description={`죄송합니다.\n현재 해당 작품의 최고 입찰가는\n<span>${addComma(
          higherBid,
        )}</span>원입니다.\n다시 확인하고 새로운 금액으로\n응찰해 주세요.`}
        confirmText={<span style={{ color: color.purple }}>다시 입찰하기</span>}
        onCancel={handleCancel}
        onConfirm={handleRetry}
      />
    );
  }

  return (
    <ModalPortal>
      <div css={AlertModalBackdropCSS} onClick={handleCancel} />
      <div css={[DesktopModalContainerCSS, BidModalContainerCSS]}>
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

        {step === 'init' && step0}
        {step === 'check' && step1}
      </div>
    </ModalPortal>
  );
}
