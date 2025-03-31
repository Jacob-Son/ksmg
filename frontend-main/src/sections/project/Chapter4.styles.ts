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

export const ChapterTitleCSS = css({
  marginTop: 0, // ✅ 기존 8 → 20px로 증가 (더 잘 보이도록)
  fontSize: 30, // ✅ 기존 35 → 40px로 증가 (눈에 띄도록)
  fontWeight: 700, 
  color: 'black', // ✅ 기존 #000000 → #111111 (더 대비되는 검정색)
  lineHeight: '150%',
  textAlign: "center", // ✅ 중앙 정렬 추가

  [mq.mobile]: {
    marginTop: 18, // ✅ 기존 14 → 18px로 증가
    fontSize: 30, // ✅ 기존 28 → 30px로 증가
    lineHeight: '120%',
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
  lineHeight: '160%',
  fontSize: 16
});

export const SectionContainerCSS = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: 80, // ✅ 하단 여백 추가 (필요에 따라 조절)
});