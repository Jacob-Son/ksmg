import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import Pagination from 'src/components/common/Pagination/Pagination';
import ProductItem from 'src/components/product/item/ProductItem';
import { useResponsive } from 'src/hooks/common/useResponsive';
import { useSameCreateUnitNftList } from 'src/hooks/nft/useSameCreateUnitNftList';
import Layout from 'src/layout/Layout';
import { color } from 'src/styles/colors';
import { breakpoints, mediaQuery, mq } from 'src/styles/mediaQuery';
import { SimpleNftType } from '~/types/nft';

export default function CategoryPage() {
  const title = '같은 상품';
  const router = useRouter();
  const { nftCreateUnitId, page } = router.query;
  const { isMobile } = useResponsive();
  const { nftList } = useSameCreateUnitNftList(
    Number(nftCreateUnitId),
    Number(page ?? 1),
  );
  const [nfts, setNfts] = React.useState<SimpleNftType[]>([]);

  React.useEffect(() => {
    if (nftList?.nfts) {
      setNfts(nftList.nfts);
    }
  }, [nftList]);

  const head1Text = nftList?.nfts[0]?.name || '';

  const searchResult = (
    <div css={SearchResultTextCSS}>
      <p>총 {nftList?.totalCount || 0}개</p>
    </div>
  );
  const body =
    nfts.length === 0 ? (
      <div css={NotFoundCSS}>
        <Image
          alt="not found"
          src="/imgs/img_404.svg"
          width={200}
          height={231}
        />
        <p>
          <>
            해당하는
            <br />
            작품이 없습니다.
            <br />
            다른 책을 찾아보는건 어떨까요?
          </>
        </p>
      </div>
    ) : (
      <div>
        <div css={ItemsGridCSS}>
          {nfts.map((x) => (
            <ProductItem
              key={`nft-${x.tokenId}`}
              category={x?.category ? (x?.category as string) : ''}
              {...x}
              soldout={x.price === null}
            />
          ))}
        </div>
        <Pagination
          currentPage={Number(page || 1)}
          lastPage={nftList?.totalPage}
          onClick={(val) =>
            router.push({ query: { ...router.query, page: val } })
          }
          css={PaginationCSS}
        />
      </div>
    );
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {isMobile ? (
        <Layout
          css={[LayoutCSS, css({ marginLeft: 20, marginRight: 20 })]}
          title={title}
          onClickPrev={() => {
            router.back();
          }}
        >
          <h1 css={TitleCSS}>{head1Text}</h1>
          {searchResult}
          {body}
        </Layout>
      ) : (
        <Layout css={LayoutCSS}>
          <h1
            css={[
              TitleCSS,
              css({ ...(isMobile && { marginLeft: 20, marginRight: 20 }) }),
            ]}
          >
            {head1Text}
          </h1>
          <div css={BodyCSS}>
            <div
              css={css({
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
              })}
            >
              {searchResult}
              {body}
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}

const LayoutCSS = css({
  marginTop: 100,
  marginBottom: 400,
  paddingLeft: 30,
  paddingRight: 30,
  letterSpacing: '-0.165px',
  [mq.tablet]: {
    paddingTop: 60,
    marginBottom: 200,
  },
  [mq.mobile]: {
    marginTop: 70,
    paddingTop: 40,
    marginBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
});

export const TitleCSS = css({
  marginBottom: 20,
  fontSize: 34,
  fontWeight: 600,
  lineHeight: '38px',
  letterSpacing: '-0.6px',

  '& span': {
    color: color.purple,
  },

  [mq.mobile]: {
    marginBottom: 0,
    paddingBottom: 12,
    borderBottom: `1px solid ${color.border.primary}`,
  },
});

export const BodyCSS = css({
  marginTop: 50,
  gap: 50,
  display: 'flex',

  [mq.tablet]: {
    marginTop: 40,
    gap: 40,
  },
});

export const SearchResultTextCSS = css({
  marginBottom: 50,
  paddingBottom: 14,
  fontSize: 18,
  fontWeight: 600,
  lineHeight: '110%',
  borderBottom: `4px solid ${color.border.secondary}`,
  width: 250,

  [mq.tablet]: {
    marginBottom: 20,
  },
  [mq.mobile]: {
    marginBottom: 13,
    paddingTop: 15,
  },
});

export const NotFoundCSS = css({
  gap: 40,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  lineHeight: '130%',
  [mq.tablet]: {
    paddingTop: 20,
  },
  [mq.mobile]: {
    marginTop: 83,
    marginBottom: 200,
  },
});

export const ItemsGridCSS = css({
  display: 'grid',
  gap: `20px 2px`,
  gridTemplateColumns: 'repeat(2, 1fr)',

  [mq.desktop]: {
    gap: `40px 4px`,
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
});

const PaginationCSS = css({
  margin: '50px auto 0 auto',

  [mediaQuery.down(breakpoints.tb_1076)]: {
    gap: 6,
  },
  [mq.mobile]: {
    marginBottom: 50,
  },
});
