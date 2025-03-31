import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { NormalButtonCSS } from 'src/components/common/Button/Button.styles';
import Layout from 'src/layout/Layout';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';
import { maxWidth } from 'src/styles/styles';

export default function InquiryPage() {
  const title = '1:1 문의';
  const router = useRouter();
  const { query } = router;
  const { returnPath } = query;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout
        css={LayoutCSS}
        title={title}
        onClickPrev={() => {
          if (returnPath) {
            router.push(returnPath as string);
          } else {
            router.back();
          }
        }}
      >
        <h1 css={TitleCSS}>{title}</h1>
        <p css={TextCSS}>
          문의사항이 있으실 경우 (주)케이에스엠지 카카오톡 채널을 이용해주세요.
        </p>
        <Image
          alt="inquiry"
          src="/imgs/img_inquiry.svg"
          width={303}
          height={277}
          css={ImageCSS}
        />
        {/* <div css={ButtonWrapperCSS}>
          <Link href="https://pf.kakao.com/_RgxcPG" css={LinkButtonCSS}>
            카카오톡 채널 바로가기
          </Link> */}
        {/* </div> */}
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
    marginTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

const TitleCSS = css({
  padding: '0 16px',
  fontSize: 34,
  fontWeight: 600,
  lineHeight: '38px',
  letterSpacing: '-0.6px',

  [mq.mobile]: {
    marginBottom: 0,
    padding: 0,
  },
});
const TextCSS = css({
  marginTop: 12,
  padding: '0 16px',
  lineHeight: '130%',

  [mq.mobile]: {
    marginBottom: 0,
    padding: 0,
  },
});

export const ImageCSS = css({
  margin: '40px auto 72px auto',
  width: '100%',
  height: 'auto',
  maxWidth: 303,

  [mq.mobile]: {
    margin: '50px auto 72px auto',
    maxWidth: 350,
  },
});

const ButtonWrapperCSS = css({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',

  [mq.mobile]: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    borderTop: `1px solid ${color.border.primary}`,
    background: '#fff',
    padding: '12px 20px 30px 20px',
    boxSizing: 'border-box',
  },
});

const LinkButtonCSS = [
  NormalButtonCSS('contained'),
  css({
    textDecoration: 'none',
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: 273,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: color.purple,

    [mq.mobile]: {
      maxWidth: 'none',
    },
  }),
];
