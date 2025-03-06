import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import PageHead from 'src/components/combine/PageHead/PageHead';
import Button from 'src/components/common/Button/Button';
import { HeaderLayoutEnum } from 'src/components/common/Header/Header.types';
import { useResponsive } from 'src/hooks/common/useResponsive';
import Layout from 'src/layout/Layout';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';
import { maxWidth } from 'src/styles/styles';
import { getSession } from 'next-auth/react';

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

export default function CombinePage() {
  const router = useRouter();
  const { isMobile, isDesktop } = useResponsive();

  const button = (
    <Button
      layout="contained"
      onClick={() => router.push('/combine/list')}
      css={LinkButtonCSS}
    >
      새로운 시 조합 시작하기
    </Button>
  );
  return (
    <>
      <Head>
        <title>시 조합하기</title>
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
        title="시 조합하기"
        {...(!isDesktop && { showTitle: true })}
        css={LayoutCSS}
        noFooter={true}
      >
        <PageHead
          title={'시 조합이 어떤 것인지\n설명해드릴게요.'}
          description={
            '육필 시 20편을 가지고 있으면, 하나의 육필 시 노트북으로 조합 할 수 있어요!\n조합한 육필 시 노트북은 복각본으로 신청하거나 디지털 도서로 생성 할 수 있습니다:)'
          }
          {...(isDesktop && { button })}
        />
        <div
          css={css({
            margin: '40px auto 0 auto',
            padding: '0 15px',
            [mq.mobile]: {
              marginTop: 27,
              width: '100%',
              boxSizing: 'border-box',
            },
          })}
        >
          {isMobile ? (
            <div css={ImageWrapperCSS}>
              <Image
                alt="introduction image"
                src="/imgs/combine/img_intro.png"
                fill
              />
            </div>
          ) : (
            <Image
              alt="introduction image"
              src="/imgs/combine/img_intro.png"
              width={414}
              height={452}
            />
          )}
        </div>
        {!isDesktop && <div css={ButtonWrapperCSS}>{button}</div>}
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

const ImageWrapperCSS = css({
  position: 'relative',
  width: '100%',
  aspectRatio: '414 / 452',
});

const ButtonWrapperCSS = css({
  margin: '80px auto 0 auto',

  [mq.mobile]: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '0 26px 26px 26px',
    boxSizing: 'border-box',
    backdropFilter: 'blur(20px)',
  },
});

const LinkButtonCSS = css({
  background: color.purple,
  width: '100%',

  [mq.desktop]: {
    width: 200,
    height: 52,
  },
  [mq.tablet]: {
    width: 340,
  },
});
