import { useRouter } from 'next/router';
import { PaymentMethodEnum } from 'src/components/order/cart/CartList.types';
import { orderApi } from 'src/services/order_api';
import { IOrder } from '~/types/order';
import { RequestPayParams, RequestPayResponse } from '~/types/portone';
import { IUser } from '~/types/user';

export const useMakeOrder = ({
  errorCallback,
}: {
  errorCallback?: () => void;
}) => {
  const router = useRouter();

  const createOrder = async (userAddress: string, nftSaleIds: number[]) => {
    const merchantUid = `mid_${new Date().getTime()}`;
    const order = (
      await orderApi.createOrder(merchantUid, nftSaleIds, userAddress)
    ).data;
    return { order, merchantUid };
  };

  const processOrder = async (
    order: IOrder,
    user: IUser,
    paymentMethod: PaymentMethodEnum,
  ) => {
    if (!window.IMP) return;

    if (order.paidAmount === 0) {
      try {
        await orderApi.freeBuyOrder(order.orderId);
        router.push(`/order/complete/${order.orderId}`);
        return;
      } catch (e) {
        alert('결제에 실패했습니다.');
        return;
      }
    }

    const { IMP } = window;
    const storeCode = process.env.NEXT_PUBLIC_IMP_STORE_CODE;
    IMP.init(storeCode); // 가맹점 식별코드

    // if (!user) {
    //   alert("유저 정보가 없습니다. 다시 로그인해주세요.");
    //   router.push("/login");  // ✅ 로그인 페이지로 이동
    //   return;
    // }
    
    const data: RequestPayParams = {
      pg: process.env.NEXT_PUBLIC_PG_CODE,
      merchant_uid: order.merchantUid,
      amount: order.paidAmount,
      name: order.orderName,
      buyer_name: user?.name ?? "Test User",   // ✅ 기본값 설정
      buyer_tel: user?.phoneNumber ?? "000-0000-0000",
      buyer_email: user?.email ?? "no-email@example.com",
      m_redirect_url: process.env.NEXT_PUBLIC_DOMAIN + '/payments/complete',
    };
    // const data: RequestPayParams = {
    //   pg: process.env.NEXT_PUBLIC_PG_CODE, // PG사 : https://developers.portone.io/docs/ko/tip/pg-2 참고
    //   merchant_uid: order.merchantUid,
    //   amount: order.paidAmount,
    //   name: order.orderName,
    //   buyer_name: user.name,
    //   buyer_tel: user.phoneNumber,
    //   buyer_email: user.email,
    //   m_redirect_url: process.env.NEXT_PUBLIC_DOMAIN + '/payments/complete',
    // };

    try {
      IMP.request_pay(data, handleCallback);
    } catch (e) {
      alert('결제에 실패했습니다.');
      console.log(e);
    }
  };

  function handleCallback(response: RequestPayResponse) {
    const { error_msg, error_code, imp_uid, merchant_uid } = response;
    if (!error_code || error_code === 'undefined') {
      // polling으로 결제 완료 확인
      const interval = setInterval(async () => {
        const {
          data: { isPaid, order },
        } = await orderApi.checkPaidOrder(merchant_uid, imp_uid);
        if (isPaid) {
          clearInterval(interval);
          router.push(`/order/complete/${order.orderId}`);
        } else {
          clearInterval(interval);
          alert('결제에 실패했습니다.');
          router.push('/order/cart');
          errorCallback();
        }
      }, 3000);
    } else {
      alert(`${error_msg.split(']')[1].trim()}`);
      errorCallback();
    }
  }

  return {
    createOrder,
    processOrder,
    handleCallback,
  };
};
