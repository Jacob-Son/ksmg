import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import PageHead from 'src/components/combine/PageHead/PageHead';
import ItemSelect from 'src/components/combine/create/ItemSelect/ItemSelect';
import Button from 'src/components/common/Button/Button';
import { HeaderLayoutEnum } from 'src/components/common/Header/Header.types';
import PageItem from 'src/components/studio/createNFT/PageItem';
import { useResponsive } from 'src/hooks/common/useResponsive';
import Layout from 'src/layout/Layout';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';
import { maxWidth } from 'src/styles/styles';
import { SimpleNftType } from '~/types/nft';
import { getSession } from 'next-auth/react';
import { combineApi } from 'src/services/combine_api';
import useAccount from 'src/hooks/common/useAccount';
import { useCombineNfts } from 'src/hooks/combine/useCombineNfts';

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

export default function CombineCreatePage() {
  const router = useRouter();
  const { isMobile, isDesktop } = useResponsive();
  const [step, setStep] = React.useState(1);
  const [selected, setSelected] = React.useState<SimpleNftType[]>([]);
  const [pages, setPages] = React.useState<
    {
      nftId: number;
      image: string;
    }[]
  >([]);
  const { address } = useAccount();
  const { nfts } = useCombineNfts();

  const [trigger, setTrigger] = React.useState(false);

  const handlePageNumChange = (e, current) => {
    let value = e.target.value;
    if (Number(value) > 500) {
      value = '500';
      e.target.value = value;
    }
    if (Number(value) < 0) {
      value = '0';
      e.target.value = value;
    }
    e.target.style.width = `${value.length + 1}ch`;

    if (e.key === 'Enter') {
      const index = Number(e.target.value) - 1;
      if (index + 1 < pages.length) {
        const result = [...pages];
        const currentVal = result.splice(current, 1)[0]; // 현재 위치에서 항목 제거 및 저장
        result.splice(index, 0, currentVal);
        setPages(result);
      } else {
        const result = [...pages];
        result.splice(current, 1);
        result.push(pages[current]);
        setPages(result);
      }
    }
  };

  const step1Button = (
    <Button
      layout="contained"
      onClick={() => {
        if (selected.length !== 20) return;
        setStep(2);
        setPages(
          selected.map((nft) => ({
            nftId: nft.nftId,
            image: nft.nftImagePath,
          })),
        );
      }}
      disabled={selected.length !== 20}
      css={LinkButtonCSS}
    >
      선택 완료
    </Button>
  );
  const step2Button = (
    <Button
      layout="contained"
      onClick={async () => {
        if (trigger) return;
        setTrigger(true);
        try {
          const res = await combineApi.createCombine(
            address,
            pages.map((page) => page.nftId),
          );
          if (res.success === false) {
            alert('조합에 실패했습니다. 다시 시도해주세요.');
            setTrigger(false);
            return;
          }
          router.push(`/combine/select-type/${res.data.combineLogId}`);
          setTrigger(false);
        } catch (e) {
          console.log(e);
          setTrigger(false);
        }
      }}
      css={[LinkButtonCSS, css({ width: 'fit-content' })]}
    >
      육필 시 노트북 완성하기
    </Button>
  );
  return (
    <>
      <Head>
        <title>조합할 서재 고르기</title>
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
        title="조합할 서재 고르기"
        {...(!isDesktop && { showTitle: true })}
        css={LayoutCSS}
        noFooter={true}
      >
        {step === 1 ? (
          <>
            <PageHead
              title={'조합하고 싶은\n상품을 선택해 주세요.'}
              description={'조합 가능한 갯수는 20개입니다.'}
              {...(!isMobile && { button: step1Button })}
            />
            {nfts && (
              <ItemSelect
                data={nfts}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {isMobile && <div css={ButtonWrapperCSS}>{step1Button}</div>}
          </>
        ) : (
          <>
            <PageHead
              title={'원하시는 순서가 맞는지\n다시 한 번 확인해주세요.'}
              description={
                '페이지 번호를 수정하면 해당 숫자에 맞게\n페이지 순서가 변경됩니다.'
              }
              {...(!isMobile && { button: step2Button })}
            />
            <div css={PagesGridCSS}>
              {pages.map((page, index) => (
                <PageItem
                  key={`pages_form_${page}_${index}`}
                  page={page.image}
                  index={index}
                  fullWidth
                  deleteIcon={
                    <Image
                      alt="x icon"
                      src="/icons/combine/ic_delete.svg"
                      width={30}
                      height={30}
                    />
                  }
                  onDelete={() => {
                    setPages(pages.filter((_, i) => i !== index));
                  }}
                  onPageNumChange={(e) => handlePageNumChange(e, index)}
                  css={PageItemCSS}
                />
              ))}
            </div>
            {isMobile && <div css={ButtonWrapperCSS}>{step2Button}</div>}
          </>
        )}
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

const ButtonWrapperCSS = css({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  padding: '0 26px 26px 26px',
  boxSizing: 'border-box',
  backdropFilter: 'blur(20px)',
});

const LinkButtonCSS = css({
  background: color.purple,
  width: 140,
  height: 52,

  '&:disabled': {
    background: color.icon.sub,
  },

  [mq.mobile]: {
    width: '100%',
    height: 60,
  },
});

const PagesGridCSS = css({
  marginTop: 20,
  gap: '20px 40px',
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',

  [mq.tablet]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  [mq.mobile]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});

const PageItemCSS = css({
  '& input': {
    background: 'transparent',
    border: `1px solid ${color.border.secondary}`,
  },
});
