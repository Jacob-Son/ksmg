import React from 'react';
import {
  BannerContainerCSS,
  BannerImageCSS,
  BannerImagesWrapperCSS,
  BannerItemCSS,
  DotsContainerCSS,
} from './Banners.styles';
import PaginationDots from 'src/components/common/PaginationDots/PaginationDots';
import { animationSettings } from './Banners.constants';
import { css } from '@emotion/react';
import { Banner } from '~/types/home';
import { useResponsive } from 'src/hooks/common/useResponsive';
import Link from 'next/link';
import useBanners from 'src/hooks/banners/useBanners';

export default function Banners({ banners }: { banners: Banner[] }) {
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
  } = useBanners<Banner>({ banners, animationSettings: animationSettings });

  if (banners.length === 1)
    return (
      <div css={BannerContainerCSS}>
        <div css={BannerImagesWrapperCSS}>
          <Link
            href={banners[0].link || ''}
            target="_blank"
            rel="noopener noreferrer"
            css={[
              BannerItemCSS,
              {
                ...(isDragging && {
                  pointerEvents: 'none',
                }),
              },
            ]}
          >
            <img
              css={BannerImageCSS}
              src={isMobile ? banners[0].mobileImagePath : banners[0].imagePath}
              alt={'banner'}
              loading="lazy"
              width="100%"
              height="auto"
            />
          </Link>
        </div>
        <div css={DotsContainerCSS}>
          <PaginationDots
            total={banners.length}
            current={current % banners.length}
            onClick={throttledSetCurrent}
          />
        </div>
      </div>
    );
  return (
    <div css={BannerContainerCSS}>
      <div
        css={css({
          ...(isDragging && { cursor: 'grabbing' }),
        })}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={onMoveEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={onMoveEnd}
      >
        <div
          css={[
            BannerImagesWrapperCSS,
            {
              transform: `translateX(calc(100% * ${current} * -1))`,
              ...(!isTranslationActive && { transition: 'none' }),
            },
          ]}
        >
          {banners
            .concat(banners)
            .concat(banners)
            .map((banner, idx) => (
              <Link
                key={`banner_${idx}`}
                href={banner.link || ''}
                target="_blank"
                rel="noopener noreferrer"
                css={[
                  BannerItemCSS,
                  {
                    ...(isDragging && {
                      pointerEvents: 'none',
                    }),
                  },
                ]}
              >
                <img
                  css={BannerImageCSS}
                  src={isMobile ? banner.mobileImagePath : banner.imagePath}
                  alt={'banner'}
                  loading="lazy"
                  width="100%"
                  height="auto"
                />
              </Link>
            ))}
        </div>
      </div>
      <div css={DotsContainerCSS}>
        <PaginationDots
          total={banners.length}
          current={current % banners.length}
          onClick={throttledSetCurrent}
        />
      </div>
    </div>
  );
}
