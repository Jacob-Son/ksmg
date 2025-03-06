import React from 'react';
import {
  OrderTabItemCSS,
  OrderTabNumberCSS,
  OrderTabsContainerCSS,
} from './OrderTabs.styles';

interface IOrderTabsProps {
  status: EOrderTabStatus;
}

export enum EOrderTabStatus {
  Cart = 'cart',
  InProgress = 'inprogress',
  Completed = 'completed',
}

const tabs = [
  {
    label: '장바구니',
    value: EOrderTabStatus.Cart,
  },
  {
    label: '주문결제',
    value: EOrderTabStatus.InProgress,
  },
  {
    label: '주문완료',
    value: EOrderTabStatus.Completed,
  },
];

export default function OrderTabs(props: IOrderTabsProps) {
  return (
    <div css={OrderTabsContainerCSS}>
      {tabs.map((tab, i) => (
        <div key={tab.value} css={OrderTabItemCSS(props.status === tab.value)}>
          <p css={OrderTabNumberCSS(props.status === tab.value)}>{i + 1}</p>
          <p>{tab.label}</p>
        </div>
      ))}
    </div>
  );
}
