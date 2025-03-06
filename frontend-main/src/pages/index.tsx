import { css } from '@emotion/react';
import Head from 'next/head';
import ProductCarousel from 'src/components/carousel/Products/ProductCarousel';
import Banners from 'src/components/home/banners/Banners';
import Notices from 'src/components/home/notices/Notices';
import Ranks from 'src/components/home/ranks/Ranks';
import Recommendations from 'src/components/home/recommendations/Recommendations';
import { useResponsive } from 'src/hooks/common/useResponsive';
import {
  useBanner,
  useBestNft,
  useCultureEvent,
  useCurrentEvent,
  useHotNft,
  usePopularTheme,
  useRecentSale,
  useRecommend,
} from 'src/hooks/home';
import Layout from 'src/layout/Layout';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export default function MainPage() {
  const { isMobile } = useResponsive();
  const { hotNft } = useHotNft();
  const { bestNft } = useBestNft();
  const { recentSale } = useRecentSale();
  const { popularTheme } = usePopularTheme();
  const { banner } = useBanner();
  const { recommend } = useRecommend();
  const { currentEvent } = useCurrentEvent();
  const { cultureEvent } = useCultureEvent();

  return (
    <>
      <Head>
        <title>KSMG-TEST</title>
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
        css={css({ ...(!isMobile && { paddingTop: 100 }), paddingBottom: 200 })}
      >
        {banner && <Banners banners={banner} />}
        <div
          css={css({
            marginTop: 40,
            gap: 60,
            display: 'flex',
            flexDirection: 'column',
          })}
        >
          <ProductCarousel name="인기 급상승 상품" data={hotNft} />
          {recommend && recommend.length > 0 && (
            <Recommendations name="추천 상품" data={recommend} />
          )}
          {((currentEvent && currentEvent.length > 0) ||
            (cultureEvent && cultureEvent.length > 0)) && (
            <div css={NoticesFlexCSS}>
              <Notices
                name="진행 중인 이벤트"
                data={currentEvent?.map((x) => ({
                  ...x,
                  href: `/events/${x.eventId}`,
                }))}
              />
              <Notices
                name="문화행사"
                data={cultureEvent?.map((x) => ({
                  ...x,
                  href: `/events/${x.eventId}`,
                }))}
              />
            </div>
          )}

          <div css={DividerCSS} />

          {bestNft && bestNft.length > 0 && (
            <ProductCarousel
              name="Top 20"
              type="rank"
              radius={1.78}
              image={{ width: 220, height: 306 }}
              data={bestNft}
            />
          )}
          {popularTheme && (
            <Ranks name="인삼 상품 인기 주제 순위" data={popularTheme} />
          )}

          {recentSale && recentSale.length > 0 && (
            <>
              <div css={DividerCSS} />
              <ProductCarousel name="방금 팔린 작품" data={recentSale} />
            </>
          )}
        </div>
      </Layout>
    </>
  );
}

const NoticesFlexCSS = css({
  display: 'flex',
  padding: '0 24px',
  gap: 60,

  [mq.mobile]: {
    flexDirection: 'column',
    gap: 40,
  },
});

const DividerCSS = css({
  margin: '0 24px',
  width: 'calc(100% - 48px)',
  height: 2,
  background: color.border.primary,
});
