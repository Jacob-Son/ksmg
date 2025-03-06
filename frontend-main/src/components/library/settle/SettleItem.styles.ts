import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export const ItemContainerCSS = css({
  width: '100%',
  boxSizing: 'border-box',
  paddingLeft: 4,
});

export const DateRowCSS = css({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  fontSize: 14,
  lineHeight: '120%',
  color: color.text.secondary,

  '& p': {
    padding: '16px 0',
  },
});

export const DotCSS = css({
  width: 5,
  height: 5,
  borderRadius: '99px',
  backgroundColor: color.border.primary,
});

export const StatusTextCSS = css({
  fontSize: 14,
  lineHeight: '120%',
  color: color.purple,
});

export const NameAndPriceRowCSS = css({
  marginTop: 8,
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  width: '100%',
  boxSizing: 'border-box',
});

export const ItemNameCSS = css({
  fontSize: 18,
  fontWeight: 600,
  lineHeight: '110%',
});

export const TotalPriceCSS = css({
  marginLeft: 'auto',
  fontSize: 18,
  fontWeight: 600,
  lineHeight: '110%',
});

export const PriceInfoGridCSS = css({
  marginTop: 6,
  padding: '14px 10px',
  gap: 8,
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  borderRadius: 6,
  background: color.background.container.primary,
  fontSize: 14,
  lineHeight: '120%',
});

export const PriceTextCSS = css({
  textAlign: 'right',
});

export const ConfirmButtonCSS = css({
  borderRadius: 6,
  padding: '8px 12px',
  width: 'fit-content',
  height: 32,
  background: color.purple,
});

export const RefundButtonCSS = css({
  borderRadius: 6,
  padding: '8px 12px',
  width: 'fit-content',
  height: 32,
  color: color.red.main,
  border: `1px solid ${color.red.main}`,
});
