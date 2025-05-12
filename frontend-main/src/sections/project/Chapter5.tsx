import React from 'react';
import { ChapterTextStyleCSS, SectionContainerCSS } from './Section.styles';
import {
  ContentCSS,
  ContentDecorationCSS,
  ContentDescriptionsListCSS,
  ContentTitleCSS,
  ContentsFlexCSS,
  SectionHeadCSS,
} from './Chapter5.styles';
import { contentsList } from './Chapter5.constants';
import Image from 'next/image';
import { useResponsive } from 'src/hooks/common/useResponsive';

export default function Chapter5() {
  const { isMobile } = useResponsive();
  return (
    <div css={SectionContainerCSS}>
      <div css={SectionHeadCSS}>
        <p css={ChapterTextStyleCSS}>
          Chapter <span>5</span>.
        </p>
      </div>
      <div css={ContentsFlexCSS}>
        {contentsList.map((content) => (
          <div key={content.title} css={ContentCSS}>
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
            <p css={ContentTitleCSS}>{content.title}</p>
            <ul css={ContentDescriptionsListCSS}>
              {content.descriptions.map((description) => (
                <li key={description}>{description}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
