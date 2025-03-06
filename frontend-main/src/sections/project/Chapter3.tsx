import React from 'react';
import {
  ChapterTextStyleCSS,
  ChapterTitleCSS,
  SectionContainerCSS,
} from './Section.styles';
import { ContentFlexCSS, TextCSS, ProfileImageCSS, ProfileCaptionCSS } from './Chapter3.styles'; // ✅ ProfileCaptionCSS 추가
import { useResponsive } from 'src/hooks/common/useResponsive';
import Image from 'next/image';

export default function Chapter3() {
  const { isTablet, isDesktop } = useResponsive();

  return (
    <div css={SectionContainerCSS}>
      <p css={ChapterTitleCSS}>인사말</p>  {/* ✅ 타이틀 스타일 적용 */}

      <div css={ContentFlexCSS}>
        <div css={ProfileImageCSS}> {/* ✅ 세로 중앙 정렬 및 텍스트 포함 */}
          <Image
            alt="김태현 이사님 프로필"
            src="/imgs/project/img_profile_contribute.png"
            width={isDesktop ? 271 : isTablet ? 223 : 179}
            height={isDesktop ? 345 : isTablet ? 284 : 228}
          />
          {/* ✅ 추가된 텍스트 */}
          <p css={ProfileCaptionCSS}>
            (주)한국장인인삼 <br />
            김태현 이사
          </p>
        </div>

        <p css={TextCSS}>
          존경하고 사랑하는 여러분, 그리고 문학의 아름다움을 함께 즐기는 모든
          분들께, 저는 박목월 시인의 장남이자 박동규라는 이름의 교수로 여러분을
          맞이합니다. 오늘은 특별한 순간에 함께 할 수 있어 영광입니다.
          <br /><br />
          우리는 이 자리에서 박목월 시인의 미공개 작품을 만날 기회를 가졌습니다. 
          그의 시는 우리에게 언제나 감동과 영감을 안겨주었고, 이번에는 그가 세상에 
          드러내지 않은 소중한 작품을 발표하게 되었습니다. 박목월 시인은 그의 말로 
          어떻게 이 작품이 탄생되었는지 설명하고자 했겠지만, 아쉽게도 그 자신은 
          더 이상 우리 곁에 계시지 않습니다. 그러나 그의 작품은 여전히 우리와 
          함께하며 그의 정신과 예술적 업적을 기리고자 합니다.
          <br /><br />
          이 작품들은 시인의 미소와 그의 감성이 고스란히 담겨 있습니다. 이 순간, 
          우리는 그의 세계로 초대되며, 그가 전하고자 했던 메시지를 함께 나눌 것입니다. 
          이 공간을 통해 여러분과 함께하는 이 순간이 정말 소중하고 의미 있는 
          시간이 되길 기대합니다. 박목월 시인의 미공개 작품, 우리 모두가 함께 감상하며 
          그의 예술적 유산에 경의를 표하는 시간이 되기를 바랍니다.
        </p>
      </div>
    </div>
  );
}