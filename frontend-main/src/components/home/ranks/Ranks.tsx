import React from 'react';
import {
  RankGridItemCSS,
  RankIconCSS,
  RankItemNameCSS,
  RankItemProductCountCSS,
  RankItemRankCSS,
  RankSortFlexCSS,
  RankSortSelectCSS,
  RanksContainerCSS,
  RanksGridCSS,
  RanksHeadCSS,
  ShowMoreButtonCSS,
} from './Ranks.styles';
import { TitleCSS } from 'src/components/common/TitleRow/TitleRow.styles';
import Image from 'next/image';
import Link from 'next/link';
import { useResponsive } from 'src/hooks/common/useResponsive';
import { ThemeInfo } from '~/types/home';
import Select from 'src/components/common/Select/Select';

enum RankSort {
  Total = 'total',
  Likes = 'likes',
  Sales = 'sales',
  Views = 'views',
}

interface IRanksProps {
  name: string;
  data: {
    [key: string]: ThemeInfo[];
  };
}

const sortOptions = [
  { label: '종합순위', value: RankSort.Total },
  { label: '좋아요순', value: RankSort.Likes },
  { label: '판매순', value: RankSort.Sales },
  { label: '조회순', value: RankSort.Views },
];

export default function Ranks({ name, data }: IRanksProps) {
  const { isMobile } = useResponsive();
  const [showMore, setShowMore] = React.useState(false);
  const [sort, setSort] = React.useState(RankSort.Total);

  const rankList = React.useMemo(
    () => (!isMobile || showMore ? data[sort] : data[sort].slice(0, 5)),
    [isMobile, showMore, sort],
  );

  return (
    <div css={RanksContainerCSS}>
      <div css={RanksHeadCSS}>
        <p css={TitleCSS}>{name}</p>
        <Image
          alt="tag"
          src="/icons/ic_tag.svg"
          width={22}
          height={23}
          css={RankIconCSS}
        />

        {isMobile ? (
          <Select
            value={sort}
            options={sortOptions}
            onChange={(val) => setSort(val)}
            css={RankSortSelectCSS}
          />
        ) : (
          <div css={RankSortFlexCSS}>
            {sortOptions.map((opt) => (
              <button
                key={`sort_${opt.value}`}
                type="button"
                aria-current={opt.value === sort}
                onClick={() => {
                  console.log(`🔄 Sorting changed to: ${opt.value}`); // ✅ Debug Log 추가
                  setSort(opt.value)}}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div css={RanksGridCSS}>
        {rankList.map((item, i) => (
          <Link
            href={`/category?category=육필+시&theme=${item.theme}`}
            css={RankGridItemCSS}
            key={`rank_item_${name}_${item.theme}_${i}`}
          >
            <p css={RankItemRankCSS}>{i + 1}</p>
            <p css={RankItemNameCSS}>{item.theme}</p>
            <p css={RankItemProductCountCSS}>총 상품 수 {item.count}개</p>
          </Link>
        ))}
      </div>
      {isMobile && (
        <>
          {showMore ? (
            <Link href={`/category?category=육필+시`} css={ShowMoreButtonCSS}>
              전체보기
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setShowMore(true)}
              css={ShowMoreButtonCSS}
            >
              더보기
            </button>
          )}
        </>
      )}
    </div>
  );
}
