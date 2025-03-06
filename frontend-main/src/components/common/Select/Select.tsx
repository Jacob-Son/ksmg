import React, { useEffect } from 'react';
import {
  EndIconCSS,
  SelectCSS,
  SelectOptionsCSS,
  SelectWrapperCSS,
} from './Select.styles';

interface ISelectProps<T> {
  value: T | null;
  placeholder?: string;
  options?: { label: string; value: T }[];
  disabled?: boolean;
  endAdornment?: React.ReactNode;
  onChange: (value: T) => void;
  [key: string]: unknown;
}

export default function Select<T extends string | number>({
  value = null,
  placeholder = '',
  options,
  disabled = false,
  endAdornment,
  onChange,
  ...rest
}: ISelectProps<T>) {
  const [isOpen, setIsOpen] = React.useState(false);
  const valueLabel = options?.find((x) => x.value === value)?.label;

  useEffect(() => {
    if (window) {
      function listenClickOutside(e: MouseEvent) {
        const target = e.target as HTMLElement;
        if (target.closest('[data-role="selectbox"]')) {
          return;
        }
        setIsOpen(false);
      }
      window.addEventListener('click', listenClickOutside);
      return () => window.removeEventListener('click', listenClickOutside);
    }
  });
  return (
    <section data-role="selectbox" css={SelectWrapperCSS}>
      <button
        disabled={disabled}
        css={SelectCSS}
        onClick={() => setIsOpen(!isOpen)}
        {...rest}
      >
        {valueLabel || (placeholder && <span>{placeholder}</span>)}
        {endAdornment && <span css={EndIconCSS}>{endAdornment}</span>}
      </button>
      {isOpen && (
        <ul css={SelectOptionsCSS}>
          {options?.map((option) => (
            <li
              key={`select_${option.value}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              aria-selected={option.value === value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
