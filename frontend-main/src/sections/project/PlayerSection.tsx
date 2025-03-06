import React from 'react';
import {
  PlayerGradientCSS,
  PlayerSectionContainerCSS,
  ProjectNoCSS,
  SectionDescriptionCSS,
  SectionTitleCSS,
} from './PlayerSection.styles';
import Player from 'src/components/audio/Player';

export default function PlayerSection() {
  return (
    <div css={PlayerSectionContainerCSS}>
      <div css={PlayerGradientCSS}>
        <p css={ProjectNoCSS}>
          {/* Project no.<span>1</span> */}
        </p>
        <p css={SectionTitleCSS}>국내 최초 잔류 농약 없는 친환경 장인인삼</p>
        <p css={SectionDescriptionCSS}>
          무잔류농약, 무항생제, 무색소 3無
          <br />
          실현하는 정직한 세계일류기업을 꿈꿉니다.
        </p>
        {/* <Player /> */}
      </div>
    </div>
  );
}
