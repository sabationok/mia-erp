import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { BusinessSubjectTypeEnum, ICompanyFormData } from '../../../types/companies.types';
import ModalForm, { ModalFormProps } from '../../ModalForm';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import ButtonsGroup from '../../atoms/ButtonsGroup';
import { t } from '../../../lang';
import { useAppForm } from '../../../hooks';
import CustomSelect from '../../atoms/Inputs/CustomSelect';
import { businessSubjectTypeFilterOptions, ownershipTypeFilterOptions } from '../../../data/companies.data';
import { ContractorsTypesEnum } from '../../../redux/directories/contractors.types';
import { FormInputs } from '../components/atoms';
import { AppModuleName } from '../../../redux/reduxTypes.types';
import { toReqData } from '../../../utils';
import { ToastService } from '../../../services';

export interface FormCreateCompanyProps extends Omit<ModalFormProps<any, any, ICompanyFormData>, 'onSubmit'> {}
const FormCreateCompany: React.FC<FormCreateCompanyProps> = ({ defaultState, ...props }) => {
  const pServ = useAppServiceProvider()[AppModuleName.permissions];
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    unregister,
    formState: { errors },
    handleSubmit,
    formValues: { businessSubjectType, type: currentType, ...formValues },
    registerSelect,
    setValue,
  } = useAppForm<ICompanyFormData>({
    defaultValues: { businessSubjectType: BusinessSubjectTypeEnum.company, ...defaultState },
    reValidateMode: 'onBlur',
    // resolver: yupResolver(createCompanyFormSchema),
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

  function onValid(fData: ICompanyFormData) {
    console.log({ formValues });

    pServ
      .createCompany({
        data: toReqData(fData),
        onSuccess(data) {
          console.log('Company created', data);
          ToastService.success(`Company created: ${data?.name || data?.label}`);
          props?.onClose && props?.onClose();
        },
        onError() {
          ToastService.error('Error');
        },
        onLoading: setIsLoading,
      })
      .then();
  }

  return (
    <Form
      fillHeight
      width={'480px'}
      {...props}
      isLoading={isLoading}
      onSubmit={handleSubmit(onValid, errors => {
        console.error('FormCreateCompany', errors);
      })}
    >
      <FormInputs flex={1} fillWidth padding={'8px 4px'} overflow={'auto'}>
        <InputLabel label={t('businessSubjectType')} error={errors.businessSubjectType} required>
          <ButtonsGroup
            options={businessSubjectTypeFilterOptions}
            currentOption={{ value: businessSubjectType }}
            onSelect={({ value }) => {
              setValue('businessSubjectType', value);
              if (value !== BusinessSubjectTypeEnum.company) {
                unregister('ownershipType');
              }
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
            <InputLabel label={t('name')} error={errors.name?.first} required>
              <InputText
                placeholder={t('Insert first name')}
                {...register('name.first')}
                required
                autoFocus={formRenderConfig.renderNamesInputs}
              />
            </InputLabel>

            <InputLabel label={t('secondName')} error={errors?.name?.second}>
              <InputText placeholder={t('insertSecondName')} {...register('name.second')} />
            </InputLabel>

            <InputLabel label={t('Middle name')} error={errors?.name?.middle}>
              <InputText placeholder={t('Insert middle name')} {...register('name.middle')} />
            </InputLabel>
          </>
        )}

        {formRenderConfig.renderLabelInput && (
          <>
            <InputLabel label={t('Label')} error={errors.label?.base} required={!formRenderConfig.renderNamesInputs}>
              <InputText
                placeholder={t('insertLabel')}
                {...register('label.base')}
                required={!formRenderConfig.renderNamesInputs}
                autoFocus={!formRenderConfig.renderNamesInputs}
              />
            </InputLabel>

            <InputLabel label={t('Print label')} error={errors.label?.print}>
              <InputText placeholder={t('Enter print label')} {...register('label.print')} />
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
