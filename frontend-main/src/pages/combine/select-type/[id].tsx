import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import PageHead from 'src/components/combine/PageHead/PageHead';
import TypeItem from 'src/components/combine/complete/TypeItem';
import { CombineType } from 'src/components/combine/complete/TypeItem.types';
import Button from 'src/components/common/Button/Button';
import { HeaderLayoutEnum } from 'src/components/common/Header/Header.types';
import { useResponsive } from 'src/hooks/common/useResponsive';
import Layout from 'src/layout/Layout';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';
import { maxWidth } from 'src/styles/styles';
import { getSession } from 'next-auth/react';

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    res.writeHead(302, { Location: '/login' });
    res.end();
    return { props: {} };
  }
  return {
    props: {},
  };
};

export default function CombineSelectTypePage() {
  const router = useRouter();
  const { id } = router.query;
  const { isDesktop } = useResponsive();
  const [type, setType] = React.useState<CombineType | null>(null);
  const button = (
    <Button
      layout="contained"
      onClick={() => {
        if (type === CombineType.NFT) {
          router.push(`/combine/start-ebook/${id}`);
        } else if (type === CombineType.BOOK) {
          router.push(`/combine/address/${id}`);
        }
      }}
      css={LinkButtonCSS}
      disabled={!type}
    >
      신청하기
    </Button>
  );
  const handleSelect = (type: CombineType) => {
    setType(type);
  };
  return (
    <>
      <Head>
        <title>신청하기</title>
        <style>
          {`
            body {
              background: ${color.background.container.black} !important;
            }
          `}
        </style>
      </Head>
      <Layout
        headerLayout={HeaderLayoutEnum.DARK}
        title="신청하기"
        {...(!isDesktop && { showTitle: true })}
        css={LayoutCSS}
        noFooter={true}
      >
        <PageHead
          title={
            '축하합니다 🎉 \n나만의 특별한 \n육필 시 노트북이 완성되었어요!'
          }
          description={
            '복수 선택이 가능합니다:)  복각본이나 육필 시 노트북을 제작하는 데 쓴 시편은 \n다시 조합하는데에 쓸 수 없으니 신중하게 선택해주세요!'
          }
          {...(isDesktop && { button })}
        />

        <div css={ItemGridCSS}>
          <TypeItem
            type={CombineType.NFT}
            currentType={type}
            handleSelect={handleSelect}
            image={'/imgs/combine/img_combine_nft.png'}
            text={'육필 시 노트북 디지털 도서\n제작하기'}
          />
          <TypeItem
            type={CombineType.BOOK}
            currentType={type}
            handleSelect={handleSelect}
            image={'/imgs/combine/img_combine_book.png'}
            text={'실물배송\n복각본 신청하기'}
          />
        </div>
        <div css={NoticeWrapperCSS}>
          <Image
            alt="notice"
            src="/icons/ic_notice_orange.svg"
            width={17}
            height={17}
          />
          <p>
            육필 시 노트북 디지털 도서를 만들면,
            <br />
            기존에 가지고 계시던 20개의 시편은 소각됩니다.
          </p>
        </div>
        {!isDesktop && <div css={ButtonWrapperCSS}>{button}</div>}
      </Layout>
    </>
  );
}

const LayoutCSS = css({
  marginTop: 100,
  paddingLeft: 30,
  paddingRight: 30,
  paddingBottom: 400,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: maxWidth,
  boxSizing: 'border-box',
  letterSpacing: '-0.165px',

  [mq.mobile]: {
    marginTop: 20,
    paddingLeft: 26,
    paddingRight: 26,
  },
  [mq.tablet]: {
    marginTop: 40,
  },
});

const ItemGridCSS = css({
  marginTop: 52,
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 10,
});

const NoticeWrapperCSS = css({
  marginTop: 20,
  gap: 10,
  display: 'flex',
  padding: '11px 12px',
  border: `1px solid ${color.orange}`,
  borderRadius: 7,
  fontSize: 14,
  lineHeight: '120%',
  color: color.orange,
});

const ButtonWrapperCSS = css({
  margin: '80px auto 0 auto',

  [mq.mobile]: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '0 26px 26px 26px',
    boxSizing: 'border-box',
    backdropFilter: 'blur(20px)',
  },
});

const LinkButtonCSS = css({
  background: color.purple,
  width: '100%',

  [mq.desktop]: {
    width: 200,
    height: 52,
  },
  [mq.tablet]: {
    width: 340,
  },
});
