import { IBase, Keys, MaybeNull, UUID } from '../utils.types';
import { ChatEntity, ChatMemberEntity } from './chat.types';

export interface MessageEntityBase {
  text?: string;
}
export interface MessageEntity extends IBase, MessageEntityBase {
  responseTo?: MessageEntity;
  responses?: MessageEntity[];

  sender: ChatMemberEntity;

  chat?: ChatEntity;

  replyTo?: ChatMemberEntity[];

  isPinnedFor?: MaybeNull<'all' | 'me'>;

  attachedFiles?: ChatMessageAttachedFiles;
  attachedRefs?: ChatMessageAttachedRefs;

  $fromType: Keys<Omit<ChatMemberEntity, '_id'>>;
}

export interface ChatMessageAttachedRefs {
  order?: string[];
  invoice?: string[];
  payment?: string[];
  delivery?: string[];
  refundRequest?: string[];
  refund?: string[];
  exchangeRequest?: string[];
  exchange?: string[];
  offer?: string[];
}

export interface ChatMessageAttachedFiles {
  voices?: string[];
  videos?: string[];
  audios?: string[];
  files?: string[];
}

export interface SendMessageDto {
  text: string;
  chatId: string;
  messageId?: string;
  receiverIds?: UUID[];

  attachedRefs?: ChatMessageAttachedRefs;
  attachedFiles?: ChatMessageAttachedFiles;
}
export interface UpdateMessageDto {
  read: boolean;
}
