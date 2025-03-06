import React from 'react';
import {
  DateCSS,
  SupportItemContentCSS,
  SupportListCSS,
} from './Supports.styles';
import dayjs from 'dayjs';
import { color } from 'src/styles/colors';
import { css } from '@emotion/react';
import parse from 'html-react-parser';
import SupportsHead from './SupportsHead';

interface ISupportsProps {
  title: string;
  description: string;
  showDate: boolean;
  contentTextColor?: string;
  returnUrl: string;
  data: {
    title: string;
    content: string;
    createdAt: Date;
  }[];
}

const ListItem = ({
  title,
  content,
  createdAt,
  contentTextColor = color.text.primary,
  showDate,
}: {
  title: string;
  content: string;
  createdAt: Date;
  contentTextColor: string;
  showDate: boolean;
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <li>
      <div
        css={css({
          padding: '16px 8px',
          cursor: 'pointer',
        })}
        onClick={() => setOpen((state) => !state)}
      >
        {showDate && (
          <p css={DateCSS}>{dayjs(createdAt).format('YYYY.MM.DD')}</p>
        )}
        <p css={css({ lineHeight: '130%' })}>{title}</p>
      </div>

      {open && (
        <div css={[SupportItemContentCSS, css({ color: contentTextColor })]}>
          {parse(content.replace(/\n/g, '<br/>'))}
        </div>
      )}
    </li>
  );
};

export default function Supports(props: ISupportsProps) {
  return (
    <>
      <SupportsHead
        title={props.title}
        description={props.description}
        returnUrl={props.returnUrl}
      />
      <ul css={SupportListCSS}>
        {props.data.map((item, idx) => (
          <ListItem
            key={`list item ${item.title} ${idx}`}
            title={item.title}
            content={item.content}
            createdAt={item.createdAt}
            contentTextColor={props.contentTextColor}
            showDate={props.showDate}
          />
        ))}
      </ul>
    </>
  );
}
