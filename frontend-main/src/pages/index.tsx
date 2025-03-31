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
import { useEffect, useState } from 'react';
import CategoryTabs from 'src/components/category/CategoryTabs';
import Link from 'next/link';
import Image from 'next/image';

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

  const [hotProducts, setHotProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);

  // 데이터가 변경될 때만 재렌더링
  useEffect(() => {
    if (hotNft) setHotProducts(hotNft);
    if (bestNft) setTopProducts(bestNft);
    if (recentSale) setRecentProducts(recentSale);
  }, [hotNft, bestNft, recentSale]);

  return (
    <>
      <Head>
        <title>KSMG 한국장인인삼</title>
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
        css={css({ ...(!isMobile && { paddingTop: 0 }), paddingBottom: 100 })}
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

          {/* 카테고리별 상품 탭 추가 */}
          <CategoryTabs products={[...hotProducts, ...topProducts, ...recentProducts]} />
          {/* 📌 배너 추가 부분 */}
          <div css={SmallBannerWrapper}>
            <a href="https://www.youtube.com/watch?v=02D7S7OS2wM" target="_blank" rel="noopener noreferrer">
              <Image
                src="/imgs/banner/Sec_01.png" // ✅ 배너 이미지 경로 수정
                alt="메시지 카드 보내기"
                width={1440} // 원하는 배너 크기
                height={200}
                layout="cover" // ✅ 원래 비율 유지
                css={SmallBannerImageCSS} // ✅ 모바일 대응 스타일 적용

              />
              </a>
          </div>
        </div>

          <div
            css={css({
              marginTop: 40,
              gap: 60,
              display: 'flex',
              flexDirection: 'column',
            })}
        >
          

          {/* 인기 급상승 상품 */}
          {hotProducts.length > 0 && (
            <ProductCarousel name="인기 급상승 상품" data={hotProducts} />
          )}

          {/* 추천 상품 */}
          {recommend && recommend.length > 0 && (
            <Recommendations name="추천 상품" data={recommend} />
          )}

          {/* 진행 중인 이벤트 */}
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
                name="할인 행사"
                data={cultureEvent?.map((x) => ({
                  ...x,
                  href: `/events/${x.eventId}`,
                }))}
              />
            </div>
          )}

          <div css={DividerCSS} />

          
          {/* Top 20 */}
          {topProducts.length > 0 && (
            <ProductCarousel
              name="Top 20"
              // type="rank"
              // radius={10} // 둥근 모서리 개선
              // image={{ width: isMobile ? 300 : 380, height: isMobile ? 240 : 300 }} // ✅ PC에서 크기 키우기
              data={topProducts}
            />
          )}

          {/* 인기 카테고리 순위 */}
          {popularTheme && (
            <Ranks 
            name="인기 카테고리 순위" 
            data={popularTheme }
          />)}

          {/* 방금 팔린 상품 */}
          {recentProducts.length > 0 && (
            <>
              <div css={DividerCSS} />
              <ProductCarousel name="방금 팔린 상품" data={recentProducts} />
            </>
          )}
        </div>
        {/* ✅ "언론에서 먼저 알아본 한국장인인삼" 섹션 추가 */}
        {/* ✅ "언론에서 먼저 알아본 한국장인인삼" - 카드형 뉴스 섹션 추가 */}
        <div css={NewsSectionCSS}>
          <h2>언론에서 먼저 알아본 한국장인인삼</h2>
          <div css={NewsGridCSS}>
            {newsList.map((news, index) => (
              <a key={index} href={news.link} target="_blank" rel="noopener noreferrer" css={NewsCardCSS}>
                <img src={news.image} alt={news.title} />
                <div className="news-content">
                  <span>{news.title}</span>
                  <p>{news.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

const NoticesFlexCSS = css({
  display: 'flex',
  padding: '0 24px',
  gap: 30,

  [mq.mobile]: {
    flexDirection: 'column',
    gap: 30,
  },
});

const DividerCSS = css({
  margin: '0 24px',
  width: 'calc(100% - 48px)',
  height: 2,
  background: color.border.primary,
});

const SmallBannerWrapper = css({
  // marginTop: 40, // ✅ 상품 탭과 간격 조정
  marginBottom: 60, // ✅ 배너 아래쪽 간격 조정
  padding: '0 24px', // ✅ 좌우 여백 추가
  display: 'flex',
  justifyContent: 'center',
  maxwidth: '1220px',

  [mq.mobile]: {
    padding: '100 100 100 100',
    marginBottom: 20, // ✅ 모바일에서 하단 간격 줄이기
  },
});

const SmallBannerImageCSS = css({
  width: '1440px', // ✅ 가로 너비 꽉 차게
  height: 'auto', // ✅ 높이 자동 조정
  objectFit: 'contain', // ✅ 기본값 (PC에서는 `cover` 유지)

  [mq.mobile]: {
    width: 'auto', // ✅ 가로 너비 꽉 차게
    height: 'auto', // ✅ 높이 자동 조정
    objectFit: 'contain', // ✅ 모바일에서는 `contain`으로 변경하여 글자가 잘리지 않도록 조정
  },
});

const newsList = [
  {
    title: "[K-브랜드] 정의와 타협하는 정직한 기업 최고의 제품 생산!",
    description: "한국장인인삼이 글로벌 시장에서도 인기를 끌고 있습니다.",
    image: "/imgs/news/news1.jpg",
    link: "https://www.msnews.co.kr/news/articleView.html?idxno=604785",
  },
  {
    title: "[인터뷰] 고려인삼 부활의 꿈을 이루다!",
    description: "개발 전문 이사 김태현 이사님의 진솔한 인터뷰를 만나보세요.",
    image: "/imgs/news/news2.jpg",
    link: "https://www.msnews.co.kr/news/articleView.html?idxno=599472",
  },
  {
    title: "대한민국 소비자 신뢰 명품 대상, 기업 경쟁력 강화",
    description: "기술과 경쟁력을 인증받은 한국장인인삼의 품질과 효능",
    image: "/imgs/news/news3.jpg",
    link: "https://www.womancs.co.kr/news/articleView.html?idxno=86571",
  },
];

const NewsSectionCSS = css({
  // marginTop: 40,
  padding: '20px 24px',
  // backgroundColor: '#f9f9f9',
  borderRadius: 10,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  h2: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
});

const NewsGridCSS = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: 20,
});

const NewsCardCSS = css({
  display: 'flex',
  flexDirection: 'column',
  background: '#fff',
  borderRadius: 10,
  overflow: 'hidden',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease-in-out',
  textDecoration: 'none',
  color: '#333',
  '&:hover': { transform: 'scale(1.05)' },
  img: { width: '100%', height: 250, objectFit: 'relative' },
  '.news-content': { padding: '15px', display: 'flex', flexDirection: 'column', gap: 8 },
  span: { fontSize: 18, fontWeight: 'bold', color: 'black' },
  p: { fontSize: 14, color: '#555', margin: 0 },
});