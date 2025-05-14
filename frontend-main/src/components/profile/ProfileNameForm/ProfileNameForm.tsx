import { css } from '@emotion/react';
import Image from 'next/image';
import React from 'react';
import Button from 'src/components/common/Button/Button';
import FormText from 'src/components/form/FormText';
import {
  FormContainerCSS,
  FormDescriptionCSS,
  InputFlexContainerCSS,
} from './ProfileNameForm.styles';
import { useProfileStore } from 'src/stores/profile/profile.store';
import TextField from 'src/components/common/TextField/TextField';

export default function ProfileNameForm({
  defaultName,
}: {
  defaultName: string;
}) {
  const {
    nickname,
    setNickname,
    isNicknameValid,
    setIsNicknameValid,
    checkNickname,
  } = useProfileStore((state) => ({
    nickname: state.nickname,
    setNickname: state.setNickname,
    isNicknameValid: state.isNicknameValid,
    setIsNicknameValid: state.setIsNicknameValid,
    checkNickname: state.checkNickname,
  }));

  React.useEffect(() => {
    if (defaultName) {
      setNickname(defaultName);
    }
  }, [defaultName]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let val = e.currentTarget.value;
    if (val.length >= 12) {
      val = val.slice(0, 12);
    }
    if (isNicknameValid) {
      setIsNicknameValid(undefined);
    }
    e.currentTarget.value = val;
    setNickname(val);
  };

  const checkNicknameDuplicate = async () => {
    if (!nickname) return;
    await checkNickname(nickname);
  };
  return (
    <div css={FormContainerCSS}>
      <FormText text="판매자명" required />
      <p css={FormDescriptionCSS}>12자 이내로 입력해주세요</p>
      <div css={InputFlexContainerCSS}>
        <TextField
          type="text"
          placeholder="입력해주세요"
          defaultValue={defaultName}
          onKeyDown={handleKeyDown}
          error={
            isNicknameValid === false
              ? '다른 사용자가 사용하는 판매자명입니다.'
              : undefined
          }
        />
        <Button
          layout="contained"
          onClick={checkNicknameDuplicate}
          endAdornment={
            isNicknameValid ? (
              <Image
                alt="checked"
                src="/icons/ic_checked_purple.svg"
                width={18}
                height={19}
                css={css({
                  marginLeft: 10,
                })}
              />
            ) : null
          }
          css={css({
            flexShrink: 0,
            padding: '10px 30px',
            lineHeight: '110%',
          })}
        >
          중복확인{isNicknameValid && <>&nbsp;완료</>}
        </Button>
      </div>
    </div>
  );
}
