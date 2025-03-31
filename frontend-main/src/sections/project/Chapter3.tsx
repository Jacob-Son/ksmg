import React, { useState } from "react";
import {
  ChapterTitleCSS,
  ChapterContainerCSS,
  GridContainerCSS,
  CertificateImageCSS,
} from "./Chapter3.styles";
import { css } from "@emotion/react";

const patents = [
  { src: "/imgs/project/Patent1.png", alt: "특허증 1" },
  { src: "/imgs/project/Patent2.png", alt: "특허증 2" },
  { src: "/imgs/project/Patent3.png", alt: "특허증 3" },
  { src: "/imgs/project/Patent4.png", alt: "특허증 4" },
  { src: "/imgs/project/Patent5.png", alt: "특허증 5" },
  { src: "/imgs/project/Patent6.png", alt: "특허증 6" },
];

export default function Chapter3() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  return (
    <div css={ChapterContainerCSS}>
      {/* 특허증 내역 */}
      <div css={css({ textAlign: "center", marginTop: "0px" })}>
        <h2 css={ChapterTitleCSS}>특허로 확인하는 한국장인인삼의 기술력</h2>
        <div css={GridContainerCSS}>
          {patents.map((patent, index) => (
            <img
              key={index}
              src={patent.src}
              alt={patent.alt}
              css={CertificateImageCSS}
              onClick={() => {
                setSelectedImage(patent.src);
                setModalIsOpen(true);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}