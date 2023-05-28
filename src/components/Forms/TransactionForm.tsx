import * as React from 'react';
import { useCallback, useEffect, useMemo } from 'react';
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
import { createTransactionForReq } from '../../utils';
import { useAppSelector } from '../../redux/store.store';
import { TransactionsService } from '../../redux/transactions/useTransactionsService.hook';
import useCreateSelectorTreeData from '../../hooks/useCreateSelectorTreeData';
import FlexBox from '../atoms/FlexBox';

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
  const {
    counts: { counts },
    categories: { categories },
  } = useAppSelector();

  const countsTreeData = useCreateSelectorTreeData(counts);
  const categoriesTreeData = useCreateSelectorTreeData(categories);

  const {
    formState: { errors },
    register,
    setValue,
    watch,
    unregister,
  } = useForm<ITransaction>({
    defaultValues: { currency: 'UAH', ...defaultState },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });
  const formValues = watch();
  // const registerSelect = useRegisterSelect(setValue, formValues, unregister);

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
          console.log({
            option,
            formValues,
            name,
            props,
            childControl,
            setValue,
            unregister,
          });

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

  const renderInputsCountIn = useMemo(() => {
    const { parentList: parentOptions, treeData } = countsTreeData;
    const childOptions = formValues.countIn?._id ? treeData[formValues.countIn?._id] : undefined;

    return formValues.type && ['INCOME', 'TRANSFER'].includes(formValues.type) ? (
      <>
        <CustomSelect
          label="Рахунок IN"
          placeholder="Рахунок IN"
          {...registerSelect('countIn', { options: parentOptions }, { childName: 'subCountIn' })}
        />
        <CustomSelect
          label="Суб-рахунок IN"
          placeholder="Суб-рахунок IN"
          {...registerSelect('subCountIn', {
            options: childOptions,
          })}
        />
      </>
    ) : null;
  }, [countsTreeData, formValues.countIn?._id, formValues.type, registerSelect]);

  const renderInputsCountOut = useMemo(() => {
    const { parentList: parentOptions, treeData } = countsTreeData;
    const childOptions = formValues.countOut?._id ? treeData[formValues.countOut?._id] : undefined;

    return formValues.type && ['EXPENSE', 'TRANSFER'].includes(formValues.type) ? (
      <>
        <CustomSelect
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
          label="Суб-рахунок OUT"
          placeholder="Суб-рахунок OUT"
          {...registerSelect('subCountOut', { options: childOptions, error: errors.subCountOut })}
        />
      </>
    ) : null;
  }, [countsTreeData, errors.countOut, errors.subCountOut, formValues.countOut?._id, formValues.type, registerSelect]);

  const renderInputsCategories = useMemo(() => {
    const { parentList: parentOptions, treeData } = categoriesTreeData;
    const childOptions = formValues.category?._id ? treeData[formValues.category?._id] : undefined;

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
        />
      </>
    );
  }, [categoriesTreeData, formValues.category?._id, registerSelect]);

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
      <FlexBox className={'inputs'} flex={'1'} fillWidth maxHeight={'100%'} padding={'12px'} overflow={'auto'}>
        <InputLabel label="Дата і час" direction={'vertical'}>
          <InputText placeholder="Дата і час" type="datetime-local" {...register('transactionDate')} />
        </InputLabel>
        <GridWrapper>
          <InputLabel label="Сума" direction={'vertical'}>
            <InputText placeholder="Сума" {...register('amount')} />
          </InputLabel>

          <InputLabel label="Валюта" direction={'vertical'}>
            <InputText placeholder="Валюта" {...register('currency')} disabled />
          </InputLabel>
        </GridWrapper>

        {renderInputsCountIn}
        {renderInputsCountOut}
        {renderInputsCategories}

        <InputLabel label="Контрагент" direction={'vertical'} disabled>
          <InputText placeholder="Контрагент" disabled />
        </InputLabel>

        <InputLabel label="Проєкт" direction={'vertical'} disabled>
          <InputText placeholder="Проєкт" disabled />
        </InputLabel>

        <InputLabel label="Документ" direction={'vertical'} disabled>
          <InputText placeholder="Документ" disabled />
        </InputLabel>

        <InputLabel label="Коментар" direction={'vertical'}>
          <TextareaPrimary placeholder="Коментар" {...register('comment')} />
        </InputLabel>
      </FlexBox>
    </ModalForm>
  );
};
const Inputs = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

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
