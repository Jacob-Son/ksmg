import React from 'react';
import {
  ChapterTitleCSS,
  ChapterContainerCSS,
} from './Chapter1.styles';
import { useResponsive } from 'src/hooks/common/useResponsive';
import { SectionFlexCSS, TextCSS } from './Chapter1.styles';

export default function Chapter1() {
  const { isDesktop } = useResponsive();

  const text1 = (
    <>
      오랜 기간 한약재로 사용되었던 인삼은 항암, 항염, 항산화, 치매, 항당뇨 등의 효능이 있는 것으로 알려져 있다.
      이러한 효능은 인삼 속의 사포닌 성분인 진세노사이드(ginsenosides)로부터 유래된다(1-5). 진세노사이드는 배당체 형태를 띠며,
      종류가 다양하고 각각의 기능을 가지고 있다. 진세노사이드의 90% 이상을 차지하는 major 진세노사이드는 분자량이 크고
      생체 내 흡수율이 낮다. 섭취 시 장내미생물의 당 가수분해를 통해 분자량이 작은 minor 진세노사이드로 전환되어 흡수된다.

      Minor 진세노사이드는 major 진세노사이드보다 뛰어난 약효를 가지고 있지만 함량이 미량이며, 사람의 체질과 식습관에 따라
      장내미생물의 종류와 분포도가 다르기 때문에 생성되는 정도가 다르다. 이로 인해 인삼을 섭취할 때 유용물질의 흡수율이
      사람마다 달라 효능의 차이가 발생한다.

      <br /><br />

      이러한 문제를 해결하기 위해 현재는 사람들이 동일한 minor 진세노사이드를 섭취하고 흡수할 수 있도록 minor 진세노사이드의
      함량을 향상시키는 연구가 진행되고 있다. 이를 위해 산처리(6,7), 가열(8), 합성, 미생물발효(9), 효소(10) 등을 활용한 기술이 개발되고 있다.
    </>
  );

  const text2 = (
    <>
      인삼의 증숙 및 건조를 통해 생산되는 홍삼은 열에 의해 아미노산 변화가 생기며, Rg2, Rg3, Rh1, Rh2와 같은
      minor 진세노사이드가 생성된다(11). 산 또는 알칼리를 이용하는 방법은 당을 무작위로 가수분해시켜 산성 다당체와
      minor 진세노사이드를 분해할 수 있다. 그러나 이 과정에서 특이적인 분해가 이루어지지 않아 약리성분이 변형될 가능성이 있다.
      진세노사이드의 합성은 많은 연구가 진행되었지만 실제 활용되는 경우는 드물다.

      <br /><br />

      최근에는 효소 또는 미생물을 이용한 방법이 많이 연구되고 있다. 효소 및 미생물을 활용한 방법은 생촉매 기능을 이용하여
      major 진세노사이드를 분해하며, 사용되는 효소와 미생물에 따라 특이적인 변화를 줄 수 있다는 장점이 있다. 이러한 생물전환(bioconversion)법을
      통해 건강기능식품, 화장품, 의약품 등의 소재를 개발하는 연구가 활발히 진행되고 있다.

      본 논문에서는 인삼에 함유된 진세노사이드의 종류, 장내미생물에 의한 진세노사이드의 변화, 그리고 생물전환 기술에 대해 논하고자 한다.
    </>
  );

  return (
    <div css={ChapterContainerCSS}> {/* ✅ 배경 이미지 적용된 스타일 사용 */}
      <p css={ChapterTitleCSS}>장인인삼의 효능</p>
      <div css={SectionFlexCSS}>
        <p css={TextCSS}>
          {text1}
          {isDesktop && text2}
        </p>
      </div>
      {!isDesktop && <p css={TextCSS}>{text2}</p>}
    </div>
  );
}