import { css } from '@emotion/react';
import React from 'react';
import { breakpoints, mediaQuery } from 'src/styles/mediaQuery';
import { contentMaxWidth } from '../store.styles';

function NftDetailInfo({
  detailImage,
  detailDescription,
}: {
  detailImage?: string;
  detailDescription?: string;
}) {
  return (
    <>
      {detailDescription && (
        <div css={css({ maxWidth: contentMaxWidth, margin: '0 auto' })}>
          <p
            css={css({
              color: '#252525',
              fontFamily: 'Pretendard',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '400',
              lineHeight: '160%',
              letterSpacing: '-0.165px',
            })}
          >
            {detailDescription.split('\\n').map((line, idx) => (
              <span key={idx}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
      )}
      {detailImage && (
        <div
          css={css({
            width: '100%',
            height: '100%',
            display: 'flex',
            maxWidth: contentMaxWidth,
            margin: '40px auto',
            justifyContent: 'center',
            alignItems: 'center',

            [mediaQuery.down(breakpoints.mb_600)]: {
              margin: '20px auto',
            },

            '& img': {
              width: '100%',
              height: '100%',
            },
          })}
        >
          <img src={detailImage} alt="detail" />
        </div>
      )}
    </>
  );
}

export default NftDetailInfo;
