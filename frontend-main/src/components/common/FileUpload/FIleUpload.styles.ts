import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export const FileUploadCSS = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 360,
  height: 473,
  boxSizing: 'border-box',
  border: `1px dashed ${color.icon.secondary}`,
  borderRadius: 12,
});

export const FileUploadTextsFlexCSS = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 20,
  gap: 8,
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '100%',
  letterSpacing: '-0.165px',
  color: color.text.secondary,

  '& span': {
    color: color.blue.main,
  },
});

export const FileUploadTitleCSS = css({
  fontSize: 18,
  lineHeight: '110%',
  color: color.text.primary,
});
