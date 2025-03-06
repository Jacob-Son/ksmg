import { css } from '@emotion/react';
import React from 'react';
import TitleRow from 'src/components/common/TitleRow/TItleRow';
import { useResponsive } from 'src/hooks/common/useResponsive';
import {
  MbRecommendationCarouselCSS,
  RecommendationCarouselCSS,
  DotsWrapperCSS,
  MbCarouselContainerCSS,
} from './Recommendations.styles';
import PaginationDots from 'src/components/common/PaginationDots/PaginationDots';
import { Recommend } from '~/types/home';
import useBanners from 'src/hooks/banners/useBanners';
import { animationSettings } from './Recommendations.constants';
import RecommendationItem from './RecommendationItem';

interface IRecommendationsProps {
  name: string;
  data: {
    recommend: Recommend;
    nftImagePath: string;
    tokenId: string;
  }[];
}

export default function Recommendations({ name, data }: IRecommendationsProps) {
  const { isMobile } = useResponsive();
  const {
    current,
    isDragging,
    isTranslationActive,
    throttledSetCurrent,
    handleTouchStart,
    handleTouchMove,
    onMoveEnd,
    handleMouseDown,
    handleMouseMove,
  } = useBanners<{
    recommend: Recommend;
    nftImagePath: string;
    tokenId: string;
  }>({
    banners: data,
    animationSettings: animationSettings,
    isAutoSlide: false,
  });

  return (
    <div>
      <TitleRow name={name} sort="최신 순" css={css({ padding: '0 24px' })} />
      {isMobile ? (
        <div
          css={MbRecommendationCarouselCSS}
          {...(data.length > 1 && {
            onTouchStart: handleTouchStart,
            onTouchMove: handleTouchMove,
            onTouchEnd: onMoveEnd,
            onMouseDown: handleMouseDown,
            onMouseMove: handleMouseMove,
            onMouseUp: onMoveEnd,
          })}
        >
          <div
            css={css({
              ...(isDragging && { cursor: 'grabbing' }),
            })}
          >
            <div
              css={[
                MbCarouselContainerCSS,
                css({
                  transform: `translateX(calc(-${current} * (100% + 24px)))`,
                  ...(!isTranslationActive && { transition: 'none' }),
                }),
              ]}
            >
              {(data.length > 1 ? data.concat(data).concat(data) : data).map(
                (x, idx) => (
                  <RecommendationItem item={x} key={`recommendation_${idx}`} />
                ),
              )}
            </div>
          </div>
        </div>
      ) : (
        <div css={RecommendationCarouselCSS}>
          {data.map((x, i) => (
            <RecommendationItem item={x} key={`recommendation_${name}_${i}`} />
          ))}
        </div>
      )}
      {isMobile && (
        <div css={DotsWrapperCSS}>
          <PaginationDots
            current={current % data.length}
            total={data.length}
            onClick={throttledSetCurrent}
          />
        </div>
      )}
    </div>
  );
}
