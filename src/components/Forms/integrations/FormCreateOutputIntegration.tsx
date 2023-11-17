import ModalForm, { ModalFormProps } from '../../ModalForm';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { useForm } from 'react-hook-form';
import InputLabel from '../../atoms/Inputs/InputLabel';
import { t } from '../../../lang';
import InputText from '../../atoms/Inputs/InputText';
import {
  CreateIntegrationFormData,
  CreateOutputIntegrationFormData,
  ExtServiceBase,
  OutputIntegrationBase,
} from '../../../redux/integrations/integrations.types';
import FlexBox from '../../atoms/FlexBox';
import CustomSelect from '../../atoms/Inputs/CustomSelect/CustomSelect';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { AppModuleName } from '../../../redux/reduxTypes.types';

export interface FormCreateOutputIntegrationProps extends Omit<ModalFormProps, 'onSubmit'> {
  onSubmit?: AppSubmitHandler<CreateIntegrationFormData>;
  onSuccess?: (info: { data: OutputIntegrationBase }) => void;
  service?: ExtServiceBase;
}

const FormCreateOutputIntegration: React.FC<FormCreateOutputIntegrationProps> = ({
  onSubmit,
  service,
  onSuccess,
  onClose,

  ...p
}) => {
  const form = useForm<CreateOutputIntegrationFormData>();
  const intServ = useAppServiceProvider()[AppModuleName.integrations];

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
          <InputText placeholder={t('Expired at')} type={'datetime-local'} {...form.register('expiredAt')} />
        </InputLabel>

        <InputLabel label={t('Redirect base url')}>
          <InputText placeholder={t('https://')} {...form.register('redirectBaseUrl')} />
        </InputLabel>

        <InputLabel label={t('Comment')}>
          <InputText placeholder={t('Comment')} {...form.register('description')} />
        </InputLabel>
      </FlexBox>
    </ModalForm>
  );
};

export default FormCreateOutputIntegration;
