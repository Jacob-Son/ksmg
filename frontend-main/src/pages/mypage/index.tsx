import { css } from '@emotion/react';
import { getSession, signOut } from 'next-auth/react';
import Head from 'next/head';
import Layout from 'src/layout/Layout';
import { mq } from 'src/styles/mediaQuery';
import { maxWidth } from 'src/styles/styles';
import { mypageMenus } from 'src/constants/mypage';
import MypageMenu from 'src/components/mypage/menu/MypageMenu';

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

export default function Mypage() {
  const title = '마이페이지';

  const handleClickLogout = () => {
    signOut();
    sessionStorage.removeItem('accessToken');
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout css={LayoutCSS}>
        <div css={TitleRowCSS}>
          <h1 css={TitleCSS}>{title}</h1>
          <button type="button" onClick={handleClickLogout} css={LogoutBtnCSS}>
            로그아웃하기
          </button>
        </div>
        {mypageMenus.map((menu) => (
          <MypageMenu
            name={menu.name}
            list={menu.children}
            key={`mypage_menu_${menu.name}`}
          />
        ))}
      </Layout>
    </>
  );
}

const LayoutCSS = css({
  marginTop: 100,
  paddingLeft: 30,
  paddingRight: 30,
  paddingBottom: 400,
  gap: 40,
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
    paddingBottom: 120,
  },
});

export const TitleRowCSS = css({
  marginBottom: 10,
  padding: '0 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  [mq.mobile]: {
    marginBottom: 0,
    padding: 0,
  },
});

const TitleCSS = css({
  fontSize: 34,
  fontWeight: 600,
  lineHeight: '38px',
  letterSpacing: '-0.6px',

  [mq.mobile]: {
    fontSize: 28,
    lineHeight: '120%',
  },
});

export const LogoutBtnCSS = css({
  fontSize: 17,
  lineHeight: '130%',
  border: 'none',
  padding: 0,
  background: 'none',
  textDecoration: 'underline',

  [mq.mobile]: {
    fontSize: 16,
  },
});
