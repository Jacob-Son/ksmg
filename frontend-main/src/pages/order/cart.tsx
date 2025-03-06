import { css } from '@emotion/react';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import CartList from 'src/components/order/cart/CartList';
import Empty from 'src/components/order/cart/Empty';
import { PageTitleCSS } from 'src/components/order/order.styles';
import OrderTabs, { EOrderTabStatus } from 'src/components/order/tab/OrderTabs';
import { useCart } from 'src/hooks/cart/useCart';
import useAccount from 'src/hooks/common/useAccount';
import { useResponsive } from 'src/hooks/common/useResponsive';
import Layout from 'src/layout/Layout';
import Pending from 'src/sections/Pending';
import { cartApi } from 'src/services/cart_api';
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

export default function CartPage() {
  const title = 'Cart';
  const { isMobile } = useResponsive();
  const { address } = useAccount();
  const { cart, isPending } = useCart(address);
  const [cartList, setCart] = React.useState<ICartItemProps[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (!cart) return;
    const _cart = cart.map((item) => {
      return {
        ...item,
        isChecked: false,
      };
    });
    setCart(_cart);
  }, [cart]);

  const handleCartItem = async (
    tokenId: string,
    action: 'check' | 'delete',
  ) => {
    switch (action) {
      case 'check':
        setCart(
          cartList.map((item) => {
            return item.tokenId === tokenId
              ? {
                  ...item,
                  isChecked: !item.isChecked,
                }
              : item;
          }),
        );
        break;
      case 'delete':
        const item = cartList.find((item) => item.tokenId === tokenId);
        cartApi.deleteCart(address, item.nftSaleId);
        setCart(cartList.filter((item) => item.tokenId !== tokenId));
        break;
    }
  };
  const handleClickAllCheck = () => {
    const isAllChecked = cartList.every((item) => item.isChecked);
    setCart(
      cartList.map((item) => {
        return {
          ...item,
          isChecked: !isAllChecked,
        };
      }),
    );
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
      <Layout title="장바구니" css={LayoutCSS}>
        {!isMobile && (
          <>
            <div css={PageTitleCSS}>Cart</div>
            {cartList.length > 0 && <OrderTabs status={EOrderTabStatus.Cart} />}
          </>
        )}
        {cartList.length > 0 ? (
          <CartList
            type="cart"
            carts={cartList}
            onCheck={(id) => handleCartItem(id, 'check')}
            onClickAllCheck={handleClickAllCheck}
            onDelete={(id) => handleCartItem(id, 'delete')}
          />
        ) : isPending ? (
          <Pending />
        ) : (
          <Empty />
        )}
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
