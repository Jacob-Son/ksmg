import { css } from '@emotion/react';
import { SectionContainerCSS } from './Section.styles';
import { mq } from 'src/styles/mediaQuery';
import { color } from 'src/styles/colors';

export const ContainerCSS = [
  SectionContainerCSS,
  css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center', // ✅ 세로 중앙 정렬 추가
    justifyContent: 'center', // ✅ 가로 중앙 정렬 추가
    height: 'fit-content',


    [mq.desktop]: {
      gap: 50,
    },
  }),
];

export const ImageContainerCSS = css({
  position: 'relative',
  width: 380,
  height: 450,

  [mq.tablet]: {
    width: '100%',
    height: 'auto',
    aspectRatio: '38 / 45',
    flex: 1,
  },
  [mq.mobile]: {
    marginTop: 14,
    paddingTop: 0,
    width: 248,
    height: 'auto',
    aspectRatio: '38 / 45',
  },
});

export const TextFlexCSS = css({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,

  [mq.mobile]: {
    alignItems: 'center',
  },
});

export const BirthdayCSS = css({
  fontFamily: 'Pretendard',
  fontSize: 28,
  lineHeight: '130%',
  letterSpacing: '3px',
  color: '#000000',

  [mq.mobile]: {
    fontSize: 20,
  },
});

export const SectionTitleCSS = css({
  fontSize: 40,
  fontWeight: 700,
  lineHeight: '130%',

  [mq.mobile]: {
    fontSize: 28,
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
  marginTop: 30,
  lineHeight: '130%',
  color: color.text.secondary,

  [mq.mobile]: {
    marginTop: 14,
  },
});

export const TopMessageCSS = css({
  textAlign: 'center',
  // padding: '26px',
  fontSize: '20px',
  fontWeight: 'regular',
  color: '#C30D23',
  '& p:first-of-type': {
    marginBottom: '20px', // ✅ "최상의 제품만을 생산합니다" 하단 마진 추가
  },
});

// Profile.styles.ts

export const TopMessageTitleCSS = css({
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#333333',
});

export const TopMessageHighlightCSS = css({
  fontSize: '28px',
  fontWeight: 'medium', // Medium
  color: '#333333',
});

export const TopMessageLastCSS = css([
  TopMessageHighlightCSS,
  css({
    marginBottom: '60px', // ✅ 마지막 줄 하단 여백 추가
  }),
]);