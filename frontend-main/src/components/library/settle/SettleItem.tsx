import { css } from '@emotion/react';
import dayjs from 'dayjs';
import React from 'react';
import { IconButtonCSS } from 'src/components/common/Button/Button.styles';
import ChevronDownIcon from 'src/icons/ChevronDownIcon';
import { color } from 'src/styles/colors';
import { addComma } from 'src/utils/format';
import {
  ConfirmButtonCSS,
  DateRowCSS,
  DotCSS,
  ItemContainerCSS,
  ItemNameCSS,
  NameAndPriceRowCSS,
  PriceInfoGridCSS,
  RefundButtonCSS,
  PriceTextCSS,
  StatusTextCSS,
  TotalPriceCSS,
} from './SettleItem.styles';
import { SettleTabEnum } from './Settles';
import { NftSaleHistory, SaleStatus } from '~/types/order';
import Button from 'src/components/common/Button/Button';
import { orderApi } from 'src/services/order_api';

interface ISettleItemProps {
  type: SettleTabEnum;
  data: NftSaleHistory;
  showDate: boolean;
  refetchNft: () => void;
  refetchHistory: () => void;
}

export default function SettleItem({
  type,
  data,
  showDate,
  refetchNft,
  refetchHistory,
}: ISettleItemProps) {
  const isThisYear =
    new Date().getFullYear() === new Date(data.soldAt).getFullYear();
  const [open, setOpen] = React.useState(false);

  const handleConfirm = async () => {
    if (!data.orderId || !data.nftSaleId) return;
    if (confirm('구매를 확정하시겠습니까?') === false) return;
    const res = await orderApi.confirmOrder(data.orderId, data.nftSaleId);
    if (!res.success) return alert(JSON.stringify(res.error));
    refetchNft();
    alert('구매가 확정되었습니다.');
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-16539262850/qzNQCPH-3rAZEIK_xM49',
        value: data.price,
        currency: 'KRW',
        transaction_id: data.txHash,
      });
    }
    refetchHistory();
  };

  const handleRefund = async () => {
    if (!data.orderId || !data.nftSaleId) return;
    if (confirm('구매를 환불하시겠습니까?') === false) return;
    const res = await orderApi.refundOrder(data.orderId, data.nftSaleId);
    if (!res.success) return alert(JSON.stringify(res.error));
    refetchNft();
    alert('구매가 환불되었습니다.');
    refetchHistory();
  };

  const status = React.useMemo(() => {
    if (type === SettleTabEnum.BUY) {
      switch (data.status) {
        case SaleStatus.SOLD_OUT:
          return <p css={StatusTextCSS}>확정대기</p>;
        case SaleStatus.CONFIRM:
          return <p css={StatusTextCSS}>구매확정</p>;
        case SaleStatus.REFUND:
          return (
            <p css={[StatusTextCSS, css({ color: color.red.main })]}>
              환불완료
            </p>
          );
      }
    } else {
      switch (data.status) {
        case SaleStatus.SOLD_OUT:
          return (
            <p css={[StatusTextCSS, css({ color: color.red.main })]}>
              확정대기
            </p>
          );
        case SaleStatus.CONFIRM:
          return (
            <p css={[StatusTextCSS, css({ color: color.red.main })]}>미정산</p>
          );
        case SaleStatus.SETTLE_PENDING:
          return <p css={StatusTextCSS}>정산요청됨</p>;
        case SaleStatus.SETTLED:
          return <p css={StatusTextCSS}>정산완료</p>;
        case SaleStatus.REFUND:
          return (
            <p css={[StatusTextCSS, css({ color: color.red.main })]}>
              구매취소
            </p>
          );
      }
    }
  }, [type, data.status]);
  return (
    <div css={ItemContainerCSS}>
      {showDate && (
        <div css={DateRowCSS}>
          <div css={DotCSS} />
          <p>
            {isThisYear
              ? dayjs(data.soldAt).format('MM월 DD일')
              : dayjs(data.soldAt).format('YYYY년 MM월 DD일')}
          </p>
        </div>
      )}
      <div css={css({ marginLeft: 15, padding: '16px 0 20px 0' })}>
        {status}
        <div css={NameAndPriceRowCSS}>
          <p css={ItemNameCSS}>{data.nft.name}</p>
          <p css={TotalPriceCSS}>
            {data.settlePrice > 0 && '+ '}
            {addComma(data.settlePrice).replace('-', '- ')}
          </p>
          <button
            type="button"
            css={[
              IconButtonCSS,
              css({
                width: 24,
                height: 24,
                ...(open && {
                  '& svg': { transform: 'rotate(180deg)' },
                }),
              }),
            ]}
            onClick={() => setOpen((state) => !state)}
          >
            <ChevronDownIcon color={color.line.primary} />
          </button>
        </div>

        <div
          css={[PriceInfoGridCSS, css({ ...(!open && { display: 'none' }) })]}
        >
          <p>거래 금액</p>
          <p css={PriceTextCSS}>{addComma(data.price)}원</p>
          <p>플랫폼 수수료</p>
          <p css={PriceTextCSS}>{addComma(data.platformFee)}원</p>
          <p>작가 수수료</p>
          <p css={PriceTextCSS}>{addComma(data.creatorFee)}원</p>
        </div>
        <div
          css={css({
            marginTop: 6,
            display: 'flex',
            alignItems: 'center',
            fontSize: 14,
            lineHeight: '120%',
          })}
        >
          <p>{dayjs(data.soldAt).format('HH:mm')}</p>
          {/* <div
            css={css({
              width: 1,
              height: 10,
              background: color.border.secondary,
              margin: 4,
            })}
          />
          {data.txHash && (
            <div
              onClick={() => {
                window.open(`${explorerPrefix}/tx/${data.txHash}`);
              }}
              css={css({
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              })}
            >
              <p
                css={css({
                  color: color.blue.main,
                  marginRight: 2,
                })}
              >
                {reduceString(data.txHash, 6, 3)}
              </p>
              <Image
                alt="share"
                src="/icons/ic_share.svg"
                width={20}
                height={21}
              />
            </div>
          )} */}
        </div>
        {type === SettleTabEnum.BUY && data.status === SaleStatus.SOLD_OUT && (
          <div
            css={css({
              marginTop: 8,
              gap: 10,
              display: 'flex',
              alignItems: 'center',
            })}
          >
            <Button
              layout="contained"
              css={ConfirmButtonCSS}
              onClick={handleConfirm}
            >
              확정하기
            </Button>
            <Button
              layout="outlined"
              css={RefundButtonCSS}
              onClick={handleRefund}
            >
              환불하기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
