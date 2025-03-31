import { css } from '@emotion/react';
import Link from 'next/link';
import { LinkButtonCSS } from 'src/components/supports/Supports.styles';
import Layout from 'src/layout/Layout';
import { mq } from 'src/styles/mediaQuery';

export default function NotFound() {
  return (
    <Layout css={LayoutCSS}>
      <p
        css={css({
          marginBottom: 20,
          fontWeight: 500,
          lineHeight: '132%',
          textAlign: 'center',
        })}
      >
        죄송합니다 문제가 발생했습니다.
        <br />
        도움이 필요하시다면,
        <br />
        KSMG 카카오톡 채널에 문의해주세요.
      </p>
      <Link href="/inquiry" css={LinkButtonCSS}>
        1:1 문의하기
      </Link>
    </Layout>
  );
}

const LayoutCSS = css({
  marginTop: 120,
  marginBottom: 300,
  paddingLeft: 30,
  paddingRight: 30,
  alignItems: 'center',
  letterSpacing: '-0.165px',
  [mq.mobile]: {
    marginTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
