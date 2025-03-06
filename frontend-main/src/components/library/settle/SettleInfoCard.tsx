import React from 'react';
import {
  InfoSectionCSS,
  InfoSectionTitleCSS,
  InfoSectionValueCSS,
} from './Settles.styles';
import { EditLinkCSS, InfoCardHeadCSS } from './SettleInfoCard.styles';
import Link from 'next/link';
import ChevronRightIcon from 'src/icons/ChevronRightIcon';
import { color } from 'src/styles/colors';

export default function SettleInfoCard({
  type = '-',
  value = '-',
  href,
}: {
  type?: string;
  value?: string;
  href: string;
}) {
  return (
    <div css={InfoSectionCSS}>
      <div css={InfoCardHeadCSS}>
        <p css={InfoSectionTitleCSS}>{type}</p>

        <Link href={href} css={EditLinkCSS}>
          변경하기
          <ChevronRightIcon color={color.purple} />
        </Link>
      </div>
      <p css={InfoSectionValueCSS}>{value}</p>
    </div>
  );
}
