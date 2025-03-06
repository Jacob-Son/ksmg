import { css } from '@emotion/react';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingScreen from 'src/components/common/LoadingScreen/LoadingScreen';
import CartList from 'src/components/order/cart/CartList';
import { PaymentMethodEnum } from 'src/components/order/cart/CartList.types';
import Empty from 'src/components/order/cart/Empty';
import { PageTitleCSS } from 'src/components/order/order.styles';
import OrderTabs, { EOrderTabStatus } from 'src/components/order/tab/OrderTabs';
import AuthenticateModal from 'src/components/password/modal/AuthenticateModal';
import ResetPasswordModal from 'src/components/password/modal/ResetPasswordModal';
import { useResponsive } from 'src/hooks/common/useResponsive';
import { useUser } from 'src/hooks/mypage/useUser';
import { useMakeOrder } from 'src/hooks/order/useMakeOrder';
import useOrder from 'src/hooks/order/useOrder';
import Layout from 'src/layout/Layout';
import Pending from 'src/sections/Pending';
import { orderApi } from 'src/services/order_api';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';
import { ICartItemProps } from '~/types/cart';

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    res.writeHead(302, { Location: '/login' });
    res.end();
    return { props: {} };
  }
  return {
    props: {},
  };
};

export default function PayPage() {
  const title = '주문 결제';
  const { isMobile } = useResponsive();
  const router = useRouter();
  const { orderId } = router.query;
  const { order, isPending, error } = useOrder(Number(orderId));
  const [isLoading, setIsLoading] = useState(false);
  const [cartList, setCart] = useState<ICartItemProps[]>([]);
  const [initTime, setInitTime] = useState<number>(0);
  const [showAuthenticateModal, setShowAuthenticateModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodEnum>(
    PaymentMethodEnum.CREDIT_CARD,
  );

  const { user } = useUser();
  const { processOrder } = useMakeOrder({
    errorCallback: () => setIsLoading(false),
  });

  useEffect(() => {
    if (error) {
      alert(error);
      router.back();
    }
  }, [error]);

  useEffect(() => {
    setInitTime(Date.now());
  }, []);

  useEffect(() => {
    if (initTime === 0) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = now - initTime;
      if (diff > 1000 * 60 * 10) {
        alert('주문 시간이 초과되었습니다.');
        router.push('/order/cart');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [initTime]);

  useEffect(() => {
    if (order === undefined) return;
    if (order == null || order.nftSales.length === 0) {
      alert('주문할 작품이 없습니다.');
      router.push('/order/cart');
      return;
    }
    const _cart = order.nftSales.map((item) => {
      return {
        collectionAddress: item.nft.collectionAddress,
        tokenId: item.nft.tokenId,
        image: item.nft.nftImagePath,
        title: item.nft.name,
        price: item.price,
        nftSaleId: item.nftSaleId,
        status: item.status,
        isChecked: true,
      };
    });
    setCart(_cart);
  }, [order]);

  const handleComplete = async () => {
    setIsLoading(true);
    await processOrder(order, user, paymentMethod);
  };

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
      <Layout title="주문결제" css={LayoutCSS}>
        {isLoading && <LoadingScreen />}
        {!isMobile && (
          <>
            <div css={PageTitleCSS}>ORDER</div>
            {cartList.length > 0 && (
              <OrderTabs status={EOrderTabStatus.InProgress} />
            )}
          </>
        )}
        {cartList.length > 0 ? (
          <CartList
            type="order"
            carts={cartList}
            // openAuthenticateModal={() => setShowAuthenticateModal(true)}
            openAuthenticateModal={() => handleComplete()}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        ) : isPending ? (
          <Pending />
        ) : (
          <Empty />
        )}
        <AuthenticateModal
          isOpen={showAuthenticateModal}
          onClose={() => setShowAuthenticateModal(false)}
          onShowResetPassword={() => {
            setShowAuthenticateModal(false);
            setShowResetPasswordModal(true);
          }}
          onComplete={handleComplete}
        />
        <ResetPasswordModal
          isOpen={showResetPasswordModal}
          onClose={() => setShowResetPasswordModal(false)}
        />
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
