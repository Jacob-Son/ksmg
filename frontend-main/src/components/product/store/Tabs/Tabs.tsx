import { TabItemCSS, TabsContainerCSS } from './Tabs.styles';

interface ITabsProps {
  current: string;
  tabs: { value: string; label: string }[];
  onChange: (current: string) => void;
}

export default function Tabs(props: ITabsProps) {
  return (
    <div css={TabsContainerCSS}>
      {props.tabs.map((tab, i) => (
        <div
          css={TabItemCSS(props.current === tab.value)}
          key={`tab_${i}`}
          onClick={() => props.onChange(tab.value)}
        >
          <p>{tab.label}</p>
        </div>
      ))}
    </div>
  );
}
