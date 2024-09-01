import { ModalFormProps } from '../../ModalForm';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { useForm } from 'react-hook-form';
import InputLabel from '../../atoms/Inputs/InputLabel';
import { t } from '../../../i18e';
import InputText from '../../atoms/Inputs/InputText';
import {
  ChatIds,
  ExtServiceBase,
  Integration,
  IntegrationFormData,
  OutputIntegrationEntity,
} from '../../../types/integrations.types';
import FlexBox, { FlexForm } from '../../atoms/FlexBox';
import CustomSelect from '../../atoms/Inputs/CustomSelect';
import { useState } from 'react';
import ButtonIcon from '../../atoms/ButtonIcon';
import { Text } from '../../atoms/Text';
import { useAppDispatch } from '../../../redux/store.store';
import {
  createOutputIntegrationThunk,
  updateOutputIntegrationThunk,
} from '../../../redux/integrations/integrations.thunk';
import { toReqData } from '../../../utils';
import ModalBase from '../../atoms/Modal';
import ModalFooter from '../../atoms/Modal/ModalFooter';

export interface FormCreateOutputIntegrationProps extends Omit<ModalFormProps, 'onSubmit'> {
  onSubmit?: AppSubmitHandler<IntegrationFormData>;
  onSuccess?: (info: { data: OutputIntegrationEntity }) => void;
  service?: ExtServiceBase;
  conn?: OutputIntegrationEntity;
}

type ChatProviderKey = keyof ChatIds;
const FormCreateOutputIntegration: React.FC<FormCreateOutputIntegrationProps> = ({
  onSubmit,
  service,
  onSuccess,
  onClose,
  conn,
  ...p
}) => {
  const dispatch = useAppDispatch();
  const form = useForm<Integration.Output.FormData>({
    defaultValues: { ...conn },
  });
  const [inputValueByChatProvider, setInputValueByChatProvider] = useState<Record<ChatProviderKey | string, string>>({
    telegram: '',
  });
  const [isOpenChatIdInput, setIsOpenChatInput] = useState<Record<ChatProviderKey | string, boolean>>({
    telegram: false,
  });

  const onValid = ({ setAsDefault, ...data }: Integration.Output.FormData) => {
    const thunk = conn ? updateOutputIntegrationThunk : createOutputIntegrationThunk;

    dispatch(
      thunk({
        data: { data: { data: toReqData(data), params: { setAsDefault } } },
        onSuccess: data => {
          console.log('Form OUTPUT Integration | submit success', data);
          onSuccess && onSuccess(data);
          onClose && onClose();
        },
      })
    );
  };
  const setInputValueByProvider = (name: ChatProviderKey, value: string) => {
    setInputValueByChatProvider(p => ({ ...p, [name]: value }));
  };
  const fv = form.watch();
  const handleToggleInputStateByChatProvider = (name: ChatProviderKey) => {
    setIsOpenChatInput(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSetChatIdByProvider = (provider: ChatProviderKey) => {
    const inputValue = inputValueByChatProvider[provider];
    if (!inputValue) return;

    if (fv.chatIds) {
      const prevIds = fv.chatIds[provider] || [];
      const remove = () => prevIds?.filter(exist => exist !== inputValue);
      const add = () => prevIds?.concat([inputValue]);
      const currentIds = prevIds.includes(inputValue) ? remove() : add();
      form.setValue(`chatIds.${provider}`, currentIds);

      setInputValueByProvider(provider, '');
      handleToggleInputStateByChatProvider(provider);
    }
  };
  const handleDeleteChatIdByProvider = (provider: ChatProviderKey, chatId?: string | number) => {
    if (fv.chatIds && fv.chatIds[provider]) {
      const filtered = fv.chatIds[provider]?.filter(exist => exist !== chatId);
      form.setValue(`chatIds.${provider}`, [...(filtered ?? [])]);
    }
  };

  return (
    <ModalBase title={t(`${conn ? 'Edit' : 'Create new'} connection`)}>
      <FlexForm onSubmit={form.handleSubmit(onValid)}>
        <FlexBox padding={'0 8px 8px'} fillWidth>
          <InputLabel label={t('Label')}>
            <InputText placeholder={t('Label')} {...form.register('label')} />
          </InputLabel>

          <CustomSelect label={t('Select role')} placeholder={'Select role'} />

          <InputLabel label={t('Expired at')}>
            <InputText placeholder={t('Expired at')} type={'datetime-local'} {...form.register('expireAt')} />
          </InputLabel>

          <InputLabel label={t('Redirect base url')}>
            <InputText placeholder={t('https://')} {...form.register('redirectBaseUrl')} />
          </InputLabel>

          <InputLabel label={t('Comment')}>
            <InputText placeholder={t('Comment')} {...form.register('description')} />
          </InputLabel>

          <FlexBox fillWidth>
            <InputLabel label={t('Telegram chat ids') + ' | ' + t('IN DEV')}>
              <FlexBox fxDirection={'row'} flexWrap={'wrap'} padding={'2px 0'} gap={4}>
                {fv.chatIds?.telegram?.map(chadIt => {
                  return (
                    <FlexBox
                      padding={'4px 8px'}
                      key={`chat_id_${chadIt}`}
                      fxDirection={'row'}
                      gap={6}
                      alignItems={'center'}
                      borderRadius={'4px'}
                      border={'1px solid lightgrey'}
                    >
                      <Text>{chadIt}</Text>

                      <ButtonIcon
                        variant={'onlyIcon'}
                        size={'14px'}
                        icon={'close'}
                        onClick={() => {
                          handleDeleteChatIdByProvider('telegram', chadIt);
                        }}
                      />
                    </FlexBox>
                  );
                })}
              </FlexBox>
            </InputLabel>

            {isOpenChatIdInput.telegram && (
              <InputLabel label={t('Add Telegram chat id')}>
                <InputText
                  placeholder={t('Enter Telegram chat id')}
                  value={inputValueByChatProvider.telegram}
                  name={'telegram'}
                  autoFocus
                  onChange={({ target }) => {
                    setInputValueByProvider('telegram', target.value);
                  }}
                />
              </InputLabel>
            )}

            <FlexBox fxDirection={'row'} fillWidth gap={4} justifyContent={'flex-end'} padding={'8px 0 0'}>
              {!isOpenChatIdInput.telegram ? (
                <ButtonIcon
                  variant={'outlinedSmall'}
                  disabled
                  onClick={() => {
                    handleToggleInputStateByChatProvider('telegram');
                  }}
                >
                  {t('Add')}
                </ButtonIcon>
              ) : (
                <>
                  <ButtonIcon
                    variant={'outlinedSmall'}
                    onClick={() => {
                      handleToggleInputStateByChatProvider('telegram');
                    }}
                  >
                    {t('Reject')}
                  </ButtonIcon>
                  <ButtonIcon
                    variant={'filledSmall'}
                    onClick={() => {
                      handleSetChatIdByProvider('telegram');
                    }}
                  >
                    {t('Accept')}
                  </ButtonIcon>
                </>
              )}
            </FlexBox>
          </FlexBox>
        </FlexBox>

        <ModalFooter />
      </FlexForm>
    </ModalBase>
  );
};

export default FormCreateOutputIntegration;
