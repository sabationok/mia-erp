import React, { useMemo } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { BusinessSubjectTypeEnum, ICompanyFormData } from '../../redux/companies/companies.types';
import ModalForm, { ModalFormProps } from '../ModalForm';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import { useAppServiceProvider } from '../../hooks/useAppServices.hook';
import ButtonGroup from '../atoms/ButtonGroup';
import { t } from '../../lang';
import { useAppForm } from '../../hooks';
import CustomSelect from '../atoms/Inputs/CustomSelect/CustomSelect';
import { businessSubjectTypeFilterOptions, ownershipTypeFilterOptions } from '../../data/companies.data';
import { ContractorsTypesEnum } from '../../redux/directories/contractors.types';
import { FormInputs } from './components/atoms';

const validFormData = yup.object().shape({
  name: yup.string(),
  fullName: yup.string(),
  email: yup.string(),
  businessSubjectType: yup.string().oneOf(Object.values(BusinessSubjectTypeEnum), 'Недопустима роль'),
  ownershipType: yup.string(),
  taxCode: yup.string(),
  label: yup.string(),
  fullLabel: yup.string(),
  phone: yup.string(),
} as Record<keyof ICompanyFormData, any>);

export interface FormCreateCompanyProps extends Omit<ModalFormProps<any, any, ICompanyFormData>, 'onSubmit'> {}
const FormCreateCompany: React.FC<FormCreateCompanyProps> = ({ defaultState, ...props }) => {
  const { permissions } = useAppServiceProvider();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    formValues: { businessSubjectType, type: currentType },
    registerSelect,
    setValue,
  } = useAppForm<ICompanyFormData>({
    defaultValues: { businessSubjectType: BusinessSubjectTypeEnum.company, ...defaultState },
    reValidateMode: 'onChange',
    resolver: yupResolver(validFormData),
    shouldUnregister: true,
  });

  const formRenderConfig = useMemo(
    () => ({
      renderOwnershipTypeSelect: businessSubjectType === BusinessSubjectTypeEnum.company,
      renderLabelInput:
        businessSubjectType &&
        [BusinessSubjectTypeEnum.company, BusinessSubjectTypeEnum.entrepreneur].includes(businessSubjectType),
      renderNamesInputs:
        businessSubjectType &&
        [BusinessSubjectTypeEnum.person, BusinessSubjectTypeEnum.entrepreneur].includes(businessSubjectType),
      renderPersonalTaxCode:
        businessSubjectType &&
        [BusinessSubjectTypeEnum.person, BusinessSubjectTypeEnum.entrepreneur].includes(businessSubjectType),
      renderTaxCode:
        businessSubjectType &&
        [BusinessSubjectTypeEnum.company, BusinessSubjectTypeEnum.entrepreneur].includes(businessSubjectType),
      renderAttractionSourceSelect: currentType === ContractorsTypesEnum.CUSTOMER,
    }),
    [currentType, businessSubjectType]
  );
  function onFormSubmit(data: ICompanyFormData) {
    if (data) console.log(data);

    permissions
      .createCompany({
        data,
        onSuccess(data) {
          console.log('Company created', data);
          toast.success(`Company created: ${data?.name || data?.label}`);
        },
        onError() {
          toast.error('Error');
        },
        onLoading() {},
      })
      .then();
  }

  return (
    <Form
      fillHeight
      width={'480px'}
      {...props}
      onSubmit={handleSubmit(onFormSubmit, errors => {
        console.log(errors);
      })}
    >
      <FormInputs flex={1} fillWidth padding={'8px 4px'} overflow={'auto'}>
        <InputLabel label={t('businessSubjectType')} error={errors.businessSubjectType} required>
          <ButtonGroup
            options={businessSubjectTypeFilterOptions}
            onSelect={({ value }) => {
              setValue('businessSubjectType', value);
            }}
          />
        </InputLabel>

        {formRenderConfig.renderOwnershipTypeSelect && (
          <CustomSelect
            {...registerSelect('ownershipType', {
              options: ownershipTypeFilterOptions,
              label: 'Форма власності',
              placeholder: 'Оберіть форму власності компанії',
            })}
          />
        )}

        {formRenderConfig.renderNamesInputs && (
          <>
            <InputLabel label={t('name')} error={errors.name} required>
              <InputText
                placeholder={t('insertLabel')}
                {...register('name')}
                required
                autoFocus={formRenderConfig.renderNamesInputs}
              />
            </InputLabel>

            <InputLabel label={t('secondName')} error={errors.secondName} required>
              <InputText placeholder={t('insertSecondName')} {...register('secondName')} required />
            </InputLabel>
          </>
        )}

        {formRenderConfig.renderLabelInput && (
          <>
            <InputLabel label={t('label')} error={errors.label} required={!formRenderConfig.renderNamesInputs}>
              <InputText
                placeholder={t('insertLabel')}
                {...register('label')}
                required={!formRenderConfig.renderNamesInputs}
                autoFocus={!formRenderConfig.renderNamesInputs}
              />
            </InputLabel>
            <InputLabel label={'Повна назва'} error={errors.fullName}>
              <InputText placeholder={'Ввведіть повну назву'} {...register('fullName')} />
            </InputLabel>
          </>
        )}

        <InputLabel label={'Емейл (основний)'} error={errors.email} required>
          <InputText placeholder={'Введіть основний емейл'} {...register('email')} type={'email'} required />
        </InputLabel>
        <InputLabel label={'Телефон (основний)'} error={errors.phone}>
          <InputText placeholder={'Введіть осний контактний номер'} {...register('phone')} />
        </InputLabel>

        {formRenderConfig.renderTaxCode && (
          <InputLabel label={t('taxCode')} error={errors.taxCode}>
            <InputText placeholder={t('taxCode')} {...register('taxCode')} />
          </InputLabel>
        )}

        {formRenderConfig.renderPersonalTaxCode && (
          <InputLabel label={t('personalTaxCode')} error={errors.taxCode}>
            <InputText placeholder={t('personalTaxCode')} {...register('personalTaxCode')} />
          </InputLabel>
        )}
      </FormInputs>
    </Form>
  );
};

const Form = styled(ModalForm)``;

export default FormCreateCompany;
