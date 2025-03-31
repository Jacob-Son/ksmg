import { css } from "@emotion/react";
import { mq } from "src/styles/mediaQuery";

export const ChapterContainerCSS = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  // padding: "50px 20px",
  boxSizing: "border-box",
});

export const ChapterTitleCSS = css({
  marginTop: 8,
  fontSize: 30,
  fontWeight: 700,
  lineHeight: "130%",
  textAlign: "center",
  color: "#000000",

  [mq.mobile]: {
    marginTop: 14,
    fontSize: 28,
    lineHeight: "120%",
  },
});

export const GridContainerCSS = css({
  display: "flex", // 📌 가로 정렬 유지
  flexWrap: "wrap", // 📌 화면 크기에 따라 자동 줄바꿈
  justifyContent: "center", // 📌 가로 중앙 정렬
  gap: "20px",
  marginTop: "20px",
});

export const CertificateImageCSS = css({
  width: "100%",
  maxWidth: "200px", // 📌 일관된 크기 유지
  cursor: "pointer",
  transition: "transform 0.3s ease-in-out",

  "&:hover": {
    transform: "scale(1.05)",
  },
});