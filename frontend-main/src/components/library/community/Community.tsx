import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import Button from 'src/components/common/Button/Button';
import { useResponsive } from 'src/hooks/common/useResponsive';
import {
  BodyCSS,
  ImageWrapperCSS,
  RouteBtnCSS,
  SocialNetworkCSS,
  TextCSS,
} from './Community.styles';
import { ContainerCSS, HeadCSS } from '../library.styles';
import SocialNetwork from 'src/components/common/SocialNetwork';

export default function Community() {
  const { isMobile } = useResponsive();
  const router = useRouter();
  const detail = (
    <p css={TextCSS}>
      흥미로운 인삼 이야기, 함께 나눠요!
      <br />
      한국장인인삼 커뮤니티에서 여러분을 기다립니다.
      <br />
      함께 나누고, 즐거운 나눔을 만나보세요!
    </p>
  );

  return (
    <div css={ContainerCSS}>
      <p css={HeadCSS}>커뮤니티 입장하기</p>
      <div css={BodyCSS}>
        {isMobile ? (
          <>
            {detail}
            <div css={ImageWrapperCSS}>
              <div>
                <Image
                  alt="community"
                  src="/imgs/library/img_community.png"
                  fill
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* <Image
              alt="community"
              src="/imgs/library/img_community.png"
              width={475}
              height={242}
            /> */}
            {detail}
          </>
        )}

        {/* <Button
          layout="contained"
          css={RouteBtnCSS}
          onClick={() => window.open('https://open.kakao.com/o/saYnNqeg')}
        >
          커뮤니티 입장하기
        </Button> */}

        <SocialNetwork css={SocialNetworkCSS} />
      </div>
    </div>
  );
}
