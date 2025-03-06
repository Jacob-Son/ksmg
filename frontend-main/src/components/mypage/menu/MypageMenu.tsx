import Link from 'next/link';
import React from 'react';
import ChevronRightIcon from 'src/icons/ChevronRightIcon';
import {
  LinkItemCSS,
  LinkListCSS,
  MenuNameCSS,
  MenusContainerCSS,
} from './MypageMenu.styles';

interface IMypageMenuProps {
  name: string;
  list: {
    name: string;
    path: string;
  }[];
}

export default function MypageMenu(props: IMypageMenuProps) {
  return (
    <div css={MenusContainerCSS}>
      <p css={MenuNameCSS}>{props.name}</p>
      <div css={LinkListCSS}>
        {props.list.map((item) => (
          <Link
            key={`mypage_menu_item_${item.name}`}
            href={item.path}
            css={LinkItemCSS}
          >
            <p>{item.name}</p>
            <ChevronRightIcon />
          </Link>
        ))}
      </div>
    </div>
  );
}
