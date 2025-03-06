import React from 'react';
import { useResponsive } from 'src/hooks/common/useResponsive';
import {
  BirthdayCSS,
  ContainerCSS,
  DescriptionCSS,
  ImageContainerCSS,
  ProfileFlexCSS,
  SectionTitleCSS,
  TextFlexCSS,
  TopMessageCSS,
  TopMessageTitleCSS,
  TopMessageHighlightCSS,
  TopMessageLastCSS, // ✅ 마지막 줄 스타일 추가
} from './Profile.styles';
import Image from 'next/image';

export default function ProfileSection() {
  const { isMobile } = useResponsive();
  const image = (
    <div css={ImageContainerCSS}>
      <Image alt="profile" src="/imgs/project/img_profile.png" fill />
    </div>
  );

  return (
    <div>
      {/* "최상의 제품만을 생산합니다" 섹션 */}
      <div css={TopMessageCSS}>
        <p>최상의 제품만을 생산합니다</p>
        <p css={TopMessageTitleCSS}>
          진세노사이드 RG1, RB1, RG3, RE 등 8ml 이상 함유
        </p>
        <p css={TopMessageHighlightCSS}>
          신체면역기능향상, 항산화효과, 당뇨개선, 혈압안정, 항암효과, 남성성기능향상
        </p>
        <p css={TopMessageLastCSS}>
          여성갱년기증상완화 등 프리미엄 제품
        </p>
      </div>

      <div css={ContainerCSS}>
        {!isMobile && image}
        <div css={TextFlexCSS}>
          <p css={BirthdayCSS}>검증된 스마트팜 수경재배기술</p>
          {isMobile && image}
          <p css={DescriptionCSS}>
            <br />
            6년근에서 추출가능한 진세노사이드 함량은 24ml까지
            <br />
            고농축 추출, RG3함량은 70% 이상
            <br />
            RG3는 예로부터 항암효과, 노화방지, 갱년기증상완화, 면역증진,
            <br />
            원기회복, 치매예방, 혈행개선, 성기능향상, 당뇨개선, 혈압안정 등
            <br />
            <br />
            동의보감에서는 만병통치약으로도 불려진다.
          </p>
        </div>
      </div>
    </div>
  );
}