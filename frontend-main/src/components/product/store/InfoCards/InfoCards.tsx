import { css } from '@emotion/react';
import { InfoCardCSS, InfoCardsContainerCSS } from './InfoCards.styles';
import { color } from 'src/styles/colors';
import { NftAttribute } from '~/types/nft';

export default function InfoCards({
  attributes,
}: {
  attributes: NftAttribute[];
}) {
  return (
    <div css={InfoCardsContainerCSS}>
      {attributes.map((info, i) => (
        <div key={`info_card_${i}`} css={InfoCardCSS}>
          <p css={css({ color: color.text.secondary })}>{info.key}</p>
          <p>{info.value}</p>
          {/* <p css={css({ color: color.text.secondary })}>
            희소성 {info.rarity}%
          </p> */}
        </div>
      ))}
    </div>
  );
}
