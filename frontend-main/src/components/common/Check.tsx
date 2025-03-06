import { css } from '@emotion/react';
import React from 'react';

interface ICheckProps {
  checked: boolean;
  layout?: 'normal' | 'purple';
  uncheckedLayout?: 'check' | 'hollow';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: unknown;
}

export default function Check({
  checked,
  layout = 'normal',
  uncheckedLayout = 'check',
  onChange,
  ...props
}: ICheckProps) {
  if (layout === 'purple') {
    return (
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        css={PurpleInputCSS({ checked })}
        {...props}
      />
    );
  }
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      css={InputCSS({ checked, uncheckedLayout })}
      {...props}
    />
  );
}

const PurpleInputCSS = ({ checked }: { checked: boolean }) =>
  css({
    width: 24,
    height: 24,
    background: `url('/icons/combine/ic_checkbox_${
      checked ? 'checked' : 'unchecked'
    }.svg')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    appearance: 'none',
    margin: 0,
  });

const InputCSS = ({
  checked,
  uncheckedLayout,
}: {
  checked: boolean;
  uncheckedLayout: 'check' | 'hollow';
}) =>
  css({
    width: 24,
    height: 24,
    background: `url('/icons/ic_checkbox_${
      checked ? 'checked' : uncheckedLayout === 'check' ? 'unchecked' : 'hollow'
    }.svg')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    appearance: 'none',
    margin: 0,
  });
