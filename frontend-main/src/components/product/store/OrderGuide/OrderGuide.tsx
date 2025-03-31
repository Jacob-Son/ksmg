import {
  OrderGuideContainerCSS,
  OrderGuideTitleCSS,
  OrderGuidesFlexCSS,
} from './OrderGuide.styles';

export default function OrderGuide() {
  return (
    <div css={OrderGuidesFlexCSS}>
      <div css={OrderGuideContainerCSS}>
        <p css={OrderGuideTitleCSS}>1. 반품 및 환불이 가능한 경우
        </p>
        <p>
        <p>•	상품 수령일로부터 7일 이내 요청한 경우</p>
        <p>•	상품이 표시·광고 내용과 다르거나 하자가 있는 경우 (배송비 포함 전액 환불)</p>
        <p>•	배송 중 파손 또는 오배송된 경우</p>
          </p>
      </div>

      <div css={OrderGuideContainerCSS}>
        <p css={OrderGuideTitleCSS}>2. 반품 및 환불이 불가능한 경우
        </p>
        <p>
        <p>	•	고객님의 부주의로 인해 상품이 훼손된 경우 </p>
        <p>•	사용 또는 소비로 인해 상품의 가치가 현저히 감소한 경우</p>
        <p>•	포장이 훼손되어 상품의 가치가 떨어진 경우</p>
        <p>•	환불 가능 기간(수령일 기준 7일)이 지난 경우</p>

        </p>
      </div>

      <div css={OrderGuideContainerCSS}>
        <p css={OrderGuideTitleCSS}>3. 반품/환불 절차
        </p>
        <p>
        <p>•	고객센터를 통해 반품 요청</p>
        <p>•	연락처 : 0101-8666-3555, 운영 시간 : 평일 10:00~17:00 (점심시간 12:30~13:30 제외/ 주말 및 공휴일 제외)</p>
        <p>•	반품 승인 후, 안내드린 주소로 상품을 보내주세요</p>
        <p>•	상품 회수 및 검수 후 환불 처리 (영업일 기준 3~5일 소요)</p>
        </p>
      </div>

      <div css={OrderGuideContainerCSS}>
        <p css={OrderGuideTitleCSS}>4. 배송비 안내</p>
        <p>• 단순 변심으로 인한 반품: 왕복 배송비 고객 부담</p>
        <p>• 상품 하자 또는 오배송: 배송비 전액 당사 부담</p>
      </div>

      <div css={OrderGuideContainerCSS}>
        <p css={OrderGuideTitleCSS}>5. 환불 처리 방법        </p>
        <p>• 결제 수단에 따라 환불 처리 기간이 상이할 수 있습니다.
        (예: 카드사 승인 취소는 약 3~7일 소요)</p>
        <p>• 환불은 결제하신 수단으로 진행됩니다.</p>
      </div>
    </div>
  );
}
