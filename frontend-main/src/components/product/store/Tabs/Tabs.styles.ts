import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const TabsContainerCSS = css({
  marginBottom: 20,
  display: 'flex',
  gap: 80,
  alignItems: 'center',
  width: '100%',
  borderBottom: `1px solid ${color.border.primary}`,

  [mq.mobile]: {
    gap: 20,
  },
});

export const TabItemCSS = (isCurrent: boolean) =>
  css({
    marginBottom: '-1px',
    padding: '0 4px',
    borderBottom: `1px solid ${isCurrent ? color.icon.primary : 'transparent'}`,
    fontSize: 17,
    fontWeight: 600,
    lineHeight: '260%',
    letterSpacing: '-0.165px',
    color: isCurrent ? color.text.primary : color.text.secondary,

    [mq.mobile]: {
      fontSize: 15,
    },
  });
