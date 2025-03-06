import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const FormContainerCSS = css({
  flex: 1,
  [mq.mobile]: {
    width: '100%',
  },
});

export const FormDescriptionCSS = css({
  marginTop: 10,
  color: color.text.secondary,
  fontSize: 18,
  lineHeight: '140%',
});

export const InputFlexContainerCSS = css({
  marginTop: 20,
  gap: 20,
  display: 'flex',
  alignItems: 'center',

  [mq.mobile]: {
    gap: 10,
  },
});
