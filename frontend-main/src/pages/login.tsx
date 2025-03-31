import { css } from '@emotion/react';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoginButton from 'src/components/login/LoginButton';
import Layout from 'src/layout/Layout';
import { useAuthStore } from 'src/stores/auth/auth.store';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

function Login() {
  const title = '로그인';
  const router = useRouter();
  const { beforeRoutePath } = useAuthStore();
  const { status } = useSession();

  const handleLogin = async (type: string) => {
    await signIn(type, {
      callbackUrl: beforeRoutePath ?? '/',
    });
  };

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout css={LayoutCSS}>
        <div css={TextWrapper}>
          <div css={TitleCSS}>SNS 로그인</div>
          <div css={DescriptionCSS}>소셜 계정으로 로그인해주세요</div>
        </div>
        <div css={DividerCSS} />
        <div css={ButtonWrapper}>
          {/* <LoginButton
            logo="/icons/login/kakao.svg"
            onClick={() => handleLogin('kakao')}
            backgroundColor={'#FEE500'}
            textColor={'#252525'}
            text="카카오 로그인"
          />
          <LoginButton
            logo="/icons/login/naver.svg"
            onClick={() => handleLogin('naver')}
            backgroundColor={'#02C759'}
            textColor={'#FFF'}
            text="네이버 로그인"
          /> */}
          <LoginButton
            logo="/icons/login/google.svg"
            onClick={() => handleLogin('google')}
            backgroundColor={'#FFF'}
            textColor={'#252525'}
            borderColor={'#B9BEC9'}
            text="구글 로그인"
          />
        </div>
      </Layout>
    </>
  );
}

export default Login;

const LayoutCSS = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: 'calc(100vh - 80px)',
  margin: '100px auto 0px auto',
  [mq.smTablet]: {
    margin: '60px 30px 0px 30px',
  },
  [mq.mobile]: {
    margin: '40px 20px 0px 20px',
  },
});

const TextWrapper = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 16,
  marginBottom: 50,
  [mq.smTablet]: {
    marginBottom: 40,
    gap: 12,
  },
  [mq.mobile]: {
    marginBottom: 24,
    gap: 8,
    alignItems: 'start',
  },
});

const TitleCSS = css({
  color: color.text.primary,
  fontSize: '40px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '120%',
  letterSpacing: '-0.165px',
  [mq.smTablet]: {
    fontSize: '34px',
    fontWeight: 600,
    lineHeight: '38px',
    letterSpacing: '-0.6px',
  },
  [mq.mobile]: {
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: '120%',
    letterSpacing: '-0.6px',
  },
});

const DescriptionCSS = css({
  color: color.text.primary,
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '130%',
  letterSpacing: '-0.165px',
  [mq.smTablet]: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '130%',
    letterSpacing: '-0.165px',
  },
  [mq.mobile]: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '130%',
    letterSpacing: '-0.165px',
  },
});

const DividerCSS = css({
  width: '100%',
  height: 1,
  backgroundColor: color.border.primary,
  display: 'none',
  [mq.smTablet]: {
    display: 'block',
    marginBottom: 40,
  },
  [mq.mobile]: {
    display: 'block',
    marginBottom: 24,
  },
});

const ButtonWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 12,

  width: '350px',

  [mq.mobile]: {
    width: '100%',
  },
});
