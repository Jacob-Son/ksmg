import React from 'react';
import BookIcon from 'src/icons/library/BookIcon';
import { LibraryTabEnum, libraryTabs } from 'src/pages/library';
import { color } from 'src/styles/colors';
import { TabsFlexCSS } from './Tabs.styles';
import HeartIcon from 'src/icons/library/HeartIcon';
import BubbleIcon from 'src/icons/library/BubbleIcon';
import WalletIcon from 'src/icons/library/WalletIcon';

interface ITabsProps {
  currentTab: LibraryTabEnum;
  setCurrentTab: React.Dispatch<React.SetStateAction<LibraryTabEnum>>;
}

const TabIcon = ({
  tab = LibraryTabEnum.LIBRARY,
  isCurrent,
}: {
  tab?: LibraryTabEnum;
  isCurrent: boolean;
}) => {
  switch (tab) {
    case LibraryTabEnum.LIBRARY:
      return <BookIcon {...(isCurrent && { color: color.purple })} />;
    case LibraryTabEnum.LIKES:
      return <HeartIcon {...(isCurrent && { color: color.purple })} />;
    case LibraryTabEnum.COMMUNITY:
      return <BubbleIcon {...(isCurrent && { color: color.purple })} />;
    case LibraryTabEnum.SETTLE:
      return <WalletIcon {...(isCurrent && { color: color.purple })} />;
  }
};

export default function Tabs(props: ITabsProps) {
  return (
    <ul css={TabsFlexCSS}>
      {libraryTabs.map((tab) => (
        <li
          key={`library_tab_${tab.name}`}
          onClick={() => props.setCurrentTab(tab.value)}
          aria-current={props.currentTab === tab.value}
        >
          <TabIcon tab={tab.value} isCurrent={props.currentTab === tab.value} />
          <p>{tab.name}</p>
        </li>
      ))}
    </ul>
  );
}
