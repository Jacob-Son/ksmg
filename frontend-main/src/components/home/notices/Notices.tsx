import { css } from '@emotion/react';
import React from 'react';
import TitleRow from 'src/components/common/TitleRow/TItleRow';
import {
  NoticeItemCSS,
  NoticeItemDateCSS,
  NoticeItemDescriptionCSS,
  NoticeItemTitleCSS,
  NoticesColumnCSS,
} from './Notices.styles';
import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import { IEvent } from '~/types/event';

interface INoticesProps {
  name: string;
  data: (IEvent & {
    href: string;
  })[];
}

export default function Notices({
  name,
  data,
}: INoticesProps): React.ReactElement {
  return (
    <div css={css({ flex: 1, width: '100%' })}>
      <TitleRow name={name} css={css({ padding: '12px 0' })} />
      <div css={NoticesColumnCSS}>
        {data.map((notice) => (
          <Link
            key={`notice item ${name} ${notice.eventId}`}
            href={notice.href}
            css={NoticeItemCSS}
          >
            <Image
              alt="notice image"
              src={notice.imagePath}
              width={700}
              height={200}
            />
            {/* <div>
              <div css={css({ display: 'flex', alignItems: 'center', gap: 8 })}>
                <p css={NoticeItemTitleCSS}>{notice.title}</p>
                <p css={NoticeItemDateCSS}>
                  {dayjs(notice.createdAt).format('YYYY.MM.DD')}
                </p>
              </div>
              <p css={NoticeItemDescriptionCSS}>{notice.description}</p>
            </div> */}
          </Link>
        ))}
      </div>
    </div>
  );
}
