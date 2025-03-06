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

export default function CombineBookCompletePage() {
  const router = useRouter();
  const { id } = router.query;
  const combineId = Number(id);
  const { isDesktop } = useResponsive();
  const button = (
    <Button
      layout="contained"
      onClick={() => {
        router.push(`/combine/start-ebook/${combineId}`);
      }}
      css={LinkButtonCSS}
    >
      다음
    </Button>
  );
  return (
    <>
      <Head>
        <title>복각본 신청 완료</title>
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
        title="복각본 신청 완료"
        {...(!isDesktop && { showTitle: true })}
        css={LayoutCSS}
        noFooter={true}
      >
        <PageHead
          title={'복각본 제작 후 \n배송 예정입니다. 📦'}
          description={
            '이 세상에 하나뿐인 특별한 박목월 시인의 복각본을 가지게되셨군요! 정말 축하드려요!\n복각본은 제작에 수일이 걸립니다. 정성스럽게 제작하고 있으니 조금만 기다려주세요:)\n배송 관련 정보는 카카오톡으로 전송해드릴게요!'
          }
          {...(isDesktop && { button })}
        />

        <div
          css={css({
            marginTop: 20,
            padding: '0 43px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            boxSizing: 'border-box',
          })}
        >
          <div
            css={css({
              position: 'relative',
              width: '100%',
              maxWidth: 800,
              aspectRatio: '688 / 484',
            })}
          >
            <Image
              alt="복각본 신청 완료"
              src="/imgs/combine/img_combine_book_complete.png"
              fill
            />
          </div>
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
