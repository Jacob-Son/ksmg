import React from 'react';
import { IProductInfoProps } from './ProductInfo.types';
import {
  ImageSectionCSS,
  InfoSectionCSS,
  ProductCreatorNameCSS,
  ProductDescriptionCSS,
  ProductInfoContainerCSS,
  ProductPriceCSS,
  ProductTitleCSS,
  ProductTypeCSS,
  SimilarProductsLinkCSS,
  SimilarProductsLinkWrapperCSS,
  StatisticsCSS,
} from './ProductInfo.styles';
import ProductImageCarousel from 'src/components/carousel/ProductImageCarousel/ProductImageCarousel';
import { addComma, nFormatter } from 'src/utils/format';
import Image from 'next/image';
import Link from 'next/link';
import { useResponsive } from 'src/hooks/common/useResponsive';
import PreviewPlayer from 'src/components/audio/PreviewPlayer';

export default function ProductInfo({ data, children }: IProductInfoProps) {
  const isAuction = 'auctionId' in data;
  const { isMobile } = useResponsive();
  const price = isAuction ? data?.highestPrice ?? 0 : data.price;

  return (
    <div css={ProductInfoContainerCSS}>
      <div css={ImageSectionCSS}>
        <ProductImageCarousel
          images={(isAuction ? data.imageUrls : [data.nftImagePath]).map(
            (photo, idx) => ({
              src: photo,
              alt: 'product image' + idx,
            }),
          )}
        />
      </div>
      <div css={InfoSectionCSS}>
        <div>
          {!isAuction && (
            <p css={ProductTypeCSS}>
              {data?.theme ? data.theme : data.category}
            </p>
          )}
          <p css={ProductTitleCSS}>{data.name}</p>
          {!isAuction && data.creatorName && (
            <p css={ProductCreatorNameCSS}>{data.creatorName}</p>
          )}
        </div>
        <div css={StatisticsCSS}>
          <div>
            <Image
              alt="eye icon"
              src="/icons/product/ic_eye.svg"
              width={24}
              height={24}
            />
            <p>{nFormatter(data.totalViewCount)} views</p>
          </div>
          <div>
            <Image
              alt="heart icon"
              src="/icons/ic_heart_outline.svg"
              width={24}
              height={24}
            />
            <p>{nFormatter(data?.totalLikeCount)} favorites</p>
          </div>
        </div>
        {typeof price === 'number' && !!price && (
          <p css={ProductPriceCSS}>
            {addComma(price)} <span>원</span>
          </p>
        )}
        <p css={ProductDescriptionCSS}>{data.description}</p>

        {/* 미리듣기 UI */}
        {isMobile && 'preAudioPath' in data && data?.preAudioPath && (
          <>
            <PreviewPlayer url={data.preAudioPath} />
          </>
        )}
        {isMobile && !isAuction && data.nftCreateUnitId && (
          <div css={SimilarProductsLinkWrapperCSS}>
            <Link
              href={`/work/${data.nftCreateUnitId}`}
              css={SimilarProductsLinkCSS}
            >
              같은 상품 더보기 ({data.totalNftCount})
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M17.6895 11.249H3.75C3.55109 11.249 3.36032 11.328 3.21967 11.4687C3.07902 11.6093 3 11.8001 3 11.999C3 12.1979 3.07902 12.3887 3.21967 12.5293C3.36032 12.67 3.55109 12.749 3.75 12.749H17.6895L12.219 18.218C12.0782 18.3588 11.9991 18.5498 11.9991 18.749C11.9991 18.9482 12.0782 19.1392 12.219 19.28C12.3598 19.4208 12.5508 19.4999 12.75 19.4999C12.9492 19.4999 13.1402 19.4208 13.281 19.28L20.031 12.53C20.1008 12.4603 20.1563 12.3776 20.1941 12.2864C20.2319 12.1953 20.2513 12.0976 20.2513 11.999C20.2513 11.9003 20.2319 11.8027 20.1941 11.7115C20.1563 11.6204 20.1008 11.5377 20.031 11.468L13.281 4.71799C13.1402 4.57716 12.9492 4.49805 12.75 4.49805C12.5508 4.49805 12.3598 4.57716 12.219 4.71799C12.0782 4.85882 11.9991 5.04983 11.9991 5.24899C11.9991 5.44816 12.0782 5.63916 12.219 5.77999L17.6895 11.249Z"
                  fill="#A4ADB3"
                />
              </svg>
            </Link>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
