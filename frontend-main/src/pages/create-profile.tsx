import { css } from '@emotion/react';
import Head from 'next/head';
import CreateProfileForm from 'src/components/profile/CreateProfileForm/CreateProfileForm';
import Layout from 'src/layout/Layout';
import { mq } from 'src/styles/mediaQuery';

export default function CreateProfilePage() {
  const title = '판매자 프로필 생성';

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout css={LayoutCSS}>
        <h1 css={PageTitleCSS}>{title}</h1>
        <p css={PageDescriptionCSS}>
          활동하실 판매자명과 프로필 이미지를 확인해 주세요.
          <br />
          프로필 생성 후엔 마이페이지에서 수정 가능합니다.
        </p>

        <CreateProfileForm />
      </Layout>
    </>
  );
}

const LayoutCSS = css({
  marginTop: 80,
  marginBottom: 400,
  paddingLeft: 30,
  paddingRight: 30,
  letterSpacing: '-0.165px',
  [mq.mobile]: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});

const PageTitleCSS = css({
  fontSize: 40,
  lineHeight: '120%',
});

const PageDescriptionCSS = css({
  marginTop: 12,
  fontSize: 18,
  lineHeight: '140%',
});
