import { OrderEntity } from '../orders/orders.types';
import { IBase, OnlyUUID, UUID } from '../utils.types';
import { MessageEntity } from './chat-messages.type';

export * from './chat-messages.type';
export interface ChatEntityBase {
  text?: string;
}
export interface ChatEntity extends IBase, ChatEntityBase {
  members?: ChatMemberEntity[];

  order?: OrderEntity;

  messages?: MessageEntity[];

  saleOrder?: OrderEntity;
}

export interface ChatMemberEntity extends OnlyUUID {
  user?: OnlyUUID & { email?: string };
  integration?: OnlyUUID & { label?: string };
  customer?: OnlyUUID & { email?: string };
  bot?: OnlyUUID & { label?: string };
}

export interface ChatDto {
  orderId?: UUID;
  managerId?: UUID;
}
