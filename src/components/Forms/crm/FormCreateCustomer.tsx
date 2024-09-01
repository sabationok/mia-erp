import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { EngagementSource, ICustomerFormData } from '../../../types/customers.types';
import ModalForm, { ModalFormProps } from '../../ModalForm';
import { t } from '../../../i18e';
import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import ButtonsGroup from '../../atoms/ButtonsGroup';
import { businessSubjectTypeFilterOptions } from '../../../data/companies.data';
import { useForm } from 'react-hook-form';
import ButtonIcon from '../../atoms/ButtonIcon';
import CheckboxesListSelector from '../../atoms/CheckboxesListSelector';
import { enumToFilterOptions } from '../../../utils/fabrics';
import { useMemo } from 'react';
import { ConfigService } from '../../../services';
import { BusinessSubjectTypeEnum } from '../../../types/companies/companies.types';
import _ from 'lodash';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { IEmbeddedLabel, IEmbeddedName } from '../../../types/utils.types';

const isDevMode = ConfigService.isDevMode();

export interface FormCreateCustomerProps extends Omit<ModalFormProps<any, any, ICustomerFormData>, 'onSubmit'> {
  onSubmit?: AppSubmitHandler<ICustomerFormData>;
  withReferer?: boolean;
}

const engagementSourceOptions = enumToFilterOptions(EngagementSource);
const FormCreateCustomer: React.FC<FormCreateCustomerProps> = ({ defaultState, withReferer, onSubmit, ...p }) => {
  const { register, setValue, handleSubmit, watch, ...form } = useForm<ICustomerFormData>({
    defaultValues: { ...defaultState, businessType: BusinessSubjectTypeEnum.company },
  });
  const formValues = watch();

  const isEditMode = useMemo(() => !!defaultState?.email, [defaultState?.email]);

  const onValid = (fData: ICustomerFormData) => {
    onSubmit && onSubmit(_.omit(fData, isEditMode ? ['engagementSource', 'email'] : ['engagementSource']));
  };

  return (
    <ModalForm fillHeight {...p} title={p.title ? p.title : t('Create customer')} onSubmit={handleSubmit(onValid)}>
      <Inputs padding={'0 8px 8px'}>
        <InputLabel label={t('type')} required>
          <ButtonsGroup
            options={businessSubjectTypeFilterOptions}
            onSelect={info => {
              setValue('businessType', info?.value);
            }}
          />
        </InputLabel>

        {formValues.businessType !== BusinessSubjectTypeEnum.person && (
          <FormCustomerLabelInputs form={{ register, setValue, handleSubmit, watch, ...form }} />
        )}

        {formValues.businessType !== BusinessSubjectTypeEnum.company && (
          <FormCustomerNameInputs form={{ register, setValue, handleSubmit, watch, ...form }} />
        )}

        <InputLabel label={t('email')} disabled={isEditMode} required>
          <InputText
            placeholder={t('email')}
            type={'email'}
            {...register('email', { required: true })}
            disabled={isEditMode}
            required
          />
        </InputLabel>

        <InputLabel label={t('phone')}>
          <InputText placeholder={t('phone')} {...register('phone')} />
        </InputLabel>

        {formValues.businessType !== BusinessSubjectTypeEnum.company && (
          <InputLabel label={t('Birth date')}>
            <InputText placeholder={t('Birth date')} {...register('birthDate')} type={'datetime-local'} />
          </InputLabel>
        )}

        {withReferer && isDevMode && (
          <InputLabel label={t('Referrer id')}>
            <InputText placeholder={t('Referrer id')} {...register('referrer._id')} />
          </InputLabel>
        )}

        <InputLabel label={t('Source')}>
          <CheckboxesListSelector
            disabled
            options={engagementSourceOptions}
            currentOption={{ value: formValues?.engagementSource }}
            onChangeIndex={i => {
              setValue('engagementSource', engagementSourceOptions[i].value);
            }}
          />
        </InputLabel>

        {formValues?.engagementSource === EngagementSource.referralSystem && (
          <FlexBox gap={8} fillWidth>
            <InputLabel label={t('Referrer')} required>
              <InputText placeholder={t('Referrer')} type={'email'} required />
            </InputLabel>

            <FlexBox fxDirection={'row'} fillWidth gap={8} padding={'8px 0'}>
              <ButtonIcon variant={'defaultSmall'}>{t('Clear referrer')}</ButtonIcon>
              <ButtonIcon variant={'outlinedSmall'} flex={1}>
                {t('Select referrer')}
              </ButtonIcon>
            </FlexBox>
          </FlexBox>
        )}
      </Inputs>
    </ModalForm>
  );
};
const Inputs = styled(FlexBox)``;

const FormCustomerNameInputs: React.FC<{ form: UseFormReturn<ICustomerFormData> }> = ({ form }) => {
  const inputs: { name: keyof IEmbeddedName; label: string; required?: boolean }[] = [
    { name: 'first', label: t('First name'), required: true },
    { name: 'second', label: t('Second name') },
    { name: 'middle', label: t('Middle name') },
  ];

  return (
    <>
      {inputs.map(({ name, label, required }) => {
        return (
          <InputLabel key={`name_${name}`} label={label} required={required}>
            <InputText placeholder={label} {...form.register(`name.${name}`, { required })} required={required} />
          </InputLabel>
        );
      })}
    </>
  );
};

const FormCustomerLabelInputs: React.FC<{ form: UseFormReturn<ICustomerFormData> }> = ({ form }) => {
  const inputs: { name: keyof IEmbeddedLabel; label: string; required?: boolean }[] = [
    { name: 'base', label: t('Label'), required: true },
    { name: 'print', label: t('Print label') },
  ];

  return (
    <>
      {inputs.map(({ name, label, required }) => {
        return (
          <InputLabel key={`name_${name}`} label={label} required={required}>
            <InputText placeholder={label} {...form.register(`label.${name}`, { required })} required={required} />
          </InputLabel>
        );
      })}
    </>
  );
};
export default FormCreateCustomer;
