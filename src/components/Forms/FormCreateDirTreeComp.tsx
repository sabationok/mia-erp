import ModalForm from 'components/ModalForm';
import React from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import t from '../../lang';
import { DirectoriesFormProps, IBaseDirItem, IDirItemBase } from '../Directories/dir.types';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import FormAfterSubmitOptions from './components/FormAfterSubmitOptions';
import { useAppForm } from '../../hooks';
import { ApiDirType } from '../../redux/APP_CONFIGS';

export interface FormCreateDirTreeCompProps<T = any, D extends ApiDirType = any, FD = any>
  extends DirectoriesFormProps<T, IDirItemBase<D, T>, FD> {
  dirType?: ApiDirType;
}

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
  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
    closeAfterSave,
    clearAfterSave,
    toggleAfterSubmitOption: toggleOption,
  } = useAppForm<IBaseDirItem>({
    defaultValues: defaultState?.parent?._id
      ? {
          ...defaultState,
          type,
          parent: { _id: defaultState?.parent?._id },
        }
      : {
          ...defaultState,
          type,
        },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });

  function formEventWrapper(evHandler?: AppSubmitHandler<IBaseDirItem>) {
    if (evHandler) {
      return handleSubmit(data =>
        evHandler(data, {
          closeAfterSave,
          clearAfterSave,
        })
      );
    } else {
      console.log('FormCreateDirTreeComp onSubmit not passed.', dirType);
    }
  }

  return (
    <ModalForm
      {...props}
      onSubmit={formEventWrapper(onSubmit)}
      isValid={isValid}
      extraFooter={<FormAfterSubmitOptions {...{ closeAfterSave, clearAfterSave, toggleOption }} />}
    >
      <Inputs>
        <InputLabel label={t('type')} error={errors.type} disabled>
          <InputText defaultValue={type ? t(`${type}s` as any).toUpperCase() : type} disabled />
        </InputLabel>

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

        {dirType === ApiDirType.WAREHOUSES && (
          <InputLabel label={t('code')} error={errors.code}>
            <InputText placeholder={t('insertCode')} {...register('code')} />
          </InputLabel>
        )}

        {/*<InputLabel label={t('')} error={errors.label}>*/}
        {/*  <InputText placeholder={t('insertLabel')} {...register('label')} autoFocus />*/}
        {/*</InputLabel>*/}

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

  background-color: inherit;
`;

export default FormCreateDirTreeComp;
