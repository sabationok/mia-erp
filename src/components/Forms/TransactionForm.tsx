// @flow
import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ModalForm, { ModalFormProps } from '../ModalForm';
import styled from 'styled-components';
import { ITransaction, ITransactionForReq } from 'redux/transactions/transactions.types';
import { CategoryTypes, ICategory } from 'redux/categories/categories.types';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as _ from 'lodash';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import { FilterOpt } from '../ModalForm/ModalFilter';
import CustomSelect, { CustomSelectProps } from '../atoms/Inputs/CustomSelect';
import { createTransactionForReq } from '../../utils';
import { useAppSelector } from '../../redux/store.store';
import { TransactionsService } from '../../redux/transactions/useTransactionsService.hook';
import { createTreeDataMapById, IBaseFields, TreeOptions } from '../../utils/createTreeData';
import { ICount } from '../../redux/counts/counts.types';

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

const useSelectorsTreeData = () => {
  const {
    counts: { counts },
    categories: { categories },
  } = useAppSelector();
  const [state, setState] = useState<Record<string, TreeOptions<ICategory | ICount>>>({});
  useMemo(() => {
    createTreeDataMapById(counts, {
      onSuccess: data => setState(prev => ({ ...prev, counts: data })),
    });
    createTreeDataMapById(categories, {
      onSuccess: data => setState(prev => ({ ...prev, categories: data as TreeOptions<ICategory> })),
    });
  }, [categories, counts]);

  return state;
};
const TransactionForm: React.FC<TransactionFormProps> = ({
  edit,
  onSubmit,
  onSubmitEdit,
  copy,
  defaultState,
  ...props
}) => {
  const {
    counts: { counts },
    categories: { categories },
  } = useAppSelector();

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
  const registerSelect = useCallback(
    <K extends keyof ITransaction = keyof ITransaction>(
      name: K,
      props?: Omit<CustomSelectProps<ITransaction[K]>, 'name'>,
      childControl?: {
        childName?: keyof ITransaction;
      }
    ): CustomSelectProps<ITransaction[K]> => {
      return {
        onSelect: (option, value) => {
          setValue<K>(name, option as any);
        },
        name,
        selectValue: formValues[name],
        onClear: () => {
          if (!formValues[name]) return;

          setValue(name, null as any);
          unregister(name);
          console.log('cleared input', name, formValues[name]);

          if (childControl?.childName) {
            console.log('cleared child', childControl.childName);
            setValue(childControl.childName, null as any);
            unregister(childControl.childName);
            console.log('cleared child', childControl.childName, formValues[childControl.childName]);
          }
          if (!props?.options || props.options.length === 0) {
          }
        },
        disabled: !props?.options || props?.options?.length === 0,
        ...props,
      };
    },
    [formValues, setValue, unregister]
  );

  const [countTreeOptions, setCountTreeOptions] = useState<
    Record<string, (ICount & IBaseFields<ICount>)[] | undefined>
  >({});
  const [categoriesTreeOptions, setCategoriesTreeOptions] = useState<
    Record<string, (ICategory & IBaseFields<ICategory>)[] | undefined>
  >({});

  useMemo(() => {
    createTreeDataMapById(counts, {
      onSuccess: setCountTreeOptions,
    });
    createTreeDataMapById(categories, {
      onSuccess: setCategoriesTreeOptions,
    });
  }, [categories, counts]);

  const renderInputsCountIn = useMemo(() => {
    const parentOptions = counts.filter(el => !el.owner);
    const childOptions = formValues.countIn?._id ? countTreeOptions[formValues.countIn?._id] : undefined;

    return formValues.type && ['INCOME', 'TRANSFER'].includes(formValues.type) ? (
      <>
        <CustomSelect
          keepOpen
          label="Рахунок IN"
          placeholder="Рахунок IN"
          {...registerSelect('countIn', { options: parentOptions }, { childName: 'subCountIn' })}
        />
        <CustomSelect
          keepOpen
          label="Суб-рахунок IN"
          placeholder="Суб-рахунок IN"
          {...registerSelect('subCountIn', {
            options: childOptions,
          })}
        />
      </>
    ) : null;
  }, [countTreeOptions, counts, formValues.countIn?._id, formValues.type, registerSelect]);

  const renderInputsCountOut = useMemo(() => {
    const parentOptions = counts.filter(el => !el.owner);

    const childOptions = formValues.countOut?._id ? countTreeOptions[formValues.countOut?._id] : undefined;

    return formValues.type && ['EXPENSE', 'TRANSFER'].includes(formValues.type) ? (
      <>
        <CustomSelect
          keepOpen
          label="Рахунок OUT"
          placeholder="Рахунок OUT"
          {...registerSelect(
            'countOut',
            {
              options: parentOptions,
              error: errors.countOut,
            },
            { childName: 'subCountOut' }
          )}
        />
        <CustomSelect
          keepOpen
          label="Суб-рахунок OUT"
          placeholder="Суб-рахунок OUT"
          {...registerSelect('subCountOut', { options: childOptions, error: errors.subCountOut })}
        />
      </>
    ) : null;
  }, [
    countTreeOptions,
    counts,
    errors.countOut,
    errors.subCountOut,
    formValues.countOut?._id,
    formValues.type,
    registerSelect,
  ]);

  const renderInputsCategories = useMemo(() => {
    const parentOptions = categories.filter(el => !el.owner);

    const childOptions = formValues.category?._id ? categoriesTreeOptions[formValues.category?._id] : undefined;

    return (
      <>
        <CustomSelect
          keepOpen
          label="Категорія"
          placeholder="Категорія"
          {...registerSelect('category', { options: parentOptions })}
        />
        <CustomSelect
          keepOpen
          label="Підкатегорія"
          placeholder="Підкатегорія"
          {...registerSelect('subCategory', { options: childOptions })}
        />
      </>
    );
  }, [categories, categoriesTreeOptions, formValues.category?._id, registerSelect]);

  function onSubmitWrapper() {
    let submitData = formValues;

    if (formValues.type === 'INCOME') submitData = _.omit(formValues, 'countOut', 'subCountOut');
    if (formValues.type === 'EXPENSE') submitData = _.omit(formValues, 'countIn', 'subCountIn');

    console.log('formValues', formValues);
    // console.log('onSubmitWrapper', submitData);
    // console.log('createTransactionForReq', createTransactionForReq(submitData));

    onSubmit && onSubmit(createTransactionForReq(submitData, [], 'transactionDate'));

    onSubmitEdit &&
      defaultState?._id &&
      onSubmitEdit({
        _id: defaultState?._id,
        data: createTransactionForReq(submitData, [], 'transactionDate'),
      });
  }

  useEffect(() => console.log('Render Transaction form ==============>>>>>>>>'), []);
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

        {formValues.type === 'TRANSFER' && (
          <>
            {renderInputsCategories}
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
