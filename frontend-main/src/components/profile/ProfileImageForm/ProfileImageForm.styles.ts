import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const ContainerCSS = css({
  [mq.mobile]: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export const ImageFormContainerCSS = css({
  display: 'flex',
  alignItems: 'end',
});

export const ProfileImageSkeletonCSS = css({
  width: 225,
  height: 225,
  border: `1px solid ${color.line.primary}`,
  borderRadius: '50%',
  background: color.background.container.primary,
});

export const IconButtonCSS = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  background: color.icon.primary,
  borderRadius: '50%',
  border: 'none',
});
