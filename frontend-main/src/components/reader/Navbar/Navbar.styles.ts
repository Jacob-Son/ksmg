import { css } from "@emotion/react";
import { color } from "src/styles/colors";

export const DesktopNavWrapperCSS = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  gap: 16,
});

export const NavbarWrapperCSS = css({
  position: "fixed",
  left: 0,
  bottom: 0,
  width: "100%",
});

export const NavbarContainerCSS = css({
  padding: "20px 20px 40px 20px",
  boxSizing: "border-box",
  width: "100%",
  backdropFilter: "blur(10px)",
});

export const InputRangeBarCSS = css({
  width: "100%",
  appearance: "none",
  background: "transparent",
  cursor: "pointer",

  "&::-webkit-slider-thumb": {
    appearance: "none",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: color.icon.primary,
    marginTop: "-4px",
  },
  // firefox
  "&::-moz-range-thumb": {
    appearance: "none",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: color.icon.primary,
    marginTop: "-4px",
  },
  "&::-moz-range-track": {
    background: color.icon.tertiary,
    height: "4px",
  },
  "&::-moz-range-progress": {
    background: color.icon.primary,
    height: "4px",
    borderRadius: "99px",
  },
});

export const IconCSS = css({
  background: "transparent",
  border: "none",
  padding: "0",
  cursor: "pointer",
});

export const PageCountCSS = css({
  fontSize: "15px",
  fontWeight: 600,
  lineHeight: "100%",
  letterSpacing: "0.165px",
  color: color.text.secondary,

  "& span": {
    color: color.text.primary,
  },
});
