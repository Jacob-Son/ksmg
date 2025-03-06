import React from 'react';
import { FormNameCSS, FormWrapperCSS } from '../mypage/Mypage.styles';
import TextField from '../common/TextField/TextField';
import { css } from '@emotion/react';
import AddressForm from '../mypage/address/AddressForm';
import { onlyNumber } from 'src/utils/format';

type Props = {
  name: string;
  phoneNumber: {
    first: string;
    second: string;
    third: string;
  };
  address: {
    zonecode: string;
    address: string;
    detailAddress: string;
  };
  setName: (name: string) => void;
  setPhoneNumber: (phoneNumber: {
    first: string;
    second: string;
    third: string;
  }) => void;
  setAddress: (address: {
    zonecode: string;
    address: string;
    detailAddress: string;
  }) => void;
};

export default function AddressSection({
  name,
  phoneNumber,
  address,
  setName,
  setPhoneNumber,
  setAddress,
}: Props) {
  const phoneNum2Ref = React.useRef<HTMLInputElement>(null);
  const phoneNum3Ref = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <div css={FormWrapperCSS}>
        <p css={FormNameCSS}>받으시는 분</p>
        <TextField
          placeholder="이름을 입력해주세요"
          css={css({ marginTop: 10 })}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div css={FormWrapperCSS}>
        <p css={FormNameCSS}>휴대폰번호</p>
        <div
          css={css({
            marginTop: 10,
            gap: 4,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
          })}
        >
          <TextField
            maxLength={3}
            value={phoneNumber.first}
            onChange={(e) => {
              const value = onlyNumber(e.target.value);
              if (value.length === 3) {
                phoneNum2Ref.current?.focus();
              }
              setPhoneNumber({ ...phoneNumber, first: value });
            }}
          />
          <TextField
            ref={phoneNum2Ref}
            maxLength={4}
            value={phoneNumber.second}
            onChange={(e) => {
              const value = onlyNumber(e.target.value);
              if (value.length === 4) {
                phoneNum3Ref.current?.focus();
              }
              setPhoneNumber({ ...phoneNumber, second: value });
            }}
          />
          <TextField
            ref={phoneNum3Ref}
            maxLength={4}
            value={phoneNumber.third}
            onChange={(e) => {
              const value = onlyNumber(e.target.value);
              setPhoneNumber({ ...phoneNumber, third: value });
            }}
          />
        </div>
      </div>

      <AddressForm address={address} setAddress={setAddress} />
    </>
  );
}
