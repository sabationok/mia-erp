import ModalForm from 'components/ModalForm';
import styled from 'styled-components';
import { CountType, ICount, ICountFormData } from 'redux/directories/counts.types';
import React from 'react';
import { useForm } from 'react-hook-form';
import translate from '../../lang';
import t from '../../lang';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DirectoriesFormProps } from '../Directories/dir.types';

export interface FormCreateCountProps extends DirectoriesFormProps<CountType, ICount, ICountFormData> {}

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
  } = useForm<ICountFormData>({
    defaultValues: {
      ...data,
      type,
      parent: parent?._id || null,
    },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });

  function formEventWrapper(evHandler?: (args: ICountFormData) => void) {
    if (evHandler) {
      return handleSubmit(evHandler);
    }
  }

  return (
    <ModalForm onSubmit={formEventWrapper(onSubmit)} {...props}>
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

        <InputLabel label={t('startBalance')} direction={'vertical'} error={errors.startBalance}>
          <InputText placeholder={translate('insertStartBalance')} {...register('startBalance')} type="number" />
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
