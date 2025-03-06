import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const CheckAllSectionCSS = css({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '12px 0',
  borderBottom: `1px solid ${color.border.secondary}`,
  color: color.black[900],
  lineHeight: '130%',
  letterSpacing: '-0.165px',

  [mq.mobile]: {
    padding: '14px 0 0 0',
    border: 'none',
  },
});

export const InfoFlexCSS = css({
  display: 'flex',
  gap: 20,
  marginTop: 20,
  marginBottom: 80,

  [mq.mobile]: {
    flexDirection: 'column',
    gap: 10,
    marginTop: 12,
    marginBottom: 100,
  },
});

export const CartItemSectionCSS = css({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: 12,

  [mq.mobile]: {
    gap: 10,
  },
});

export const PriceSectionCSS = css({
  flex: 1,
  padding: 24,
  background: color.background.container.primary,
  borderRadius: 6,
  height: 'fit-content',
  letterSpacing: '-0.165px',

  [mq.mobile]: {
    padding: 0,
  },
});

export const SectionTitleCSS = css({
  color: color.text.neutral[7][100],
  fontSize: 22,
  fontWeight: 600,
  lineHeight: '100%',
  marginBottom: 16,
  paddingBottom: 16,
  borderBottom: `1px solid ${color.border.secondary}`,

  [mq.mobile]: {
    fontSize: 16,
  },
});

export const PriceRowCSS = css({
  padding: '13px 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  verticalAlign: 'middle',
});

export const TotalPriceCSS = css({
  fontSize: 16,
  fontWeight: 400,
  lineHeight: '100%',

  [mq.mobile]: {
    fontSize: 14,
    fontWeight: 300,
    lineHeight: '120%',

    '& span': {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '100%',
    },
  },
});

export const TotalPaymentPriceCSS = css({
  fontSize: 18,
  fontWeight: 600,
  lineHeight: '100%',

  '& span': {
    color: color.purple,
  },

  [mq.mobile]: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '130%',

    '& span': {
      fontSize: 22,
      fontWeight: 600,
      lineHeight: '100%',
    },
  },
});

export const DividerCSS = css({
  margin: '12px 0',
  borderBottom: `1px solid ${color.border.primary}`,

  [mq.mobile]: {
    margin: 0,
    borderBottom: `1px solid ${color.border.secondary}`,
  },
});

export const OrderButtonCSS = css({
  marginTop: 32,
  width: '100%',
  height: 57,
  background: color.background.container.black,
  fontSize: 18,
  fontWeight: 400,
  lineHeight: '140%',
});

export const PaymentMethodRowCSS = css({
  display: 'flex',
  alignItems: 'center',
  gap: 7,
  '& button': {
    flex: 1,
    height: 48,
  },
  '& button[aria-selected="false"]': {
    borderColor: color.line.secondary,
  },
  '& button[aria-selected="true"][aria-datatype="toss"]': {
    background: '#376FFF',
  },
});

export const CartNoticesCSS = css({
  marginTop: 16,
  paddingLeft: 20,
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  fontSize: 12,
  fontWeight: 300,
  lineHeight: '120%',
  letterSpacing: '-0.165px',
  color: color.text.secondary,
  '& li': {
    position: 'relative',
    listStyle: 'none',
  },
  '& li::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '-15px',
    transform: 'translateY(-50%)',
    width: 3,
    height: 3,
    borderRadius: '50%',
    backgroundColor: color.text.secondary,
  },

  [mq.mobile]: {
    marginTop: 20,
  },
});

export const OrderAllAgreeCSS = css({
  marginTop: 20,
  paddingBottom: 10,
  display: 'flex',
  gap: 6,
  fontSize: 14,
  lineHeight: '120%',
  letterSpacing: '-0.165px',
  borderBottom: `1px solid ${color.border.primary}`,

  '& p': {
    marginTop: 4,
  },

  [mq.mobile]: {
    marginTop: 10,
    paddingTop: 10,
    // borderTop: `2px solid ${color.border.secondary}`,
  },
});

export const OrderCheckListsCSS = css({
  marginTop: 10,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  fontSize: 12,
  lineHeight: '120%',
  letterSpacing: '-0.165px',
  listStyleType: 'none',
  padding: 0,
  '& li': {
    position: 'relative',
    display: 'flex',
    width: 'fit-content',
    alignItems: 'start',
    gap: 6,
  },
  '& li > input[type="checkbox"]': {
    transform: 'scale(0.9)',
    flexShrink: 0,
  },
  '& li > p': {
    marginTop: 4,
  },
  '& li > button': {
    marginTop: 4,
    padding: 0,
    width: 25,
    flexShrink: 0,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: 12,
    lineHeight: '120%',
    letterSpacing: '-0.165px',
    color: color.text.secondary,
  },
});

export const MobileButtonSectionCSS = css({
  position: 'fixed',
  bottom: 0,
  left: 0,
  padding: '12px 20px 20px 20px',
  width: '100%',
  boxSizing: 'border-box',
  background: '#fff',
  borderTop: `1px solid ${color.border.primary}`,
});

export const FullViewModalContentCSS = css({
  marginTop: 20,
  maxHeight: 400,
  overflowY: 'scroll',

  '& > p': {
    margin: '20px 0',
    fontWeight: 600,
  },
  '& > ol': {
    margin: 0,
    paddingLeft: 20,
  },
  '& ul': {
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    listStyleType: '"·  "',
  },
  '& ul > li': {
    position: 'relative',
    width: 'fit-content',
    alignItems: 'start',
    gap: 6,
  },
});
