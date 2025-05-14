import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const ChapterContainerCSS = css({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '80px 110px', // ✅ 배경이 잘 보이도록 상하 패딩 추가
  boxSizing: 'border-box',
  backgroundImage: `url('/imgs/project/img_ginseng1.png')`, // ✅ 배경 이미지 추가
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',

  [mq.tablet]: {
    padding: '60px 40px',
  },
  [mq.mobile]: {
    padding: '40px 20px',
  },
});

export const ChapterTextStyleCSS = css({
  fontFamily: "'Cormorant', serif",
  fontSize: 30,
  fontWeight: 400,
  fontStyle: 'italic',
  lineHeight: '100%',
  color: '#fff', // ✅ 가독성을 위한 흰색 텍스트 적용

  '& span': {
    fontFamily: "'Cormorant', serif",
    fontSize: 51,
  },

  [mq.mobile]: {
    fontSize: 26,

    '& span': {
      fontSize: 50,
    },
  },
});

export const ChapterTitleCSS = css({
  marginTop: 30,
  fontSize: 30,
  fontWeight: 700,
  lineHeight: '130%',
  color: '#fff', // ✅ 배경 대비 가독성 향상

  [mq.mobile]: {
    marginTop: 14,
    fontSize: 28,
    lineHeight: '120%',
  },
});

export const SectionFlexCSS = css({
  marginTop: 12,
  padding: '42px 0',
  display: 'flex',
  width: '100%',

  [mq.mobile]: {
    flexDirection: 'column',
    padding: 0,
    marginTop: 20,
  },
});

export const TextCSS = css({
  flex: 1,
  color: '#fff', // ✅ 배경 대비 가독성 향상
  lineHeight: '130%',

  [mq.mobile]: {
    fontSize: '14px', // 모바일 전용 폰트 크기
  },
});

export const ImageColumnCSS = css({
  padding: '19px 68px',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',

  '& > div': {
    position: 'relative',
    width: 237,
    height: 'auto',
    aspectRatio: '573 / 797',

    [mq.mobile]: {
      width: 170,
    },
  },

  '& > p': {
    marginTop: 12,
    fontWeight: 600,
    lineHeight: '100%',
    color: '#fff',

    [mq.mobile]: {
      fontSize: 11.5,
    },
  },

  [mq.mobile]: {
    padding: '34px 0',
  },
});
