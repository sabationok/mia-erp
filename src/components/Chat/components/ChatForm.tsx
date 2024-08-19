import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useRef } from 'react';
import { useAppDispatch } from '../../../redux/store.store';
import { FlexForm } from '../../atoms/FlexBox';
import InputText from '../../atoms/Inputs/InputText';
import { ChatWs } from '../../../socket';
import ButtonIcon from '../../atoms/ButtonIcon';
import { YUP } from 'validations';
import { sendChatMessageThunk } from '../../../redux/chat/chat.thunks';

interface ChatFormData {
  chatId: string;
  text: string;
}

const validation = YUP.object().shape({
  text: YUP.string().required(),
  chatId: YUP.string().uuid().required(),
});
const ChatForm = ({ chatId, onSubmit }: { chatId?: string; onSubmit?: (data: ChatFormData) => void }) => {
  const { watch, resetField, register, setValue, handleSubmit } = useForm<ChatFormData>({
    defaultValues: { chatId },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });
  // const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const typingRef = useRef<boolean>();
  const dispatch = useAppDispatch();
  const formValues = watch();

  // const setTyping = () => {
  //   clearTimeout(typingTimeoutRef.current);
  //   typingTimeoutRef.current = undefined;
  //   typingTimeoutRef.current = setTimeout(() => {
  //     ChatWs.handleTyping({
  //       data: { status: false, chatId: chatId ?? '' },
  //     });
  //
  //     typingTimeoutRef.current = undefined;
  //   }, 2000);
  // };

  useEffect(() => {
    if (chatId) {
      setValue('chatId', chatId);
    }
  }, [chatId, setValue]);

  return (
    <FlexForm
      padding={'8px 8px 16px'}
      fxDirection={'row'}
      gap={12}
      alignItems={'center'}
      onSubmit={handleSubmit(fData => {
        dispatch(
          sendChatMessageThunk({
            data: {
              data: { data: fData },
            },
            onSuccess: () => {
              resetField('text');
            },
          })
        );
      })}
    >
      <InputText
        $height={'100%'}
        {...register('text', {
          required: true,
          onChange: () => {
            if (!typingRef.current) {
              typingRef.current = true;
              ChatWs.handleTyping({
                data: { status: true, chatId: chatId ?? '' },
              });
            }
          },
          onBlur: () => {
            typingRef.current = false;
            ChatWs.handleTyping({
              data: { status: false, chatId: chatId ?? '' },
            });
          },
        })}
      ></InputText>

      <ButtonIcon type={'submit'} disabled={!formValues.text} variant={'filled'} sizeType={'middle'}>
        {'Send'}
      </ButtonIcon>
    </FlexForm>
  );
};

export default ChatForm;
