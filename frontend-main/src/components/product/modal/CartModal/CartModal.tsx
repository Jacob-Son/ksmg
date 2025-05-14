import { useResponsive } from 'src/hooks/common/useResponsive';
import AlertModal from 'src/components/common/Modal/AlertModal';
import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export default function CartModal({
  isShow,
  handleKeepShopping,
  handleGoToCart,
}: {
  isShow: boolean;
  handleKeepShopping: () => void;
  handleGoToCart: () => void;
}) {
  const { isMobile } = useResponsive();
  return (
    <AlertModal
      {...{
        [isMobile ? 'title' : 'description']:
          '선택한 상품이 장바구니에 담겼습니다.',
      }}
      isShow={isShow}
      cancelText={'쇼핑 계속하기'}
      confirmText={
        <span css={isMobile ? css({ color: color.purple }) : null}>
          장바구니 확인
        </span>
      }
      layout={isMobile ? 'normal' : 'desktop'}
      onCancel={handleKeepShopping}
      onConfirm={handleGoToCart}
    />
  );
}
