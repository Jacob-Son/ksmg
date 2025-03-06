import { useRouter } from 'next/router';
import React from 'react';
import { useMakeOrder } from 'src/hooks/order/useMakeOrder';
import { RequestPayResponse } from '~/types/portone';

function PaymentsComplete() {
  const router = useRouter();
  const response = router.query;
  const { handleCallback } = useMakeOrder({});

  React.useEffect(() => {
    if (!response) return;
    const {
      imp_uid,
      merchant_uid,
      pay_method,
      error_code,
      error_msg,
      embb_pg_provider,
      pg_provider,
      pg_tid,
      buyer_name,
      buyer_email,
      buyer_tel,
      buyer_addr,
      buyer_postcode,
      custom_data,
      paid_at,
      receipt_url,
    } = response;
    if (error_code) {
      alert(`결제에 실패하였습니다. ${error_msg}`);
      router.back();
      return;
    }
    handleCallback({
      merchant_uid: String(merchant_uid),
      pay_method: String(pay_method) as RequestPayResponse['pay_method'],
      embb_pg_provider: String(
        embb_pg_provider,
      ) as RequestPayResponse['embb_pg_provider'],
      pg_provider: String(pg_provider) as RequestPayResponse['pg_provider'],
      imp_uid: String(imp_uid),
      error_code: String(error_code),
      error_msg: String(error_msg),
      pg_tid: String(pg_tid),
      buyer_name: String(buyer_name),
      buyer_email: String(buyer_email),
      buyer_tel: String(buyer_tel),
      buyer_addr: String(buyer_addr),
      buyer_postcode: String(buyer_postcode),
      custom_data: String(custom_data),
      paid_at: String(paid_at),
      receipt_url: String(receipt_url),
    });
  }, [response]);

  return <div></div>;
}

export default PaymentsComplete;
