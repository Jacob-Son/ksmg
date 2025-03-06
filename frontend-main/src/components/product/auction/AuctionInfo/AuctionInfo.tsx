import dayjs from 'dayjs';
import React from 'react';
import { addComma } from 'src/utils/format';
import {
  PriceInfoCSS,
  PriceInfosGridCSS,
  TimeInfoCSS,
  TimeInfosFlexCSS,
} from './AuctionInfo.styles';

interface IAuctionInfoProps {
  currentPrice: number;
  openPrice: number;
  expectedPrice: number;
  closedAt: Date;
  startPrice: number;
  remainingTime: string;
}

export default function AuctionInfo(props: IAuctionInfoProps) {
  return (
    <div>
      <div css={PriceInfosGridCSS}>
        <p>추정가</p>
        <p css={PriceInfoCSS}>{addComma(props.expectedPrice)}원</p>
        <p>시작가</p>
        <p css={PriceInfoCSS}>{addComma(props.openPrice)}원</p>
        <p>현재가</p>
        <p css={PriceInfoCSS}>
          <span>
            {addComma(
              props.currentPrice ? props.currentPrice : props.startPrice,
            )}
          </span>{' '}
          원
        </p>
      </div>
      <div css={TimeInfosFlexCSS}>
        <div css={TimeInfoCSS}>
          <p> 마감시간</p>
          <p>{dayjs(props.closedAt).format('YYYY-MM-DD hh:mm:ss')}</p>
        </div>
        <div css={TimeInfoCSS}>
          <p> 남은시간</p>
          <p>{props.remainingTime}</p>
        </div>
      </div>
    </div>
  );
}
