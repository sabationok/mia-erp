// @flow
import * as React from 'react';
import { useMemo } from 'react';
import ModalForm, { FilterOpt, ModalFormProps } from '../ModalForm';
import styled from 'styled-components';
import {
  ITransactionForReq,
  ITransactionReqData,
} from 'redux/transactions/transactions.types';
import { CategoryTypes } from 'redux/categories/categories.types';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IBase } from '../../redux/global.types';
import * as _ from 'lodash';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import MyTreeSelect from '../atoms/Inputs/MyTreeSelect';

export type TransactionsFilterOpt = FilterOpt<CategoryTypes>;

export interface TransactionFormProps extends Omit<ModalFormProps, 'onSubmit'> {
  edit?: boolean;
  copy?: boolean;
  id?: string;
  onSubmit?: SubmitHandler<ITransactionForReq>;
  onSubmitEdit?: (data: ITransactionReqData) => void;
  filterOptions?: TransactionsFilterOpt[];
  defaultState?: Partial<ITransactionForReq> & Partial<IBase>;
}

const validation = yup.object().shape({});

const TransactionForm: React.FC<TransactionFormProps> = ({
  edit,
  onSubmit,
  onSubmitEdit,
  copy,
  defaultState,
  ...props
}) => {
  const {
    // formState: { errors },
    register,
    setValue,
    getValues,
    watch,
  } = useForm<ITransactionForReq>({
    defaultValues: _.omit(defaultState, '_id', 'createdAt', 'updatedAt') || {},
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });
  const formValues = watch();

  const renderInputsCountIn = useMemo(() => {
    return formValues.type &&
      ['INCOME', 'TRANSFER'].includes(formValues.type) ? (
      <>
        <InputLabel label="Рахунок IN" direction={'vertical'}>
          <InputText placeholder="Рахунок IN" {...register('countIn')} />
        </InputLabel>
        <InputLabel label="Суб-Рахунок IN" direction={'vertical'}>
          <InputText placeholder="Суб-Рахунок IN" {...register('subCountIn')} />
        </InputLabel>
      </>
    ) : null;
  }, [formValues.type, register]);

  const renderInputsCountOut = useMemo(() => {
    return formValues.type &&
      ['EXPENSE', 'TRANSFER'].includes(formValues.type) ? (
      <>
        <InputLabel label="Рахунок OUT" direction={'vertical'}>
          <InputText placeholder="Рахунок OUT" {...register('countOut')} />
        </InputLabel>

        <InputLabel label="Суб-Рахунок OUT" direction={'vertical'}>
          <InputText
            placeholder="Суб-Рахунок OUT"
            {...register('subCountOut')}
          />
        </InputLabel>
      </>
    ) : null;
  }, [formValues.type, register]);

  function onSubmitWrapper() {
    let submitData = formValues;

    if (formValues.type === 'INCOME')
      submitData = _.omit(formValues, 'countOut', 'subCountOut');
    if (formValues.type === 'EXPENSE')
      submitData = _.omit(formValues, 'countIn', 'subCountIn');

    console.log(submitData);

    onSubmit && onSubmit(submitData);

    onSubmitEdit &&
      defaultState?._id &&
      onSubmitEdit({
        _id: defaultState?._id,
        data: submitData,
      });
  }

  return (
    <ModalForm
      onSubmit={onSubmitWrapper}
      defaultFilterValue={getValues('type')}
      onOptSelect={({ value }) => value && setValue('type', value)}
      {...props}
    >
      <Inputs className={'inputs'}>
        <InputLabel label="Дата і час" direction={'vertical'}>
          <InputText
            placeholder="Дата і час"
            type="datetime-local"
            {...register('transactionDate')}
          />
        </InputLabel>
        <GridWrapper>
          <InputLabel label="Сума" direction={'vertical'}>
            <InputText placeholder="Сума" {...register('amount')} />
          </InputLabel>

          <InputLabel label="Валюта" direction={'vertical'}>
            <InputText name="currency" placeholder="Валюта" />
          </InputLabel>
        </GridWrapper>

        <InputLabel label="Тест" direction={'vertical'}>
          <MyTreeSelect />
        </InputLabel>

        {renderInputsCountIn}
        {renderInputsCountOut}

        {/*<Select*/}
        {/*  labelProps={{ label: 'Рахунок OUT', direction: 'vertical' }}*/}
        {/*  options={[*/}
        {/*    { label: 'Opt 1', value: 'val 1' },*/}
        {/*    { label: 'Opt 2', value: 'val 2' },*/}
        {/*  ]}*/}
        {/*  onSelect={(value, option) => {}}*/}
        {/*  RenderInput={() => (*/}
        {/*    <InputText placeholder="Рахунок OUT" {...register('countIn')} />*/}
        {/*  )}*/}
        {/*/>*/}

        {/*<Select*/}
        {/*  labelProps={{*/}
        {/*    label: 'Рахунок OUT',*/}
        {/*    direction: 'horizontal',*/}
        {/*    style: { padding: '10px 0' },*/}
        {/*  }}*/}
        {/*  RenderInput={() => (*/}
        {/*    <InputText placeholder="Рахунок OUT" {...register('countIn')} />*/}
        {/*  )}*/}
        {/*/>*/}

        {formValues.type === 'TRANSFER' && (
          <>
            <InputLabel label="Категорія" direction={'vertical'}>
              <InputText placeholder="Категорія" {...register('category')} />
            </InputLabel>

            <InputLabel label="Під-категорія" direction={'vertical'}>
              <InputText
                placeholder="Під-категорія"
                {...register('subCategory')}
              />
            </InputLabel>

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
              <TextareaPrimary
                placeholder="Коментар"
                {...register('comment')}
              />
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
  grid-template-columns: ${({ gridTemplateColumns }) =>
    gridTemplateColumns || '1fr 120px'};
  gap: 12px;
`;
export default TransactionForm;
