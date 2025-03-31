import {
  InfosFlexCSS,
  FooterBodyCSS,
  FooterCSS,
  TextCSS,
  WarningCSS,
  CopyrightCSS,
  FooterSection2CSS,
  SectionNameCSS,
  CustomerCenterLinksFlexCSS,
  FooterSection3CSS,
  FooterSection4CSS,
} from './Footer.styles';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useResponsive } from 'src/hooks/common/useResponsive';
import { infos } from './Footer.constants';
import { css } from '@emotion/react';
import SocialNetwork from '../SocialNetwork';

export default function Footer() {
  const { isMobile } = useResponsive();

  const infoLinks = (
    <div css={InfosFlexCSS}>
      {infos.map((info) => {
        if (info.name === '회사소개')
          return (
            <a
              target="_blank"
              rel="noreferrer noopener"
              key={'company'}
              href="https://kmginseng.com/"
            >
              {info.name}
            </a>
          );
        return (
          <Link key={`footer_info_link_${info.name}`} href={info.path}>
            {info.name}
          </Link>
        );
      })}
    </div>
  );
  const businessInfo = (
    <p css={TextCSS}>
      (주)케이에스엠지 대표자 : 고영매
      <br />
      연락처: 010-8666-3555
      <br />
      주소: 08390 서울 구로구 디지털로32길 30 코오롱디지털타워빌란트1차 1210호
      <br />
      사업자번호: 302-81-31179
      <br />
      통신판매업신고번호: 제2022-경기안성-0293호
    </p>
  );
  const warning = (
    <p css={WarningCSS}>
      일부 상품의 경우 (주)케이에스엠지 통신판매의 당사자가 아닌 통신판매중개자로서
      상품, 상품정보, 거래에 대한 책임이 제한될 수 있으므로, 각 상품 페이지에서
      구체적인 내용을 확인하시기 바랍니다.
    </p>
  );
  const copyright = (
    <div css={CopyrightCSS}>
      <Image
        alt="copyright"
        src="/icons/ic_copyright.svg"
        width={20}
        height={21}
      />
      <p>(주)케이에스엠지 Co.,Ltd. All Rights Reserved.</p>
    </div>
  );

  return (
    <footer css={FooterCSS}>
      <div css={FooterBodyCSS}>
        <Image
          alt="logo"
          src="/icons/logo/ic_logo_dark_gray.svg"
          width={isMobile ? 164 : 139}
          height={isMobile ? 29 : 26}
        />

        {isMobile ? (
          <>
            <SocialNetwork />
            {infoLinks}
            {businessInfo}
            {warning}
            {copyright}
          </>
        ) : (
          <>
            <div css={FooterSection2CSS}>
              <div>
                <p css={SectionNameCSS}>고객센터</p>
                <p css={[TextCSS, css({ marginTop: 8 })]}>
                  운영시간: 평일 10:00~17:00 (점심시간 12:30~13:30 제외 / 주말
                  및 공휴일 제외)
                </p>
                <div css={CustomerCenterLinksFlexCSS}>
                  {/* <Link href="https://pf.kakao.com/_RgxcPG">1:1 문의</Link> */}
                  {/* <Link href="/faq">FAQ</Link> */}
                </div>
              </div>
              <SocialNetwork />
            </div>

            <div css={FooterSection3CSS}>
              <div>
                <p css={SectionNameCSS}>사업자 정보</p>
                {businessInfo}
              </div>
              <div>
                <p css={SectionNameCSS}>법적 고지사항</p>
                {infoLinks}
              </div>
            </div>

            <div css={FooterSection4CSS}>
              {copyright}
              {warning}
            </div>
          </>
        )}
      </div>
    </footer>
  );
}
