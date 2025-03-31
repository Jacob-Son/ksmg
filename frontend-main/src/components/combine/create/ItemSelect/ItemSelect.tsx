import React from 'react';
import { SimpleNftType } from '~/types/nft';
import {
  BodyCSS,
  ContainerCSS,
  HeadCSS,
  ItemImgWrapperCSS,
  ItemIndexCSS,
  ItemInfoCSS,
  ItemTextWrapperCSS,
  ItemTitleCSS,
  NotFoundCSS,
} from './ItemSelect.styles';
import Image from 'next/image';
import { css } from '@emotion/react';
import Check from 'src/components/common/Check';
import { color } from 'src/styles/colors';

interface IItemSelectProps {
  data: SimpleNftType[];
  selected: SimpleNftType[];
  setSelected: React.Dispatch<React.SetStateAction<SimpleNftType[]>>;
}

export default function ItemSelect({
  data,
  selected,
  setSelected,
}: IItemSelectProps) {
  if (data.length === 0) {
    return (
      <div css={NotFoundCSS}>
        <Image
          alt="not found"
          src="/imgs/combine/img_nfts_404.png"
          width={201}
          height={251}
        />
        <p
          css={css({
            marginTop: 40,
            marginBottom: 80,
            textAlign: 'center',
            lineHeight: '130%',
            color: '#fff',
          })}
        >
          아직 구매하신 상품이 없습니다.
          <br />
          한국장인인삼을 둘러보고 마음에 드는 상품을 찾아보실래요?
        </p>
      </div>
    );
  }
  return (
    <div css={ContainerCSS}>
      <div css={HeadCSS}>
        <p
          css={css({
            fontSize: 18,
            lineHeight: '120%',
            color: '#fff',
          })}
        >
          조합 가능 작품
        </p>
        <p
          css={css({
            color: color.text.secondary,
          })}
        >
          {data.length}개
        </p>

        <p css={css({ marginLeft: 'auto', color: color.purple })}>
          {selected.length}개 선택
        </p>
      </div>
      <div css={BodyCSS}>
        {data.map((item) => (
          <div key={`comb_item_${item.nftId}`}>
            <div css={ItemImgWrapperCSS}>
              <Check
                checked={selected.some((s) => s.nftId === item.nftId)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  if (checked) {
                    setSelected([...selected, item]);
                  } else {
                    setSelected(selected.filter((s) => s.nftId !== item.nftId));
                  }
                }}
                layout="purple"
                css={css({
                  position: 'absolute',
                  top: 9,
                  left: 9,
                })}
              />
              <Image
                alt="nft cover"
                src={item.nftImagePath}
                width={154}
                height={217}
                css={css({
                  ...(selected.some((s) => s.nftId === item.nftId) && {
                    opacity: 0.3,
                  }),
                })}
              />
              {selected.some((s) => s.nftId === item.nftId) && (
                <div css={ItemIndexCSS}>
                  <p>{selected.findIndex((s) => s.nftId === item.nftId) + 1}</p>
                </div>
              )}
            </div>
            <div css={ItemTextWrapperCSS}>
              <p css={ItemInfoCSS}>{item.theme ? item.theme : item.category}</p>
              <p css={ItemTitleCSS}>{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
