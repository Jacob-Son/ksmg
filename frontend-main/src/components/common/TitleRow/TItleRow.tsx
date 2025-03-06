import React from 'react';
import { NavigatorCSS, SortTabCSS, TitleCSS } from './TitleRow.styles';
import { useResponsive } from 'src/hooks/common/useResponsive';
import { IconButtonCSS } from '../Button/Button.styles';
import Image from 'next/image';

interface ITitleRowProps {
  name: string;
  sort?: string;
  showNavigator?: boolean;
  currentIndex?: number;
  setCurrentIndex?: (val: number) => void;
  perPage?: number;
  total?: number;
  [key: string]: unknown;
}

export default function TitleRow({
  name,
  sort,
  showNavigator = false,
  currentIndex,
  setCurrentIndex,
  perPage,
  total,
  ...rest
}: ITitleRowProps) {
  const { isDesktop } = useResponsive();
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
      {...rest}
    >
      <p css={TitleCSS}>{name}</p>
      {sort && (
        <div css={SortTabCSS}>
          <p>{sort}</p>
        </div>
      )}
      {showNavigator && isDesktop && (
        <div css={NavigatorCSS}>
          <button
            type="button"
            onClick={() =>
              currentIndex > 0 && setCurrentIndex(currentIndex - 1)
            }
            css={IconButtonCSS}
          >
            <Image
              alt="left icon"
              src="/icons/ic_chevron_left.svg"
              width={20}
              height={20}
            />
          </button>
          <p>
            {currentIndex * perPage + 1}{' '}
            {perPage * (currentIndex + 1) > total ? (
              <span>- {total}</span>
            ) : (
              <>- {perPage * (currentIndex + 1)}</>
            )}
          </p>
          <button
            type="button"
            onClick={() =>
              perPage * (currentIndex + 1) + 1 <= total &&
              setCurrentIndex(currentIndex + 1)
            }
            css={IconButtonCSS}
          >
            <Image
              alt="right icon"
              src="/icons/ic_chevron_right.svg"
              width={20}
              height={20}
            />
          </button>
        </div>
      )}
    </div>
  );
}
