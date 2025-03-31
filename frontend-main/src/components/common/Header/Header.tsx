import React from 'react';
import Link from 'next/link';
import {
  CartLengthCSS,
  CartLinkCSS,
  HeaderCSS,
  HeaderLogoCSS,
  HeaderNavSectionCSS,
  HeaderSection2CSS,
  HeaderTitleCSS,
  HeaderWrapperCSS,
  ProfileCSS,
} from './Header.styles';
import { color } from 'src/styles/colors';
import Image from 'next/image';
import { useResponsive } from 'src/hooks/common/useResponsive';
import Search from './Search';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { navList } from './Header.constants';
import XIcon from 'src/icons/XIcon';
import { IconButtonCSS } from '../Button/Button.styles';
import HamburgerIcon from 'src/icons/HamburgerIcon';
import { HeaderLayoutEnum } from './Header.types';
import ProfileIcon from 'src/icons/ProfileIcon';
import BasketIcon from 'src/icons/BasketIcon';
import SearchIcon from 'src/icons/SearchIcon';
import ChevronLeftIcon from 'src/icons/ChevronLeftIcon';
import HamburgerMenu from './HamburgerMenu/HamburgerMenu';
import { useCart } from 'src/hooks/cart/useCart';
import useAccount from 'src/hooks/common/useAccount';
import { useAuthStore } from 'src/stores/auth/auth.store';
import { useUser } from 'src/hooks/mypage/useUser';
import { UserRole } from '~/types/user';
import { useCurrentAuction } from 'src/hooks/auction/useCurrentAuction';
import GoogleTranslate from '../../GoogleTranslate'


interface IHeaderProps {
  layout?: HeaderLayoutEnum;
  title?: string;
  showTitle?: boolean;
  showPrev?: boolean;
  onClickPrev?: () => void;
}

export default function Header({
  layout = HeaderLayoutEnum.NORMAL,
  title,
  showTitle = false,
  showPrev = true,
  onClickPrev,
}: IHeaderProps) {
  const router = useRouter();
  const { isMobile, isSmallTablet, isLargeTablet, isDesktop } = useResponsive();
  const [isShowSearch, setIsShowSearch] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { address } = useAccount();
  const { user } = useUser();
  const isSmallerThanST = isMobile || isSmallTablet;
  const iconColor =
    layout === HeaderLayoutEnum.NORMAL
      ? color.icon.primary
      : color.icon.tertiary;

  const { cart } = useCart(address);
  const { toggleLoginModal, setBeforeRoutePath } = useAuthStore();
  const { auction } = useCurrentAuction();

  const checkLogin = (e) => {
    if (!address) {
      e.preventDefault();
      e.stopPropagation();
      setBeforeRoutePath(router.asPath);
      toggleLoginModal();
      return;
    }
  };

  const logo = (
    <Link href="/" css={HeaderLogoCSS}>
      <Image
        alt="logo"
        src={
          layout === HeaderLayoutEnum.NORMAL
            ? '/icons/logo/ic_logo_purple.svg'
            : '/icons/logo/ic_logo_purple.svg'
        }
        width={isDesktop ? 139 : 116}
        height={isDesktop ? 26 : 21.7}
      />
    </Link>
  );
  const navSection = () => {
    const isCreator = user?.role !== UserRole.USER;
    return (
      <ul css={HeaderNavSectionCSS}>
        {navList.map((nav) => {
          if (nav.link === '/studio' && (!user || !isCreator)) return null;
          return (
            <li key={`header_nav_${nav.title}`}>
              <Link
                href={nav.title === '경매' ? `/auction/${auction}` : nav.link}
                css={css({
                  ...(router.pathname.includes(nav.link) && {
                    color: `${
                      layout === HeaderLayoutEnum.NORMAL
                        ? color.text.neutral[7][100]
                        : '#fff'
                    } !important`,
                  }),
                })}
                onClick={(e) => {
                  if (nav.link === '/auction' && !auction) {
                    e.preventDefault();
                    e.stopPropagation();
                    alert('진행중인 경매가 없습니다.');
                    return;
                  }
                  if (nav.link === '/library' || nav.link === '/studio') {
                    checkLogin(e);
                  }
                }}
              >
                {nav.title}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };
  const section2 = (
    <ul css={HeaderSection2CSS}>
      {!isDesktop && !isShowSearch && (
        <li>
          <button type="button" onClick={() => setIsShowSearch(true)}>
            <SearchIcon color={iconColor} />
          </button>
        </li>
      )}

      {/* Google Translate 추가 - 데스크탑에서만 표시 */}
      {isDesktop && (
        <li>
          <GoogleTranslate />
        </li>
      )}
      
      {!isSmallerThanST && (
        <li css={ProfileCSS}>
          <Link
            href="/mypage"
            onClick={(e) => {
              checkLogin(e);
            }}
          >
            {user?.userProfileUrl ? (
              <Image
                src={user.userProfileUrl}
                width={24}
                height={24}
                alt="user profile"
                css={css({
                  borderRadius: '50%',
                })}
              />
            ) : (
              <ProfileIcon color={iconColor} />
            )}
          </Link>
        </li>
      )}
      <li>
        <Link
          href="/order/cart"
          css={CartLinkCSS}
          onClick={(e) => {
            checkLogin(e);
          }}
        >
          <BasketIcon color={iconColor} />
          <p css={CartLengthCSS(layout)}>{cart?.length ?? 0}</p>
        </Link>
      </li>
    </ul>
  );

  if ((isSmallerThanST || showTitle) && typeof title !== 'undefined') {
    return (
      <header css={HeaderCSS(layout)}>
        <nav css={HeaderWrapperCSS}>
          {showPrev && (
            <button type="button" onClick={onClickPrev} css={IconButtonCSS}>
              <ChevronLeftIcon color={iconColor} />
            </button>
          )}
          <h1 css={HeaderTitleCSS(layout)}>{title}</h1>
        </nav>
      </header>
    );
  }

  if (isSmallerThanST && isShowSearch) {
    return (
      <header css={HeaderCSS(layout)}>
        <nav css={HeaderWrapperCSS}>
          <Search layout={layout} />

          <button
            type="button"
            css={IconButtonCSS}
            onClick={() => setIsShowSearch(false)}
          >
            <XIcon color={iconColor} />
          </button>
        </nav>
      </header>
    );
  }

  if (isLargeTablet && isShowSearch) {
    return (
      <header css={HeaderCSS(layout)}>
        <nav css={HeaderWrapperCSS}>
          <Search layout={layout} onClose={() => setIsShowSearch(false)} />
          {section2}
        </nav>
      </header>
    );
  }

  return (
    <>
      {isSmallerThanST && (
        <HamburgerMenu
          show={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          checkLogin={checkLogin}
        />
      )}
      <header css={HeaderCSS(layout)}>
        <nav css={HeaderWrapperCSS}>
          {isSmallerThanST && (
            <button
              type="button"
              css={IconButtonCSS}
              onClick={() => setIsMenuOpen(true)}
            >
              <HamburgerIcon color={iconColor} />
            </button>
          )}
          {logo}
          {isDesktop && <Search layout={layout} />}
          {navSection()}
          {section2}
        </nav>
      </header>
    </>
  );
}
