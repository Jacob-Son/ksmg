import Image from 'next/image';
import React from 'react';
import { addComma } from 'src/utils/format';
import {
  CombinationBtnCSS,
  ProductDescriptionCSS,
  ProductItemCSS,
  ProductItemImgWrapperCSS,
  ProductItemPriceCSS,
  ProductItemTitleCSS,
  ProductsBodyCSS,
  ProductsContainerCSS,
  ProductsHeadCSS,
  ProductsLengthCSS,
  ProductsNameCSS,
  ProductsNotFoundCSS,
  ThreeDotsDropdownCSS,
  ThreeDotsMenuCSS,
} from './Products.styles';
import { css } from '@emotion/react';
import Pagination from 'src/components/common/Pagination/Pagination';
import { useRouter } from 'next/router';
import { LibraryTabEnum } from 'src/pages/library';
import Button from 'src/components/common/Button/Button';
import { PaginationCSS } from '../library.styles';
import { NftStatus, SimpleNftType } from '~/types/nft';
import InstructionModal from 'src/components/common/Modal/InstructionModal';
import VerticalThreeDotIcon from 'src/icons/VerticalThreeDotIcon';
import Link from 'next/link';
import Dropdown from 'src/components/common/Dropdown/Dropdown';
import DropdownItem from 'src/components/common/Dropdown/DropdownItem';
import LoadingScreen from 'src/components/common/LoadingScreen/LoadingScreen';
import LoadingIcon from 'src/icons/LoadingIcon';
import Pending from 'src/sections/Pending';

interface IProductsProps {
  name: string;
  data?: {
    nfts: SimpleNftType[];
    totalCount: number;
    totalPage: number;
  };
  type: LibraryTabEnum;
  notFoundLayout: React.ReactNode;
  loading?: boolean;
}

export default function Products({
  name,
  data,
  type,
  notFoundLayout,
  loading,
}: IProductsProps) {
  const router = useRouter();
  const { query } = router;
  const { page } = query;
  const [currentItem, setCurrentItem] = React.useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = React.useState(false);

  const handleClickItem = (tokenId: string, status: NftStatus) => {
    if (type === LibraryTabEnum.LIBRARY) {
      if (status === NftStatus.SOLD_OUT) {
        setCurrentItem(tokenId);
        setConfirmModalOpen(true);
        return;
      } else {
        router.push(`/read/${tokenId}`);
      }
    } else if (type === LibraryTabEnum.LIKES) {
      router.push(`/store/${tokenId}`);
    }
  };
  return (
    <>
      <div
        css={[
          ProductsContainerCSS,
          css({ ...(data?.nfts.length === 0 && { minHeight: 0 }) }),
        ]}
      >
        <div css={ProductsHeadCSS}>
          <p css={ProductsNameCSS}>{name}</p>
          <p css={ProductsLengthCSS}>{data?.totalCount ?? 0}개</p>

          {type === LibraryTabEnum.LIBRARY && (
            <Button
              layout="contained"
              css={CombinationBtnCSS}
              onClick={() => {
                router.push('/combine');
              }}
            >
              시 조합
            </Button>
          )}
        </div>
        {loading ? (
          <Pending />
        ) : data?.nfts.length > 0 ? (
          <>
            <div css={ProductsBodyCSS}>
              {data.nfts.map((item) => (
                <div
                  key={`studio_product_${item.nftId}`}
                  css={ProductItemCSS}
                  onClick={() => {
                    handleClickItem(item.tokenId, item.status);
                  }}
                >
                  <div css={ProductItemImgWrapperCSS}>
                    <Image
                      alt="nft cover"
                      src={item.nftImagePath}
                      width={154}
                      height={217}
                    />
                    {type === LibraryTabEnum.LIBRARY && (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        css={ThreeDotsMenuCSS}
                      >
                        <VerticalThreeDotIcon />
                        <Dropdown css={ThreeDotsDropdownCSS}>
                          <DropdownItem>
                            <Link href={`/store/${item.tokenId}`}>
                              판매하기
                            </Link>
                          </DropdownItem>
                        </Dropdown>
                      </div>
                    )}
                  </div>
                  <p css={ProductDescriptionCSS}>
                    {item.theme ? item.theme : item.category}
                  </p>
                  <p css={ProductItemTitleCSS}>{item.name}</p>
                  {type === LibraryTabEnum.LIKES && (
                    <p
                      css={ProductItemPriceCSS}
                      style={{
                        opacity: item.price ? 1 : 0,
                      }}
                    >
                      <span>{addComma(item.price)}</span> 원
                    </p>
                  )}
                </div>
              ))}
            </div>
            <Pagination
              currentPage={Number(page || 1)}
              lastPage={data.totalPage}
              onClick={(val) => router.push({ query: { ...query, page: val } })}
              css={PaginationCSS}
            />
          </>
        ) : (
          <div css={ProductsNotFoundCSS}>{notFoundLayout}</div>
        )}
      </div>
      <InstructionModal
        open={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
      >
        <p css={css({ marginTop: 4, lineHeight: '130%', textAlign: 'center' })}>
          이 책을 읽게 되면,
          <br />
          구매가 자동으로 확정됩니다.
          <br />
          책을 읽어보시겠습니까?
        </p>
        <Button
          layout="contained"
          onClick={() => {
            router.push(`/read/${currentItem}`);
          }}
          css={css({
            marginTop: 40,
            width: '100%',
            height: 50,
          })}
        >
          책 읽으러가기
        </Button>
      </InstructionModal>
    </>
  );
}
