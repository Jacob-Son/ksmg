import React, { useEffect } from 'react';
import Image from 'next/image';
import {
  BidButtonCSS,
  BidButtonsSectionCSS,
  LikeButtonCSS,
} from './AuctionActionGroup.styles';
import Button from 'src/components/common/Button/Button';
import { css } from '@emotion/react';
import { useResponsive } from 'src/hooks/common/useResponsive';
import { useAuthStore } from 'src/stores/auth/auth.store';
import { IAuction } from '~/types/auction';
import useAccount from 'src/hooks/common/useAccount';
import { useAuctionLike } from 'src/hooks/auction/useAuctionLike';
import { auctionApi } from 'src/services/auction_api';

export default function AuctionActionGroup({
  data,
  onClickBid,
  setTotalLikeCount,
  isFinished,
}: {
  data: IAuction;
  onClickBid: () => void;
  setTotalLikeCount: React.Dispatch<React.SetStateAction<number>>;
  isFinished: boolean;
}) {
  const { toggleLoginModal } = useAuthStore();
  const { address } = useAccount();
  const { isMobile } = useResponsive();
  const { isLike } = useAuctionLike(data.auctionId, address);
  const [isLikeClicked, setIsLikeClicked] = React.useState(false);

  useEffect(() => {
    if (isLike === undefined) return;
    setIsLikeClicked(isLike);
  }, [isLike]);

  const handleClickLike = async () => {
    if (!address) {
      toggleLoginModal();
      return;
    }
    const res = await auctionApi.addAuctionLike(data.auctionId, address);
    if (res.data) {
      setTotalLikeCount((state) => state + 1);
      setIsLikeClicked(true);
      return;
    } else {
      setTotalLikeCount((state) => state - 1);
      setIsLikeClicked(false);
      return;
    }
  };

  const likeButtonEles = (
    <>
      <Image
        alt="heart"
        src={
          isLikeClicked
            ? '/icons/ic_heart_2_fill.svg'
            : '/icons/ic_heart_2_outline.svg'
        }
        width={24}
        height={24}
      />
      <p
        css={css({
          fontSize: 14,
          fontWeight: 300,
          lineHeight: '120%',
          letterSpacing: '-0.165px',
        })}
      >
        {data?.totalLikeCount}
      </p>
    </>
  );

  return (
    <div css={BidButtonsSectionCSS}>
      {isMobile ? (
        <>
          <button
            type="button"
            onClick={handleClickLike}
            css={[
              LikeButtonCSS,
              css({
                border: 'none',
                background: 'transparent',
                padding: 0,
              }),
            ]}
          >
            {likeButtonEles}
          </button>
          <Button
            onClick={onClickBid}
            layout="contained"
            disabled={isFinished}
            css={BidButtonCSS}
          >
            {isFinished ? '경매가 완료되었습니다' : '입찰하기'}
          </Button>
        </>
      ) : (
        <div
          css={css({
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
          })}
        >
          <Button
            onClick={onClickBid}
            layout="contained"
            disabled={isFinished}
            css={BidButtonCSS}
          >
            {isFinished ? '경매가 완료되었습니다' : '입찰하기'}
          </Button>
          <Button onClick={handleClickLike} css={LikeButtonCSS}>
            {likeButtonEles}
          </Button>
        </div>
      )}
    </div>
  );
}
