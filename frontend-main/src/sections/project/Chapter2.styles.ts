import { css } from '@emotion/react';
import { mq } from 'src/styles/mediaQuery';

export const ChapterContainerCSS = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '0px 0px',
  boxSizing: 'border-box',
});

export const ChapterTitleCSS = css({
  // marginTop: 8,
  fontSize: 30,
  fontWeight: 700,
  lineHeight: '130%',
  textAlign: 'center',
  color: '#000000',

  [mq.mobile]: {
    marginTop: 14,
    fontSize: 28,
    lineHeight: '120%',
  },
});

export const GridContainerCSS = css({
  display: 'flex',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // 📌 5개 이미지 균일 정렬
  gap: '20px',
  justifyItems: 'center',
  marginTop: '20px',

  [mq.mobile]: {
    display: 'block',
  },
});

export const CertificateImageCSS = css({
  width: '100%',
  maxWidth: '200px', // 📌 기존 300px → 250px 조정
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',

  '&:hover': {
    transform: 'scale(1.05)',
  },
});
