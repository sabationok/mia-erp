import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import TextareaPrimary from '../../atoms/Inputs/TextareaPrimary';
import { t } from '../../../i18e';
import { DirectoriesFormProps, DirItemFormData, OfferCategoryEntity } from '../../../types/dir.types';
import FormAfterSubmitOptions, { useAfterSubmitOptions } from '../../atoms/FormAfterSubmitOptions';
import { useAppForm } from '../../../hooks';
import { ApiDirType } from '../../../redux/APP_CONFIGS';
import { FormInputs } from '../components/atoms';
import { offerCategoryDtoSchema } from '../../../schemas/directories';
import ModalBase from '../../atoms/Modal';
import { FlexForm } from '../../atoms/FlexBox';
import ModalFooter from '../../atoms/Modal/ModalFooter';

export type OfferCategoryFormData = DirItemFormData<OfferCategoryEntity>;

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
    <ModalBase title={props.title} fillWidth={props.fillWidth} fillHeight={props.fillHeight}>
      <FlexForm
        onSubmit={handleSubmit(onValid, errors => {
          console.error(FormCreateOfferCategory.name, errors);
        })}
      >
        <FormInputs>
          <InputLabel label={t('type')} direction={'vertical'} error={errors.type} disabled>
            <InputText defaultValue={type ? t(type).toUpperCase() : type} disabled />
          </InputLabel>

          {parent?._id && (
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

        <FormAfterSubmitOptions {...submitOptions} />

        <ModalFooter canSubmit />
      </FlexForm>
    </ModalBase>
  );
};

export default FormCreateOfferCategory;
