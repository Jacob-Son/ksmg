import React from 'react';
import parse from 'html-react-parser';
import Image from 'next/image';
import {
  CardContentTextCSS,
  CardProfileFlexCSS,
  CardProfileTextColumnCSS,
  CardWrapperCSS,
  IntroductionCSS,
  NameCSS,
} from './CommitteeCard.styles';

export default function CommitteeCard({
  name,
  image,
  introduction,
  content,
}: {
  name: string;
  image: string;
  introduction: string;
  content: string;
}) {
  const ref = React.useRef(null);
  function scroll() {
    if (
      ref.current.offsetTop + ref.current.clientHeight / 2 <
      window.scrollY + window.screen.height
    ) {
      ref.current.classList.add('show');
    }
  }

  React.useEffect(() => {
    window.addEventListener('scroll', scroll);

    return () => window.removeEventListener('scroll', scroll);
  });
  return (
    <div css={CardWrapperCSS} ref={ref}>
      <div css={CardProfileFlexCSS}>
        <Image alt={name} src={image} width={110} height={110} />
        <div css={CardProfileTextColumnCSS}>
          <p css={NameCSS}>{name}</p>
          <p css={IntroductionCSS}>
            {parse(introduction.replace(/\n/g, '<br />'))}
          </p>
        </div>
      </div>
      <p css={CardContentTextCSS}>{parse(content.replace(/\n/g, '<br />'))}</p>
    </div>
  );
}
