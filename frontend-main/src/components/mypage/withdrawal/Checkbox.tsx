import { css } from '@emotion/react';
import React from 'react';
import Check from 'src/components/common/Check';
import { color } from 'src/styles/colors';

export default function Checkbox({
  text,
  checked,
  onChange,
}: {
  text: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div css={css({ display: 'flex', alignItems: 'center', gap: 9 })}>
      <Check checked={checked} onChange={onChange} uncheckedLayout="hollow" />
      <p css={css({ fontSize: 14, lineHeight: '120%' })}>
        {text}
        <span css={css({ color: color.purple })}>*</span>
      </p>
    </div>
  );
}
