import * as React from 'react';
import { useCallback, useMemo } from 'react';
import ModalForm, { ModalFormProps } from '../ModalForm';
import styled from 'styled-components';
import { ITransaction, ITransactionForReq } from 'redux/transactions/transactions.types';
import { CategoryTypes } from 'redux/categories/categories.types';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import { FilterOpt } from '../ModalForm/ModalFilter';
import CustomSelect, { CustomSelectProps } from '../atoms/Inputs/CustomSelect';
import { createTransactionForReq } from '../../utils';
import { useAppSelector } from '../../redux/store.store';
import useTreeDataCreatorHook from '../../hooks/useTreeDataCreator.hook';
import FlexBox from '../atoms/FlexBox';
import { IBaseDirItem } from '../Directories/dir.types';
import translate from '../../lang';

export type TransactionsFilterOpt = FilterOpt<CategoryTypes>;

export interface TransactionFormProps extends Omit<ModalFormProps, 'onSubmit'> {
  edit?: boolean;
  copy?: boolean;
  id?: string;
  onSubmit?: (data: ITransactionForReq) => void;
  onSubmitEdit?: (_id: string, data: ITransactionForReq) => void;
  filterOptions?: TransactionsFilterOpt[];
  defaultState?: Partial<ITransaction>;
  addInputs?: boolean;
}

const additionalInputs = (
  <>
    <InputLabel label={translate('contractor')} direction={'vertical'} disabled>
      <InputText placeholder={translate('contractor')} disabled />
    </InputLabel>

    <InputLabel label={translate('project')} direction={'vertical'} disabled>
      <InputText placeholder={translate('project')} disabled />
    </InputLabel>

    <InputLabel label={translate('activityType')} direction={'vertical'} disabled>
      <InputText placeholder={translate('activityType')} disabled />
    </InputLabel>
  </>
);

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
  addInputs,
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
    handleSubmit,
  } = useForm<ITransaction>({
    defaultValues: { currency: 'UAH', ...defaultState },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });
  const formValues = watch();

  const rootValidator = useCallback(
    <T = any,>(el: IBaseDirItem<T>) => !el.parent && el.type === formValues.type,
    [formValues.type]
  );

  const countsTreeData = useTreeDataCreatorHook({ dataList: counts });
  const categoriesTreeData = useTreeDataCreatorHook({ dataList: categories, rootDataValidator: rootValidator });

  const registerSelect = useCallback(
    <K extends keyof ITransaction = keyof ITransaction>(
      name: K,
      props?: Omit<CustomSelectProps<ITransaction[K]>, 'name'>,
      childControl?: {
        childName?: keyof ITransaction;
      }
    ): CustomSelectProps<ITransaction[K]> => {
      return {
        onSelect: (option, _value) => {
          setValue<K>(name, option as any);
          // if (childControl?.childName) clearChild(childControl?.childName);
        },
        name,
        selectValue: formValues[name],
        onClear: () => {
          if (!formValues[name]) return;

          // setValue(name, null as any);
          unregister(name);

          if (childControl?.childName) unregister(childControl?.childName);

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
          label={translate('countIn')}
          placeholder={translate('countIn')}
          {...registerSelect('countIn', { options: parentOptions }, { childName: 'subCountIn' })}
        />
        <CustomSelect
          label={translate('subCountIn')}
          placeholder={translate('subCountIn')}
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
          label={translate('countOut')}
          placeholder={translate('countOut')}
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
          label={translate('subCountOut')}
          placeholder={translate('subCountOut')}
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
          label={translate('category')}
          placeholder={translate('category')}
          {...registerSelect('category', { options: parentOptions }, { childName: 'subCategory' })}
        />
        <CustomSelect
          label={translate('subCategory')}
          placeholder={translate('subCategory')}
          {...registerSelect('subCategory', { options: childOptions })}
        />
      </>
    );
  }, [categoriesTreeData, formValues.category?._id, registerSelect]);

  function onValidSubmit(submitData: ITransaction) {
    const omitPathArr: (keyof ITransaction)[] =
      (formValues.type === 'INCOME' && ['countOut', 'subCountOut']) ||
      (formValues.type === 'EXPENSE' && ['countIn', 'subCountIn']) ||
      [];

    // console.log('onSubmitWrapper', submitData);
    // console.log('createTransactionForReq', createTransactionForReq(submitData));
    const trReqData = createTransactionForReq(submitData, omitPathArr, 'transactionDate');

    console.log('trReqData', trReqData);

    onSubmit && onSubmit(trReqData);

    if (onSubmitEdit && defaultState?._id) {
      onSubmitEdit(defaultState?._id, trReqData);
      return;
    }
  }

  return (
    <ModalForm
      onSubmit={handleSubmit(onValidSubmit, data => {
        console.log(data);
      })}
      onOptSelect={({ value }) => value && setValue('type', value)}
      {...props}
    >
      <FlexBox className={'inputs'} flex={'1'} fillWidth maxHeight={'100%'} padding={'12px'} overflow={'auto'}>
        <InputLabel label={translate('dateAndTime')} direction={'vertical'}>
          <InputText placeholder={translate('dateAndTime')} type="datetime-local" {...register('eventDate')} />
        </InputLabel>
        <GridWrapper>
          <InputLabel label={translate('amount')} direction={'vertical'}>
            <InputText placeholder={translate('amount')} {...register('amount')} />
          </InputLabel>

          <InputLabel label={translate('currency')} direction={'vertical'}>
            <InputText placeholder={translate('currency')} {...register('currency')} disabled />
          </InputLabel>
        </GridWrapper>

        {renderInputsCountIn}
        {renderInputsCountOut}
        {renderInputsCategories}

        {addInputs ? additionalInputs : null}

        <InputLabel label={translate('comment')} direction={'vertical'}>
          <TextareaPrimary placeholder={translate('comment')} {...register('comment')} />
        </InputLabel>
      </FlexBox>
    </ModalForm>
  );
};

const GridWrapper = styled.div<{ gridTemplateColumns?: string }>`
  display: grid;
  grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns || '1fr 120px'};
  gap: 12px;
`;
export default TransactionForm;
