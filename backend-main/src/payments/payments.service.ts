import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { impKey, impSecret } from 'src/common/constant/payment';

@Injectable()
export class PaymentsService {
  private readonly iamportUrl = 'https://api.iamport.kr';

  async getAccessToken() {
    const result = await axios.post(
      this.iamportUrl + '/users/getToken',
      {
        imp_key: impKey,
        imp_secret: impSecret,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return result.data.response.access_token;
  }

  async getPayment(impUid: string) {
    const token = await this.getAccessToken();
    const result = await axios.get(this.iamportUrl + `/payments/${impUid}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    return result.data.response;
  }

  async cancelPayment(impUid: string, merchantUid: string) {
    const token = await this.getAccessToken();
    const result = await axios.post(
      this.iamportUrl + `/payments/cancel`,
      {
        imp_uid: impUid,
        merchant_uid: merchantUid,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );
    return result.data.code === 200;
  }

  async refundPayment(
    impUid: string,
    merchantUid: string,
    cancelAmount: number,
  ) {
    try {
      const token = await this.getAccessToken();

      await axios.post(
        this.iamportUrl + `/payments/cancel`,
        {
          imp_uid: impUid,
          merchant_uid: merchantUid,
          amount: cancelAmount,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
    } catch (e) {
      console.log(e);
      return false;
    }

    return true;
  }

  async checkPaid(impUid: string, merchantUid: string) {
    const payment = await this.getPayment(impUid);
    if (payment.merchant_uid === merchantUid) {
      return true;
    }
    return false;
  }
}
