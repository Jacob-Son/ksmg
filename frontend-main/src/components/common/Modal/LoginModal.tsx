import { useAuthStore } from 'src/stores/auth/auth.store';
import AlertModal from './AlertModal';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { useResponsive } from 'src/hooks/common/useResponsive';

export default function LoginModal() {
  const router = useRouter();
  const { isMobile } = useResponsive();
  const { loginModalOpen, toggleLoginModal, setBeforeRoutePath } =
    useAuthStore();
  return (
    <AlertModal
      {...{
        [isMobile ? 'title' : 'description']: '로그인 후 이용하실 수 있습니다.',
      }}
      isShow={loginModalOpen}
      confirmText={
        <span css={isMobile ? css({ color: color.purple }) : null}>
          로그인하기
        </span>
      }
      layout={isMobile ? 'normal' : 'desktop'}
      isCloseButtonVisible={false}
      onCancel={toggleLoginModal}
      onConfirm={() => {
        setBeforeRoutePath(router.asPath);
        toggleLoginModal();
        router.push('/login');
      }}
    />
  );
}
