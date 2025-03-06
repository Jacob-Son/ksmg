import React from 'react';
import parse from 'html-react-parser';
import { DescriptionCSS, HeadCSS, TitleCSS } from './PageHead.styles';

export default function PageHead({
  title,
  description,
  button,
}: {
  title: string;
  description: string;
  button?: React.ReactNode;
}) {
  return (
    <div css={HeadCSS}>
      <div>
        <h2 css={TitleCSS}>{parse(title.replace(/\n/g, '<br />'))}</h2>
        <p css={DescriptionCSS}>
          {parse(description.replace(/\n/g, '<br />'))}
        </p>
      </div>
      {button}
    </div>
  );
}
