import React from 'react';
import { IProductInfoProps } from '../../ProductInfo/ProductInfo.types';
import dayjs from 'dayjs';
import { reduceString } from 'src/utils/format';
import { DetailsContainerCSS, LabelCSS, ValueCSS } from './NftDetails.styles';

export default function NftDetails({
  data,
}: {
  data: IProductInfoProps['nftDetails'];
}) {
  return (
    <div css={DetailsContainerCSS}>
      <p css={LabelCSS}>계약 주소</p>
      <p css={ValueCSS}>{reduceString(data.address)}</p>
      <p css={LabelCSS}>토큰 ID</p>
      <p css={ValueCSS}>{data.tokenId}</p>
      <p css={LabelCSS}>토큰 표준</p>
      <p css={ValueCSS}>{data.standard}</p>
      <p css={LabelCSS}>블록체인</p>
      <p css={ValueCSS}>{data.network}</p>
      <p css={LabelCSS}>마지막 업데이트</p>
      <p css={ValueCSS}>
        {Math.floor(
          dayjs(new Date()).diff(data.updatedAt) / (24 * 60 * 60 * 1000),
        )}
        일 전
      </p>
      <p css={LabelCSS}>창작자 로열티</p>
      <p css={ValueCSS}>{data.royaltyFee * 100}%</p>
    </div>
  );
}
