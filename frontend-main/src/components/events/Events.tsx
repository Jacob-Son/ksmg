import React from 'react';
import {
  EndedEventTagCSS,
  EventDurationCSS,
  EventNameCSS,
  EventTagCSS,
  EventsGridCSS,
  ImageAndTagContainerCSS,
  ImageWrapperCSS,
  TagLayerCSS,
} from './Events.styles';
import Image from 'next/image';
import dayjs from 'dayjs';
import { css } from '@emotion/react';
import Link from 'next/link';
import { EventType, IEvent } from '~/types/event';
import { color } from 'src/styles/colors';

interface IEventsProps {
  data: IEvent[];
}

export default function Events(props: IEventsProps) {
  const eventColor = (type: EventType) => {
    switch (type) {
      case EventType.CULURE:
        return color.purple;
      case EventType.EVENT:
        return '#F06CC3';
    }
  };
  return (
    <div css={EventsGridCSS}>
      {props.data.map((x) => (
        <Link
          key={`event_${x.eventId}`}
          href={`/events/${x.eventId}`}
          css={css({
            textDecoration: 'none',
            ...(!dayjs(x.endDay).isAfter(new Date())
              ? {
                  pointerEvents: 'none',
                }
              : {
                  cursor: 'pointer',
                }),
          })}
        >
          <div css={ImageAndTagContainerCSS}>
            <div css={ImageWrapperCSS}>
              {/* <Image src={x.imagePath} alt={x.imagePath} fill /> */}
              <Image 
              src={x.imagePath} 
              alt={x.imagePath} 
              width={700} // ✅ 너비 600px 적용
              height={200} // ✅ 높이 200px 적용
              objectFit="relative" // ✅ 비율 유지하면서 꽉 채우기
            />
            </div>
            <div css={TagLayerCSS(!dayjs(x.endDay).isAfter(new Date()))}>
              {dayjs(x.endDay).isAfter(new Date()) ? (
                <div
                  css={[
                    EventTagCSS,
                    css({ background: eventColor(x.eventType) }),
                  ]}
                >
                  <p>{x.eventType}</p>
                </div>
              ) : (
                <div css={EndedEventTagCSS}>
                  <p>마감된 이벤트</p>
                </div>
              )}
            </div>
          </div>
          <p css={EventNameCSS}>{x.title}</p>
          <p css={EventDurationCSS}>
            {dayjs(x.startDay).format('YYYY.MM.DD')} ~{' '}
            {dayjs(x.endDay).format(
              dayjs(x.startDay).year() === dayjs(x.endDay).year()
                ? 'MM.DD'
                : 'YYYY.MM.DD',
            )}
          </p>
        </Link>
      ))}
    </div>
  );
}
