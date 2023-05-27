// @flow
import * as React from 'react';
import { useMemo } from 'react';
import ModalForm, { ModalFormProps } from '../ModalForm';
import styled from 'styled-components';
import { ITransaction, ITransactionForReq } from 'redux/transactions/transactions.types';
import { CategoryTypes } from 'redux/categories/categories.types';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as _ from 'lodash';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import { FilterOpt } from '../ModalForm/ModalFilter';
import CustomSelect, { CustomSelectProps } from '../atoms/Inputs/CustomSelect';
import { createTransactionForReq, founderByDataPath } from '../../utils';
import { useAppSelector } from '../../redux/store.store';
import { TransactionsService } from '../../redux/transactions/useTransactionsService.hook';

export type TransactionsFilterOpt = FilterOpt<CategoryTypes>;

export interface TransactionFormProps extends Omit<ModalFormProps, 'onSubmit'> {
  edit?: boolean;
  copy?: boolean;
  id?: string;
  onSubmit?: SubmitHandler<ITransactionForReq>;
  onSubmitEdit?: TransactionsService['editById'];
  filterOptions?: TransactionsFilterOpt[];
  defaultState?: Partial<ITransaction>;
}

const validationItem = yup
  .object()
  .shape({
    _id: yup.string(),
    label: yup.string(),
    owner: yup
      .object()
      .shape({
        _id: yup.string(),
        label: yup.string(),
      })
      .optional()
      .nullable(),
  })
  .nullable();
const validation = yup.object().shape({
  countIn: validationItem,
  subCountIn: validationItem,
});

const TransactionForm: React.FC<TransactionFormProps> = ({
  edit,
  onSubmit,
  onSubmitEdit,
  copy,
  defaultState,
  ...props
}) => {
  const { counts, categories } = useAppSelector();
  const {
    formState: { errors },
    register,
    setValue,
    watch,
    unregister,
  } = useForm<ITransaction>({
    defaultValues: defaultState,
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });
  const formValues = watch();

  const renderInputsCountIn = useMemo(() => {
    const parentOptions = counts.counts.filter(el => !el.owner);
    const childOptions = founderByDataPath({
      path: 'owner._id',
      searchQuery: formValues.countIn?._id,
      data: counts.counts,
    });
    return formValues.type && ['INCOME', 'TRANSFER'].includes(formValues.type) ? (
      <>
        <CustomSelect
          label="Рахунок IN"
          placeholder="Рахунок IN"
          {...registerSelect('countIn', { options: parentOptions })}
        />
        <CustomSelect
          label="Суб-рахунок IN"
          placeholder="Суб-рахунок IN"
          {...registerSelect('subCountIn', { options: parentOptions })}
          disabled={childOptions.length === 0}
        />
      </>
    ) : null;
  }, [counts.counts, formValues.countIn?._id, formValues.type, registerSelect]);

  const renderInputsCountOut = useMemo(() => {
    const parentOptions = counts.counts.filter(el => !el.owner);
    const childOptions = founderByDataPath({
      path: 'owner._id',
      searchQuery: formValues.countOut?._id,
      data: counts.counts,
    });
    return formValues.type && ['EXPENSE', 'TRANSFER'].includes(formValues.type) ? (
      <>
        <CustomSelect
          label="Рахунок OUT"
          placeholder="Рахунок OUT"
          {...registerSelect('countOut', { options: parentOptions, error: errors.countOut })}
        />
        <CustomSelect
          label="Суб-рахунок OUT"
          placeholder="Суб-рахунок OUT"
          {...registerSelect('subCountOut', { options: childOptions, error: errors.subCountOut })}
          disabled={childOptions.length === 0}
        />
      </>
    ) : null;
  }, [counts.counts, errors, formValues.countOut?._id, formValues.type, registerSelect]);

  const renderInputsCategories = useMemo(() => {
    const parentOptions = categories.categories.filter(el => !el.owner);
    const childOptions = founderByDataPath({
      path: 'owner._id',
      searchQuery: formValues.category?._id,
      data: categories.categories,
    });

    return (
      <>
        <CustomSelect
          label="Категорія"
          placeholder="Категорія"
          {...registerSelect('category', { options: parentOptions })}
        />
        <CustomSelect
          label="Підкатегорія"
          placeholder="Підкатегорія"
          {...registerSelect('subCategory', { options: childOptions })}
          disabled={childOptions.length === 0}
        />
      </>
    );
  }, [categories.categories, formValues.category?._id, registerSelect]);

  function onSubmitWrapper() {
    let submitData = formValues;

    if (formValues.type === 'INCOME') submitData = _.omit(formValues, 'countOut', 'subCountOut');
    if (formValues.type === 'EXPENSE') submitData = _.omit(formValues, 'countIn', 'subCountIn');

    console.log('formValues', formValues);
    console.log('onSubmitWrapper', submitData);
    console.log('createTransactionForReq', createTransactionForReq(submitData));

    onSubmit && onSubmit(createTransactionForReq(submitData));
    //
    onSubmitEdit &&
      defaultState?._id &&
      onSubmitEdit({
        _id: defaultState?._id,
        data: createTransactionForReq(submitData),
      });
  }

  function registerSelect<K extends keyof ITransaction = keyof ITransaction>(
    name: K,
    props?: Omit<CustomSelectProps<ITransaction[K]>, 'name'>
  ): CustomSelectProps<ITransaction[K]> {
    return {
      onSelect: (option, value) => {
        if (!option) {
          console.log('option null', option);
          setValue<K>(name, option as any);
          return;
        }

        setValue<K>(name, option as any);
      },
      name,
      selectValue: props?.options?.length !== 0 ? formValues[name] : undefined,
      ...props,
    };
  }

  return (
    <ModalForm onSubmit={onSubmitWrapper} onOptSelect={({ value }) => value && setValue('type', value)} {...props}>
      <Inputs className={'inputs'}>
        <InputLabel label="Дата і час" direction={'vertical'}>
          <InputText placeholder="Дата і час" type="datetime-local" {...register('transactionDate')} />
        </InputLabel>
        <GridWrapper>
          <InputLabel label="Сума" direction={'vertical'}>
            <InputText placeholder="Сума" {...register('amount')} />
          </InputLabel>

          <InputLabel label="Валюта" direction={'vertical'}>
            <InputText name="currency" placeholder="Валюта" />
          </InputLabel>
        </GridWrapper>

        {renderInputsCountIn}
        {renderInputsCountOut}
        {renderInputsCategories}

        {formValues.type === 'TRANSFER' && (
          <>
            <InputLabel label="Контрагент" direction={'vertical'}>
              <InputText placeholder="Контрагент" {...register('contractor')} />
            </InputLabel>

            <InputLabel label="Проєкт" direction={'vertical'}>
              <InputText placeholder="Проєкт" {...register('project')} />
            </InputLabel>

            <InputLabel label="Документ" direction={'vertical'}>
              <InputText placeholder="Документ" {...register('document')} />
            </InputLabel>

            <InputLabel label="Коментар" direction={'vertical'}>
              <TextareaPrimary placeholder="Коментар" {...register('comment')} />
            </InputLabel>
          </>
        )}
      </Inputs>
    </ModalForm>
  );
};
const Inputs = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  //gap: 12px;
  overflow: auto;
  padding: 12px;
  max-height: 100%;
`;
const GridWrapper = styled.div<{ gridTemplateColumns?: string }>`
  display: grid;
  grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns || '1fr 120px'};
  gap: 12px;
`;
export default TransactionForm;
