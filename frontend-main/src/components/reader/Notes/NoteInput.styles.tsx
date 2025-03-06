import { css } from "@emotion/react";
import { color } from "src/styles/colors";
import { noteInputMaxWidth } from "./NoteInput.constants";

export const MbNoteInputWrapperCSS = css`
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 100vh;
  background: ${color.background.default};
`;

export const MbNoteInputHeaderCSS = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  boxSizing: "border-box",
  padding: "12px 20px 8px 20px",
});

export const SaveButtonCSS = css`
  padding: 6px;
  background: transparent;
  border: none;
  color: ${color.blue.main};
  font-size: 16px;
  font-weight: 600;
  line-height: 100%;
  letter-spacing: -0.165px;
`;

export const TextareaWrapperCSS = css`
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  min-height: 344px;
  background: #fff;
  border-radius: 12px;

  & textarea {
    resize: none;
    width: 100%;
    height: 270px;
    color: ${color.text.primary};
    font-family: "Pretendard", sans-serif;
    font-size: 17px;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: -0.165px;
    border: none;

    &:focus {
      outline: none;
    }
    &::placeholder {
      color: ${color.text.secondary};
    }
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background: ${color.icon.secondary};
      border-radius: 8px;
    }
  }
  & p {
    margin-top: auto;
    margin-left: auto;
    padding: 0;
    color: ${color.text.secondary};
    font-size: 17px;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: -0.165px;
  }
`;

export const TabletNoteInputWrapperCSS = css`
  z-index: 100;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${color.background.container.primary};
  border-radius: 20px;
  width: min(80%, ${noteInputMaxWidth}px);
  color: ${color.text.primary};
  overflow: hidden;
`;

export const TabletNoteInputHeaderCSS = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  boxSizing: "border-box",
  background: "#fff",
  padding: "20px 24px",
  "& p": {
    fontSize: "24px",
    fontWeight: 600,
    lineHeight: "100%",
    letterSpacing: "-0.165px",
  },
});
