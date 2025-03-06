import React from 'react';
import {
  ButtonsGridCSS,
  DotsFlexCSS,
  InputButtonCSS,
  PasswordContainerCSS,
  PasswordDotCSS,
  PasswordInputTextCSS,
} from './Password.styles';
import ArrowLeftIcon from 'src/icons/ArrowLeftIcon';
import { css } from '@emotion/react';

export default function Password({
  text,
  value,
  layout = 'default',
  setValue,
}: {
  text: React.ReactNode;
  value: string;
  layout?: 'default' | 'small';
  setValue: (value: string) => void;
}) {
  const ButtonCSS = [
    InputButtonCSS,
    css({
      ...(layout === 'small' && {
        width: 60,
        height: 60,
        fontSize: 23,
      }),
    }),
  ];
  const handleAddValue = (newValue: string) => {
    if (value.length < 7) {
      setValue(value + newValue);
    }
  };
  const handleRemoveValue = () => {
    if (value.length > 0) {
      setValue(value.slice(0, value.length - 1));
    }
  };
  return (
    <div css={PasswordContainerCSS}>
      <p css={PasswordInputTextCSS}>{text}</p>
      <div css={DotsFlexCSS}>
        {Array.from({ length: 7 }).map((_, i) => (
          <div css={PasswordDotCSS(i < value.length)} key={`password_${i}`} />
        ))}
      </div>

      <div css={ButtonsGridCSS}>
        {Array.from({ length: 9 }).map((_, i) => (
          <button
            type="button"
            key={`password_button_${i + 1}`}
            css={ButtonCSS}
            onClick={() => handleAddValue(`${i + 1}`)}
          >
            {i + 1}
          </button>
        ))}
        <div />
        <button
          type="button"
          css={ButtonCSS}
          onClick={() => handleAddValue('0')}
        >
          0
        </button>
        <button type="button" css={ButtonCSS} onClick={handleRemoveValue}>
          <ArrowLeftIcon />
        </button>
      </div>
    </div>
  );
}
