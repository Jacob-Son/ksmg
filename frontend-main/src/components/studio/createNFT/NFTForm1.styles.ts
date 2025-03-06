import { css } from '@emotion/react';
import { IconButtonCSS } from 'src/components/common/Button/Button.styles';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const NftAttributesFormGridCSS = css({
  marginTop: 20,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr auto',
  maxWidth: 643,
  gap: 10,

  '& > p': {
    fontWeight: 600,
    lineHeight: '100%',
    color: color.text.secondary,
  },

  '& input': {
    height: 60,
    boxSizing: 'border-box',
  },
  [mq.mobile]: {
    gap: '10px 4px',
  },
});

export const DeleteButtonCSS = [
  IconButtonCSS,
  css({
    padding: 8,
    marginLeft: -10,
    [mq.mobile]: {
      marginLeft: -4,
    },
  }),
];

export const AddAttributeButtonCSS = css({
  marginTop: 20,
  padding: 0,
  gap: 4,
  display: 'flex',
  alignItems: 'center',
  border: 'none',
  background: 'none',
  color: color.blue.main,
  fontSize: 18,
  lineHeight: '140%',
});
