import { css } from '@emotion/react';
import React from 'react';
import { SpinCSS } from 'src/components/common/LoadingScreen/LoadingScreen.styles';
import LoadingIcon from 'src/icons/LoadingIcon';
import { mq } from 'src/styles/mediaQuery';

export default function Pending() {
  return (
    <div
      css={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 400,
        paddingBottom: 400,
        [mq.mobile]: { height: 200, paddingBottom: 200 },
      })}
    >
      <div css={SpinCSS}>
        <LoadingIcon />
      </div>
    </div>
  );
}
