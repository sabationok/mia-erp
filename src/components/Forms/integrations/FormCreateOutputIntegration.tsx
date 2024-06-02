import ModalForm, { ModalFormProps } from '../../ModalForm';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { useForm } from 'react-hook-form';
import InputLabel from '../../atoms/Inputs/InputLabel';
import { t } from '../../../lang';
import InputText from '../../atoms/Inputs/InputText';
import {
  ChatIds,
  CreateIntegrationFormData,
  CreateOutputIntegrationFormData,
  ExtServiceBase,
  OutputIntegrationBase,
} from '../../../types/integrations.types';
import FlexBox from '../../atoms/FlexBox';
import CustomSelect from '../../atoms/Inputs/CustomSelect/CustomSelect';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { AppModuleName } from '../../../redux/reduxTypes.types';
import { useEffect, useState } from 'react';
import ButtonIcon from '../../atoms/ButtonIcon';
import { Text } from '../../atoms/Text';

export interface FormCreateOutputIntegrationProps extends Omit<ModalFormProps, 'onSubmit'> {
  onSubmit?: AppSubmitHandler<CreateIntegrationFormData>;
  onSuccess?: (info: { data: OutputIntegrationBase }) => void;
  service?: ExtServiceBase;
}
type ChatProviderKey = keyof ChatIds;
const FormCreateOutputIntegration: React.FC<FormCreateOutputIntegrationProps> = ({
  onSubmit,
  service,
  onSuccess,
  onClose,
  ...p
}) => {
  const form = useForm<CreateOutputIntegrationFormData>();
  const intServ = useAppServiceProvider()[AppModuleName.integrations];
  const [inputValueByChatProvider, setInputValueByChatProvider] = useState<Record<ChatProviderKey, string | number>>({
    telegram: '',
  });

  const [isOpenChatIdInput, setIsOpenChatInput] = useState<Record<ChatProviderKey, boolean>>({ telegram: false });

  const onValid = (data: CreateIntegrationFormData) => {
    intServ.createOutput({
      onSuccess: data => {
        console.log('Form Create OUTPUT Integration', data);
        onSuccess && onSuccess({ data });
        onClose && onClose();
      },
      data: { data },
    });
  };
  const setInputValueByProvider = (name: ChatProviderKey, value: string | number) => {
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
      const provIds = fv.chatIds[provider];

      if (provIds) {
        const filtered = provIds.filter(exist => exist !== inputValue);
        form.setValue(`chatIds.${provider}`, [...filtered, inputValue]);
      } else {
        form.setValue(`chatIds.${provider}`, [inputValue]);
      }
    } else {
      form.setValue(`chatIds.${provider}`, [inputValue]);
    }
    setInputValueByProvider(provider, '');
    handleToggleInputStateByChatProvider(provider);

    console.log(fv.chatIds);
  };
  const handleDeleteChatIdByProvider = (provider: ChatProviderKey, chatId?: string | number) => {
    if (fv.chatIds && fv.chatIds[provider]) {
      const filtered = fv.chatIds[provider]?.filter(exist => exist !== chatId);
      form.setValue(`chatIds.${provider}`, [...(filtered ?? [])]);
    }
  };

  useEffect(() => {
    console.log(fv);
  }, [fv]);
  return (
    <ModalForm onClose={onClose} title={t('Create new integration')} {...p} onSubmit={form.handleSubmit(onValid)}>
      <FlexBox padding={'0 8px 8px'} fillWidth>
        <InputLabel label={t('Label')}>
          <InputText placeholder={t('Label')} {...form.register('label')} />
        </InputLabel>

        {/*<InputLabel label={t('Login')}>*/}
        {/*  <InputText placeholder={t('Login')} {...form.register('login')} />*/}
        {/*</InputLabel>*/}

        {/*<InputLabel label={t('Api-key')}>*/}
        {/*  <InputText placeholder={t('Api-key')} {...form.register('apiKey')} />*/}
        {/*</InputLabel>*/}

        {/*<InputLabel label={t('Secret key')}>*/}
        {/*  <InputSecurityControlHOC*/}
        {/*    renderInput={p => <InputText placeholder={t('Secret key')} {...p} {...form.register('secret')} />}*/}
        {/*  />*/}
        {/*</InputLabel>*/}
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
    </ModalForm>
  );
};

export default FormCreateOutputIntegration;
