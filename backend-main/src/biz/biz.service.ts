import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class BizService {
  private bizBaseUrl = 'https://www.biztalk-api.com';
  private bsid = '';
  private passwd = '';
  private senderKey = '';
  private templateRefix = '';

  constructor(private readonly configService: ConfigService) {
    const platform = this.configService.get<string>('CRYPTO_PASSWORD');
    if (platform === 'pickapen') {
      this.bsid = 'Pickapen';
      this.passwd = 'a08e01ce11f6aa9918957bd9ebf1ca726a022e56';
      this.senderKey = 'cfbbe106bc843aec88fda04e5e90e2c0a42b1394';
      this.templateRefix = 'pickapen';
    } else if (platform === 'passedu') {
      this.bsid = 'seeduinc';
      this.passwd = 'fdda58fdbb6e2b12d6bce850f040eec1240c1fb9';
      this.senderKey = '8b67d618ccae0272c0283867f6b075be87512b79';
      this.templateRefix = 'edu';
    }
  }

  async getCode() {
    try {
      const tokenRes = await axios.post<{
        token?: string;
      }>(this.bizBaseUrl + '/v2/auth/getToken', {
        bsid: this.bsid,
        passwd: this.passwd,
        expire: 60,
      });
      return tokenRes?.data?.token;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async sendAuthCode(phoneNumber: string, { code }: { code: string }) {
    try {
      const token = await this.getCode();
      if (!token) return false;

      const alarmTalkTemplate = {
        msgIdx: this.templateRefix + Number(new Date()).toString(),
        countryCode: '82',
        recipient: phoneNumber,
        senderKey: this.senderKey,
        message: `인증번호는 [${code}]입니다.`,
        tmpltCode: this.templateRefix + '_005',
        resMethod: 'PUSH',
      };

      await axios.post(
        this.bizBaseUrl + '/v2/kko/sendAlimTalk',
        alarmTalkTemplate,
        {
          headers: {
            'Content-Type': 'application/json',
            'bt-token': token,
          },
        },
      );
      await axios.get(this.bizBaseUrl + '/v2/kko/getResultAll', {
        headers: {
          'Content-Type': 'application/json',
          'bt-token': token,
        },
      });

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async sendBuyResult(phoneNumber: string, { name }: { name: string }) {
    const bizBaseUrl = 'https://www.biztalk-api.com';
    try {
      const token = await this.getCode();
      if (!token) return false;

      const alarmTalkTemplate = {
        msgIdx: this.templateRefix + Number(new Date()).toString(),
        countryCode: '82',
        recipient: phoneNumber,
        senderKey: this.senderKey,
        message: `[${name}]이 구매완료되었습니다.\n구매된 상품은 '나의밭'에서 확인하실 수 있습니다.\n* 구매한지 7일이 경과하고 상품을 개봉하였을 경우에는\n구매확정이 되어 환불이 불가능합니다.`,
        tmpltCode: this.templateRefix + '_001',
        resMethod: 'PUSH',
      };

      await axios.post(bizBaseUrl + '/v2/kko/sendAlimTalk', alarmTalkTemplate, {
        headers: {
          'Content-Type': 'application/json',
          'bt-token': token,
        },
      });
      await axios.get(bizBaseUrl + '/v2/kko/getResultAll', {
        headers: {
          'Content-Type': 'application/json',
          'bt-token': token,
        },
      });

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async sendConfirmResult(phoneNumber: string, { name }: { name: string }) {
    const bizBaseUrl = 'https://www.biztalk-api.com';
    try {
      const token = await this.getCode();
      if (!token) return false;

      const alarmTalkTemplate = {
        msgIdx: this.templateRefix + Number(new Date()).toString(),
        countryCode: '82',
        recipient: phoneNumber,
        senderKey: this.senderKey,
        message: `[${name}] 이 구매확정되었습니다.\n해당상품은 재판매가 가능하며 환불이 불가능합니다.`,
        tmpltCode: this.templateRefix + '_002',
        resMethod: 'PUSH',
      };

      await axios.post(bizBaseUrl + '/v2/kko/sendAlimTalk', alarmTalkTemplate, {
        headers: {
          'Content-Type': 'application/json',
          'bt-token': token,
        },
      });
      await axios.get(bizBaseUrl + '/v2/kko/getResultAll', {
        headers: {
          'Content-Type': 'application/json',
          'bt-token': token,
        },
      });

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async sendRefundResult(
    phoneNumber: string,
    { name, amount }: { name: string; amount: number },
  ) {
    const bizBaseUrl = 'https://www.biztalk-api.com';
    try {
      const token = await this.getCode();
      if (!token) return false;

      const alarmTalkTemplate = {
        msgIdx: this.templateRefix + Number(new Date()).toString(),
        countryCode: '82',
        recipient: phoneNumber,
        senderKey: this.senderKey,
        message: `${name}님이 요청하신 정산 건에 대해서 [${amount}]원 환불처리되었습니다.`,
        tmpltCode: this.templateRefix + '_010',
        resMethod: 'PUSH',
      };

      await axios.post(bizBaseUrl + '/v2/kko/sendAlimTalk', alarmTalkTemplate, {
        headers: {
          'Content-Type': 'application/json',
          'bt-token': token,
        },
      });
      await axios.get(bizBaseUrl + '/v2/kko/getResultAll', {
        headers: {
          'Content-Type': 'application/json',
          'bt-token': token,
        },
      });

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async sendAuctionResult(
    phoneNumber: string,
    { name, link }: { name: string; link: string },
  ) {
    const bizBaseUrl = 'https://www.biztalk-api.com';
    try {
      const token = await this.getCode();
      if (!token) return false;

      const alarmTalkTemplate = {
        msgIdx: this.templateRefix + Number(new Date()).toString(),
        countryCode: '82',
        recipient: phoneNumber,
        senderKey: this.senderKey,
        message: `[${name}] 경매가 종료되었습니다.\n해당 경매의 결과는 아래 링크를 통해 확인할 수 있으며,\n2차 경매에 참가하는 인원은 별도로 연락이 갈 예정입니다.\n${link}`,
        tmpltCode: this.templateRefix + '_003',
        resMethod: 'PUSH',
      };

      await axios.post(bizBaseUrl + '/v2/kko/sendAlimTalk', alarmTalkTemplate, {
        headers: {
          'Content-Type': 'application/json',
          'bt-token': token,
        },
      });
      await axios.get(bizBaseUrl + '/v2/kko/getResultAll', {
        headers: {
          'Content-Type': 'application/json',
          'bt-token': token,
        },
      });

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async sendConbineResult(
    phoneNumber: string,
    { name, deliveryAddress }: { name: string; deliveryAddress: string },
  ) {
    const bizBaseUrl = 'https://www.biztalk-api.com';
    try {
      const token = await this.getCode();
      if (!token) return false;

      const alarmTalkTemplate = {
        msgIdx: this.templateRefix + Number(new Date()).toString(),
        countryCode: '82',
        recipient: phoneNumber,
        senderKey: this.senderKey,
        message: `[${name}] 복각본 신청이 완료되었습니다.\n다음 주소로 전달할 예정입니다.\n[${deliveryAddress}]\n상품 제작 기간: 7일\n배송 소요 기간: 7일\n약 14일 후 상품을 받을 수 있습니다.`,
        tmpltCode: this.templateRefix + '_006',
        resMethod: 'PUSH',
      };

      await axios.post(bizBaseUrl + '/v2/kko/sendAlimTalk', alarmTalkTemplate, {
        headers: {
          'Content-Type': 'application/json',
          'bt-token': token,
        },
      });
      await axios.get(bizBaseUrl + '/v2/kko/getResultAll', {
        headers: {
          'Content-Type': 'application/json',
          'bt-token': token,
        },
      });

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async rejectSettle(
    phoneNumber: string,
    { reason, productName }: { reason: string; productName: string },
  ) {
    const bizBaseUrl = 'https://www.biztalk-api.com';
    try {
      const token = await this.getCode();
      if (!token) return false;

      const alarmTalkTemplate = {
        msgIdx: this.templateRefix + Number(new Date()).toString(),
        countryCode: '82',
        recipient: phoneNumber,
        senderKey: this.senderKey,
        message: `[${reason}]로 [${productName}] 거래건에 대해서 정산요청이 거절되었습니다.\n문의사항이 있으면 아래의 링크로 문의바랍니다.\n[${'https:/this.templateRefix+/.com'}]`,
        tmpltCode: this.templateRefix + '_007',
        resMethod: 'PUSH',
      };

      await axios.post(bizBaseUrl + '/v2/kko/sendAlimTalk', alarmTalkTemplate, {
        headers: {
          'Content-Type': 'application/json',
          'bt-token': token,
        },
      });
      await axios.get(bizBaseUrl + '/v2/kko/getResultAll', {
        headers: {
          'Content-Type': 'application/json',
          'bt-token': token,
        },
      });

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async sendRequestCharge(
    phoneNumber: string,
    { remainingFee }: { remainingFee: number },
  ) {
    const bizBaseUrl = 'https://www.biztalk-api.com';
    try {
      const token = await this.getCode();
      if (!token) return false;

      const alarmTalkTemplate = {
        msgIdx: this.templateRefix + Number(new Date()).toString(),
        countryCode: '82',
        recipient: phoneNumber,
        senderKey: this.senderKey,
        message: `<관리자용-수수료 충전요청>\n현재 지갑에 [${remainingFee}]만큼 남아있습니다.\n원활한 거래를 위해서 충전이 필요합니다.`,
        tmpltCode: this.templateRefix + '_008',
        resMethod: 'PUSH',
      };

      await axios.post(bizBaseUrl + '/v2/kko/sendAlimTalk', alarmTalkTemplate, {
        headers: {
          'Content-Type': 'application/json',
          'bt-token': token,
        },
      });
      await axios.get(bizBaseUrl + '/v2/kko/getResultAll', {
        headers: {
          'Content-Type': 'application/json',
          'bt-token': token,
        },
      });

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  async sendRequestSettle(
    phoneNumber: string,
    { userName, charge }: { userName: string; charge: number },
  ) {
    const bizBaseUrl = 'https://www.biztalk-api.com';
    try {
      const token = await this.getCode();
      if (!token) return false;

      const alarmTalkTemplate = {
        msgIdx: this.templateRefix + Number(new Date()).toString(),
        countryCode: '82',
        recipient: phoneNumber,
        senderKey: this.senderKey,
        message: `${userName}님이 요청하신 정산 건에 대해서 [${charge}]원 정산처리되었습니다.\n수수료는 한달 기준으로 2000원씩 차감 처리됩니다.`,
        tmpltCode: this.templateRefix + '_009',
        resMethod: 'PUSH',
      };

      await axios.post(bizBaseUrl + '/v2/kko/sendAlimTalk', alarmTalkTemplate, {
        headers: {
          'Content-Type': 'application/json',
          'bt-token': token,
        },
      });
      await axios.get(bizBaseUrl + '/v2/kko/getResultAll', {
        headers: {
          'Content-Type': 'application/json',
          'bt-token': token,
        },
      });

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
