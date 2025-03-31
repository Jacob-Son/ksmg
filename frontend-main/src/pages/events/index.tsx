import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Pagination from 'src/components/common/Pagination/Pagination';
import Events from 'src/components/events/Events';
import { useEventList } from 'src/hooks/event/useEventList';
import Layout from 'src/layout/Layout';
import { mq } from 'src/styles/mediaQuery';
import { maxWidth } from 'src/styles/styles';

export default function EventsPage() {
  const title = '이벤트 / 할인행사';
  const router = useRouter();
  const { query } = router;
  const { page } = query;
  const { eventList } = useEventList(page ? String(page) : '1');

  if (eventList === undefined) return <></>;

  return (
    <>
      <Head>
        <title>{title}</title>
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
      <Layout css={LayoutCSS}>
        <h1 css={TitleCSS}>{title}</h1>
        <Events data={eventList.events} />
        <Pagination
          currentPage={Number(page || 1)}
          lastPage={eventList.totalPage}
          onClick={(val) => router.push({ query: { page: val } })}
          css={PaginationCSS}
        />
      </Layout>
    </>
  );
}

const LayoutCSS = css({
  marginTop: 100,
  paddingLeft: 0,
  paddingRight: 0,
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
    paddingBottom: 120,
  },
});

const TitleCSS = css({
  padding: '0 16px',
  fontSize: 34,
  fontWeight: 600,
  lineHeight: '38px',
  letterSpacing: '-0.6px',

  [mq.mobile]: {
    padding: 0,
  },
});

const PaginationCSS = css({
  marginTop: 50,
  gap: 24,

  [mq.mobile]: {
    marginTop: 100,
    gap: 6,
  },
});
