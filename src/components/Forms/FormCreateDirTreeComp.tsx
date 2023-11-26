import ModalForm from 'components/ModalForm';
import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import { t } from '../../lang';
import { DirectoriesFormProps, IBaseDirItem, IDirItemBase } from '../../types/dir.types';
import FormAfterSubmitOptions, { useAfterSubmitOptions } from './components/FormAfterSubmitOptions';
import { useAppForm } from '../../hooks';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { FormInputs } from './components/atoms';

export interface FormCreateDirTreeCompProps<DirType extends ApiDirType = any, FD = any>
  extends DirectoriesFormProps<DirType, IDirItemBase<DirType>, FD> {}

const validation = yup.object().shape({
  label: yup.string().required(),
  description: yup.string().max(250).optional(),
});

const FormCreateDirTreeComp: React.FC<FormCreateDirTreeCompProps> = ({
  _id,
  type,
  edit,
  defaultState,
  onSubmit,
  dirType,
  ...props
}) => {
  const submitOptions = useAfterSubmitOptions();
  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
  } = useAppForm<IBaseDirItem>({
    defaultValues: {
      ...defaultState,
      type,
    },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });

  const onValid = (data: IBaseDirItem) => {
    onSubmit && onSubmit(data, submitOptions.state);
  };

  return (
    <ModalForm
      {...props}
      onSubmit={handleSubmit(onValid)}
      isValid={isValid}
      extraFooter={<FormAfterSubmitOptions {...submitOptions} />}
    >
      <FormInputs>
        {props.filterOptions && (
          <InputLabel label={t('type')} error={errors.type} disabled>
            <InputText defaultValue={type ? t(`${type}s` as any).toUpperCase() : type} disabled />
          </InputLabel>
        )}

        {defaultState?.parent?._id && (
          <InputLabel label={t('parentItem')} error={errors.type} disabled>
            <InputText defaultValue={defaultState?.parent?.label} disabled />
          </InputLabel>
        )}

        <InputLabel label={t('label')} error={errors.label} required>
          <InputText placeholder={t('insertLabel')} {...register('label')} required autoFocus />
        </InputLabel>

        {dirType === ApiDirType.BRANDS && (
          <InputLabel label={t('manufacturer')} error={errors.manufacturer}>
            <InputText placeholder={t('manufacturer')} {...register('manufacturer')} />
          </InputLabel>
        )}

        {/*<InputLabel label={t('')} error={errors.label}>*/}
        {/*  <InputText placeholder={t('insertLabel')} {...register('label')} autoFocus />*/}
        {/*</InputLabel>*/}

        <InputLabel label={t('comment')} error={errors.description}>
          <TextareaPrimary placeholder={t('insertComment')} {...register('description')} maxLength={250} />
        </InputLabel>
      </FormInputs>
    </ModalForm>
  );
};

export default FormCreateDirTreeComp;
