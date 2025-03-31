import React, { useEffect } from 'react';
import Footer from 'src/components/common/Footer/Footer';
import Header from 'src/components/common/Header/Header';
import { ContainerCSS } from './Layout.styles';
import { signOut, useSession } from 'next-auth/react';
import { authApi } from 'src/services/auth_api';
import { useUserStore } from 'src/stores/user/user.store';
import { HeaderLayoutEnum } from 'src/components/common/Header/Header.types';
import { useRouter } from 'next/router';
import Pending from 'src/sections/Pending';

interface ILayoutProps {
  title?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  headerLayout?: HeaderLayoutEnum;
  showTitle?: boolean;
  showHeader?: boolean;
  showPrev?: boolean;
  onClickPrev?: () => void;
  [key: string]: unknown;
  noFooter?: boolean;
}

export default function Layout({
  title,
  children,
  isLoading = false,
  headerLayout = HeaderLayoutEnum.NORMAL,
  showTitle = false,
  showHeader = true,
  showPrev = true,
  noFooter = false,
  onClickPrev,
  ...rest
}: ILayoutProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log("Access Token:", session?.accessToken);
  const { setUser } = useUserStore();
  const [render, setRender] = React.useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      sessionStorage.setItem('accessToken', (session as any).accessToken);
      authApi.signIn((session as any).accessToken).then((res) => {
        console.log("로그인 응답:", res); // 👀 응답 확인

        if (res.success) {
          if (res.data?.userInfo?.userAddress) {
            setUser(res.data?.userInfo ?? null);
          } else {
            // router.push('/set-user-info');
            console.warn("🚨 사용자 주소 없음! 추가 정보 필요:", res.data?.userInfo);
            router.push('/set-user-info'); // 🚨 여전히 필요하면 유지
          }
        } else {
          if (res.error === 'WALLET_ADDRESS_NOT_FOUND') {
            router.push('/set-user-info');
          } else {
            signOut();
          }
        }
        setRender(true);
      });
    } else if (status === 'unauthenticated') {
      setRender(true);
    }
  }, [status]);

  if (!render) return <Pending />;

  return (
    <>
      {showHeader && (
        <Header
          title={title}
          layout={headerLayout}
          showTitle={showTitle}
          showPrev={showPrev}
          onClickPrev={onClickPrev}
        />
      )}
      <div css={ContainerCSS} {...rest}>
        {isLoading ? <Pending /> : children}
      </div>
      {!noFooter && <Footer />}
    </>
  );
}
