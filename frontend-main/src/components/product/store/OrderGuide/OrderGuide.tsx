import {
  OrderGuideContainerCSS,
  OrderGuideTitleCSS,
  OrderGuidesFlexCSS,
} from './OrderGuide.styles';

export default function OrderGuide() {
  return (
    <div css={OrderGuidesFlexCSS}>
      <div css={OrderGuideContainerCSS}>
        <p css={OrderGuideTitleCSS}>배송구분</p>
        <p>- 구매 확정시 소유</p>
        <p>- 별도 배송 없음</p>
      </div>

      <div css={OrderGuideContainerCSS}>
        <p css={OrderGuideTitleCSS}>반품/교환 방법</p>
        <p>- 나의 서재 {'>'} 거래 내역에서 조회 및 환불 요청 가능</p>
      </div>

      <div css={OrderGuideContainerCSS}>
        <p css={OrderGuideTitleCSS}>반품/교환 가능 기간</p>
        <p>
          - 구매 후 7일 이내에 환불이 가능하며, 책을 1회 이상 열람 또는
          구매확정할 경우 환불이 불가능합니다
        </p>
      </div>

      <div css={OrderGuideContainerCSS}>
        <p css={OrderGuideTitleCSS}>반품/교환 불가 사유</p>
        <p>- 구매 후 7일이 지난 경우</p>
        <p>- 책을 1회 이상 열람한 경우</p>
        <p>- 책을 구매확정한 경우</p>
      </div>
    </div>
  );
}
