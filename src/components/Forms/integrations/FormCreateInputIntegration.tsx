import ModalForm, { ModalFormProps } from '../../ModalForm';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import InputLabel from '../../atoms/Inputs/InputLabel';
import { t } from '../../../i18e';
import InputText from '../../atoms/Inputs/InputText';
import FlexBox from '../../atoms/FlexBox';
import InputSecurityControlHOC from '../../atoms/Inputs/SecurityInputControlHOC';
import { ExtServiceBase, InputIntegrationEntity, IntegrationFormData } from '../../../types/integrations.types';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { AppModuleName } from '../../../redux/reduxTypes.types';
import { useState } from 'react';
import ButtonSwitch from '../../atoms/ButtonSwitch';
import { useAppForm } from '../../../hooks';
import { toReqData } from '../../../utils';
import { omit } from 'lodash';

export interface FormCreateInputIntegrationProps
  extends Omit<ModalFormProps<any, any, IntegrationFormData>, 'onSubmit'> {
  onSubmit?: AppSubmitHandler<IntegrationFormData>;
  onSuccess?: (data: { data: InputIntegrationEntity }) => void;
  service: ExtServiceBase;
}

const FormCreateInputIntegration: React.FC<FormCreateInputIntegrationProps> = ({
  onSubmit,
  service,
  onSuccess,
  onClose,
  defaultState,
  ...p
}) => {
  const intServ = useAppServiceProvider()[AppModuleName.integrations];
  const form = useAppForm<IntegrationFormData>({
    defaultValues: {
      ...defaultState,
      serviceId: service?._id,
      setAsDefault: service.defIntegration?._id === defaultState?._id,
    },
  });
  const [loading, setLoading] = useState(false);

  const onValid = (data: IntegrationFormData) => {
    intServ.createInput({
      onSuccess: data => {
        onSuccess && onSuccess({ data });
        onClose && onClose();
      },
      onLoading: setLoading,
      data: { data: toReqData({ ...omit(data, ['service']), serviceId: service?._id }) },
    });
  };

  return (
    <ModalForm
      onClose={onClose}
      title={t('Create new integration')}
      {...p}
      isLoading={loading}
      onSubmit={form.handleSubmit(onValid)}
    >
      <FlexBox padding={'0 8px 8px'} fillWidth>
        <InputLabel label={t('Label')} required>
          <InputText placeholder={t('Label')} {...form.register('label', { required: true })} required />
        </InputLabel>

        {/*<InputLabel label={t('Login')}>*/}
        {/*  <InputText placeholder={t('Login')} {...form.register('login')} />*/}
        {/*</InputLabel>*/}

        <InputLabel label={t('Public key')}>
          <InputText placeholder={t('Public key')} {...form.register('publicKey')} />
        </InputLabel>

        <InputLabel label={t('Private key')}>
          <InputSecurityControlHOC
            renderInput={p => <InputText placeholder={t('Private key')} {...p} {...form.register('privateKey')} />}
          />
        </InputLabel>

        <InputLabel label={t('Expire at')}>
          <InputText
            placeholder={t('Expired at')}
            type={'date'}
            {...form.register('expireAt', {
              setValueAs: d => {
                console.log('new Date(d).toISOString', d);
                return d ? new Date(d).toISOString() : d;
              },
            })}
          />
        </InputLabel>

        <InputLabel label={t('Description')}>
          <InputText placeholder={t('Description')} {...form.register('description')} />
        </InputLabel>

        <InputLabel label={t('Set as default')}>
          <ButtonSwitch
            value={form.formValues.setAsDefault}
            onChange={value => form.setValue('setAsDefault', value, { shouldDirty: true, shouldTouch: true })}
          />
        </InputLabel>
      </FlexBox>
    </ModalForm>
  );
};

export default FormCreateInputIntegration;
