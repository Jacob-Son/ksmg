import Image from 'next/image';
import React from 'react';
import { IconButtonCSS } from 'src/components/common/Button/Button.styles';
import { useResponsive } from 'src/hooks/common/useResponsive';
import {
  BidLogDateCSS,
  BidLogsContainerCSS,
  BidLogsHeadCSS,
  BidLogsTableCSS,
  MbBidLogCSS,
  MbBidLogDateCSS,
  MbBidLogsWrapperCSS,
  ShowAllButtonCSS,
} from './BidLogs.styles';
import { css } from '@emotion/react';
import dayjs from 'dayjs';
import { addComma } from 'src/utils/format';
import Button from 'src/components/common/Button/Button';
import { color } from 'src/styles/colors';
import { Bid } from '~/types/auction';
import useAccount from 'src/hooks/common/useAccount';

interface IBidLogsProps {
  data: Bid[];
}

export default function BidLogs(props: IBidLogsProps) {
  const { isMobile } = useResponsive();
  const { address } = useAccount();
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [viewAll, setViewAll] = React.useState<boolean>(false);

  const handleViewAll = () => {
    setViewAll((state) => !state);
  };

  return (
    <div css={BidLogsContainerCSS}>
      <div css={BidLogsHeadCSS}>
        <Image
          alt="heart-beat"
          src="/icons/product/ic_heart-rate.svg"
          width={26}
          height={26}
        />
        <p>비딩 로그</p>

        {isMobile && (
          <button
            type="button"
            css={[
              IconButtonCSS,
              css({
                marginLeft: 'auto',
                ...(isVisible && { transform: 'rotate(180deg)' }),
              }),
            ]}
            onClick={() => setIsVisible((state) => !state)}
          >
            <Image
              alt="chevron"
              src="/icons/ic_chevron_down.svg"
              width={20}
              height={20}
            />
          </button>
        )}
      </div>
      {isMobile ? (
        <>
          {isVisible && (
            <div css={MbBidLogsWrapperCSS}>
              {props.data
                .slice(0, viewAll ? props.data.length : 5)
                .map((log, idx) => (
                  <div
                    key={`bid log ${idx}`}
                    css={MbBidLogCSS(address === log.userAddress)}
                  >
                    <div
                      css={css({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      })}
                    >
                      <p css={css({ fontWeight: 600, lineHeight: '100%' })}>
                        {addComma(log.price)}원
                      </p>
                      <p css={css({ lineHeight: '130%' })}>
                        {props.data.length - idx}
                      </p>
                    </div>
                    <p css={css({ marginTop: 6, lineHeight: '130%' })}>
                      {log.userName}
                    </p>
                    <p css={MbBidLogDateCSS(address === log.userAddress)}>
                      {dayjs(log.createdAt).format('YYYY-MM-DD hh:mm:ss')}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </>
      ) : (
        <table css={BidLogsTableCSS}>
          <thead>
            <tr>
              <th>비딩 번호</th>
              <th>입찰자</th>
              <th>입찰 금액</th>
              <th>입찰 시간</th>
            </tr>
          </thead>
          <tbody>
            {props.data
              .slice(0, viewAll ? props.data.length : 5)
              .map((log, i) => (
                <tr
                  key={`bid log table item ${i}`}
                  css={css({
                    ...(address === log.userAddress && {
                      color: color.purple,
                    }),
                  })}
                >
                  <td css={css({ fontWeight: 600, lineHeight: '100%' })}>
                    {props.data.length - i}
                  </td>
                  <td css={css({ lineHeight: '130%' })}>{log.userName}</td>
                  <td css={css({ fontWeight: 600, lineHeight: '100%' })}>
                    {addComma(log.price)}원
                  </td>
                  <td css={BidLogDateCSS(address === log.userAddress)}>
                    {dayjs(log.createdAt).format('YYYY-MM-DD hh:mm:ss')}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      {(!isMobile || (isMobile && isVisible)) && props.data.length > 5 && (
        <Button
          layout="outlined"
          css={[
            ShowAllButtonCSS,
            css({
              ...(viewAll && {
                '& img': {
                  transform: 'rotate(180deg)',
                },
              }),
            }),
          ]}
          endAdornment={
            <Image
              alt="chevron"
              src="/icons/ic_chevron_down.svg"
              width={20}
              height={20}
            />
          }
          onClick={handleViewAll}
        >
          {viewAll ? '비딩로그 닫기' : '비딩로그 더 보기'}
        </Button>
      )}
    </div>
  );
}
