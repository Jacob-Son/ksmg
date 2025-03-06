import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';
import { maxWidth } from 'src/styles/styles';

export const FooterCSS = css({
  backgroundColor: color.background.footer,
  borderTop: `1px solid ${color.line.primary}`,
  display: 'flex',
  alignItems: 'center',
});

export const FooterBodyCSS = css({
  padding: '80px 70px 60px 70px',
  width: '100%',
  maxWidth: maxWidth,
  margin: '0 auto',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: 40,

  [mq.mobile]: {
    padding: '50px 24px 120px 24px',
  },
});

export const InfosFlexCSS = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,

  '& a': {
    fontSize: 14,
    lineHeight: '120%',
    color: color.text.secondary,
    textDecoration: 'none',
  },
});

export const TextCSS = css({
  fontSize: 14,
  lineHeight: '180%',
  color: color.text.secondary,
});

export const WarningCSS = css({
  lineHeight: '130%',
  color: color.text.secondary,
});

export const CopyrightCSS = css({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  lineHeight: '130%',
  color: color.text.secondary,

  [mq.mobile]: {
    color: color.text.primary,
  },
});

export const FooterSection2CSS = css({
  display: 'flex',
  alignItems: 'end',
  justifyContent: 'space-between',
  gap: 16,
  paddingBottom: 20,
  borderBottom: `1px solid ${color.line.primary}`,
});

export const SectionNameCSS = css({
  fontWeight: 600,
  lineHeight: '100%',
});

export const CustomerCenterLinksFlexCSS = css({
  display: 'flex',
  marginTop: 16,
  gap: 12,

  '& > a': {
    padding: '10px 20px',
    fontWeight: 600,
    lineHeight: '100%',
    background: color.icon.secondary,
    color: '#fff',
    textDecoration: 'none',
  },
});

export const FooterSection3CSS = css({
  display: 'flex',
  gap: 20,

  '& > div': {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
});

export const FooterSection4CSS = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
});
