import { DirectoriesFormProps } from '../Directories/dir.types';
import { ContractorsTypesEnum, IContractor, IContractorFormData } from 'redux/contractors/contractors.types';
import ModalForm from '../ModalForm';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import InputLabel from '../atoms/Inputs/InputLabel';
import t from '../../lang';
import InputText from '../atoms/Inputs/InputText';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import React, { useMemo } from 'react';
import { useAppForm } from '../../hooks';
import FormAfterSubmitOptions from './components/FormAfterSubmitOptions';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { counterpartyFilterOptions, counterpartyOwnershipFilterOptions } from '../../data/directories.data';
import CustomSelect from '../atoms/Inputs/CustomSelect';
import ButtonGroup from '../atoms/ButtonGroup';

export interface FormCreateContractorProps
  extends DirectoriesFormProps<ContractorsTypesEnum, IContractor, IContractorFormData> {
  isFilterByTypeOn?: boolean;
}

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
    formValues: { type: currentType },
    register,
    registerSelect,
    handleSubmit,
    setValue,
    clearAfterSave,
    closeAfterSave,
    toggleAfterSubmitOption,
  } = useAppForm<IContractorFormData>({
    defaultValues: defaultState,
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });

  function formEventWrapper(evHandler?: AppSubmitHandler<IContractorFormData>) {
    if (evHandler) {
      return handleSubmit(data => evHandler(data, { clearAfterSave, closeAfterSave }));
    }
  }

  const renderLabelInput = useMemo(() => {
    return (
      currentType &&
      [
        ContractorsTypesEnum.SUPPLIER,
        ContractorsTypesEnum.COMMISSION_AGENT,
        ContractorsTypesEnum.CONSIGNOR,
        ContractorsTypesEnum.CONTRACTOR,
        ContractorsTypesEnum.SUB_CONTRACTOR,
      ].includes(currentType)
    );
  }, [currentType]);

  const renderNamesInputs = useMemo(() => {
    return (
      currentType &&
      [ContractorsTypesEnum.CUSTOMER, ContractorsTypesEnum.CONSIGNOR, ContractorsTypesEnum.WORKER].includes(currentType)
    );
  }, [currentType]);

  return (
    <ModalForm
      style={{ maxWidth: '100%', width: 480 }}
      {...props}
      onSubmit={formEventWrapper(onSubmit)}
      onOptSelect={(_o, v) => setValue('type', v)}
      filterOptions={isFilterByTypeOn ? counterpartyFilterOptions : undefined}
      isValid={isValid}
      title={`Створити контрагента: ${t(currentType)}`}
      extraFooter={
        <FormAfterSubmitOptions
          clearAfterSave={clearAfterSave}
          closeAfterSave={closeAfterSave}
          toggleOption={toggleAfterSubmitOption}
        />
      }
    >
      <Inputs>
        {!renderNamesInputs && renderLabelInput && (
          <InputLabel label={t('label')} error={errors.label} required={!renderNamesInputs}>
            <InputText placeholder={t('insertLabel')} {...register('label')} required={!renderNamesInputs} autoFocus />
          </InputLabel>
        )}
        {renderNamesInputs && (
          <>
            <InputLabel label={t('name')} error={errors.name} required={renderLabelInput}>
              <InputText placeholder={t('insertLabel')} {...register('name')} required={renderLabelInput} autoFocus />
            </InputLabel>

            <InputLabel label={t('secondName')} error={errors.secondName} required={renderLabelInput}>
              <InputText placeholder={t('insertSecondName')} {...register('secondName')} required={renderLabelInput} />
            </InputLabel>
          </>
        )}
        <InputLabel label={t('ownership')} error={errors.label} required={!renderNamesInputs}>
          <ButtonGroup options={counterpartyOwnershipFilterOptions} borderRadius={'4px'} />
        </InputLabel>

        <InputLabel label={t('taxCode')} error={errors.taxCode}>
          <InputText placeholder={t('taxCode')} {...register('taxCode')} />
        </InputLabel>

        <InputLabel label={t('personalTaxCode')} error={errors.taxCode}>
          <InputText placeholder={t('personalTaxCode')} {...register('personalTaxCode')} />
        </InputLabel>

        <InputLabel label={t('email')} error={errors.email}>
          <InputText placeholder={t('email')} {...register('email')} />
        </InputLabel>

        <InputLabel label={t('phone')} error={errors.phone}>
          <InputText placeholder={t('phone')} {...register('phone')} />
        </InputLabel>

        <CustomSelect
          {...registerSelect('attractionSource', {
            label: 'Джерело залучення',
            placeholder: 'Оберіть джерело залучення',
          })}
        />

        <InputLabel label={t('comment')} error={errors.description}>
          <TextareaPrimary placeholder={t('insertComment')} {...register('description')} maxLength={250} />
        </InputLabel>
      </Inputs>
    </ModalForm>
  );
};
const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 16px;

  overflow: auto;

  background-color: inherit;
`;
export default FormCreateContractor;
