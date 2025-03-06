import parse from 'html-react-parser';
import Link from 'next/link';
import {
  ItemCoverImageCSS,
  ItemInformationCSS,
  RecommendationItemCSS,
  RefereeDescriptionCSS,
  RefereeNameCSS,
  RefereeProfileCSS,
  RefereeFlexCSS,
} from './Recommendations.styles';
import { Recommend } from '~/types/home';
import Image from 'next/image';
import { css } from '@emotion/react';

const RecommendationItem = ({
  item,
  isDragging = false,
}: {
  item: {
    recommend: Recommend;
    nftImagePath: string;
    tokenId: string;
  };
  isDragging?: boolean;
}) => (
  <Link
    href={`/store/${item.tokenId}`}
    css={[
      RecommendationItemCSS,
      css({
        background: item.recommend.backgroundColor,
        ...(isDragging && {
          pointerEvents: 'none',
        }),
      }),
    ]}
  >
    <p css={ItemInformationCSS}>
      {parse(item.recommend.description.replace(/\n/g, '<br/>'))}
    </p>
    <Image
      alt="recommendation"
      src={item.nftImagePath}
      width={159}
      height={214}
      css={ItemCoverImageCSS}
    />
    <div css={RefereeFlexCSS}>
      <Image
        alt="referee profile"
        src={item.recommend.profileImagePath}
        width={70}
        height={70}
        css={RefereeProfileCSS}
      />
      <div>
        <p css={RefereeNameCSS}>{item.recommend.author} 추천 작품</p>
        <p css={RefereeDescriptionCSS}>
          {parse(item.recommend.intro.replace(/\n/g, '<br/>'))}
        </p>
      </div>
    </div>
  </Link>
);

export default RecommendationItem;
