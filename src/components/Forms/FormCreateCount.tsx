import ModalForm from 'components/ModalForm';
import styled from 'styled-components';
import { ICount, ICountFormData } from 'redux/directories/counts.types';
import React from 'react';
import translate from '../../lang';
import t from '../../lang';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DirectoriesFormProps } from '../Directories/dir.types';
import { useAppForm } from '../../hooks';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { pick } from 'lodash';
import FormAfterSubmitOptions from './components/FormAfterSubmitOptions';
import { ApiDirType } from '../../redux/APP_CONFIGS';

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
          closeAfterSave,
          clearAfterSave,
        })
      );
    }
  }

  return (
    <ModalForm
      onSubmit={formEventWrapper(onSubmit)}
      {...props}
      extraFooter={
        <FormAfterSubmitOptions
          toggleOption={toggleAfterSubmitOption}
          closeAfterSave={closeAfterSave}
          clearAfterSave={clearAfterSave}
        />
      }
    >
      <Inputs>
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

export default FormCreateCount;
