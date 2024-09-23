import ModalForm from 'components/ModalForm';
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import TextareaPrimary from '../../atoms/Inputs/TextareaPrimary';
import { t } from '../../../i18e';
import { DirectoriesFormProps, OfferCategoryEntity } from '../../../types/dir.types';
import FormAfterSubmitOptions, { useAfterSubmitOptions } from '../../atoms/FormAfterSubmitOptions';
import { useAppForm } from '../../../hooks';
import { ApiDirType } from '../../../redux/APP_CONFIGS';
import { FormInputs } from '../components/atoms';
import { offerCategoryDtoSchema } from '../../../schemas/directories';
import { IBaseKeys, OnlyUUID } from '../../../types/utils.types';

export type OfferCategoryFormData = Partial<Omit<OfferCategoryEntity, IBaseKeys | 'childrenList' | 'parent'>> &
  Partial<OnlyUUID> & {
    parent?: Partial<OnlyUUID> & { label?: string };
    parentId?: string;
  };
export interface FormCreateOfferCategoryProps
  extends DirectoriesFormProps<ApiDirType.CATEGORIES_PROD, OfferCategoryEntity, OfferCategoryFormData> {}

const FormCreateOfferCategory: React.FC<FormCreateOfferCategoryProps> = ({
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
    formState: { errors },
    register,
    handleSubmit,
    formValues,
  } = useAppForm<OfferCategoryFormData>({
    defaultValues: defaultState,
    resolver: yupResolver(offerCategoryDtoSchema, { stripUnknown: true }),
    reValidateMode: 'onSubmit',
    mode: 'onBlur',
  });

  const onValid = (data: OfferCategoryFormData) => {
    console.log('FormCreateOfferCategory on valid', { defaultState, data });

    onSubmit &&
      onSubmit(data, {
        ...submitOptions.state,
      });
  };
  return (
    <ModalForm {...props} onSubmit={handleSubmit(onValid)} extraFooter={<FormAfterSubmitOptions {...submitOptions} />}>
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

export default FormCreateOfferCategory;
