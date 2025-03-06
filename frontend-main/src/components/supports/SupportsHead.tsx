import React from 'react';
import { HeadCSS, LinkButtonCSS, TextCSS, TitleCSS } from './Supports.styles';
import Link from 'next/link';
import parse from 'html-react-parser';

export default function SupportsHead({
  title,
  description,
  returnUrl,
  ...props
}: {
  title: string;
  description: string;
  returnUrl?: string;
  [key: string]: unknown;
}) {
  return (
    <div css={HeadCSS} {...props}>
      <h1 css={TitleCSS}>{title}</h1>
      <p css={TextCSS}>{parse(description.replace(/\n/g, '<br />'))}</p>
      {returnUrl && (
        <Link href={`/inquiry?returnUrl=${returnUrl}`} css={LinkButtonCSS}>
          1:1 문의하기
        </Link>
      )}
    </div>
  );
}
