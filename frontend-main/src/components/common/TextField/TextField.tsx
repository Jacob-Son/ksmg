import React, { useEffect } from 'react';
import { TextFieldCSS, TextFieldInfoCSS } from './TextField.styles';
import { css as emotionCSS } from '@emotion/react';
import { color } from 'src/styles/colors';

interface ITextFieldProps {
  value?: string;
  type?: HTMLInputElement['type'];
  placeholder?: string;
  showCount?: boolean;
  min?: number;
  max?: number;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkError?: (value: string) => string | null;
  error?: string;
  width?: string | number;
  [key: string]: unknown;
}

const TextField = React.forwardRef(function TextField(
  {
    value,
    type = 'text',
    placeholder,
    showCount = false,
    min,
    max,
    maxLength,
    onChange,
    checkError,
    error,
    width,
    ...rest
  }: ITextFieldProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const [val, setVal] = React.useState<string>('');
  const [errorMsg, setErrorMsg] = React.useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let targetVal = e.target.value;
    const error = checkError ? checkError(targetVal) : null;
    if (error) {
      setErrorMsg(error as string);
    } else {
      setErrorMsg('');
    }
    if (type === 'number') {
      targetVal = `${Number(e.target.value)}`;
      e.target.value = targetVal;
    }
    setVal(targetVal);
    onChange && onChange(e);
  };

  useEffect(() => {
    setVal(value);
  }, []);
  useEffect(() => {
    if (error) {
      setErrorMsg(error);
    }
  }, [error]);
  return (
    <div
      css={[
        emotionCSS({
          width,
          ...(error && {
            '& p': {
              color: `${color.red.main} !important`,
            },
            '& input': {
              borderColor: color.red.main,
            },
          }),
        }),
      ]}
    >
      <input
        ref={ref}
        value={value}
        type={type}
        placeholder={placeholder}
        min={min}
        max={max}
        maxLength={maxLength}
        onChange={handleChange}
        css={[TextFieldCSS, emotionCSS({ width })]}
        {...rest}
      />
      <div css={TextFieldInfoCSS}>
        {errorMsg && <p>{errorMsg}</p>}
        {showCount && (
          <>
            {type === 'number' && (
              <p css={emotionCSS({ marginLeft: 'auto' })}>
                {Number(val) || 0}/{max}
              </p>
            )}
            {type === 'text' && (
              <p css={emotionCSS({ marginLeft: 'auto' })}>
                {val?.length || 0}/{maxLength}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
});

export default TextField;
