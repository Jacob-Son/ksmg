import React from 'react';
import { IProductInfoProps } from '../../ProductInfo/ProductInfo.types';
import { addComma } from 'src/utils/format';
import dayjs from 'dayjs';
import Image from 'next/image';
import {
  AddressCSS,
  TransactionItemCSS,
  TransactionsContainerCSS,
} from './Transactions.styles';
import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export default function Transactions({
  data,
}: {
  data: IProductInfoProps['transactions'];
}) {
  return (
    <div css={TransactionsContainerCSS}>
      {data.map((tx, i) => (
        <div css={TransactionItemCSS} key={`transaction_${i}`}>
          <div
            css={css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            })}
          >
            <p>{addComma(tx.price)}원</p>
            <div css={css({ display: 'flex', alignItems: 'center', gap: 6 })}>
              <p css={css({ color: color.blue.main })}>
                {dayjs(tx.date).format('YYYY.MM.DD')}
              </p>
              <Image
                alt="view more"
                src="/icons/ic_share.svg"
                width={20}
                height={21}
              />
            </div>
          </div>

          <div css={css({ display: 'flex', alignItems: 'center', gap: 12 })}>
            <p>From</p>
            <p css={AddressCSS}>{tx.from}</p>
            <Image
              alt="arrow"
              src="/icons/ic_arrow_right_grey.svg"
              width={20}
              height={21}
            />
            <p>To</p>
            <p css={AddressCSS}>{tx.to}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
