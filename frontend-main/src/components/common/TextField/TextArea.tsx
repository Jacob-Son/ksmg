import React, { useEffect } from 'react';
import { TextFieldInfoCSS } from './TextField.styles';
import { SerializedStyles } from '@emotion/react';
import { css as emotionCSS } from '@emotion/react';
import { color } from 'src/styles/colors';
import { TextAreaCSS } from './TextArea.styles';

interface ITextAreaProps {
  value?: string;
  placeholder?: string;
  showCount?: boolean;
  maxLength?: number;
  rows?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  checkError?: (value: string) => string | null;
  css?: SerializedStyles;
  width?: string | number;
  [key: string]: unknown;
}

const TextArea = React.forwardRef(function TextField(
  {
    value,
    placeholder,
    showCount = false,
    maxLength,
    rows = 1,
    onChange,
    checkError,
    css,
    width,
    ...rest
  }: ITextAreaProps,
  ref: React.ForwardedRef<HTMLTextAreaElement>,
) {
  const [val, setVal] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight + 4}px`;
    const errorMsg = checkError ? checkError(e.target.value) : null;
    if (errorMsg) {
      setError(errorMsg as string);
    } else {
      setError('');
    }
    setVal(e.target.value);
    onChange(e);
  };

  useEffect(() => {
    setVal(value);
  }, []);
  return (
    <div
      css={[
        css,
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
      <textarea
        ref={ref}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        onChange={handleChange}
        css={[TextAreaCSS, emotionCSS({ width })]}
        {...rest}
      />
      <div css={TextFieldInfoCSS}>
        {error && <p>{error}</p>}
        {showCount && (
          <p css={emotionCSS({ marginLeft: 'auto' })}>
            {val?.length || 0}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
});

export default TextArea;
