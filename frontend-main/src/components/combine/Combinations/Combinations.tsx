import Image from 'next/image';
import { useRouter } from 'next/router';
import Pagination from 'src/components/common/Pagination/Pagination';
import {
  CombinationItemContainerCSS,
  CombinationsGridCSS,
  ItemChildrenCSS,
  ItemInfoFlexCSS,
  ItemButtonSectionCSS,
  ItemNameCSS,
  ItemStatusFlexCSS,
  ItemTextSectionCSS,
  ItemButtonCSS,
} from './Combinations.styles';
import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { TCombine } from '~/types/combine';

interface ICombinationsProps {
  data: TCombine[];
  totalPage: number;
}

export default function Combinations({ data, totalPage }: ICombinationsProps) {
  const router = useRouter();
  const { query } = router;
  const { page } = query;

  return (
    <div>
      <div css={CombinationsGridCSS}>
        {data.map((item) => (
          <div
            key={`combination_${item.combineLogId}`}
            css={CombinationItemContainerCSS}
          >
            <div css={ItemInfoFlexCSS}>
              <Image
                alt="cover"
                src={item.combinedNft[0].nftImagePath}
                width={64}
                height={64 * Math.sqrt(2)}
              />
              <div css={ItemTextSectionCSS}>
                <p css={ItemNameCSS}>{item.combinedNft[0].name}</p>
                <p css={ItemChildrenCSS}>
                  {item.combinedNft.length > 4 ? (
                    <>
                      {item.combinedNft
                        .slice(0, 4)
                        .map((child) => child.name)
                        .join(', ')}{' '}
                      외 {item.combinedNft.length - 4}개
                    </>
                  ) : (
                    item.combinedNft.map((child) => child.name).join(', ')
                  )}
                </p>

                <div css={ItemStatusFlexCSS}>
                  {item.combineDelivery && (
                    <div css={css({ borderColor: color.purple })}>
                      <p>복각본 신청 완료</p>
                    </div>
                  )}
                  {item.combineMint && (
                    <div css={css({ borderColor: color.blue.main })}>
                      <p>디지털 도서 제작 완료</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {(!item.combineDelivery || !item.combineMint) && (
              <div
                css={[
                  ItemButtonSectionCSS,
                  css({
                    borderColor:
                      item.combineDelivery && item.combineMint
                        ? 'transparent'
                        : color.icon.sub,
                  }),
                ]}
              >
                {!item.combineDelivery && (
                  <button
                    css={ItemButtonCSS}
                    onClick={() => {
                      router.push(`/combine/address/${item.combineLogId}`);
                    }}
                  >
                    복각본 신청하기
                  </button>
                )}
                {!item.combineDelivery && !item.combineMint && (
                  <div
                    css={css({
                      width: 1,
                      height: 40,
                      backgroundColor: color.icon.sub,
                    })}
                  />
                )}
                {!item.combineMint && (
                  <button
                    css={ItemButtonCSS}
                    onClick={() => {
                      router.push(`/combine/create-ebook/${item.combineLogId}`);
                    }}
                  >
                    육필 시 노트북 디지털 도서 완성하기
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <Pagination
        currentPage={Number(page || 1)}
        lastPage={totalPage}
        onClick={(val) => router.push({ query: { ...query, page: val } })}
        layout="dark"
      />
    </div>
  );
}
