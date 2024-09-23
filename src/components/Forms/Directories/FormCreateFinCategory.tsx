import ModalForm from 'components/ModalForm';
import { FinCategoryEntity, FinCategoryFormData } from 'types/directories.types';
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import TextareaPrimary from '../../atoms/Inputs/TextareaPrimary';
import { t } from '../../../i18e';
import { DirectoriesFormProps } from '../../../types/dir.types';
import FormAfterSubmitOptions, { useAfterSubmitOptions } from '../../atoms/FormAfterSubmitOptions';
import { useAppForm } from '../../../hooks';
import { ApiDirType } from '../../../redux/APP_CONFIGS';
import { FormInputs } from '../components/atoms';
import { finCategorySchema } from '../../../schemas/directories';

export interface FormCreateFinCategoryProps
  extends DirectoriesFormProps<ApiDirType.CATEGORIES_TR, FinCategoryEntity, FinCategoryFormData> {}

const FormCreateFinCategory: React.FC<FormCreateFinCategoryProps> = ({
  _id,
  type,
  edit,
  defaultState,
  onSubmit,
  dirType,
  parent,
  ...props
}) => {
  const submitOptions = useAfterSubmitOptions();

  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
    formValues,
  } = useAppForm<FinCategoryFormData>({
    defaultValues: defaultState ?? undefined,
    resolver: yupResolver(finCategorySchema),
    reValidateMode: 'onSubmit',
    mode: 'onChange',
  });

  const onValid = (data: FinCategoryFormData) => {
    console.log('FormCreateCategory on valid', { defaultState, data });

    onSubmit &&
      onSubmit(data, {
        ...submitOptions.state,
      });
  };
  return (
    <ModalForm
      {...props}
      onSubmit={handleSubmit(onValid)}
      isValid={isValid}
      extraFooter={<FormAfterSubmitOptions {...submitOptions} />}
    >
      <FormInputs>
        <InputLabel label={t('type')} direction={'vertical'} error={errors.type} disabled>
          <InputText defaultValue={type ? t(type).toUpperCase() : type} disabled />
        </InputLabel>

        {defaultState?.parent?._id && (
          <InputLabel label={t('parentItem')} direction={'vertical'} error={errors.type} disabled>
            <InputText value={formValues.parent?.label ?? undefined} disabled />
          </InputLabel>
        )}

        <InputLabel label={t('label')} direction={'vertical'} error={errors.label} required>
          <InputText placeholder={t('insertLabel')} {...register('label')} required autoFocus />
        </InputLabel>

        <InputLabel label={t('comment')} direction={'vertical'} error={errors.description}>
          <TextareaPrimary placeholder={t('insertComment')} {...register('description')} maxLength={250} />
        </InputLabel>
      </FormInputs>
    </ModalForm>
  );
};

export default FormCreateFinCategory;
