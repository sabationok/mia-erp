import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { EngagementSource, ICustomerFormData } from '../../redux/customers/customers.types';
import ModalForm, { ModalFormProps } from '../ModalForm';
import { t } from '../../lang';
import styled from 'styled-components';
import FlexBox from '../atoms/FlexBox';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import ButtonGroup from '../atoms/ButtonGroup';
import { businessSubjectTypeFilterOptions } from '../../data/companies.data';
import { createDataForReq } from '../../utils/dataTransform';
import { ServiceName, useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { useForm } from 'react-hook-form';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import CheckboxesListSelector from '../atoms/CheckboxesListSelector';
import { enumToFilterOptions } from '../../utils/fabrics';
import { useState } from 'react';
import { ConfigService } from '../../services';
import { BusinessSubjectTypeEnum } from '../../redux/companies/companies.types';

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
  const { register, setValue, handleSubmit, ...f } = useForm<ICustomerFormData>({
    defaultValues: { ...defaultState, businessType: BusinessSubjectTypeEnum.company },
  });
  const service = useAppServiceProvider()[ServiceName.customers];

  const [currentSource, setCurrentSource] = useState<EngagementSource>();
  const onValid = (fData: FormCreateCustomerProps) => {
    const reqData = createDataForReq(fData);

    service.create({
      data: { data: reqData as never },
      onSuccess: () => {
        onClose && onClose();
      },
    });
  };

  return (
    <ModalForm {...p} title={p.title ? p.title : t('Create customer')} onSubmit={handleSubmit(onValid)}>
      <Inputs padding={'0 8px 8px'}>
        <InputLabel label={t('type')} required>
          <ButtonGroup
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

        <InputLabel label={t('email')} required>
          <InputText placeholder={t('email')} type={'email'} {...register('email', { required: true })} required />
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
            currentOption={{ value: currentSource }}
            onChangeIndex={i => {
              setCurrentSource(engagementSourceOptions[i].value);
            }}
          />
        </InputLabel>

        {currentSource === EngagementSource.referralSystem && (
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
