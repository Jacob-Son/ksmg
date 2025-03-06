import { css } from '@emotion/react';
import Head from 'next/head';
import { HeaderLayoutEnum } from 'src/components/common/Header/Header.types';
import Layout from 'src/layout/Layout';
import Chapter1 from 'src/sections/project/Chapter1';
import Chapter2 from 'src/sections/project/Chapter2';
import Chapter3 from 'src/sections/project/Chapter3';
import Chapter4 from 'src/sections/project/Chapter4';
import Chapter5 from 'src/sections/project/Chapter5';
import PlayerSection from 'src/sections/project/PlayerSection';
import ProfileSection from 'src/sections/project/Profile';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

function Project() {
  const title = '프로젝트';

  return (
    <>
      <Head>
        <title>{title}</title>
        <style>
          {`
            @font-face {
              font-family: 'Future_tree';
              src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_04@1.0/Future_tree.woff') format('woff');
              font-weight: normal;
              font-style: normal;
            }
            @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital@0;1&display=swap');
            body {
              background: ${color.background.container.black} !important;
            }
          `}
        </style>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant:ital@0;1&display=swap"
          rel="stylesheet"
        />
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
      <Layout
        css={LayoutCSS}
        headerLayout={HeaderLayoutEnum.DARK}
        noFooter={true}
      >
        <PlayerSection />
        <ProfileSection />
        <Chapter1 />
        <Chapter2 />
        <Chapter3 />
        {/* <Chapter4 /> */}
        {/* <Chapter5 /> */}
      </Layout>
    </>
  );
}

export default Project;

const LayoutCSS = css({
  marginBottom: 400,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  letterSpacing: '-0.165px',
  color: '#fff',
  gap: 140,
  fontSize: 20,

  [mq.mobile]: {
    gap: 70,
  },
});
