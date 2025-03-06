import { useRouter } from 'next/router';
import Image from 'next/image';
import { useRef } from 'react';
import { IconButtonCSS } from '../Button/Button.styles';
import { SearchCSS, SearchInputCSS } from './Search.styles';
import { css } from '@emotion/react';
import { useResponsive } from 'src/hooks/common/useResponsive';
import XIcon from 'src/icons/XIcon';
import { color } from 'src/styles/colors';
import { HeaderLayoutEnum } from './Header.types';

export default function Search({
  layout = HeaderLayoutEnum.NORMAL,
  placeholder,
  position = 'header',
  onClose,
}: {
  layout?: HeaderLayoutEnum;
  placeholder?: string;
  position?: 'hamburger' | 'header';
  onClose?: () => void;
}) {
  const inputRef = useRef(null);
  const router = useRouter();
  const { query, isReady } = router;
  const { keyword } = query;
  const { isTablet, isDesktop } = useResponsive();
  const iconColor =
    layout === HeaderLayoutEnum.NORMAL
      ? color.icon.primary
      : color.icon.tertiary;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (position === 'hamburger' && onClose) {
        onClose();
      }
      router.push(`/category?keyword=${e.target.value}`);
    }
  };
  const handleClickSearch = () => {
    if (inputRef.current && inputRef.current.value) {
      router.push(`/category?keyword=${inputRef.current.value}`);
    }
  };

  const searchBtn = (
    <button
      type="button"
      onClick={handleClickSearch}
      css={[IconButtonCSS, css({ height: 18 })]}
    >
      <Image
        alt="search"
        src={
          layout === HeaderLayoutEnum.NORMAL
            ? '/icons/header/ic_search.svg'
            : '/icons/header/ic_search_gray.svg'
        }
        width={18}
        height={18}
      />
    </button>
  );
  return (
    <div css={SearchCSS(layout)}>
      {!isDesktop && searchBtn}
      {isReady && (
        <input
          type="text"
          defaultValue={keyword || null}
          ref={inputRef}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          css={SearchInputCSS}
        />
      )}
      {isDesktop && searchBtn}
      {isTablet && (
        <button type="button" css={IconButtonCSS} onClick={onClose}>
          <XIcon color={iconColor} />
        </button>
      )}
    </div>
  );
}
