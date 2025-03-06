import { css } from '@emotion/react';
import React from 'react';
import { TextFieldCSS } from 'src/components/common/TextField/TextField.styles';
import { color } from 'src/styles/colors';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import { FormNameCSS, FormWrapperCSS } from '../Mypage.styles';
import Button from 'src/components/common/Button/Button';
import TextField from 'src/components/common/TextField/TextField';
import ModalPortal from 'src/components/common/Portal';

type TAddress = {
  zonecode: string | null;
  address: string | null;
  detailAddress: string | null;
};

export default function AddressForm({
  theme = 'normal',
  address,
  setAddress,
  ...rest
}: {
  theme?: 'normal' | 'dark';
  address: TAddress;
  setAddress: React.Dispatch<React.SetStateAction<TAddress>>;
  [key: string]: unknown;
}) {
  const [isPostcodeOpen, setIsPostcodeOpen] = React.useState(false);
  const handleClickSearchAddress = () => setIsPostcodeOpen(true);
  const handleCompletePostcode = (data: Address) => {
    if (data) {
      setAddress({
        ...address,
        zonecode: data.zonecode,
        address: data.address,
      });
    }
  };

  return (
    <>
      <div css={FormWrapperCSS} {...rest}>
        <p css={FormNameCSS}>주소</p>
        <div
          css={css({
            marginTop: 10,
            gap: 10,
            display: 'flex',
            flexDirection: 'column',
          })}
        >
          <div css={css({ display: 'flex', alignItems: 'center', gap: 4 })}>
            <div
              css={AddressFieldCSS({
                theme,
                disabled: address.address === null,
              })}
            >
              {address.zonecode && <p>{address.zonecode}</p>}
            </div>
            <Button
              onClick={handleClickSearchAddress}
              css={ButtonCSS({ theme })}
            >
              우편번호 검색
            </Button>
          </div>
          <div
            css={AddressFieldCSS({
              theme,
              disabled: address.address === null,
            })}
          >
            {address.address && <p>{address.address}</p>}
          </div>
          <TextField
            value={address.detailAddress}
            placeholder="상세 주소를 입력해주세요"
            onChange={(e) => {
              setAddress({
                ...address,
                detailAddress: e.target.value,
              });
            }}
          />
        </div>
      </div>
      {/* postcode */}
      {isPostcodeOpen && (
        <ModalPortal>
          <div css={PostcodePopupCSS}>
            <DaumPostcodeEmbed
              onComplete={handleCompletePostcode}
              onClose={() => setIsPostcodeOpen(false)}
              style={{ width: '100vw', height: '100vh' }}
            />
          </div>
        </ModalPortal>
      )}
    </>
  );
}

export const AddressFieldCSS = ({
  disabled,
  theme,
}: {
  disabled: boolean;
  theme: 'normal' | 'dark';
}) => [
  TextFieldCSS,
  css({
    height: 60,
    ...(disabled && {
      background: color.background.container.primary,
    }),
    ...(theme === 'dark' && {
      background: color.background.container.charcoal,
      color: '#fff',
      border: 'none',
    }),
    display: 'flex',
    alignItems: 'center',
  }),
];

export const ButtonCSS = ({ theme }: { theme: 'normal' | 'dark' }) =>
  css({
    width: 120,
    flexShrink: 0,
    ...(theme === 'dark' && {
      background: color.purple,
      color: '#fff',
    }),
  });

export const PostcodePopupCSS = css({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 10,
});
