import React from 'react';
import { useResponsive } from 'src/hooks/common/useResponsive';
import {
  ContentDecorationCSS,
  ContentDescriptionCSS,
  ContentFlexCSS,
  ContentTitleCSS,
} from './Content.styles';
import Image from 'next/image';

const Content = ({
  title,
  description,
  ...props
}: {
  title: string;
  description: React.ReactNode;
  [key: string]: unknown;
}) => {
  const { isMobile } = useResponsive();
  return (
    <div css={ContentFlexCSS} {...props}>
      {isMobile ? (
        <Image
          alt="decoration"
          src="/imgs/project/img_decoration_mb.svg"
          width={56}
          height={7}
        />
      ) : (
        <div css={ContentDecorationCSS} />
      )}
      <p css={ContentTitleCSS}>{title}</p>
      <p css={ContentDescriptionCSS}>{description}</p>
    </div>
  );
};

export default Content;
