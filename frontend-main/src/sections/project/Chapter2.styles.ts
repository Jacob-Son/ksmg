import { css } from '@emotion/react';
import { mq } from 'src/styles/mediaQuery';

export const ChapterContainerCSS = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '50px 20px',
  boxSizing: 'border-box',
});

export const CertifiedImageCSS = css({
  position: 'relative',
  width: '100%',
  maxWidth: '1296px', // ✅ 원본 크기 유지
  height: 'auto',
  aspectRatio: '1296 / 400', // ✅ 원본 비율 유지
  marginTop: '40px', // ✅ 간격 추가 (텍스트와 이미지 사이)

  [mq.mobile]: {
    maxWidth: '100%',
    height: 'auto',
  },
});

export const ChapterTextStyleCSS = css({
  fontFamily: "'Cormorant', serif",
  fontSize: 30,
  fontWeight: 400,
  fontStyle: 'italic',
  lineHeight: '100%',

  '& span': {
    fontFamily: "'Cormorant', serif",
    fontSize: 51,
  },

  [mq.mobile]: {
    fontSize: 26,

    '& span': {
      fontSize: 50,
      fontFamily: "'Cormorant', serif",
    },
  },
});

export const ChapterTitleCSS = css({
  marginTop: 8,
  fontSize: 40,
  fontWeight: 700,
  lineHeight: '130%',
  textAlign: 'center',
  color: '#000000', // ✅ 검정색 적용

  [mq.mobile]: {
    marginTop: 14,
    fontSize: 28,
    lineHeight: '120%',
  },
});