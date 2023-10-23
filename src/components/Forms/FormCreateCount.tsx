import ModalForm from 'components/ModalForm';
import { ICount, ICountFormData } from 'redux/directories/counts.types';
import React from 'react';
import translate, { t } from '../../lang';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DirectoriesFormProps } from '../Directories/dir.types';
import { useAppForm } from '../../hooks';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { pick } from 'lodash';
import FormAfterSubmitOptions, { useAfterSubmitOptions } from './components/FormAfterSubmitOptions';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { FormInputs } from './components/atoms';

export interface FormCreateCountProps extends DirectoriesFormProps<ApiDirType.COUNTS, ICount, ICountFormData> {}

const validation = yup.object().shape({
  label: yup.string().required(),
  description: yup.string().max(250).optional(),
});
const FormCreateCount: React.FC<FormCreateCountProps> = ({
  parent,
  create,
  type,
  data,
  edit,
  _id,
  onSubmit,
  ...props
}) => {
  const submitOptions = useAfterSubmitOptions();

  const {
    formState: { errors },
    register,
    handleSubmit,
    closeAfterSave,
    clearAfterSave,
    toggleAfterSubmitOption,
  } = useAppForm<ICountFormData>({
    defaultValues: parent?._id
      ? {
          ...data,
          type,
          parent: pick(parent, '_id'),
        }
      : {
          ...data,
          type,
        },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });

  function formEventWrapper(evHandler?: AppSubmitHandler<ICountFormData>) {
    if (evHandler) {
      return handleSubmit(data =>
        evHandler(data, {
          ...submitOptions.state,
        })
      );
    }
  }

  return (
    <ModalForm
      onSubmit={formEventWrapper(onSubmit)}
      {...props}
      extraFooter={<FormAfterSubmitOptions {...submitOptions} />}
    >
      <FormInputs>
        <InputLabel label={t('type')} direction={'vertical'} error={errors.type} disabled>
          <InputText placeholder={type ? translate(type) : type} disabled />
        </InputLabel>

        {parent && (
          <InputLabel label={t('parentItem')} direction={'vertical'} disabled>
            <InputText placeholder={parent?.label} disabled />
          </InputLabel>
        )}

        <InputLabel label={t('label')} direction={'vertical'} error={errors.label}>
          <InputText placeholder={translate('insertLabel')} {...register('label')} autoFocus />
        </InputLabel>

        <InputLabel label={t('startBalance')} direction={'vertical'} error={errors.balance}>
          <InputText placeholder={translate('insertStartBalance')} {...register('balance')} type="number" />
        </InputLabel>

        <InputLabel label={t('currency')} direction={'vertical'} error={errors.currency} disabled>
          <InputText placeholder={translate('selectCurrency')} {...register('currency')} disabled />
        </InputLabel>

        <InputLabel label={t('comment')} direction={'vertical'} error={errors.description}>
          <TextareaPrimary placeholder={t('insertComment')} {...register('description')} maxLength={250} />
        </InputLabel>
      </FormInputs>
    </ModalForm>
  );
};

export default FormCreateCount;
