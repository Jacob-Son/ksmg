import React from 'react';
import {
  NotificationContainerCSS,
  NotificationListCSS,
} from './WithdrawalNotification.styles';
import parse from 'html-react-parser';

const notifications = [
  '회원 탈퇴를 시점을 기준으로 배송중 혹은 반품이나 교환 중에 있는 물품이 없을 때만 탈퇴 처리가 가능합니다.',
  // '회원 탈퇴 시 보유하고 계신 판매 금액, 쿠폰 및 포인트, 상품권이 있을경우 자동 소멸되며 복귀되지 않습니다.',
  '회원 탈퇴 후 30일 동안 재가입이 제한됩니다.',
  '회원 탈퇴 후 재가입 방지 목적으로 30일동안 개인정보(이메일, 아이디, CI/DI, 휴대폰번호)를 보관하며, 재가입 제한 기간 경과 후 즉시 파기됩니다.',
  '단, 전자상거래 등에서의 소비자보호에 관한 법률, 통신비밀보호법 등 관련법령의 규정에 의하여 아래와 같이 개인정보가 일정 기간 보관됩니다.\n\n- 계약 또는 청약철회 등에 관한 기록: 5년, 대금결제 및 재화 등의 공급에 관한 기록 : 5년, 소비자의 불만 또는 분쟁처리에 관한 기록: 3년, 웹사이트 방문 기록 : 3개월',
  'SMS, E-MAIL 광고를 수신하셨다면 탈퇴 이후 약 2일- 3일 정도까지 광고가 전송될 수 있사오니, 이 점 양해 부탁드립니다.',
];

export default function WithdrawalNotification() {
  return (
    <div css={NotificationContainerCSS}>
      <p>탈퇴 안내사항</p>
      <ul css={NotificationListCSS}>
        {notifications.map((x) => (
          <li key={x}>
            <p>{parse(x.replace(/\n/g, '<br/>'))}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
