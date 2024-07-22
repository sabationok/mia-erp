import { format } from 'date-fns';
import { styled } from 'styled-components';
import React from 'react';
import { Text } from '../../atoms/Text';
import FlexBox from 'components/atoms/FlexBox';
import { MessageEntity } from 'types/chat/chat-messages.type';
import { uk } from 'date-fns/locale';

export const ChatMessage = ({ msg, isRequest }: { msg: MessageEntity; isRequest?: boolean }) => {
  return (
    <MessageBox
      key={msg._id}
      padding={'8px'}
      gap={12}
      maxWidth={'80%'}
      alignSelf={isRequest ? 'flex-end' : 'flex-start'}
      $isRequest={isRequest}
    >
      <Text $align={'left'} $lineHeight={1.55} $weight={500}>
        {msg.text}
      </Text>

      <Text $align={isRequest ? 'right' : 'left'} $weight={500} $size={10}>
        {msg.createdAt ? format(new Date(msg.createdAt), 'dd.MM.yy hh:mm', { locale: uk }) : ''}
      </Text>
    </MessageBox>
  );
};

const MessageBox = styled(FlexBox)<{ $isRequest?: boolean }>`
  border-radius: 4px;
  border: 1px solid ${p => p.theme.modalBorderColor};
`;
