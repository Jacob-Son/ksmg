import { css } from "@emotion/react";
import { mq } from "src/styles/mediaQuery";

export const HeaderCSS = css({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  boxSizing: "border-box",
  zIndex: 10,
  backdropFilter: "blur(10px)",
  padding: "12px 20px 8px 20px",
  [mq.desktop]: {
    padding: "20px",
  },
});

export const HeaderTitleCSS = css({
  fontSize: "17px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "100%",
  letterSpacing: "-0.165px",
  margin: "0 auto",
  color: "#000",
});
