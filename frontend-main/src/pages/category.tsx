import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import MbVerticalMenu from 'src/components/category/VerticalMenu/MbVerticalMenu';
import VerticalMenu from 'src/components/category/VerticalMenu/VerticalMenu';
import Pagination from 'src/components/common/Pagination/Pagination';
import ProductItem from 'src/components/product/item/ProductItem';
import { useResponsive } from 'src/hooks/common/useResponsive';
import { useNftList } from 'src/hooks/nft/useNftList';
import Layout from 'src/layout/Layout';
import Pending from 'src/sections/Pending';
import { color } from 'src/styles/colors';
import { breakpoints, mediaQuery, mq } from 'src/styles/mediaQuery';
import { SimpleNftType } from '~/types/nft';

export const categoryData = [
  {
    name: '전체 작품',
    children: [],
  },
  {
    name: '장인인삼',
    children: [
      '전체',
      'RG3',
      '진생스토리',

    ],
  },
  // {
  //   name: '육필 시 노트',
  //   children: [],
  // },
  // {
  //   name: '문화예술',
  //   children: [],
  // },
];

export default function CategoryPage() {
  const title = '카테고리';
  const router = useRouter();
  const { category, theme, keyword, page } = router.query;
  const { isMobile } = useResponsive();
  const { nftList, isLoading } = useNftList(
    Number(page),
    String(
      category === '전체 작품' || category === '전체 작품' ? '' : category,
    ),
    String(theme),
    String(keyword),
  );
  const [nfts, setNfts] = React.useState<SimpleNftType[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (nftList?.nfts) {
      setNfts(nftList.nfts);
    }
  }, [nftList]);

  const head1Text = keyword ? (
    <>
      <span>{keyword}</span> 검색결과입니다.
    </>
  ) : category || theme ? (
    <>
      {category === '전체 작품' ? (
        '전체 작품입니다'
      ) : (
        <>
          <span>{theme || category}</span> 상품목록입니다.
        </>
      )}
    </>
  ) : (
    '전체 작품입니다'
  );

  const searchResult = isLoading ? (
    ''
  ) : (
    <div css={SearchResultTextCSS}>
      <p>
        {keyword
          ? category && theme
            ? category + ' / ' + theme
            : category || theme || '총'
          : '총'}{' '}
        {nftList?.totalCount || 0}개
      </p>
    </div>
  );
  const body = isLoading ? (
    <Pending />
  ) : nfts.length === 0 ? (
    <div css={NotFoundCSS}>
      <Image alt="not found" src="/imgs/img_404.svg" width={200} height={231} />
      <p>
        {keyword ? (
          <>
            현재 이 카테고리에는
            <br />
            해당 검색어와 관련된 상품이 없습니다.
            <br />
            검색어를 다시 확인해보시겠어요?
          </>
        ) : (
          <>
            카테고리에 맞는
            <br />
            상품이 없습니다.
            <br />
            다른 인삼을 찾아보는건 어떨까요?
          </>
        )}
      </p>
    </div>
  ) : (
    <div>
      <div css={ItemsGridCSS}>
        {nfts.map((x) => (
          <ProductItem
            key={`category-${category}-theme-${theme}-nft-${x.tokenId}`}
            category={category as string}
            {...x}
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
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16539262850"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag("js", new Date());
          
            gtag("config", "AW-16539262850");
          `,
          }}
        />
      </Head>
      {isMobile && !mobileMenuOpen ? (
        <Layout
          css={[LayoutCSS, css({ marginLeft: 20, marginRight: 20 })]}
          title={!theme ? `${category || ''}` : `${category} - ${theme}`}
          onClickPrev={() => {
            router.push({ query: { ...(category && { category }) } });
            setMobileMenuOpen(true);
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
          {isMobile ? (
            <MbVerticalMenu
              categories={categoryData}
              themes={categoryData.find((x) => x.name === category)?.children}
              setMobileMenuOpen={setMobileMenuOpen}
            >
              {body}
            </MbVerticalMenu>
          ) : (
            <div css={BodyCSS}>
              <VerticalMenu categories={categoryData} />
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
          )}
        </Layout>
      )}
    </>
  );
}

const LayoutCSS = css({
  marginTop: 50,
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
  paddingTop: 14,
  fontSize: 18,
  fontWeight: 600,
  lineHeight: '110%',
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
  margin: '80px auto 0 auto',

  [mediaQuery.down(breakpoints.tb_1076)]: {
    gap: 6,
  },
  [mq.mobile]: {
    marginBottom: 50,
  },
});
