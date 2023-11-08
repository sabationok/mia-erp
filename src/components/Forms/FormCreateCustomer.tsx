import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { EngagementSource, ICustomerFormData } from '../../redux/customers/customers.types';
import ModalForm, { ModalFormProps } from '../ModalForm';
import { t } from '../../lang';
import styled from 'styled-components';
import FlexBox from '../atoms/FlexBox';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import ButtonsGroup from '../atoms/ButtonsGroup';
import { businessSubjectTypeFilterOptions } from '../../data/companies.data';
import { useForm } from 'react-hook-form';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import CheckboxesListSelector from '../atoms/CheckboxesListSelector';
import { enumToFilterOptions } from '../../utils/fabrics';
import { useMemo } from 'react';
import { ConfigService } from '../../services';
import { BusinessSubjectTypeEnum } from '../../redux/companies/companies.types';
import _ from 'lodash';

const isDevMode = ConfigService.isDevMode();

export interface FormCreateCustomerProps extends Omit<ModalFormProps<any, any, ICustomerFormData>, 'onSubmit'> {
  onSubmit?: AppSubmitHandler<ICustomerFormData>;
  withReferer?: boolean;
}

const engagementSourceOptions = enumToFilterOptions(EngagementSource);
const FormCreateCustomer: React.FC<FormCreateCustomerProps> = ({
  defaultState,
  withReferer,
  onSubmit,
  onClose,
  ...p
}) => {
  const { register, setValue, handleSubmit, watch } = useForm<ICustomerFormData>({
    defaultValues: { ...defaultState, businessType: BusinessSubjectTypeEnum.company },
  });
  const formValues = watch();

  const isEditMode = useMemo(() => !!defaultState?.email, [defaultState?.email]);

  const onValid = (fData: ICustomerFormData) => {
    onSubmit && onSubmit(_.omit(fData, isEditMode ? ['engagementSource', 'email'] : ['engagementSource']));
  };

  return (
    <ModalForm {...p} title={p.title ? p.title : t('Create customer')} onSubmit={handleSubmit(onValid)}>
      <Inputs padding={'0 8px 8px'}>
        <InputLabel label={t('type')} required>
          <ButtonsGroup
            options={businessSubjectTypeFilterOptions}
            onSelect={info => {
              setValue('businessType', info?.value);
            }}
          />
        </InputLabel>

        <InputLabel label={t('name')} required>
          <InputText placeholder={t('name')} {...register('name')} required />
        </InputLabel>

        <InputLabel label={t('secondName')}>
          <InputText placeholder={t('secondName')} {...register('secondName')} />
        </InputLabel>

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

        <InputLabel label={t('Birth date')}>
          <InputText placeholder={t('Birth date')} {...register('birthDate')} type={'datetime-local'} />
        </InputLabel>

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
              <ButtonIcon variant={'defOutlinedSmall'}>{t('Clear referrer')}</ButtonIcon>
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
export default FormCreateCustomer;
