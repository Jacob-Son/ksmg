import React from 'react';
import InstructionModal from 'src/components/common/Modal/InstructionModal';
import Password from '../Password';
import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import {
  ButtonFlexCSS,
  FindPasswordButtonCSS,
} from './AuthenticateModal.styles';
import { authApi } from 'src/services/auth_api';

export default function AuthenticateModal({
  isOpen,
  onClose,
  onShowResetPassword,
  onComplete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onShowResetPassword: () => void;
  onComplete: () => void;
}) {
  // 2. password: 비밀번호 입력
  // 3. confirm: 비밀번호 확인
  const [step, setStep] = React.useState<'password' | 'confirm'>('password');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);
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
          setValue={async (val) => {
            setConfirmPassword(val);
            if (val.length === 7) {
              if (password !== val) {
                setError(true);
              } else {
                const token = sessionStorage.getItem('accessToken');
                authApi.checkPassword(token, password).then((res) => {
                  if (res.success) {
                    onComplete();
                    onClose();
                  } else {
                    setPassword('');
                    setConfirmPassword('');
                    alert('비밀번호가 틀립니다');
                    setStep('password');
                  }
                });
              }
            } else {
              setError(false);
            }
          }}
          layout="small"
        />
        <div css={ButtonFlexCSS}>
          <button
            type="button"
            css={FindPasswordButtonCSS}
            onClick={onShowResetPassword}
          >
            비밀번호를 잊어버리셨나요?
          </button>
        </div>
      </InstructionModal>
    );
  }
  return (
    <InstructionModal open={isOpen} onClose={onClose}>
      <div css={css({ height: 10 })} />
      <Password
        text="비밀번호를 입력해주세요"
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

      <div css={ButtonFlexCSS}>
        <button
          type="button"
          css={FindPasswordButtonCSS}
          onClick={onShowResetPassword}
        >
          비밀번호를 잊어버리셨나요?
        </button>
      </div>
    </InstructionModal>
  );
}
