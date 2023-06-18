import ModalForm, { ModalFormProps } from 'components/ModalForm';
import styled from 'styled-components';
import { CountType, ICount } from 'redux/counts/counts.types';
import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import translate from '../../../lang';
import t from '../../../lang';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import TextareaPrimary from '../../atoms/Inputs/TextareaPrimary';

export interface FormCreateCountProps extends Omit<ModalFormProps, 'onSubmit'> {
  _id?: string;
  parent?: Partial<ICount>;
  type: CountType;
  edit?: boolean;
  create?: boolean;
  count?: Partial<ICount>;
  onSubmit?: SubmitHandler<CountFormData>;
}

export interface CountFormData extends Omit<ICount, '_id' | 'createdAt' | 'updatedAt' | 'parent'> {
  parent?: string | null;
}

const FormCreateCount: React.FC<FormCreateCountProps> = ({
  parent,
  create,
  type,
  count,
  edit,
  _id,
  onSubmit,
  ...props
}) => {
  const [formData, setFormData] = useState<CountFormData | undefined>({ ...count, type, parent: parent?._id || null });

  function onFormDataChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = ev.target;

    setFormData(prev => {
      console.log({ ...prev, [name]: value });
      return { ...prev, [name]: value };
    });
  }

  function formEventWrapper(evHandler?: (args: any) => void, args?: any) {
    if (evHandler) {
      return () => evHandler(args);
    }
  }

  return (
    <ModalForm onSubmit={formEventWrapper(onSubmit, formData)} {...props}>
      <Inputs>
        <InputLabel
          label={t('type')}
          direction={'vertical'}
          // error={errors.type}
          disabled
        >
          <InputText placeholder={translate(type)} disabled />
        </InputLabel>

        {parent && (
          <InputLabel
            label={t('parentItem')}
            direction={'vertical'}
            // error={errors.parentItem}
            disabled
          >
            <InputText placeholder={parent?.label} disabled />
          </InputLabel>
        )}

        <InputLabel
          label={t('label')}
          direction={'vertical'}
          // error={errors.label}
        >
          <InputText placeholder={translate('insertLabel')} name={'label'} />
        </InputLabel>

        <InputLabel
          label={t('startBalance')}
          direction={'vertical'}
          // error={errors.startBalance}
          disabled
        >
          <InputText placeholder={translate('insertStartBalance')} name="amount" type="number" disabled />
        </InputLabel>

        <InputLabel
          label={t('currency')}
          direction={'vertical'}
          // error={errors.currency}
          disabled
        >
          <InputText placeholder={translate('selectCurrency')} name={'currency'} disabled />
        </InputLabel>

        <InputLabel
          label={t('comment')}
          direction={'vertical'}
          // !! error={errors.description}
        >
          <TextareaPrimary
            placeholder={t('insertComment')}
            // !! {...register('description')}
            maxLength={250}
          />
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
