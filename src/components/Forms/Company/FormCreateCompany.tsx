import React, { useMemo, useState } from 'react';
import { BusinessSubjectTypeEnum, ICompanyFormData } from '../../../types/companies.types';
import { ModalFormProps } from '../../ModalForm';
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
import { AppFormProvider, useAppFormProvider } from '../../../hooks/useAppForm.hook';
import { HasEmbeddedLabel, HasEmbeddedName } from '../../../types/utils.types';
import { FlexForm } from '../../atoms/FlexBox';
import ModalBase from '../../atoms/Modal';
import ModalFooter from '../../atoms/Modal/ModalFooter';

export interface FormCreateCompanyProps extends Omit<ModalFormProps<any, any, ICompanyFormData>, 'onSubmit'> {}
const FormCreateCompany: React.FC<FormCreateCompanyProps> = ({ defaultState, title, onClose, ...props }) => {
  const pServ = useAppServiceProvider()[AppModuleName.permissions];
  const [isLoading, setIsLoading] = useState(false);
  const formMethods = useAppForm<ICompanyFormData>({
    defaultValues: { businessSubjectType: BusinessSubjectTypeEnum.company, ...defaultState },
    reValidateMode: 'onBlur',
    // resolver: yupResolver(createCompanyFormSchema),
    shouldUnregister: true,
  });
  const {
    register,
    unregister,
    formState: { errors },
    handleSubmit,
    formValues: { businessSubjectType, type: currentType, ...formValues },
    registerSelect,
    setValue,
  } = formMethods;

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
          onClose && onClose();
        },
        onError() {
          ToastService.error('Error');
        },
        onLoading: setIsLoading,
      })
      .then();
  }

  return (
    <ModalBase onClose={onClose} fillHeight width={'480px'} title={title}>
      <FlexForm
        fillHeight
        {...props}
        onSubmit={handleSubmit(onValid, errors => {
          console.error('[Form Create Company]', errors);
        })}
      >
        {/*<ModalHeader title={title} onClose={onClose} />*/}

        <AppFormProvider value={formMethods}>
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

            {formRenderConfig.renderNamesInputs && <NameInputs />}

            {formRenderConfig.renderLabelInput && <LabelInputs />}

            <InputLabel label={'Емейл (основний)'} error={errors.email} required>
              <InputText placeholder={'Введіть основний емейл'} {...register('email')} type={'email'} required />
            </InputLabel>

            <InputLabel label={'Телефон (основний)'} error={errors.phone} required>
              <InputText placeholder={'Введіть осний контактний номер'} {...register('phone')} />
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
        </AppFormProvider>
      </FlexForm>

      <ModalFooter hasOnSubmit isValid isLoading={isLoading} />
    </ModalBase>
  );
};

const LabelInputs = (props: { autoFocus?: boolean }) => {
  const {
    register,
    formState: { errors },
  } = useAppFormProvider<HasEmbeddedLabel>();

  return (
    <>
      <InputLabel label={t('Label')} error={errors.label?.base} required={true}>
        <InputText placeholder={t('insertLabel')} {...register('label.base')} required={true} autoFocus={true} />
      </InputLabel>

      <InputLabel label={t('Print label')} error={errors.label?.print}>
        <InputText placeholder={t('Enter print label')} {...register('label.print')} />
      </InputLabel>
    </>
  );
};

const NameInputs = (props: { autoFocus?: boolean }) => {
  const {
    register,
    formState: { errors },
  } = useAppFormProvider<HasEmbeddedName>();

  return (
    <>
      <InputLabel label={t('name')} error={errors.name?.first} required>
        <InputText
          placeholder={t('Insert first name')}
          {...register('name.first')}
          required
          autoFocus={props.autoFocus}
        />
      </InputLabel>

      <InputLabel label={t('secondName')} error={errors?.name?.second}>
        <InputText placeholder={t('insertSecondName')} {...register('name.second')} />
      </InputLabel>

      <InputLabel label={t('Middle name')} error={errors?.name?.middle}>
        <InputText placeholder={t('Insert middle name')} {...register('name.middle')} />
      </InputLabel>
    </>
  );
};

export default FormCreateCompany;
