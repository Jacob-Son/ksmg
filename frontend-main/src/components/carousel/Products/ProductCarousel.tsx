import Link from 'next/link';
import { addComma } from 'src/utils/format';
import { css } from '@emotion/react';
import {
  CarouselItemImgWrapperCSS,
  ProductCarouselCSS,
  ProductCarouselItemCSS,
  ProductCarouselRankCSS,
  RankItemImageWrapperCSS,
} from './ProductCarousel.styles';
import { color } from 'src/styles/colors';
import TitleRow from 'src/components/common/TitleRow/TItleRow';
import { SimpleNftType } from '~/types/nft';
import Image from 'next/image';
import React from 'react';
import { mq } from 'src/styles/mediaQuery';

interface IProductCarouselProps {
  name: string;
  type?: 'normal' | 'rank';
  padding?: number;
  radius?: number;
  image?: {
    width: number;
    height: number;
  };
  data: SimpleNftType[];
}

export default function ProductCarousel({
  name,
  type = 'normal',
  padding = 24,
  radius = 12,
  image = { width: 292.5, height: 303 },
  data,
}: IProductCarouselProps) {
  const [current, setCurrent] = React.useState(0);
  const perPage = type === 'normal' ? 4 : 6;
  if (!data) return <></>;
  return (
    <div>
      <TitleRow
        name={name}
        sort={type === 'normal' ? '최신 순' : '월간'}
        css={css({
          padding: `0 ${padding}px`,
        })}
        showNavigator
        currentIndex={current}
        setCurrentIndex={setCurrent}
        perPage={perPage}
        total={data?.length}
      />
      <div
        css={[ProductCarouselCSS(perPage), css({ padding: `0 ${padding}px` })]}
      >
        {data
          ?.slice(perPage * current, perPage * (current + 1))
          .map((product, i) => (
            <Link
              css={[
                ProductCarouselItemCSS,
                css({
                  width: image.width,
                  [mq.desktop]: {
                    width: '100%',
                  },
                }),
              ]}
              href={`/store/${product.tokenId}`}
              key={`product_carousel_${name}_${i}`}
            >
              {type === 'normal' && (
                <div
                  css={[
                    CarouselItemImgWrapperCSS,
                    css({
                      width: image.width,
                      height: image.height,
                      [mq.desktop]: {
                        width: '100%',
                      },
                    }),
                  ]}
                >
                  <Image
                    alt={product.name}
                    src={product.nftImagePath}
                    width={154}
                    height={217}
                  />
                </div>
              )}
              {type === 'rank' && (
                <div
                  css={[
                    RankItemImageWrapperCSS(image.width, image.height),
                    css({ borderRadius: radius }),
                  ]}
                >
                  <Image
                    alt={product.name}
                    src={product.nftImagePath}
                    fill
                    css={css({
                      [mq.desktop]: {
                        width: '100%',
                        aspectRatio: `${image.width} / ${image.height}`,
                        height: 'fit-content',
                      },
                    })}
                  />
                  <div css={ProductCarouselRankCSS}>
                    <p>{current * perPage + i + 1}</p>
                  </div>
                </div>
              )}
              <p
                css={css({
                  marginTop: 12,
                  fontSize: 14,
                  fontWeight: 300,
                  lineHeight: '120%',
                  color: color.purple,
                })}
              >
                {product.theme ? product.theme : product.category}
              </p>
              <p
                css={css({
                  marginTop: 4,
                  fontSize: 18,
                  fontWeight: 600,
                  lineHeight: '100%',
                })}
              >
                {product.name}
              </p>
              <p
                css={css({
                  marginTop: 8,
                  lineHeight: '130%',
                  opacity: product.price ? 1 : 0,

                  '& span': {
                    fontSize: 18,
                    fontWeight: 600,
                    lineHeight: '100%',
                  },
                })}
              >
                <span>{addComma(product.price ?? 0)}</span> 원
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
}
