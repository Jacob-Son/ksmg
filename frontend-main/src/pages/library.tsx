import { css } from '@emotion/react';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { HeaderLayoutEnum } from 'src/components/common/Header/Header.types';
import Community from 'src/components/library/community/Community';
import Products from 'src/components/library/products/Products';
import Profile from 'src/components/library/profile/Profile';
import Settles from 'src/components/library/settle/Settles';
import Tabs from 'src/components/library/tabs/Tabs';
import useAccount from 'src/hooks/common/useAccount';
import { useLikeNfts } from 'src/hooks/library/useLikeNfts';
import { useOwnedNfts } from 'src/hooks/library/useOwnedNfts';
import Layout from 'src/layout/Layout';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';
import { maxWidth } from 'src/styles/styles';

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    res.writeHead(302, { Location: '/login' });
    res.end();
    return { props: {} };
  }
  return {
    props: {},
  };
};

export enum LibraryTabEnum {
  LIBRARY = 'library',
  LIKES = 'likes',
  COMMUNITY = 'community',
  SETTLE = 'settle',
}

export const libraryTabs = [
  {
    name: '상품',
    value: LibraryTabEnum.LIBRARY,
  },
  {
    name: '찜한 상품',
    value: LibraryTabEnum.LIKES,
  },
  {
    name: '커뮤니티',
    value: LibraryTabEnum.COMMUNITY,
  },
  {
    name: '구매 내역',
    value: LibraryTabEnum.SETTLE,
  },
];

function Library() {
  const title = '나의 서재';
  const router = useRouter();
  const { query } = router;
  const { tab, page } = query;
  const { address } = useAccount();
  const {
    ownedNfts,
    refetch: refetchNft,
    isLoading: isOwnedNftsLoading,
  } = useOwnedNfts(Number(page ?? 1));
  const { likeNfts, isLoading: isLikeNftsLoading } = useLikeNfts(
    address,
    Number(page),
  );

  useEffect(() => {
    if (!tab) {
      router.push({ query: { tab: LibraryTabEnum.LIBRARY } });
    }
  }, [tab]);

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
      <Layout css={LayoutCSS} headerLayout={HeaderLayoutEnum.DARK}>
        <div css={ProfileAndTabsSectionCSS}>
          <div>
            <Profile />
            <Tabs
              currentTab={tab as LibraryTabEnum}
              setCurrentTab={(val) =>
                router.push({ query: { tab: val as string } })
              }
            />
          </div>
        </div>
        <div css={DividerCSS}>
          <div />
        </div>
        {tab === LibraryTabEnum.LIBRARY && (
          <Products
            name="나의 상품"
            data={ownedNfts}
            type={LibraryTabEnum.LIBRARY}
            loading={isOwnedNftsLoading}
            notFoundLayout={
              <>
                {/* <Image
                  alt="not found"
                  src="/imgs/img_404.svg"
                  width={200}
                  height={231}
                /> */}
                <p>
                  아직 구매하신 상품이 없습니다.
                  <br />
                  한국장인인삼을 둘러보고 마음에 드는 상품을
                  <br />
                  찾아보실래요?
                </p>
              </>
            }
          />
        )}
        {tab === LibraryTabEnum.LIKES && (
          <Products
            name="찜한 상품"
            data={likeNfts}
            type={LibraryTabEnum.LIKES}
            loading={isLikeNftsLoading}
            notFoundLayout={
              <>
                {/* <Image
                  alt="not found"
                  src="/imgs/library/img_404.svg"
                  width={290}
                  height={208}
                  css={css({ marginTop: 18, marginBottom: 21 })}
                /> */}
                <p>
                  아직 찜한 상품이 없습니다.
                  <br />
                  마음에 드는 상품에 하트를 눌러보세요.
                </p>
              </>
            }
          />
        )}
        {tab === LibraryTabEnum.COMMUNITY && <Community />}
        {tab === LibraryTabEnum.SETTLE && <Settles refetchNft={refetchNft} />}
      </Layout>
    </>
  );
}

export default Library;

const LayoutCSS = css({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '100%',
  letterSpacing: '-0.165px',
});

export const ProfileAndTabsSectionCSS = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  background: color.background.container.black,

  '& > div': {
    padding: '12px 30px 12px 30px',
    gap: 40,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: maxWidth,
    boxSizing: 'border-box',

    [mq.mobile]: {
      padding: '20px 20px 30px 20px',
      gap: 26,
    },
  },
});

const DividerCSS = css({
  background: color.background.container.black,
  width: '100%',
  height: 32,

  '& > div': {
    width: '100%',
    height: 32,
    background: '#fff',

    [mq.mobile]: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
  },
});
