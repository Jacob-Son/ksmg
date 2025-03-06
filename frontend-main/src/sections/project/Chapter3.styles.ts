import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const ContentFlexCSS = css({
  marginTop: 40,
  marginBottom: 80,
  display: 'flex',
  alignItems: 'center', // ✅ 세로 중앙 정렬 유지
  gap: 50,
  maxWidth: 1000,

  [mq.mobile]: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 40,
  },
});

export const ProfileImageCSS = css({
  alignSelf: 'center', // ✅ 개별 이미지 세로 중앙 정렬
  display: 'flex',
  flexDirection: 'column', // ✅ 텍스트 포함을 위해 column으로 변경
  alignItems: 'center', // ✅ 가운데 정렬 유지
  gap: 10, // ✅ 이미지와 텍스트 간격 추가
});

export const ProfileCaptionCSS = css({
  marginTop: 8, // ✅ 이미지와의 간격
  fontSize: 18,
  fontWeight: 500,
  color: color.text.primary,
  textAlign: 'center',

  [mq.mobile]: {
    fontSize: 16,
  },
});

export const TextCSS = css({
  color: color.text.secondary,
  lineHeight: '130%',
});

export const ChapterTitleCSS = css({
  marginTop: 8,
  fontSize: 35, // ✅ 챕터2와 동일한 크기
  fontWeight: 700, // ✅ Bold 처리
  color: '#000000', // ✅ 검정색 적용
  lineHeight: '130%',

  [mq.mobile]: {
    marginTop: 14,
    fontSize: 28,
    lineHeight: '120%',
  },
});

export const SectionContainerCSS = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: 80, // ✅ 하단 여백 추가 (필요에 따라 조절)
});