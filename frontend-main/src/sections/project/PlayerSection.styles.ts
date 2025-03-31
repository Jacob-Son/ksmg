import { css } from '@emotion/react';
import { mq } from 'src/styles/mediaQuery';

export const PlayerSectionContainerCSS = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: 'url(/imgs/project/img_bg.png)',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  width: '100%',
  minHeight: 600,
  boxSizing: 'border-box',

  [mq.mobile]: {
    minHeight: 480,
  },
});

export const PlayerGradientCSS = css({
  position: "relative", // 부모 요소 기준 설정
  padding: "30px 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  flex: 1,
  background: "radial-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.05))", // 기존보다 더 어두운 오버레이
  
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.05)", // 반투명 레이어 추가
    zIndex: 1, // 텍스트보다 아래
  },

  "& p": {
    position: "relative",
    zIndex: 2, // 텍스트를 배경 위로 배치
  }
});

export const ProjectNoCSS = css({
  fontFamily: "'Cormorant', serif",
  fontSize: 38,
  lineHeight: '130%',

  '& span': {
    fontSize: 62,
    fontFamily: "'Cormorant', serif",
  },

  [mq.mobile]: {
    fontSize: 26,

    '& span': {
      fontSize: 50,
      fontFamily: "'Cormorant', serif",
    },
  },
});

export const SectionTitleCSS = css({
  fontSize: 48, // 기존 40 → 48px로 확대
  lineHeight: "140%",
  fontWeight: 700,
  color: "#FFFFFF", // 밝은 색으로 변경하여 대비 증가

  [mq.mobile]: {
    fontSize: 36, // 모바일에서는 너무 크지 않게 조정
    lineHeight: "120%",
  },
});

export const SectionDescriptionCSS = css({
  marginTop: 30,
  marginBottom: 30,
  padding: "0 20px",
  lineHeight: "160%",
  color: "#E0E0E0", // 기존보다 밝게 조정 (#CCC → #E0E0E0)
  textAlign: "center",
  wordBreak: "keep-all",

  [mq.mobile]: {
    marginTop: 18,
    marginBottom: 46,
    fontSize: 16, // 기존 14px → 16px로 조정
    lineHeight: "140%",
  },
});