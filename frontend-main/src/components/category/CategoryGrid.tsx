import Link from 'next/link';
import { addComma } from 'src/utils/format';
import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import TitleRow from 'src/components/common/TitleRow/TItleRow';
import Image from 'next/image';
import { mq } from 'src/styles/mediaQuery';

interface ICategoryGridProps {
  name: string;
  data: {
    nftId?: number;
    tokenId: string;
    name: string;
    category: string;
    theme?: string;
    price?: number;
    nftImagePath: string;
  }[];
}

export default function CategoryGrid({ name, data }: ICategoryGridProps) {
  if (!data || data.length === 0)
    return <p css={noProductsMessage}>현재 선택된 카테고리에 상품이 없습니다.</p>;

  return (
    <div>
      {/* ✅ TitleRow 추가 (정렬 방식 통일) */}
      <TitleRow
        // name={name}
        css={css({ padding: `0 24px` })}
        showNavigator={false} // ✅ Grid 방식에서는 네비게이터 숨김
      />

      {/* ✅ 상품 리스트 (3x2 Grid 적용) */}
      <div css={gridContainer}>
        {data.slice(0, 6).map((product, index) => (
          <Link
            css={gridItem}
            href={`/store/${product.tokenId}`}
            key={`category_grid_${name}_${product.nftId || index}`} // ✅ 중복된 key 해결
          >
            {/* ✅ 이미지 */}
            <div css={imageWrapper}>
              <Image
                alt={product.name}
                src={product.nftImagePath}
                layout="responsive"
                objectFit="cover"
                width={292}
                height={280}
              />
            </div>

            {/* ✅ 상품 정보 */}
            <p css={categoryText}>{product.theme ? product.theme : product.category}</p>
            <p css={productTitle}>{product.name}</p>
            <p css={productPrice}>
              <span>{addComma(product.price ?? 0)}</span> 원
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ✅ Grid 레이아웃 */
const gridContainer = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)', // 3개씩 출력
  gap: '20px',
  margin: '20px 24px',
  [mq.mobile]: {
    gridTemplateColumns: 'repeat(1, 1fr)', // 모바일에서는 2개씩 출력
  },
});

const gridItem = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  textAlign: 'left',
  background: 'white',
  padding: '12px',
  borderRadius: '8px',
  cursor: 'pointer',
  textDecoration: 'none',
});

const imageWrapper = css({
  width: '100%',
  borderRadius: '8px',
  overflow: 'hidden',
});

const categoryText = css({
  marginTop: '12px',
  fontSize: 14,
  fontWeight: 300,
  lineHeight: '120%',
  color: color.purple,
  textAlign: "left", // ✅ 왼쪽 정렬 추가
});

const productTitle = css({
  marginTop: '4px',
  fontSize: 18,
  fontWeight: 600,
  lineHeight: '100%',
  color: '#000',
  textAlign: "left", // ✅ 왼쪽 정렬 추가
});

const productPrice = css({
  marginTop: '8px',
  fontSize: 16,
  fontWeight: 600,
  color: '#333',
  lineHeight: '130%',
  '& span': {
    fontSize: 18,
  },
  textAlign: "left", // ✅ 왼쪽 정렬 추가
});

const noProductsMessage = css({
  textAlign: 'center',
  color: '#888',
  marginTop: '20px',
});