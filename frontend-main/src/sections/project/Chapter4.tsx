import React from 'react';
import {
  ChapterTextStyleCSS,
  SectionContainerCSS,
} from './Section.styles';
import { ContentFlexCSS, TextCSS, ProfileImageCSS, ProfileCaptionCSS, ChapterTitleCSS } from './Chapter4.styles'; // ✅ ProfileCaptionCSS 추가
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
            alt="김태현 개발 이사님 프로필"
            src="/imgs/project/img_profile_contribute.png"
            width={isDesktop ? 271 : isTablet ? 223 : 179}
            height={isDesktop ? 345 : isTablet ? 284 : 228}
          />
          {/* ✅ 추가된 텍스트 */}
          <p css={ProfileCaptionCSS}>
            (주)케이에스엠지 <br />
            김태현 개발 이사
          </p>
        </div>

        <p css={TextCSS}>
        일반 노지재배의 4~6년근 인삼뿌리를 대량 구매하여 한국장인인삼의 특수 스마트팜 시설에서 약 4주간에 걸쳐 재배를 하면 인삼뿌리의 잔류농약이 제거되고 병해충 없는 줄기와 잎, 열매까지 통째로 섭취할 수 있는무 농약 사포닌 100%의 인삼이 됩니다. 

한국장인인삼은 다년간의 연구를 통해 다양한 영양과 미네랄 성분 등 특수 활성수 처리기법을 통해 잔류농약이 없는 인삼재배에 성공하였습니다.
          <br /><br />
          인삼의 유효성분인 사포닌은 줄기, 잎, 열매에 70%, 뿌리에 30% 비율로 분포되어 있다는 연구결과가 있지만, 다년간 한 곳에서 재배하는 인삼재배의 특성상 병해충 방지를 위한 많은 농약 살포로 영양성분이 다량 함유되어 있는 줄기, 잎 부분은 버리고 뿌리만 사용해 온 실정이었습니다.

한국장인인삼의 재배농법은 고려시대 훨씬 이전부터 우리 고유의 특산품이자 귀한 약재로 인정받아 온 인삼을 농약 걱정없이 뿌리에서 줄기, 잎과 열매까지 모두 사용 가능한 사포닌 100% 인삼으로 재탄생시킨 쾌거입니다.
          <br /><br />
          인삼은 보관을 위해 건삼, 홍삼 등으로 여러 가공과정을 거치지만, 싱싱한 생삼을 천천히 오래 씹어 섭취하는 것이 가장 효과가 좋다고 할 수 있습니다. 이제 안심하고 무농약 사포닌 100%의 인삼을 섭취하여 코로나 시대 면역력 증진과 건강을 지키시기 바랍니다.
        </p>
      </div>
    </div>
  );
}