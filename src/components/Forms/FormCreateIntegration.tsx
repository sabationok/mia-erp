import ModalForm, { ModalFormProps } from '../ModalForm';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { useForm } from 'react-hook-form';
import InputLabel from '../atoms/Inputs/InputLabel';
import { t } from '../../lang';
import InputText from '../atoms/Inputs/InputText';
import FlexBox from '../atoms/FlexBox';
import InputSecurityControlHOC from '../atoms/Inputs/SecurityInputControlHOC';
import {
  CreateIntegrationFormData,
  ExtIntegrationBase,
  ExtServiceBase,
} from '../../redux/integrations/integrations.types';
import { createApiCall } from '../../api';
import IntegrationsApi from '../../api/integrations.api';
import { ExtractId } from '../../utils/dataTransform';

export interface FormCreateIntegrationProps extends Omit<ModalFormProps, 'onSubmit'> {
  onSubmit?: AppSubmitHandler<CreateIntegrationFormData>;
  onSuccess?: (data: { data: ExtIntegrationBase }) => void;
  service: ExtServiceBase;
}

const FormCreateIntegration: React.FC<FormCreateIntegrationProps> = ({
  onSubmit,
  service,
  onSuccess,
  onClose,
  ...p
}) => {
  const form = useForm<CreateIntegrationFormData>();

  const onValid = (data: CreateIntegrationFormData) => {
    createApiCall(
      {
        onSuccess: data => {
          console.log('FormCreateIntegration', data);
          onSuccess && onSuccess({ data });
          onClose && onClose();
        },
        data: { data: { ...data, service: ExtractId(service) } },
      },
      IntegrationsApi.createExternal,
      IntegrationsApi
    );
  };

  return (
    <ModalForm onClose={onClose} title={t('Create new integration')} {...p} onSubmit={form.handleSubmit(onValid)}>
      <FlexBox padding={'0 8px 8px'} fillWidth>
        <InputLabel label={t('Label')}>
          <InputText placeholder={t('Label')} {...form.register('label')} />
        </InputLabel>

        <InputLabel label={t('Login')}>
          <InputText placeholder={t('Login')} {...form.register('login')} />
        </InputLabel>

        <InputLabel label={t('Api-key')}>
          <InputText placeholder={t('Api-key')} {...form.register('apiKey')} />
        </InputLabel>

        <InputLabel label={t('Secret key')}>
          <InputSecurityControlHOC
            renderInput={p => <InputText placeholder={t('Secret key')} {...p} {...form.register('secret')} />}
          />
        </InputLabel>

        <InputLabel label={t('Expired at')}>
          <InputText placeholder={t('Expired at')} type={'datetime-local'} {...form.register('expiredAt')} />
        </InputLabel>

        <InputLabel label={t('Description')}>
          <InputText placeholder={t('Description')} {...form.register('description')} />
        </InputLabel>
      </FlexBox>
    </ModalForm>
  );
};

export default FormCreateIntegration;
