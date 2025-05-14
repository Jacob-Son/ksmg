import { css } from '@emotion/react';
import React from 'react';
import Check from 'src/components/common/Check';
import { color } from 'src/styles/colors';
import {
  CartItemSectionCSS,
  CartNoticesCSS,
  CheckAllSectionCSS,
  DividerCSS,
  FullViewModalContentCSS,
  InfoFlexCSS,
  MobileButtonSectionCSS,
  OrderAllAgreeCSS,
  OrderButtonCSS,
  OrderCheckListsCSS,
  PaymentMethodRowCSS,
  PriceRowCSS,
  PriceSectionCSS,
  SectionTitleCSS,
  TotalPaymentPriceCSS,
  TotalPriceCSS,
} from './CartList.styles';
import CartItem from './CartItem';
import { useResponsive } from 'src/hooks/common/useResponsive';
import { addComma } from 'src/utils/format';
import Button from 'src/components/common/Button/Button';
import { ICartItemProps } from '~/types/cart';
import { useMakeOrder } from 'src/hooks/order/useMakeOrder';
import useAccount from 'src/hooks/common/useAccount';
import { useRouter } from 'next/router';
import Modal from 'src/components/common/Modal/Modal';
import { useToast } from 'src/stores/toast/toast.store';
import { orderNotices, orderNoticesFullContents } from './CartList.constants';
import InstructionModal from 'src/components/common/Modal/InstructionModal';
import { PaymentMethodEnum } from './CartList.types';
import { mq } from 'src/styles/mediaQuery';

export interface IOrderListProps {
  type: 'order';
  carts: ICartItemProps[];
  paymentMethod: PaymentMethodEnum;
  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethodEnum>>;
  openAuthenticateModal: () => void;
}

export interface ICartListProps {
  type: 'cart';
  carts: ICartItemProps[];
  onCheck: (id: string) => void;
  onClickAllCheck: () => void;
  onDelete: (id: string) => void;
}

const cartNotice = [
  // '장바구니에 상품은 최대 100개까지 담을 수 있습니다.',
  // '장바구니에 담긴 상품은 최대 30일간 보관후 삭제됩니다.',
];

