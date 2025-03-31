import React, { useState } from "react";
import {
  ChapterTitleCSS,
  ChapterContainerCSS,
  GridContainerCSS,
  CertificateImageCSS,
} from "./Chapter2.styles";
import { css } from "@emotion/react";

const certificates = [
  { src: "/imgs/project/Test1.png", alt: "시험 성적서" },
  { src: "/imgs/project/Test2.jpg", alt: "시험 성적서2" },
  { src: "/imgs/project/Prize1.jpg", alt: "표창장" },
  { src: "/imgs/project/Prize2.jpg", alt: "표창패" },
  { src: "/imgs/project/Prize3.jpg", alt: "표창장" },
];

export default function Chapter2() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  return (
    <div css={ChapterContainerCSS}>
      {/* 시험 성적 & 수상 내역 */}
      <div css={css({ textAlign: "center", marginTop: "0px" })}>
        <h2 css={ChapterTitleCSS}>글로벌 인증 한국장인인삼</h2>
        <div css={GridContainerCSS}>
          {certificates.map((cert, index) => (
            <img
              key={index}
              src={cert.src}
              alt={cert.alt}
              css={CertificateImageCSS}
              onClick={() => {
                setSelectedImage(cert.src);
                setModalIsOpen(true);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
