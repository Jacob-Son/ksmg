import { css } from '@emotion/react';
import React from 'react';
import { AlertModalBackdropCSS } from 'src/components/common/Modal/AlertModal.styles';
import ModalPortal from 'src/components/common/Portal';
import XIcon from 'src/icons/XIcon';
import {
  ModalBodyCSS,
  ModalTextCSS,
  ModalTitleCSS,
  WarningListCSS,
} from './CreateProfileModal.styles';
import Button from 'src/components/common/Button/Button';
import Check from 'src/components/common/Check';

export default function CreateProfileModal({
  show,
  onCancel,
  onConfirm,
}: {
  show: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const [isChecked, setIsChecked] = React.useState(false);
  const handleCancel = onCancel;

  if (!show) return null;
  return (
    <ModalPortal>
      <div css={AlertModalBackdropCSS} onClick={handleCancel} />
      <div css={ModalBodyCSS}>
        <div
          css={css({
            display: 'flex',
          })}
        >
          <button
            type="button"
            onClick={handleCancel}
            css={css({
              border: 'none',
              background: 'transparent',
              padding: 4,
              marginLeft: 'auto',
              height: 23,
            })}
          >
            <XIcon />
          </button>
        </div>
        <p css={ModalTitleCSS}>새 작품 등록 안내</p>
        <p css={[ModalTextCSS, css({ marginTop: 20 })]}>
          [작성안내]
          <br />
          모든 회원이 쾌적하고 안전하게 서비스를 이용할 수 있도록 작품을
          작성하실 때 아래 사항을 지켜주세요.
        </p>
        <ol css={WarningListCSS}>
          <li>
            저작권 등 다른 사람의 권리를 침해하거나 명예를 훼손하는 작품 혹은
            에피소드는 피카펜 이용약관 및 법률에 따라 제재를 받을 수 있습니다.
          </li>
          <li>
            아래 요소가 포함된 작품은 별도의 경고나 사전 통보없이 비공개 및 삭제
            처리될 수 있습니다.
            <br />- 비방, 욕설, 명예훼손
            <br />- 폭력, 비행 조장
            <br />- 음란물, 청소년 유해물, 성인물
            <br />- 사행심 조장
            <br />- 불법유통, 저작권 위반
            <br />- 기타
          </li>
          <li>
            피카펜은 등록된 작품이 다른 회원들에게 피해를 주지 않도록 엄격하게
            관리합니다. 해당 내용을 숙지하지않아 생기는 모든 불이익은 회원에게
            있습니다.
          </li>
          <li>
            피카펜 회원 탈퇴 시, 작성된 게시물은 삭제되지 않으므로 반드시 해지
            전 삭제하신 수 탈퇴하시기 바랍니다.
          </li>
          <li>
            작품 판매 시 플랫폼 수수료(3%) 부과됩니다. 플랫폼 수수료는 변동
            가능합니다.
          </li>
          <li>
            판매대금 정산 신청 시, 정산 수수료 2,000원이 우선적으로 부과됩니다.
          </li>
        </ol>
        <div
          css={css({
            margin: '50px 0',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          })}
        >
          <Check
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <p css={ModalTextCSS}>[필수] 피카펜 운영정책에 동의합니다. </p>
        </div>
        <Button
          layout="contained"
          onClick={onConfirm}
          css={css({ width: '100%' })}
          disabled={!isChecked}
        >
          동의하고 시작하기
        </Button>
      </div>
    </ModalPortal>
  );
}
