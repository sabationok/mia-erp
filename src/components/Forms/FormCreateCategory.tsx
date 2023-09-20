import ModalForm from 'components/ModalForm';
import { ICategory, ICategoryFormData } from 'redux/directories/directories.types';
import React from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import t from '../../lang';
import { DirectoriesFormProps } from '../Directories/dir.types';
import FormAfterSubmitOptions from './components/FormAfterSubmitOptions';
import { useAppForm } from '../../hooks';
import { ApiDirType } from '../../redux/APP_CONFIGS';

export interface FormCreateCategoryProps
  extends DirectoriesFormProps<ApiDirType.CATEGORIES_PROD & ApiDirType.CATEGORIES_TR, ICategory, ICategoryFormData> {}

const validation = yup.object().shape({
  label: yup.string().required(),
  description: yup.string().max(250).optional(),
});

const FormCreateCategory: React.FC<FormCreateCategoryProps> = ({
  _id,
  type,
  edit,
  defaultState,
  onSubmit,
  dirType,
  parent,
  ...props
}) => {
  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
    closeAfterSave,
    clearAfterSave,
    toggleAfterSubmitOption,
  } = useAppForm<ICategoryFormData>({
    defaultValues: defaultState,
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });

  const onValid = (data: ICategoryFormData) => {
    console.log('FormCreateCategory on valid', { defaultState, data });

    onSubmit &&
      onSubmit(data, {
        closeAfterSave,
        clearAfterSave,
      });
  };
  return (
    <ModalForm
      {...props}
      onSubmit={handleSubmit(onValid)}
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
        <InputLabel label={t('type')} direction={'vertical'} error={errors.type} disabled>
          <InputText defaultValue={type ? t(type).toUpperCase() : type} disabled />
        </InputLabel>

        {defaultState?.parent?._id && (
          <InputLabel label={t('parentItem')} direction={'vertical'} error={errors.type} disabled>
            <InputText {...register('parent.label')} disabled />
          </InputLabel>
        )}

        <InputLabel label={t('label')} direction={'vertical'} error={errors.label} required>
          <InputText placeholder={t('insertLabel')} {...register('label')} required autoFocus />
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

export default FormCreateCategory;
