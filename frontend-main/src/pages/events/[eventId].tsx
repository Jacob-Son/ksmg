import { css } from '@emotion/react';
import dayjs from 'dayjs';
import Head from 'next/head';
import { useEffect } from 'react';
import Layout from 'src/layout/Layout';
import { mq } from 'src/styles/mediaQuery';
import { maxWidth } from 'src/styles/styles';
import parse from 'html-react-parser';
import { NormalButtonCSS } from 'src/components/common/Button/Button.styles';
import { useRouter } from 'next/router';
import { useEventDetail } from 'src/hooks/event/useEventDetail';

export default function EventPage() {
  const title = '이벤트 / 문화행사';
  const router = useRouter();
  const { event } = useEventDetail(String(router.query.eventId));

  useEffect(() => {
    if (event === undefined) return;
    if (event === null) {
      router.push('/events');
    }
  }, [event]);

  const formatUrl = (url: string) => {
    if (url.includes('https')) return url;
    return `https://${url}`;
  };

  if (event === undefined) return <></>;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout
        css={LayoutCSS}
        title="이벤트"
        onClickPrev={() => router.push('/events')}
      >
        <div css={ContainerCSS}>
          <h1 css={TitleCSS}>{event.title}</h1>
          <p css={DurationCSS}>
            {dayjs(event.startDay).format('YYYY.MM.DD')} ~{' '}
            {dayjs(event.endDay).format(
              dayjs(event.startDay).year() === dayjs(event.endDay).year()
                ? 'MM.DD'
                : 'YYYY.MM.DD',
            )}
          </p>
          <p css={ContentCSS}>
            {parse(event.description.replace(/\n/g, '<br />'))}
          </p>

          {event?.externalUrl && (
            <button
              css={LinkCSS}
              onClick={() => {
                window.open(formatUrl(event.externalUrl), '_blank');
              }}
            >
              바로가기
            </button>
          )}
        </div>

        {event?.detailImagePath && (
          <img alt={event.title} src={event.detailImagePath} css={ImageCSS} />
        )}
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
  alignItems: 'center',
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

const ContainerCSS = css({
  padding: '0 16px',
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
});

const TitleCSS = css({
  fontSize: 34,
  fontWeight: 600,
  lineHeight: '38px',
  letterSpacing: '-0.6px',

  [mq.mobile]: {
    padding: 0,
    fontSize: 28,
    lineHeight: '120%',
    letterSpacing: '-0.165px',
  },
});

const DurationCSS = css({
  marginTop: 12,
  lineHeight: '130%',

  [mq.mobile]: {
    marginTop: 10,
  },
});

const ContentCSS = css({
  marginTop: 20,
  lineHeight: '130%',

  [mq.mobile]: {
    marginTop: 10,
  },
});

const LinkCSS = [
  NormalButtonCSS('contained'),
  css({
    marginTop: 20,
    padding: '14px 24px',
    textDecoration: 'none',
    width: 'fit-content',
    height: 44,
    boxSizing: 'border-box',
    borderRadius: 4,
  }),
];

const ImageCSS = css({
  marginTop: 70,
  width: '100%',
  height: 'auto',
  maxWidth: 984,

  [mq.tablet]: {
    maxWidth: 600,
  },
  [mq.mobile]: {
    marginTop: 60,
  },
});
