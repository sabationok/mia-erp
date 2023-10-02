import { DirectoriesFormProps } from '../Directories/dir.types';
import { ContractorsTypesEnum, IContractor, IContractorFormData } from 'redux/contractors/contractors.types';
import ModalForm from '../ModalForm';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputLabel from '../atoms/Inputs/InputLabel';
import t from '../../lang';
import InputText from '../atoms/Inputs/InputText';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import React, { useMemo } from 'react';
import { useAppForm } from '../../hooks';
import FormAfterSubmitOptions from './components/FormAfterSubmitOptions';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { counterpartyFilterOptions } from '../../data/directories.data';
import CustomSelect from '../atoms/Inputs/CustomSelect/CustomSelect';
import ButtonGroup from '../atoms/ButtonGroup';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { useDirectoriesSelector } from '../../redux/selectors.store';
import { BusinessSubjectTypeEnum } from '../../redux/companies/companies.types';
import { businessSubjectTypeFilterOptions } from '../../data/companies.data';
import { FormInputs } from './components/atoms';

export interface FormCreateContractorProps
  extends DirectoriesFormProps<ApiDirType.CONTRACTORS, IContractor, IContractorFormData> {
  isFilterByTypeOn?: boolean;
}

// const useCreateDirTreeItemModalForm = (_options?: {}) => {
//   const modalS = useModalProvider();
//   const service = useDirServiceHook();
//
//   const open = (props?: FormCreateDirTreeCompProps, afterSubmitOptions?: UseAppFormSubmitOptions) => {
//     if (props?.dirType) {
//       const modal = modalS.handleOpenModal({
//         Modal: Modals.FormCreateDirTreeComp,
//         props: {
//           dirType: props?.dirType,
//           onSubmit: (data, o) => {
//             service
//               .create({
//                 data: { data, dirType: props?.dirType || ApiDirType.UNSET },
//                 onSuccess: (data, _meta) => {
//                   console.log(`Created dir item: ${props.dirType}`, data);
//                   (o?.closeAfterSave || afterSubmitOptions?.closeAfterSave) && modal?.onClose();
//                 },
//               })
//               .then();
//           },
//           ...props,
//         },
//       });
//     }
//   };
//   return open;
// };

const validation = yup.object().shape({
  type: yup.string().required(),
  label: yup.string().max(100),
  name: yup.string().max(100),
  secondName: yup.string().max(100),
  taxCode: yup.string().max(16).optional(),
  phone: yup.string().max(100).optional(),
  email: yup.string().max(100).optional(),
  description: yup.string().max(250).optional(),
});

const FormCreateContractor: React.FC<FormCreateContractorProps> = ({
  isFilterByTypeOn = true,
  onSubmit,
  type,
  parent,
  data,
  defaultState,
  ...props
}) => {
  const {
    formState: { errors, isValid },
    formValues: { type: currentType, businessSubjectType },
    register,
    registerSelect,
    handleSubmit,
    setValue,
    clearAfterSave,
    closeAfterSave,
    toggleAfterSubmitOption,
  } = useAppForm<IContractorFormData>({
    defaultValues: {
      businessSubjectType: BusinessSubjectTypeEnum.company,
      ...defaultState,
      dirType: ApiDirType.CONTRACTORS,
    },
    resolver: yupResolver(validation),
    reValidateMode: 'onChange',
  });
  const attractionSourcesList = useDirectoriesSelector(ApiDirType.SOURCE_ATTRACTION).directory;

  function formEventWrapper(evHandler?: AppSubmitHandler<IContractorFormData>) {
    if (evHandler) {
      return handleSubmit(data => evHandler(data, { clearAfterSave, closeAfterSave }));
    }
  }

  const renderFormConfig = useMemo(
    () => ({
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

  return (
    <ModalForm
      width={'480px'}
      fillHeight
      title={`Створити контрагента: ${t(currentType)}`}
      {...props}
      onSubmit={formEventWrapper(onSubmit)}
      onOptSelect={(_o, v) => setValue('type', v)}
      filterOptions={isFilterByTypeOn ? counterpartyFilterOptions : undefined}
      isValid={isValid}
      extraFooter={
        <FormAfterSubmitOptions
          clearAfterSave={clearAfterSave}
          closeAfterSave={closeAfterSave}
          toggleOption={toggleAfterSubmitOption}
        />
      }
    >
      <FormInputs>
        <InputLabel label={t('businessSubjectType')} error={errors.label} required>
          <ButtonGroup
            options={businessSubjectTypeFilterOptions}
            borderRadius={'4px'}
            onSelect={({ option, value, index }) => {
              setValue('businessSubjectType', option.value);
            }}
          />
        </InputLabel>

        {renderFormConfig.renderNamesInputs && (
          <>
            <InputLabel label={t('name')} error={errors.name} required>
              <InputText
                placeholder={t('insertLabel')}
                {...register('name')}
                required
                autoFocus={renderFormConfig.renderNamesInputs}
              />
            </InputLabel>

            <InputLabel label={t('secondName')} error={errors.secondName} required>
              <InputText placeholder={t('insertSecondName')} {...register('secondName')} required />
            </InputLabel>
          </>
        )}

        {renderFormConfig.renderLabelInput && (
          <InputLabel label={t('label')} error={errors.label} required={!renderFormConfig.renderNamesInputs}>
            <InputText
              placeholder={t('insertLabel')}
              {...register('label')}
              required={!renderFormConfig.renderNamesInputs}
              autoFocus={!renderFormConfig.renderNamesInputs}
            />
          </InputLabel>
        )}

        {renderFormConfig.renderTaxCode && (
          <InputLabel label={t('taxCode')} error={errors.taxCode}>
            <InputText placeholder={t('taxCode')} {...register('taxCode')} />
          </InputLabel>
        )}

        {renderFormConfig.renderPersonalTaxCode && (
          <InputLabel label={t('personalTaxCode')} error={errors.taxCode}>
            <InputText placeholder={t('personalTaxCode')} {...register('personalTaxCode')} />
          </InputLabel>
        )}

        <InputLabel label={t('email')} error={errors.email}>
          <InputText placeholder={t('email')} {...register('email')} />
        </InputLabel>

        <InputLabel label={t('phone')} error={errors.phone}>
          <InputText placeholder={t('phone')} {...register('phone')} />
        </InputLabel>

        {renderFormConfig.renderAttractionSourceSelect && (
          <CustomSelect
            {...registerSelect('attractionSource', {
              options: attractionSourcesList,
              label: 'Джерело залучення',
              placeholder: 'Оберіть джерело залучення',
            })}
          />
        )}

        <InputLabel label={t('comment')} error={errors.description}>
          <TextareaPrimary placeholder={t('insertComment')} {...register('description')} maxLength={250} />
        </InputLabel>
      </FormInputs>
    </ModalForm>
  );
};

export default FormCreateContractor;
