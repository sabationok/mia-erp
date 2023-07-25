import { DirectoriesFormProps } from '../Directories/dir.types';
import { ContractorsTypesEnum, IContractor, IContractorFormData } from 'redux/contractors/contractors.types';
import ModalForm from '../ModalForm';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import InputLabel from '../atoms/Inputs/InputLabel';
import t from '../../lang';
import translate from '../../lang';
import InputText from '../atoms/Inputs/InputText';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import React, { useMemo } from 'react';
import { useAppForm } from '../../hooks';
import CustomSelect from '../atoms/Inputs/CustomSelect';
import { enumToArray } from '../../utils';
import FormAfterSubmitOptions from './components/FormAfterSubmitOptions';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';

export interface FormCreateContractorProps
  extends DirectoriesFormProps<ContractorsTypesEnum, IContractor, IContractorFormData> {}

const validation = yup.object().shape({
  type: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .required(),
  label: yup.string().max(100),
  name: yup.string().max(100),
  secondName: yup.string().max(100),
  taxCode: yup.string().max(16).optional(),
  phone: yup.string().max(100).optional(),
  email: yup.string().max(100).optional(),
  description: yup.string().max(250).optional(),
});

const FormCreateContractor: React.FC<FormCreateContractorProps> = ({ onSubmit, type, parent, data, ...props }) => {
  const {
    formState: { errors, isValid },
    formValues: { type: currentType },
    register,
    handleSubmit,
    registerSelect,
    clearAfterSave,
    closeAfterSave,
    toggleAfterSubmitOption,
  } = useAppForm<IContractorFormData>({
    defaultValues: {
      ...data,
      type: { value: type, label: type ? t(type) : type },
    },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });
  const typeOptions = useMemo(() => {
    return enumToArray(ContractorsTypesEnum).map(el => ({ label: translate(el), value: el }));
  }, []);

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
        ContractorsTypesEnum.AUDITOR,
      ].includes(currentType.value)
    );
  }, [currentType]);

  const renderNamesInputs = useMemo(() => {
    return (
      currentType &&
      [
        ContractorsTypesEnum.CUSTOMER,
        ContractorsTypesEnum.AUDITOR,
        ContractorsTypesEnum.CONSIGNOR,
        ContractorsTypesEnum.COUNTER,
        ContractorsTypesEnum.WORKER,
        ContractorsTypesEnum.MANAGER,
        ContractorsTypesEnum.FIN_MANAGER,
        ContractorsTypesEnum.BRAND_MANAGER,
        ContractorsTypesEnum.SALES_MANAGER,
        ContractorsTypesEnum.SUPPLY_MANAGER,
      ].includes(currentType.value)
    );
  }, [currentType]);

  return (
    <ModalForm
      {...props}
      onSubmit={formEventWrapper(onSubmit)}
      isValid={isValid}
      extraFooter={
        <FormAfterSubmitOptions
          clearAfterSave={clearAfterSave}
          closeAfterSave={closeAfterSave}
          toggleOption={toggleAfterSubmitOption}
        />
      }
    >
      <Inputs>
        <CustomSelect
          {...registerSelect('type', {
            label: t('type'),
            placeholder: t('type'),
            required: true,
            error: errors.type,
            options: typeOptions,
          })}
        />

        {!renderNamesInputs && renderLabelInput && (
          <InputLabel label={t('label')} direction={'vertical'} error={errors.label} required={!renderNamesInputs}>
            <InputText placeholder={t('insertLabel')} {...register('label')} required={!renderNamesInputs} autoFocus />
          </InputLabel>
        )}
        {renderNamesInputs && (
          <>
            <InputLabel label={t('name')} direction={'vertical'} error={errors.name} required={renderLabelInput}>
              <InputText placeholder={t('insertLabel')} {...register('name')} required={renderLabelInput} autoFocus />
            </InputLabel>
            <InputLabel
              label={t('secondName')}
              direction={'vertical'}
              error={errors.secondName}
              required={renderLabelInput}
            >
              <InputText
                placeholder={t('insertSecondName')}
                {...register('secondName')}
                required={renderLabelInput}
                autoFocus
              />
            </InputLabel>
          </>
        )}

        <InputLabel label={t('taxCode')} direction={'vertical'} error={errors.taxCode}>
          <InputText placeholder={t('taxCode')} {...register('taxCode')} />
        </InputLabel>

        <InputLabel label={t('email')} direction={'vertical'} error={errors.email}>
          <InputText placeholder={t('email')} {...register('email')} />
        </InputLabel>

        <InputLabel label={t('phone')} direction={'vertical'} error={errors.phone}>
          <InputText placeholder={t('phone')} {...register('phone')} />
        </InputLabel>

        <InputLabel label={t('comment')} direction={'vertical'} error={errors.description}>
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

  background-color: inherit;
`;
export default FormCreateContractor;
