import Image from 'next/image';
import React from 'react';
import Button from 'src/components/common/Button/Button';
import { addComma } from 'src/utils/format';
import {
  DeleteButtonCSS,
  PriceEditButtonCSS,
  StudioProductItemCSS,
  StudioProductItemImgWrapperCSS,
  StudioProductItemPriceCSS,
  StudioProductItemTitleCSS,
  StudioProductsBodyCSS,
  StudioProductsContainerCSS,
  StudioProductsHeadCSS,
  StudioProductsNotFoundCSS,
} from './StudioProducts.styles';
import { css } from '@emotion/react';
import PriceInputModal from './modal/PriceInputModal';
import { NftStudioUnit } from '~/types/studio';
import { studioApi } from 'src/services/studio_api';
import TrashIcon from 'src/icons/TrashIcon';
import Modal from 'src/components/common/Modal/Modal';
import { color } from 'src/styles/colors';
import Link from 'next/link';

interface IStudioProductsProps {
  data: NftStudioUnit[];
  refetch: () => void;
}

export default function StudioProducts({
  data,
  refetch,
}: IStudioProductsProps) {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState<
    IStudioProductsProps['data'][0] | null
  >(null);
  const handleDelete = async () => {
    await studioApi.deleteCreatedNft(currentItem.nftCreateUnitId).then(() => {
      refetch();
    });
    setCurrentItem(null);
    setShowDeleteModal(false);
  };
  return (
    <>
      <div
        css={[
          StudioProductsContainerCSS,
          css({ ...(data.length === 0 && { minHeight: 0 }) }),
        ]}
      >
        <p css={StudioProductsHeadCSS}>발행한 작품</p>
        {data.length > 0 ? (
          <div css={StudioProductsBodyCSS}>
            {data.map((item) => (
              <div
                key={`studio_product_${item.nftCreateUnitId}`}
                css={StudioProductItemCSS}
              >
                <div css={StudioProductItemImgWrapperCSS}>
                  {item.count !== 0 ? (
                    <Link href={`/read/${item.tokenId}`}>
                      <Image
                        alt="nft cover"
                        src={item.imagePath}
                        width={154}
                        height={217}
                      />
                    </Link>
                  ) : (
                    <Image
                      alt="nft cover"
                      src={item.imagePath}
                      width={154}
                      height={217}
                    />
                  )}

                  {item.count !== 0 && (
                    <button
                      type="button"
                      css={DeleteButtonCSS}
                      onClick={() => {
                        setCurrentItem(item);
                        setShowDeleteModal(true);
                      }}
                    >
                      <TrashIcon />
                    </button>
                  )}
                </div>
                <p css={StudioProductItemTitleCSS}>{item.name}</p>
                <p css={css({ marginTop: 4 })}>
                  카테고리: {item.category}
                  {item.theme ? `> ${item.theme}` : null}
                </p>
                <p css={css({ marginTop: 4 })}>재고: {item.count}</p>
                {item.count !== 0 && (
                  <div
                    css={css({
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: 10,
                      gap: 10,
                    })}
                  >
                    <p css={StudioProductItemPriceCSS}>
                      {addComma(item.price)}원
                    </p>
                    <Button
                      css={PriceEditButtonCSS}
                      onClick={() => setCurrentItem(item)}
                    >
                      가격수정
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div css={StudioProductsNotFoundCSS}>
            <Image
              alt="not found"
              src="/imgs/studio/img_404.svg"
              width={334}
              height={265}
            />
            <p>
              아직 발행한 작품이 없어요
              <br />
              멋진 작품을 업로드해보세요
            </p>
          </div>
        )}
      </div>
      <Modal
        isShow={showDeleteModal}
        title="작품을 삭제하시겠습니까?"
        description="작품 삭제 시, 판매된 작품은 제외하고 남은 모든 재고가 삭제되며, 이 작업은 취소할 수 없습니다."
        showLeftButton={false}
        rightText="삭제하기"
        rightButtonColor={color.red.main}
        onClickRight={handleDelete}
        onClose={() => {
          setCurrentItem(null);
          setShowDeleteModal(false);
        }}
      />
      {!showDeleteModal && currentItem && (
        <PriceInputModal
          isShow={true}
          price={currentItem.price}
          onCancel={() => setCurrentItem(null)}
          onConfirm={async (price) => {
            await studioApi.updatePrice(currentItem.nftCreateUnitId, price);
            refetch();
            setCurrentItem(null);
          }}
        />
      )}
    </>
  );
}
