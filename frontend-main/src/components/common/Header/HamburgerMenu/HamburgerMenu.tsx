import { css } from '@emotion/react';
import React, { useEffect } from 'react';
import {
  HamburgerMenuCSS,
  HamburgerMenuNavListCSS,
} from './HamburgerMenu.styles';
import { IconButtonCSS } from '../../Button/Button.styles';
import XIcon from 'src/icons/XIcon';
import Link from 'next/link';
import Image from 'next/image';
import Search from '../Search';
import { navList } from '../Header.constants';
import Button from '../../Button/Button';
import { useUserStore } from 'src/stores/user/user.store';
import { useRouter } from 'next/router';
import { UserRole } from '~/types/user';
import { useCurrentAuction } from 'src/hooks/auction/useCurrentAuction';

interface IHamburgerMenuProps {
  show: boolean;
  onClose: () => void;
  checkLogin: (e) => void;
}

export default function HamburgerMenu({
  show,
  onClose,
  checkLogin,
}: IHamburgerMenuProps) {
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);
  const { user } = useUserStore();
  const { auction } = useCurrentAuction();

  const handleClickClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useEffect(() => {
    if (show) {
      setVisible(true);
    }
  }, [show]);
  if (!show) return null;

  return (
    <div
      css={[
        HamburgerMenuCSS,
        css({
          ...(visible && {
            left: 0,
          }),
          ...(!show && {
            display: 'none',
          }),
        }),
      ]}
    >
      <div css={css({ display: 'flex', alignItems: 'center', gap: 16 })}>
        <button type="button" onClick={handleClickClose} css={IconButtonCSS}>
          <XIcon />
        </button>
        <Link href="/">
          <Image
            alt="logo"
            src={'/icons/logo/ic_logo_purple.svg'}
            width={116}
            height={21.7}
          />
        </Link>
      </div>
      <div css={css({ marginTop: 24 })}>
        <Search
          placeholder="원하는 상품을 검색해보세요"
          position="hamburger"
          onClose={handleClickClose}
        />
      </div>
      {user && user?.name && (
        <div
          css={css({
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '0 10px',
            marginTop: 40,
          })}
          onClick={() => {
            router.push('/mypage');
          }}
        >
          <Image
            alt="profile"
            src={'/icons/header/ic_profile.svg'}
            width={32}
            height={32}
          />
          <p css={css({ fontSize: 22, fontWeight: 600, lineHeight: '100%' })}>
            {user?.name}님 안녕하세요
          </p>
        </div>
      )}
      <ul css={HamburgerMenuNavListCSS}>
        {navList.map((nav) => {
          const isCreator = user?.role !== UserRole.USER;
          if (nav.link === '/studio' && (!user || !isCreator)) return null;

          return (
            <li key={`hamburger_menu_nav_item_${nav.title}`}>
              <Link
                href={nav.title === '경매' ? `/auction/${auction}` : nav.link}
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

      {!user && (
        <Button
          layout="contained"
          css={css({ marginTop: 'auto' })}
          onClick={() => {
            router.push('/login');
          }}
        >
          로그인하기
        </Button>
      )}
    </div>
  );
}
