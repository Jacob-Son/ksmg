import React, { useEffect } from 'react';
import Head from 'next/head';
import Layout from 'src/layout/Layout';
import ProductInfo from 'src/components/product/ProductInfo/ProductInfo';
import { useResponsive } from 'src/hooks/common/useResponsive';
import { color } from 'src/styles/colors';
import { addComma } from 'src/utils/format';
import {
  ProductPriceCSS,
  SimilarProductsLinkCSS,
} from 'src/components/product/ProductInfo/ProductInfo.styles';
import ProductActionGroup from 'src/components/product/store/ProductActionGroup/ProductActionGroup';
import InfoCards from 'src/components/product/store/InfoCards/InfoCards';
import { css } from '@emotion/react';
import { mq } from 'src/styles/mediaQuery';
import Tabs from 'src/components/product/store/Tabs/Tabs';
import RelatedProducts from 'src/components/carousel/RelatedProducts/RelatedProducts';
import { useRouter } from 'next/router';
import { useNft } from 'src/hooks/nft/useNft';
import { GetNftResponseData, NftStatus } from '~/types/nft';
import useAccount from 'src/hooks/common/useAccount';
import NftDetailInfo from 'src/components/product/store/NftDetailInfo/NftDetailInfo';
import { nftApi } from 'src/services/nft_api';
import { useRelativeNft } from 'src/hooks/nft/useRelativeNft';
import OrderGuide from 'src/components/product/store/OrderGuide/OrderGuide';
import Link from 'next/link';
import PreviewPlayer from 'src/components/audio/PreviewPlayer';

const commonTabs = [
  { value: 'details', label: '작품상세' },
  //TODO
  // { value: 'tx', label: '거래내역' },
  // { value: 'nftDetails', label: 'NFT 세부 정보' },
];

const mobileTabs = [
  { value: 'details', label: '작품상세' },
  { value: 'info', label: '시 정보' },
  // TODO
  // { value: 'tx', label: '거래내역' },
  // { value: 'nftDetails', label: 'NFT 세부 정보' },
];

export default function StorePage() {
  const title = 'Store Page';
  const { isMobile } = useResponsive();
  const router = useRouter();
  const { address } = useAccount();

  const collectionAddress = '0xtest';
  const { tokenId } = router.query;

  const { nft, isPending: isNftPending } = useNft(
    collectionAddress,
    String(tokenId),
  );
  const { relativeNft } = useRelativeNft(collectionAddress, String(tokenId));
  const [totalLikeCount, setTotalLikeCount] = React.useState(0);
  const [nftPrice, setNftPrice] = React.useState(undefined);

  const [currentTab, setCurrentTab] = React.useState<string>('details');
  const tabs = isMobile ? mobileTabs : commonTabs;

  useEffect(() => {
    if (nft === null) {
      router.push('/');
    }
  }, [nft]);

  useEffect(() => {
    if (!nft) return;
    setTotalLikeCount(nft?.totalLikeCount);
    setNftPrice(nft?.price);
    nftApi.addViewCount(collectionAddress, String(tokenId));
  }, [nft]);

  const getType = () => {
    if (address && nft.ownerAddress === address) {
      if (nft.status === NftStatus.SOLD_OUT) {
        return 'confirm';
      } else {
        return 'sell';
      }
    } else {
      if (nft.price !== undefined) {
        return 'buy';
      } else {
        return 'sold-out';
      }
    }
  };

  const productActions = (
    <>
      {nft && (
        <ProductActionGroup
          data={
            {
              ...nft,
              totalLikeCount,
              price: nftPrice,
            } as GetNftResponseData
          }
          collectionAddress={collectionAddress}
          tokenId={String(tokenId)}
          type={getType()}
          setTotalLikeCount={setTotalLikeCount}
          setNftPrice={setNftPrice}
        />
      )}
    </>
  );
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout css={LayoutCSS} isLoading={isNftPending}>
        {nft && (
          <ProductInfo
            data={
              {
                ...nft,
                totalLikeCount,
                price: nftPrice,
                nftCreateUnitId: nft.nftCreateUnitId,
                totalNftCount: nft.totalNftCount,
              } as GetNftResponseData
            }
          >
            {!isMobile && (
              <div
                css={{
                  borderTop: `2px solid ${color.border.primary}`,
                }}
              >
                {nft.price !== undefined && nft.price !== null && (
                  <p
                    css={[
                      ProductPriceCSS,
                      { marginTop: '31px', display: 'block' },
                    ]}
                  >
                    {addComma(nftPrice)} <span>원</span>
                  </p>
                )}
                {nft.nftCreateUnitId && (
                  <Link
                    href={`/work/${nft.nftCreateUnitId}`}
                    css={[SimilarProductsLinkCSS, css({ marginTop: 20 })]}
                  >
                    같은 상품 더보기 (
                    {nft.totalNftCount ? nft.totalNftCount : 0})
                  </Link>
                )}
                {productActions}

                {nft?.preAudioPath && <PreviewPlayer url={nft.preAudioPath} />}
                {nft.nftAttributes?.length > 0 && (
                  <>
                    <p
                      css={css({
                        marginBottom: 20,
                        color: color.text.neutral[4][100],
                        fontWeight: 600,
                        lineHeight: '100%',
                        letterSpacing: '-0.165px',
                      })}
                    >
                      시정보
                    </p>
                    <InfoCards attributes={nft.nftAttributes} />
                  </>
                )}
              </div>
            )}
          </ProductInfo>
        )}
        {nft && (
          <div
            css={css({
              margin: '60px 0',

              [mq.mobile]: {
                margin: '12px 0',
                padding: '0 20px',
              },
            })}
          >
            <Tabs current={currentTab} tabs={tabs} onChange={setCurrentTab} />

            {isMobile && currentTab === 'info' && (
              <InfoCards attributes={nft.nftAttributes} />
            )}
            {currentTab === 'details' && (
              <NftDetailInfo
                detailImage={nft.nftDetailImagePath}
                detailDescription={nft.detailDescription}
              />
            )}
            {/* {currentTab === 'tx' && <Transactions data={data.transactions} />} */}
            {/* {currentTab === 'nftDetails' && <NftDetails data={data.nftDetails} />} */}
          </div>
        )}
        <OrderGuide />
        {relativeNft && relativeNft.nfts.length > 0 && (
          <RelatedProducts
            name={relativeNft.isTheme ? '테마' : '카테고리'}
            data={relativeNft.nfts}
          />
        )}
        {isMobile && productActions}
      </Layout>
    </>
  );
}

const LayoutCSS = css({
  marginTop: 40,
  paddingLeft: 30,
  paddingRight: 30,

  [mq.mobile]: {
    marginTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
});
