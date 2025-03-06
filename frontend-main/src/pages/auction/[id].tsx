import React, { useEffect } from 'react';
import Head from 'next/head';
import Layout from 'src/layout/Layout';
import ProductInfo from 'src/components/product/ProductInfo/ProductInfo';
import { css } from '@emotion/react';
import { mq } from 'src/styles/mediaQuery';
import Tabs from 'src/components/product/store/Tabs/Tabs';
import AuctionInfo from 'src/components/product/auction/AuctionInfo/AuctionInfo';
import { useResponsive } from 'src/hooks/common/useResponsive';
import AuctionActionGroup from 'src/components/product/auction/AuctionActionGroup/AuctionActionGroup';
import BidLogs from 'src/components/product/auction/BidLogs/BidLogs';
import BidModal from 'src/components/product/modal/BidModal/BidModal';
import { useRouter } from 'next/router';
import { useAuction } from 'src/hooks/auction/useAuction';
import { useBids } from 'src/hooks/auction/useBid';
import NftDetailInfo from 'src/components/product/store/NftDetailInfo/NftDetailInfo';
import { auctionApi } from 'src/services/auction_api';
import dayjs from 'dayjs';
import AuctionSocket from 'src/socket/socket';
import { Bid } from '~/types/auction';
import useAccount from 'src/hooks/common/useAccount';
import { useAuthStore } from 'src/stores/auth/auth.store';

const tabs = [{ value: 'details', label: '작품상세' }];

export default function AuctionPage() {
  const title = 'Auction Page';
  const { isMobile } = useResponsive();

  const router = useRouter();
  const { id } = router.query;
  const auctionId = String(id);
  const {
    auction,
    isPending: isAuctionPending,
    refetch: refetchAuction,
  } = useAuction(String(id));
  const { bids, refetch: refetchBids } = useBids(String(id));
  const { address } = useAccount();

  const [currentTab, setCurrentTab] = React.useState<string>('details');
  const [showBidModal, setShowBidModal] = React.useState<boolean>(false);
  const [currentPrice, setCurrentPrice] = React.useState<number>(0);
  const [totalLikeCount, setTotalLikeCount] = React.useState(0);

  const [remainingTime, setRemainingTime] = React.useState(0);
  const [isFinished, setIsFinished] = React.useState(false);

  const { toggleLoginModal } = useAuthStore();

  React.useEffect(() => {
    if (auction === undefined) return;
    if (auction === null) {
      router.push('/');
      return;
    }
    const _remainingTime = dayjs(auction.endTime).diff(
      dayjs(new Date()),
      'second',
    );
    if (_remainingTime <= 0) {
      setIsFinished(true);
      return;
    }
    setRemainingTime(_remainingTime);
    const interval = setInterval(() => {
      const _remainingTime = dayjs(auction.endTime).diff(
        dayjs(new Date()),
        'second',
      );
      if (_remainingTime <= 0) {
        clearInterval(interval);
        setIsFinished(true);
        return;
      }
      setRemainingTime(_remainingTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [auction]);

  const formatPad = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  // 남은 시간을 포맷팅하는 함수
  const formatTime = (timeInSeconds: number) => {
    const days = Math.floor(timeInSeconds / 86400);
    const hours = Math.floor((timeInSeconds % 86400) / 3600);
    const minutes = Math.floor(((timeInSeconds % 86400) % 3600) / 60);
    const seconds = ((timeInSeconds % 86400) % 3600) % 60;

    return `${days}일 ${formatPad(hours)}:${formatPad(minutes)}:${formatPad(
      seconds,
    )}`;
  };

  const handleClickBid = () => {
    if (!auction) return;
    if (isFinished) return;
    if (!address) {
      toggleLoginModal();
      return;
    }
    setShowBidModal(true);
  };

  useEffect(() => {
    if (auction === undefined) return;
    if (auction === null) router.push('/');

    setCurrentPrice(auction?.highestPrice ?? 0);
    setTotalLikeCount(auction?.totalLikeCount);
    auctionApi.addAuctionViewCount(auction?.auctionId);
  }, [auction]);

  const refreshPrice = (newPrice: number) => {
    setCurrentPrice(newPrice);
    refetchBids();
  };

  const handleUpdateBid = (newBid: Bid) => {
    refreshPrice(newBid.price);
    refetchAuction();
  };

  // bid 업데이트 로직
  useEffect(() => {
    if (!auction) return;
    const socket = new AuctionSocket(auctionId);
    socket.on(handleUpdateBid);
    return () => {
      socket.off(handleUpdateBid);
    };
  }, [auction]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout css={LayoutCSS} isLoading={isAuctionPending}>
        {auction && (
          <ProductInfo
            data={{
              ...auction,
              totalLikeCount,
            }}
          >
            <AuctionInfo
              startPrice={auction.startPrice}
              currentPrice={currentPrice}
              openPrice={auction.startPrice}
              expectedPrice={auction.estimatedPrice}
              closedAt={new Date(auction.endTime)}
              remainingTime={formatTime(remainingTime ? remainingTime : 0)}
            />
            {isMobile ? null : (
              <AuctionActionGroup
                data={{
                  ...auction,
                  totalLikeCount,
                }}
                setTotalLikeCount={setTotalLikeCount}
                onClickBid={handleClickBid}
                isFinished={isFinished}
              />
            )}
          </ProductInfo>
        )}
        {bids && <BidLogs data={bids} />}
        <div
          css={css({
            margin: '60px 0',

            [mq.mobile]: {
              margin: '12px 0',
              padding: '0 20px',
            },
          })}
        >
          <Tabs current={currentTab} tabs={tabs} onChange={setCurrentTab} />
          {auction?.detailImageUrls && (
            <NftDetailInfo detailImage={auction.detailImageUrls} />
          )}
        </div>
        {/* <RelatedProducts
            name="경매 진행 중인 다른 작품"
            data={dummyData.related}
          /> */}
        {auction && isMobile && (
          <AuctionActionGroup
            data={{
              ...auction,
              totalLikeCount,
            }}
            onClickBid={handleClickBid}
            setTotalLikeCount={setTotalLikeCount}
            isFinished={isFinished}
          />
        )}
      </Layout>
      {auction && (
        <BidModal
          show={showBidModal}
          currentPrice={currentPrice}
          closedAt={new Date(auction.endTime)}
          onClose={() => setShowBidModal(false)}
          refreshPrice={refreshPrice}
          remainingTime={formatTime(remainingTime ? remainingTime : 0)}
        />
      )}
    </>
  );
}

const LayoutCSS = css({
  marginTop: 40,
  paddingLeft: 30,
  paddingRight: 30,

  [mq.mobile]: {
    marginTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
});
