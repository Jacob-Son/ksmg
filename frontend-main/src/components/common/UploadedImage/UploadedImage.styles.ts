import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export const UploadedImageFlexCSS = css({
  display: 'flex',
  position: 'relative',
});

export const UploadedImageContainerCSS = css({
  marginTop: 5.7,
  borderRadius: 3.228,
  position: 'relative',
  overflow: 'hidden',
  background: color.skeleton,
  border: `1px solid ${color.line.primary}`,
  boxSizing: 'border-box',
});

export const DeleteButtonCSS = css({
  position: 'absolute',
  right: -12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 30,
  height: 30,
  background: color.icon.primary,
  borderRadius: '50%',
  border: 'none',
});
