import { DirectoriesFormProps, IBaseDirItem } from '../Directories/dir.types';
import { ContractorsTypesEnum, ITagFormData } from 'redux/contractors/contractors.types';
import ModalForm from '../ModalForm';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import InputLabel from '../atoms/Inputs/InputLabel';
import t from '../../lang';
import translate from '../../lang';
import InputText from '../atoms/Inputs/InputText';
import React, { useMemo } from 'react';
import { useAppForm } from '../../hooks';
import CustomSelect from '../atoms/Inputs/CustomSelect';
import { enumToArray } from '../../utils';
import FormAfterSubmitOptions from './components/FormAfterSubmitOptions';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { ApiDirType } from '../../redux/APP_CONFIGS';

export interface FormCreateTagProps
  extends DirectoriesFormProps<
    ContractorsTypesEnum,
    IBaseDirItem<ContractorsTypesEnum, ApiDirType.TAGS>,
    ITagFormData,
    ApiDirType.TAGS
  > {}

const validation = yup.object().shape({
  type: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .required(),
  label: yup.string().max(100),
  email: yup.string().max(100).optional(),
  description: yup.string().max(250).optional(),
});

const FormCreateTag: React.FC<FormCreateTagProps> = ({ onSubmit, type, parent, data, ...props }) => {
  const {
    formState: { errors, isValid },
    formValues: { type: currentType },
    register,
    handleSubmit,
    registerSelect,
    clearAfterSave,
    closeAfterSave,
    toggleAfterSubmitOption,
  } = useAppForm<ITagFormData>({
    defaultValues: {
      ...data,
      type: { value: type, label: type },
    },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });

  const filterOptions = useMemo(() => {
    return enumToArray(ContractorsTypesEnum).map(el => ({ label: translate(el), value: el }));
  }, []);

  function formEventWrapper(evHandler?: AppSubmitHandler<ITagFormData>) {
    if (evHandler) {
      return handleSubmit(data => evHandler(data, { clearAfterSave, closeAfterSave }));
    }
  }

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
            options: filterOptions,
          })}
        />

        <InputLabel label={t('label')} direction={'vertical'} error={errors.label} required>
          <InputText placeholder={t('insertLabel')} {...register('label')} required autoFocus />
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
export default FormCreateTag;
