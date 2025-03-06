import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const PreviewContainerCSS = css({
  marginBottom: 36,
  padding: '16px 12px 14px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flex: 1,
  width: '100%',
  background: color.background.container.primary,
  border: `1px solid ${color.line.secondary}`,
  borderRadius: 6,
  boxSizing: 'border-box',

  [mq.mobile]: {
    marginBottom: 0,
  },
});

export const MainTextCSS = css({
  fontWeight: 600,
  lineHeight: 1,
});

export const SubTextCSS = css({
  marginTop: 8,
  color: color.text.secondary,
  fontSize: 14,
  lineHeight: 1.2,
});

export const ErrorTextCSS = css({
  marginTop: 4,
  color: color.red.main,
  fontSize: 14,
  lineHeight: 1.2,
});

export const AudioControlsCSS = css({
  display: 'none',
});