export default function CartList(props: ICartListProps | IOrderListProps) {
  const router = useRouter();
  const { isMobile } = useResponsive();
  const checkedData = props.carts.filter((item) => item.isChecked);
  const isAllChecked = checkedData.length === props.carts.length;
  const totalPrice = addComma(
    checkedData.reduce(
      (acc, cur) => (cur.isChecked ? acc + cur.price : acc),
      0,
    ),
  );
  const [isAgree, setIsAgree] = React.useState<{
    0: boolean;
    1: boolean;
    2: boolean;
  }>({
    0: false,
    1: false,
    2: false,
  });
  const [isShowAlertModal, setIsShowAlertModal] =
    React.useState<boolean>(false);
  const [currentViewAllModal, setCurrentViewAllModal] = React.useState<
    number | null
  >(null);

  const { showToast } = useToast((state) => ({ showToast: state.showToast }));
  const { address } = useAccount();
  const { createOrder } = useMakeOrder({});

  const handleOrder = async () => {
    if (props.type === 'order') {
      if (!isAgree[0] || !isAgree[1] || !isAgree[2]) {
        if (isMobile) {
          showToast('필수사항에 모두 동의해주세요');
        } else {
          setIsShowAlertModal(true);
        }
        return;
      }
      props.openAuthenticateModal();
    } else {
      if (!address) return alert('로그인이 필요합니다.');
      if (checkedData.length === 0) return alert('주문할 상품을 선택해주세요.');
      const saleIds = checkedData.map((item) => item.nftSaleId);
      const res = await createOrder(address, saleIds);
      router.push(`/order/pay/${res.order.orderId}`);
    }
  };

  return (
    <>
      <div>
        {!isMobile && (
          <p
            css={css({
              color: color.black[900],
              fontWeight: 600,
              lineHeight: '100%',
              letterSpacing: '-0.165px',
            })}
          >
            Product
          </p>
        )}
        <div css={CheckAllSectionCSS}>
          {props.type === 'cart' && (
            <Check checked={isAllChecked} onChange={props.onClickAllCheck} />
          )}
          <p>전체상품 ({checkedData.length})</p>
        </div>
        <div css={InfoFlexCSS}>
          <div css={CartItemSectionCSS}>
            {props.carts.map((item) => {
              if (props.type === 'cart') {
                return (
                  <CartItem
                    type="cart"
                    key={item.tokenId}
                    data={item}
                    onCheck={props.onCheck}
                    onDelete={() => props.onDelete(item.tokenId)}
                  />
                );
              } else {
                return <CartItem type="order" key={item.tokenId} data={item} />;
              }
            })}
          </div>
          <div css={PriceSectionCSS}>
            {!isMobile && <p css={SectionTitleCSS}>주문 금액</p>}
            <div css={[PriceRowCSS, TotalPriceCSS]}>
              <p>총 상품금액</p>
              <p>
                <span>{totalPrice}</span>
                {isMobile && ' '}원
              </p>
            </div>
            {!isMobile && <div css={DividerCSS} />}
            <div css={[PriceRowCSS, TotalPaymentPriceCSS]}>
              <p>총 주문금액</p>
              <p>
                <span>{totalPrice}</span>
                {isMobile && ' '}원
              </p>
            </div>

            {/* {props.type === 'order' && (
              <>
                <div css={DividerCSS} />
                <p
                  css={[
                    SectionTitleCSS,
                    css({
                      marginTop: 24,
                      [mq.mobile]: {
                        marginTop: 36,
                      },
                    }),
                  ]}
                >
                  결제 방법
                </p>
                <div css={PaymentMethodRowCSS}>
                  <Button
                    layout={
                      props.paymentMethod === PaymentMethodEnum.CREDIT_CARD
                        ? 'contained'
                        : 'outlined'
                    }
                    aria-datatype="credit"
                    aria-selected={
                      props.paymentMethod === PaymentMethodEnum.CREDIT_CARD
                    }
                    onClick={() =>
                      props.setPaymentMethod(PaymentMethodEnum.CREDIT_CARD)
                    }
                  >
                    신용 / 체크카드
                  </Button>
                  <Button
                    layout={
                      props.paymentMethod === PaymentMethodEnum.TOSS_PAY
                        ? 'contained'
                        : 'outlined'
                    }
                    aria-datatype="toss"
                    aria-selected={
                      props.paymentMethod === PaymentMethodEnum.TOSS_PAY
                    }
                    onClick={() =>
                      props.setPaymentMethod(PaymentMethodEnum.TOSS_PAY)
                    }
                  >
                    토스 간편결제
                  </Button>
                </div>
              </>
            )} */}

            {!isMobile && (
              <Button
                layout="contained"
                onClick={handleOrder}
                css={OrderButtonCSS}
              >
                {props.type === 'cart'
                  ? '선택상품 주문하기'
                  : `${totalPrice}원 결제하기`}
              </Button>
            )}

            {props.type === 'cart' && (
              <ul css={CartNoticesCSS}>
                {cartNotice.map((item) => (
                  <li key={item}>
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
            )}
            {props.type === 'order' && (
              <>
                <div css={OrderAllAgreeCSS}>
                  <Check
                    checked={isAgree[0] && isAgree[1] && isAgree[2]}
                    onChange={() => {
                      setIsAgree(
                        isAgree[0] && isAgree[1] && isAgree[2]
                          ? { 0: false, 1: false, 2: false }
                          : { 0: true, 1: true, 2: true },
                      );
                    }}
                    uncheckedLayout="hollow"
                  />
                  <p>주문 내용을 확인했으며, 아래 내용에 모두 동의합니다.</p>
                </div>

                <ul css={OrderCheckListsCSS}>
                  {orderNotices.map((item, index) => (
                    <li key={item}>
                      <Check
                        checked={isAgree[index]}
                        onChange={() => {
                          setIsAgree({
                            ...isAgree,
                            [index]: !isAgree[index],
                          });
                        }}
                        uncheckedLayout="hollow"
                      />
                      <p>{item}</p>

                      <button
                        type="button"
                        onClick={() => setCurrentViewAllModal(index)}
                      >
                        보기
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
      {isMobile && (
        <div css={MobileButtonSectionCSS}>
          <div css={[PriceRowCSS, TotalPriceCSS, css({ padding: 0 })]}>
            <p>
              총 <span>{checkedData.length}</span> 개
            </p>
            <p>
              <span>
                {addComma(
                  checkedData.reduce(
                    (acc, cur) => (cur.isChecked ? acc + cur.price : acc),
                    0,
                  ),
                )}
              </span>
              {isMobile && ' '}원
            </p>
          </div>

          <Button
            layout="contained"
            onClick={handleOrder}
            css={[
              OrderButtonCSS,
              css({
                marginTop: 12,
                height: 50,
                fontSize: 16,
                lineHeight: '130%',
              }),
            ]}
          >
            {props.type === 'cart'
              ? '선택상품 주문하기'
              : `${totalPrice}원 결제하기`}
          </Button>
        </div>
      )}
      <InstructionModal
        open={currentViewAllModal !== null}
        title={orderNotices[currentViewAllModal]}
        onClose={() => setCurrentViewAllModal(null)}
      >
        <div css={FullViewModalContentCSS}>
          {orderNoticesFullContents[currentViewAllModal]}
        </div>
      </InstructionModal>
      {!isMobile && (
        <Modal
          description="필수사항에 모두 동의해주세요."
          isShow={isShowAlertModal}
          showLeftButton={false}
          onClickRight={() => {
            setIsShowAlertModal(false);
          }}
          onClose={() => setIsShowAlertModal(false)}
          css={css({ textAlign: 'center' })}
        />
      )}
    </>
  );
}
