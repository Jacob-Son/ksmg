import { css } from '@emotion/react';
import React from 'react';
import { color } from 'src/styles/colors';

export default function FormText({
  text,
  subText,
  description,
  required = false,
  endAdornment,
  ...rest
}: {
  text: string;
  subText?: string;
  description?: React.ReactNode;
  required?: boolean;
  endAdornment?: React.ReactNode;
  [key: string]: unknown;
}) {
  return (
    <div {...rest}>
      <div css={css({ display: 'flex', alignItems: 'center', gap: 4 })}>
        <p
          css={css({
            fontSize: 22,
            fontWeight: 600,
            lineHeight: '100%',
            letterSpacing: '-0.165px',
          })}
        >
          {text}
          {required && <span css={css({ color: color.purple })}>*</span>}
        </p>
        {subText && (
          <p
            css={css({
              fontSize: 16,
              fontWeight: 600,
              lineHeight: '100%',
              letterSpacing: '-0.165px',
              color: color.text.secondary,
            })}
          >
            {subText}
          </p>
        )}
        {endAdornment && endAdornment}
      </div>
      {description && (
        <p
          css={css({
            marginTop: 10,
            lineHeight: '130%',
            letterSpacing: '-0.165px',
            color: color.text.secondary,
          })}
        >
          {description}
        </p>
      )}
    </div>
  );
}
