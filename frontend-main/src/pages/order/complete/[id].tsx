import { css } from '@emotion/react';
import dayjs from 'dayjs';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from 'src/components/common/Button/Button';
import CartItem from 'src/components/order/cart/CartItem';
import { ICartListProps } from 'src/components/order/cart/CartList';
import { PageTitleCSS } from 'src/components/order/order.styles';
import OrderTabs, { EOrderTabStatus } from 'src/components/order/tab/OrderTabs';
import { useResponsive } from 'src/hooks/common/useResponsive';
import useOrder from 'src/hooks/order/useOrder';
import Layout from 'src/layout/Layout';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';
import { addComma } from 'src/utils/format';

export default function OrderCompletePage() {
  const title = '주문 완료';
  const { isMobile } = useResponsive();
  const router = useRouter();
  const { id } = router.query;
  const { order } = useOrder(Number(id));

  const [orderList, setOrderList] = useState<ICartListProps['carts']>([]);

  useEffect(() => {
    if (order === undefined) return;
    if (order === null) {
      alert('해당하는 주문이 없습니다.');
      router.push('/order/cart');
      return;
    }
    const _order = order.nftSales.map((sale) => {
      return {
        collectionAddress: sale.nft.collectionAddress,
        tokenId: sale.nft.tokenId,
        image: sale.nft.nftImagePath,
        title: sale.nft.name,
        price: sale.price,
        status: sale.status,
        nftSaleId: sale.nftSaleId,
      };
    });
    setOrderList(_order);
  }, [order]);

  if (!order) return <></>;

  return (
    <>
      <Head>
        <title>{title}</title>
        <style>
          {`
            body {
              background: ${
                isMobile ? color.background.container.primary : '#fff'
              } !important;
            }
          `}
        </style>
      </Head>
      <Layout title="주문 완료" css={LayoutCSS}>
        {!isMobile && (
          <>
            <div css={PageTitleCSS}>주문완료</div>
            <OrderTabs status={EOrderTabStatus.Completed} />
          </>
        )}
        <div css={ContentsWrapperCSS}>
          <div
            css={css({
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              textAlign: 'center',
            })}
          >
            {!isMobile && <p css={ResultHeadTextCSS}>감사합니다 🎉</p>}
            <p css={ResultHeadDescriptionCSS}>
              고객님의 주문이 완료되었습니다.
              <br />
              구매하신 책은 나의 서재에서 확인하실 수 있습니다.
            </p>
          </div>

          <div
            css={css({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            })}
          >
            <div css={OrderItemGridCSS}>
              {orderList.map((item, idx) => (
                <CartItem key={idx} data={item} type="order" />
              ))}
            </div>
            {isMobile ? (
              <div css={PaymentInfoCSS}>
                <div>
                  <p>
                    <span>주문 날짜</span>
                  </p>
                  <p>{dayjs(order.createdAt).format('YYYY-MM-DD')}</p>
                </div>
                {isMobile && <div css={DividerCSS} />}
                <div>
                  <p>
                    <span>총 금액</span>
                  </p>
                  <p>{addComma(order.paidAmount)}원</p>
                </div>
              </div>
            ) : (
              <div css={PaymentInfoCSS}>
                <p>
                  <span>주문 날짜 : </span>&nbsp;&nbsp;
                  {dayjs(order.createdAt).format('YYYY-MM-DD')}
                </p>
                <p>
                  <span>총 금액:</span>&nbsp;&nbsp;
                  {addComma(order.paidAmount)}원
                </p>
              </div>
            )}
          </div>

          <div css={ButtonsRowCSS}>
            <Button
              layout="outlined"
              onClick={() => {
                router.push('/library?tab=library');
              }}
              css={GoToButtonCSS}
            >
              나의 서재 보러가기
            </Button>

            <Button
              layout="contained"
              onClick={() => {
                router.push('/library?tab=settle');
              }}
              css={[
                GoToButtonCSS,
                { background: color.background.container.black },
              ]}
            >
              주문 내역 보러가기
            </Button>
          </div>
        </div>
      </Layout>
    </>
  );
}

const LayoutCSS = css({
  paddingLeft: 30,
  paddingRight: 30,
  [mq.mobile]: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});

const ContentsWrapperCSS = css({
  margin: '0 auto 80px auto',
  padding: '50px 80px',
  gap: 32,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: `1px solid ${color.border.primary}`,
  borderRadius: 8,
  background: '#fff',
  boxShadow: '0px 32px 48px -48px rgba(18, 18, 18, 0.10)',
  boxSizing: 'border-box',
  maxWidth: 848,
  width: '100%',

  [mq.mobile]: {
    gap: 40,
    padding: '24px 16px',
    margin: '14px auto 60px auto',
  },
});

const ResultHeadTextCSS = css({
  fontSize: 28,
  fontWeight: 600,
  lineHeight: '120%',
  letterSpacing: '-0.165px',
});

const ResultHeadDescriptionCSS = css({
  fontSize: 18,
  lineHeight: '140%',
  letterSpacing: '-0.165px',
});

const OrderItemGridCSS = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  width: '100%',
  gap: 12,

  [mq.mobile]: {
    gridTemplateColumns: '1fr',
  },
});

const PaymentInfoCSS = css({
  marginTop: 20,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,

  '& p': {
    lineHeight: '130%',
    letterSpacing: '-0.165px',

    '& span': {
      color: color.text.secondary,
    },
  },

  [mq.mobile]: {
    marginTop: 40,
    width: '100%',

    '& div': {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
});

const DividerCSS = css({
  width: '100%',
  borderBottom: `1px solid ${color.border.primary}`,
});

const ButtonsRowCSS = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
  width: '100%',
});

const GoToButtonCSS = css({
  padding: '16px 26px',
  height: 57,
  fontSize: 18,
  fontWeight: 400,
  lineHeight: '140%',
  flex: 1,
  maxWidth: 195,

  [mq.mobile]: {
    padding: '8px',
    fontSize: 16,
    lineHeight: '130%',
  },
});
