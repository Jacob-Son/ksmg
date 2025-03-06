import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import PageHead from 'src/components/combine/PageHead/PageHead';
import Button from 'src/components/common/Button/Button';
import { HeaderLayoutEnum } from 'src/components/common/Header/Header.types';
import { useResponsive } from 'src/hooks/common/useResponsive';
import Layout from 'src/layout/Layout';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';
import { maxWidth } from 'src/styles/styles';
import { getSession } from 'next-auth/react';
//TODO: create-ebook에서 넘어오는 ux 다시 검토 후 수정
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

export default function StartEBookPage() {
  const router = useRouter();
  const { id } = router.query;
  const { isDesktop } = useResponsive();
  const buttons = (
    <div css={ButtonsWrapperCSS}>
      <Button
        layout="contained"
        onClick={() => router.push('/')}
        css={[LinkButtonCSS, css({ background: color.icon.sub })]}
      >
        다음에 할래요
      </Button>
      <Button
        layout="contained"
        onClick={() => router.push(`/combine/create-ebook/${id}`)}
        css={LinkButtonCSS}
      >
        다음
      </Button>
    </div>
  );
  return (
    <>
      <Head>
        <title>육필 시 노트북 제작</title>
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
        title="육필 시 노트북 제작"
        {...(!isDesktop && { showTitle: true })}
        css={LayoutCSS}
        noFooter={true}
      >
        <PageHead
          title={
            '육필 시 노트북이 제작되었어요 🙌 \n이제 표지와 설명을 \n입력해볼까요?'
          }
          description={
            '특별한 고객님만의 육필 시 노트북을 완성하기 위해서 \n멋진 표지와 설명을 넣어주세요!'
          }
          {...(isDesktop && { button: buttons })}
        />

        <div css={ImageContainerCSS}>
          <div
            css={css({
              position: 'relative',
              width: '100%',
              maxWidth: 800,
              aspectRatio: '688 / 484',
            })}
          >
            <Image
              alt="육필 시 노트북 제작"
              src="/imgs/combine/img_combine_nft_complete.png"
              fill
            />
          </div>
        </div>
        {!isDesktop && buttons}
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

const ImageContainerCSS = css({
  marginTop: 20,
  padding: '0 43px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  boxSizing: 'border-box',

  [mq.mobile]: {
    padding: 0,
  },
});

const ButtonsWrapperCSS = css({
  display: 'flex',
  gap: 12,

  [mq.mobile]: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '0 26px 26px 26px',
    boxSizing: 'border-box',
    backdropFilter: 'blur(20px)',
  },
  [mq.tablet]: {
    margin: '80px auto 0 auto',
  },
});

const LinkButtonCSS = css({
  background: color.purple,
  width: '100%',

  [mq.desktop]: {
    width: 177,
    height: 52,
  },
  [mq.tablet]: {
    width: 206,
  },
});
