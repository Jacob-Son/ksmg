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
        <p css={SectionTitleCSS}>세계 최초 잔류 농약 없는 친환경 한국장인인삼</p>
        <p css={SectionDescriptionCSS}>
          우리 농가 활성화를 위해 직접 사입해 온 우리 인삼을
          <br />
          한국장인인삼만의 특허 기술을 활용하여
          <br />
          잔류 농약 없는 사포닌 100%의
          <br />
          고려 인삼으로 재탄생합니다.
        </p>
        {/* <Player /> */}
      </div>
    </div>
  );
}
