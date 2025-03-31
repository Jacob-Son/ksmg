import React, { useEffect } from 'react';
import Image from 'next/image';
import {
  LikeButtonCSS,
  PurchaseButtonsSectionCSS,
} from './ProductActionGroup.styles';
import Button from 'src/components/common/Button/Button';
import { css } from '@emotion/react';
import { mq } from 'src/styles/mediaQuery';
import { useResponsive } from 'src/hooks/common/useResponsive';
import { useAuthStore } from 'src/stores/auth/auth.store';
import PriceInputModal from '../../modal/PriceInputModal/PriceInputModal';
import { GetNftResponseData } from '~/types/nft';
import useAccount from 'src/hooks/common/useAccount';
import { useLike } from 'src/hooks/nft/useLike';
import CartModal from '../../modal/CartModal/CartModal';
import { useRouter } from 'next/router';
import { nftApi } from 'src/services/nft_api';
import { color } from 'src/styles/colors';
import { cartApi } from 'src/services/cart_api';
import { useMakeOrder } from 'src/hooks/order/useMakeOrder';

export default function ProductActionGroup({
  data,
  collectionAddress,
  tokenId,
  setTotalLikeCount,
  setNftPrice,
  type = 'buy',
}: {
  data: GetNftResponseData;
  collectionAddress: string;
  tokenId: string;
  setTotalLikeCount: React.Dispatch<React.SetStateAction<number>>;
  setNftPrice: React.Dispatch<React.SetStateAction<number>>;
  type?: 'buy' | 'sell' | 'sold-out' | 'confirm';
}) {
  const router = useRouter();

  const { toggleLoginModal, setBeforeRoutePath } = useAuthStore();
  const { address } = useAccount();
  const { isMobile } = useResponsive();
  const { isLike } = useLike(collectionAddress, tokenId, address);

  const [isLikeClicked, setIsLikeClicked] = React.useState(false);
  const [isShowModal, setIsShowModal] = React.useState(false);
  const [isShowCartModal, setIsShowCartModal] = React.useState(false);

  const { createOrder } = useMakeOrder({});

  useEffect(() => {
    if (!isLike) return;
    setIsLikeClicked(isLike);
  }, [isLike]);

  const handleClickLike = async () => {
    if (!address) {
      toggleLoginModal();
      setBeforeRoutePath(router.asPath);
      return;
    }
    if (!isLikeClicked) {
      nftApi.addLike(collectionAddress, tokenId, address);
      setTotalLikeCount((state) => state + 1);
      setIsLikeClicked(true);
      return;
    } else {
      nftApi.removeLike(collectionAddress, tokenId, address);
      setTotalLikeCount((state) => state - 1);
      setIsLikeClicked(false);
      return;
    }
  };

  const handleClickCart = async () => {
    if (!address) {
      toggleLoginModal();
      setBeforeRoutePath(router.asPath);
      return;
    }
    await cartApi.addCart(address, data.nftSaleId);
    setIsShowCartModal(true);
  };

  const handleClickBuy = async () => {
    if (!address) {
      toggleLoginModal();
      setBeforeRoutePath(router.asPath);
      return;
    }
    const res = await createOrder(address, [data.nftSaleId]);
    router.push(`/order/pay/${res.order.orderId}`);
  };

  const handleClickSell = () => {
    if (!address) {
      toggleLoginModal();
      setBeforeRoutePath(router.asPath);
      return;
    }
    setIsShowModal(true);
  };

  const handleKeepShopping = async () => {
    setIsShowCartModal(false);
  };

  const handleGoToCart = async () => {
    setIsShowCartModal(false);
    router.push('/order/cart');
  };

  const handleConfirm = async (newPrice: number) => {
    await nftApi.setNftPrice(collectionAddress, tokenId, newPrice, address);
    // setNftPrice(newPrice);
    // setIsShowModal(false);
    window.location.reload();
  };

  const handleBuyConfirm = async () => {
    router.push('/library?tab=settle');
  };

  const likeButtonEles = (
    <>
      <Image
        alt="heart"
        src={
          isLikeClicked
            ? '/icons/ic_heart_2_fill.svg'
            : '/icons/ic_heart_2_outline.svg'
        }
        width={24}
        height={24}
      />
      <p
        css={css({
          cursor: 'pointer',
          fontSize: 14,
          fontWeight: 300,
          lineHeight: '120%',
          letterSpacing: '-0.165px',
        })}
      >
        {data?.totalLikeCount}
      </p>
    </>
  );

  const buttonGroup = (() => {
    switch (type) {
      case 'sell':
        return (
          <Button
            css={css({
              flex: 1,
              [mq.mobile]: {
                height: 50,
              },
              [mq.smTablet]: {
                padding: '10px 4px',
                fontSize: 14,
              },
            })}
            layout="contained"
            onClick={handleClickSell}
          >
            판매하기
          </Button>
        );
      case 'confirm':
        return (
          <Button
            css={css({
              flex: 1,
              [mq.mobile]: {
                height: 50,
              },
              [mq.smTablet]: {
                padding: '10px 4px',
                fontSize: 14,
              },
            })}
            layout="contained"
            onClick={handleBuyConfirm}
          >
            구매 확정하기
          </Button>
        );
      case 'sold-out':
        return (
          <Button
            css={css({
              flex: 1,
              [mq.mobile]: {
                height: 50,
              },
              [mq.smTablet]: {
                padding: '10px 4px',
                fontSize: 14,
              },
              '&[disabled]': {
                background: color.background.container.gray,
                color: color.text.primary,
              },
            })}
            layout="contained"
            disabled
          >
            이미 판매된 상품입니다
          </Button>
        );
      default:
        return (
          <>
            <CartModal
              isShow={isShowCartModal}
              handleGoToCart={handleGoToCart}
              handleKeepShopping={handleKeepShopping}
            />
            <Button
              css={css({
                flex: 1,
                minWidth: '80px',
                [mq.mobile]: {
                  height: 50,
                },
                [mq.smTablet]: {
                  padding: '10px 4px',
                  fontSize: 14,
                },
                cursor: 'pointer',
              })}
              onClick={handleClickCart}
            >
              장바구니
            </Button>
            <Button
              css={css({
                flex: 1,
                minWidth: '100px',
                [mq.mobile]: {
                  minWidth: '120px',
                  height: 50,
                },
                [mq.smTablet]: {
                  padding: '10px 4px',
                  fontSize: 14,
                },
                cursor: 'pointer',
              })}
              layout="contained"
              onClick={handleClickBuy}
            >
              바로 구매하기
            </Button>
          </>
        );
    }
  })();

  return (
    <>
      <div css={PurchaseButtonsSectionCSS}>
        {isMobile && (
          <button
            type="button"
            onClick={handleClickLike}
            css={[
              LikeButtonCSS,
              css({
                border: 'none',
                background: 'transparent',
                padding: 0,
              }),
            ]}
          >
            {likeButtonEles}
          </button>
        )}
        {buttonGroup}
        {!isMobile && (
          <Button onClick={handleClickLike} css={LikeButtonCSS}>
            {likeButtonEles}
          </Button>
        )}
      </div>
      <PriceInputModal
        isShow={isShowModal}
        data={data}
        onCancel={() => setIsShowModal(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
