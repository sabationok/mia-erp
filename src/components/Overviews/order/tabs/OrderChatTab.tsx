import Chat from '../../../Chat/Chat';
import { OrderOverviewTabProps } from './types';
import React from 'react';

export const OrderChatTab = ({ order }: OrderOverviewTabProps) => {
  return <Chat orderId={order?._id}></Chat>;
};
