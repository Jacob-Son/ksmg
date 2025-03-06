import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { addComma } from 'src/utils/format';
import {
  ProductItemImgWrapperCSS,
  ProductItemInfoCSS,
  ProductItemPriceCSS,
  ProductItemTitleCSS,
  SoldOutTagCSS,
} from './ProductItem.styles';
import { css } from '@emotion/react';

interface IProductItemProps {
  tokenId: string;
  nftImagePath: string;
  theme?: string;
  price: number;
  name: string;
  category: string;
  soldout?: boolean;
}

export default function ProductItem({
  tokenId,
  nftImagePath,
  theme,
  price,
  name,
  category,
  soldout = false,
}: IProductItemProps) {
  return (
    <div>
      <Link
        href={`/store/${tokenId}`}
        css={[
          ProductItemImgWrapperCSS,
          css({
            ...(soldout && {
              '& img': {
                opacity: 0.5,
              },
            }),
          }),
        ]}
      >
        {soldout && (
          <div css={SoldOutTagCSS}>
            <p>SOLD OUT</p>
          </div>
        )}
        <Image src={nftImagePath} alt={name} width={143} height={192} />
      </Link>
      <p css={ProductItemInfoCSS}>{theme ? theme : category}</p>
      <p css={ProductItemTitleCSS}>{name}</p>
      {!soldout && price !== undefined && price !== null && (
        <p
          css={{
            ...ProductItemPriceCSS,
            opacity: price ? 1 : 0,
          }}
        >
          {addComma(price)} 원
        </p>
      )}
    </div>
  );
}
