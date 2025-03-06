import { css } from '@emotion/react';
import React from 'react';
import ProductInfo from 'src/components/product/ProductInfo/ProductInfo';
import { ProductPriceCSS } from 'src/components/product/ProductInfo/ProductInfo.styles';
import InfoCards from 'src/components/product/store/InfoCards/InfoCards';
import ProductActionGroup from 'src/components/product/store/ProductActionGroup/ProductActionGroup';
import { useResponsive } from 'src/hooks/common/useResponsive';
import CreateNFTSection from 'src/sections/CreateNFTSection/CreateNFTSection';
import { useCreateNftStore } from 'src/stores/createNft/createNft.store';
import { color } from 'src/styles/colors';
import { addComma } from 'src/utils/format';
import { GetNftResponseData, NftAttribute } from '~/types/nft';
import CompleteModal from './modal/CompleteModal';
import { useRouter } from 'next/router';
import { INFTFormProps } from './NFTForm.types';

export default function NFTForm5({
  step = 5,
  totalStep = 5,
  onComplete,
}: INFTFormProps & {
  onComplete: () => Promise<void>;
}) {
  const router = useRouter();
  const { isMobile } = useResponsive();
  const nft = useCreateNftStore((state) => ({
    nftId: state.nftId,
    covers: state.covers,
    name: state.name,
    description: state.description,
    attributes: state.attributes,
    category: state.category,
    theme: state.theme,
    amount: state.amount,
    price: state.price,
  }));
  const { reset } = useCreateNftStore((state) => ({
    reset: state.resetCreateNftStore,
  }));
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <CreateNFTSection
        step={step}
        totalStep={totalStep}
        title="작품 예시"
        description={
          <>
            실제 판매되는 화면 예시입니다.
            <br />
            작품 등록 후에는 가격 정보 외에 정보 수정이 불가하니
            <br />
            잘못된 정보가 없는지 한 번 더 확인해주세요.
          </>
        }
        nextDisabled={false}
        onComplete={() => {
          onComplete().then(() => {
            setShowModal(true);
          });
        }}
      >
        <div css={css({ pointerEvents: 'none' })}>
          <ProductInfo
            data={
              {
                nftImagePath: nft.covers[0],
                name: nft.name,
                theme: nft.theme,
                price: nft.price,
                description: nft.description,
                totalLikeCount: 0,
              } as Partial<GetNftResponseData>
            }
          >
            {!isMobile && (
              <div
                css={{
                  borderTop: `2px solid ${color.border.primary}`,
                }}
              >
                {nft.price && (
                  <p
                    css={[
                      ProductPriceCSS,
                      { marginTop: '31px', display: 'block' },
                    ]}
                  >
                    {addComma(nft.price)} <span>원</span>
                  </p>
                )}
                <ProductActionGroup
                  data={{} as GetNftResponseData}
                  collectionAddress={''}
                  tokenId={''}
                  type={'buy'}
                  setTotalLikeCount={() => {}}
                  setNftPrice={() => {}}
                />
                {nft.attributes?.length > 0 && (
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
                    <InfoCards attributes={nft.attributes as NftAttribute[]} />
                  </>
                )}
              </div>
            )}
          </ProductInfo>
        </div>
      </CreateNFTSection>
      <CompleteModal
        data={nft}
        open={showModal}
        onClose={() => {
          setShowModal(false);
          router.push('/studio');
          reset();
        }}
      />
    </>
  );
}
