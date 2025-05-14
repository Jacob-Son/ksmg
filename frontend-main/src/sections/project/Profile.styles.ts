import { css } from '@emotion/react';
import { SectionContainerCSS } from './Section.styles';
import { mq } from 'src/styles/mediaQuery';
import { color } from 'src/styles/colors';

export const ContainerCSS = [
  SectionContainerCSS,
  css({
    display: 'block',
    flexDirection: 'row',
    alignItems: 'center', // ✅ 세로 중앙 정렬 추가
    justifyContent: 'center', // ✅ 가로 중앙 정렬 추가
    height: 'fit-content',

    [mq.desktop]: {
      gap: 30,
    },
  }),
];

export const ImageContainerCSS = css({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  maxWidth: 420, // ✅ 제한 너비

  height: 420,
  aspectRatio: '38 / 45', // 비율 유지
  borderRadius: '16px', // ✅ 둥근 테두리 추가
  overflow: 'hidden',
  clipPath: 'polygon(5% 0, 95% 0, 100% 100%, 0 100%)', // ✅ 부드러운 마스킹 처리
  margin: '0 auto', // 수평 중앙 정렬

  [mq.mobile]: {
    marginTop: 20,
    width: '90%',
    height: 'auto',
    aspectRatio: '38 / 45',
  },
});

export const TextFlexCSS = css({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  alignItems: 'center',

  [mq.mobile]: {
    alignItems: 'center',
  },
});

export const BirthdayCSS = css({
  fontFamily: 'Pretendard',
  fontSize: '22px',
  lineHeight: '140%',
  letterSpacing: '2px',
  color: 'black', // 🔴 강조 색으로 변경
  fontWeight: '600', // 📌 강조 효과 추가
  textDecoration: 'none', // 📌 밑줄 추가로 주목도 증가
  marginTop: 20,

  [mq.mobile]: {
    marginTop: 20,
    fontSize: 18, // 📌 모바일에서는 약간 작게 조정
  },
});

export const SectionTitleCSS = css({
  fontSize: '24px',
  fontWeight: 'bold',
  lineHeight: '130%',

  [mq.mobile]: {
    fontSize: 20,
  },
});

export const ProfileFlexCSS = css({
  marginTop: 14,
  display: 'flex',
  gap: 16,
  fontSize: 18,
  lineHeight: '140%',
  color: color.text.secondary,

  '& span': {
    color: '#fff',
  },
});

export const DescriptionCSS = css({
  marginTop: 0,
  lineHeight: '150%',
  fontSize: '18px', // 🔼 기존보다 폰트 크기 증가
  color: '#555',

  [mq.mobile]: {
    marginTop: 16,
  },
});

export const TopMessageCSS = css({
  textAlign: 'center',
  padding: '0px 20px',
  fontSize: '22px',
  fontWeight: 'regular',
  color: '#C30D23',
  '& p:first-of-type': {
    marginBottom: '35px', // ✅ "최상의 제품만을 생산합니다" 하단 마진 추가
    fontSize: '24px', // 🔼 강조

    [mq.mobile]: {
      fontSize: '22px', // 모바일 전용 폰트 크기
      fontWeight: 'bold',
    },
  },
});

// Profile.styles.ts

export const TopMessageTitleCSS = css({
  fontSize: '26px',
  fontWeight: 'bold',
  lineHeight: '160%',
  color: '#222222',
  [mq.mobile]: {
    fontSize: '16px', // 🔽 모바일에서는 좀 더 작게 조정
  },
});

export const TopMessageHighlightCSS = css({
  fontSize: '22px',
  fontWeight: '600', // Medium
  lineHeight: '160%',
  color: '#C30D23',
  [mq.mobile]: {
    fontSize: '16px', // 🔽 모바일에서는 좀 더 작게 조정
  },
});

export const TopMessageLastCSS = css([
  TopMessageHighlightCSS,
  css({
    marginBottom: '20px', // ✅ 마지막 줄 하단 여백 추가
  }),
]);
