import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import Combinations from 'src/components/combine/Combinations/Combinations';
import PageHead from 'src/components/combine/PageHead/PageHead';
import Button from 'src/components/common/Button/Button';
import { HeaderLayoutEnum } from 'src/components/common/Header/Header.types';
import { useResponsive } from 'src/hooks/common/useResponsive';
import Layout from 'src/layout/Layout';
import { color } from 'src/styles/colors';
import { breakpoints, mediaQuery, mq } from 'src/styles/mediaQuery';
import { maxWidth } from 'src/styles/styles';
import { getSession } from 'next-auth/react';
import { useCombine } from 'src/hooks/combine/useCombine';

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

export default function CombineListPage() {
  const router = useRouter();
  const { page } = router.query;
  const { isMobile, isDesktop } = useResponsive();
  const { combineData } = useCombine(String(page ?? '1'));

  const button = (
    <Button
      layout="contained"
      onClick={() => router.push('/combine/create')}
      css={[
        LinkButtonCSS,
        css({
          ...(combineData?.data?.length === 0 && {
            width: '100% !important',
            [mediaQuery.up(breakpoints.mb_600)]: {
              maxWidth: 340,
            },
          }),
        }),
      ]}
    >
      새로운 시 조합 시작하기
    </Button>
  );

  return (
    <>
      <Head>
        <title>나의 조합 센터</title>
        <style>
          {`
            body {
              background: ${color.background.container.black} !important;
            }
          `}
        </style>
      </Head>
      <Layout
        headerLayout={HeaderLayoutEnum.DARK}
        title="나의 조합 센터"
        {...(!isDesktop && { showTitle: true })}
        css={LayoutCSS}
        noFooter={true}
      >
        {combineData && (
          <>
            {combineData.totalCount === 0 ? (
              <div css={NotFoundCSS}>
                <Image
                  alt="not found"
                  src="/imgs/combine/img_combinations_404.svg"
                  width={190}
                  height={176}
                />
                <p
                  css={css({
                    marginTop: 40,
                    marginBottom: 80,
                    textAlign: 'center',
                    lineHeight: '130%',
                    color: '#fff',
                  })}
                >
                  아직 조합이 완료된 시가 없습니다.
                  <br />
                  &#39;새로운 시 조합하기&#39; 버튼을 눌러서
                  <br />
                  첫번째 육필 시 노트북을 만들어보세요!
                </p>
                {!isMobile && button}
              </div>
            ) : (
              <>
                {!isMobile && (
                  <PageHead
                    title={'조합 목록'}
                    description={'조합한 목록을 확인할 수 있어요.'}
                    {...(!isMobile && { button })}
                  />
                )}

                <Combinations
                  data={combineData.data}
                  totalPage={combineData.totalPage}
                />
              </>
            )}
            {isMobile && <div css={ButtonWrapperCSS}>{button}</div>}
          </>
        )}
      </Layout>
    </>
  );
}

const LayoutCSS = css({
  marginTop: 100,
  paddingLeft: 30,
  paddingRight: 30,
  paddingBottom: 400,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: maxWidth,
  boxSizing: 'border-box',
  letterSpacing: '-0.165px',

  [mq.mobile]: {
    marginTop: 20,
    paddingLeft: 26,
    paddingRight: 26,
  },
  [mq.tablet]: {
    marginTop: 40,
  },
});

const NotFoundCSS = css({
  marginTop: 72,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  '& img': {
    userSelect: 'none',
  },
});

const ButtonWrapperCSS = css({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  padding: '0 26px 26px 26px',
  boxSizing: 'border-box',
  backdropFilter: 'blur(20px)',
});

const LinkButtonCSS = css({
  background: color.purple,
  width: '100%',

  [mq.desktop]: {
    width: 200,
    height: 52,
  },
  [mq.tablet]: {
    width: 240,
  },
});
