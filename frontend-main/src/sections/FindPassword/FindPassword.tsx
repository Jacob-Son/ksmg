import React from 'react';
import TextField from 'src/components/common/TextField/TextField';
import { FormNameCSS } from 'src/components/mypage/Mypage.styles';
import {
  PhoneNumberFlexCSS,
  SendSMSButtonCSS,
  TextFieldCSS,
} from './FindPassword.styles';
import Button from 'src/components/common/Button/Button';
import { css } from '@emotion/react';
import { authApi } from 'src/services/auth_api';

export default function FindPassword({
  phoneNumber,
  confirmNumber,
  error = false,
  setPhoneNumber,
  setConfirmNumber,
  onFocus,
  setSendNumber,
  ...props
}: {
  phoneNumber?: string;
  confirmNumber: number;
  error: boolean;
  setPhoneNumber: (value: string) => void;
  setConfirmNumber: (value: number) => void;
  setSendNumber: (value: number) => void;
  onFocus: () => void;
  [key: string]: unknown;
}) {
  return (
    <div
      css={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      })}
      {...props}
    >
      <div>
        <p css={FormNameCSS}>핸드폰 번호</p>
        <div css={PhoneNumberFlexCSS}>
          <TextField
            placeholder="010-0000-0000"
            value={phoneNumber}
            onChange={(e) => {
              const value = e.target.value;

              if (value) {
                const val = value
                  .replace(/[^0-9]/g, '')
                  .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
                setPhoneNumber(val);
              }
            }}
            type="tel"
            maxLength={13}
            css={TextFieldCSS}
          />
          <Button
            layout="contained"
            css={SendSMSButtonCSS}
            onClick={async () => {
              function randomNum(lower: number, upper: number) {
                return Math.floor(Math.random() * (upper - lower + 1)) + lower;
              }
              const randomNumber = randomNum(100000, 999999);
              setSendNumber(randomNumber);
              await authApi.sendCertificationNumber(
                phoneNumber,
                randomNumber.toString(),
              );
              alert('인증번호가 전송되었습니다');
            }}
          >
            전송
          </Button>
        </div>
      </div>

      <div>
        <p css={FormNameCSS}>인증번호</p>
        <TextField
          placeholder="문자로 온 인증번호를 입력해주세요"
          value={confirmNumber}
          onChange={(e) => {
            setConfirmNumber(Number(e.target.value));
          }}
          onFocus={onFocus}
          type="number"
          css={[TextFieldCSS, css({ marginTop: 10 })]}
          error={error && '인증번호가 맞지 않습니다'}
        />
      </div>
    </div>
  );
}
