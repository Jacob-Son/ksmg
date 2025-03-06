import {
  RelatedProductsCarouselCSS,
  RelatedProductsCarouselItemCSS,
} from './RelatedProducts.styles';
import Link from 'next/link';
import { addComma } from 'src/utils/format';
import { css } from '@emotion/react';
import { mq } from 'src/styles/mediaQuery';
import TitleRow from 'src/components/common/TitleRow/TItleRow';
import { SimpleNftType } from '~/types/nft';
import Image from 'next/image';

interface IRelatedProductsProps {
  name: string;
  data: SimpleNftType[];
}

export default function RelatedProducts({ name, data }: IRelatedProductsProps) {
  return (
    <div>
      <TitleRow
        name={`같은 ${name}의 다른 작품`}
        css={css({
          [mq.mobile]: { padding: '0 20px' },
        })}
      />
      <div css={RelatedProductsCarouselCSS}>
        {data.map((product, i) => (
          <Link
            css={RelatedProductsCarouselItemCSS}
            href={`/store/${product.tokenId}`}
            key={`related_${i}`}
          >
            <Image
              alt={product.name}
              src={product.nftImagePath}
              width={140}
              height={160}
            />
            <p
              css={css({
                marginTop: 12,
                lineHeight: '130%',
              })}
            >
              {product.name}
            </p>
            <p
              css={css({
                marginTop: 4,
                fontWeight: 600,
                lineHeight: '100%',
                opacity: product.price ? 1 : 0,
              })}
            >
              {addComma(product.price ?? 0)}원
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
