import React from 'react';
import InstructionModal from 'src/components/common/Modal/InstructionModal';
import Modal from 'src/components/common/Modal/Modal';
import FindPassword from 'src/sections/FindPassword/FindPassword';
import { ModalTextCSS, ModalTitleCSS } from './Modal.styles';
import Password from '../Password';
import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { authApi } from 'src/services/auth_api';

export default function ResetPasswordModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // 1. cert: 본인인증
  // 2. reset: 비밀번호 재설정
  // 3. confirm: 비밀번호 재설정 확인
  // 4. complete: 비밀번호 재설정 완료
  const [step, setStep] = React.useState<
    'cert' | 'reset' | 'confirm' | 'complete'
  >('cert');
  const [phoneNumber, setPhoneNumber] = React.useState(undefined);
  const [sendNumber, setSendNumber] = React.useState<number>(null);
  const [confirmNumber, setConfirmNumber] = React.useState<number>(null);
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);
  if (step === 'cert') {
    return (
      <Modal
        isShow={isOpen}
        onClose={onClose}
        showLeftButton={false}
        onClickRight={() => {
          if (sendNumber === confirmNumber) {
            setStep('reset');
          } else {
            setError(true);
            setConfirmNumber(null);
          }
        }}
      >
        <p css={ModalTitleCSS}>비밀번호 재설정</p>

        <FindPassword
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          confirmNumber={confirmNumber}
          setConfirmNumber={setConfirmNumber}
          setSendNumber={setSendNumber}
          error={error}
          onFocus={() => setError(false)}
        />
      </Modal>
    );
  }
  if (step === 'complete') {
    return (
      <Modal
        isShow={isOpen}
        onClose={onClose}
        showLeftButton={false}
        onClickRight={onClose}
      >
        <p css={[ModalTitleCSS, css({ paddingBottom: 30 })]}>
          비밀번호 재설정 완료
        </p>
        <p css={ModalTextCSS}>
          비밀번호 재설정이 완료되었습니다.
          <br />
          다시 상품을 구매해주세요.
        </p>
      </Modal>
    );
  }
  if (step === 'confirm') {
    return (
      <InstructionModal open={isOpen} onClose={onClose}>
        <div css={css({ height: 10 })} />
        <Password
          text={
            error ? (
              <span
                css={css({
                  color: color.red.main,
                })}
              >
                비밀번호가 틀립니다
              </span>
            ) : (
              '확인을 위해 다시 입력해주세요'
            )
          }
          value={confirmPassword}
          setValue={(val) => {
            setConfirmPassword(val);
            if (val.length === 7) {
              if (password !== val) {
                setError(true);
              } else {
                const token = sessionStorage.getItem('accessToken');
                authApi.resetWalletPassword(token, password).then((res) => {
                  if (!res.success) {
                    alert('비밀번호 재설정에 실패했습니다');
                    setStep('reset');
                    setPassword('');
                    setConfirmPassword('');
                    return;
                  }
                  alert('비밀번호가 재설정되었습니다');
                  setStep('complete');
                });
              }
            } else {
              setError(false);
            }
          }}
          layout="small"
        />
        <div css={css({ height: 40 })} />
      </InstructionModal>
    );
  }
  return (
    <InstructionModal open={isOpen} onClose={onClose}>
      <div css={css({ height: 10 })} />
      <Password
        text="새로운 비밀번호를 입력해주세요"
        value={password}
        setValue={(val) => {
          setPassword(val);
          if (val.length === 7) {
            setPassword(val);
            setStep('confirm');
          }
        }}
        layout="small"
      />

      <div css={css({ height: 40 })} />
    </InstructionModal>
  );
}
