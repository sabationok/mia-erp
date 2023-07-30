import * as React from 'react';
import { useMemo, useState } from 'react';
import ModalForm, { ModalFormProps } from '../ModalForm';
import styled from 'styled-components';
import { ITransaction, ITransactionReqData, TransactionType } from 'redux/transactions/transactions.types';
import { CategoryTypes } from 'redux/directories/directories.types';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import * as yup from 'yup';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import { FilterOpt } from '../ModalForm/ModalFilter';
import CustomSelect from '../atoms/Inputs/CustomSelect';
import { createTransactionForReq, formatDateForInputValue } from '../../utils';
import { useAppSelector } from '../../redux/store.store';
import FlexBox from '../atoms/FlexBox';
import translate from '../../lang';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { useAppForm } from '../../hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import FormAfterSubmitOptions from './components/FormAfterSubmitOptions';
import { UseAppFormAfterSubmitOptions } from '../../hooks/useAppForm.hook';

export type TransactionsFilterOpt = FilterOpt<CategoryTypes>;

export interface TransactionFormNewProps extends Omit<ModalFormProps, 'onSubmit'> {
  edit?: boolean;
  copy?: boolean;
  id?: string;
  onSubmit?: (data: ITransactionReqData, options?: UseAppFormAfterSubmitOptions) => void;
  filterOptions?: TransactionsFilterOpt[];
  defaultState?: Partial<ITransaction>;
  addInputs?: boolean;
}

const optionalSelectItem = yup
  .object()
  .shape({
    _id: yup.string(),
    label: yup.string(),
  })
  .nullable()
  .optional();
const requiredSelectItem = yup
  .object()
  .shape({
    _id: yup.string(),
    label: yup.string(),
  })
  .required();

const getValidation = (type?: TransactionType) =>
  yup.object().shape({
    amount: yup.number().required(),
    type: yup.string().required(),
    eventDate: yup.string().required(),
    comment: yup.string().optional(),
    countIn: type && ['INCOME', 'TRANSFER'].includes(type) ? requiredSelectItem : optionalSelectItem,
    subCountIn: optionalSelectItem,
    countOut: type && ['EXPENSE', 'TRANSFER'].includes(type) ? requiredSelectItem : optionalSelectItem,
    subCountOut: optionalSelectItem,
    category: requiredSelectItem,
    subCategory: optionalSelectItem,
  });

const FormCreateTransaction: React.FC<TransactionFormNewProps> = ({
  edit,
  onSubmit,
  copy,
  defaultState,
  addInputs,
  ...props
}) => {
  const {
    directories: { directories },
  } = useAppSelector();
  const [currentType, setCurrentType] = useState<TransactionType | undefined>(defaultState?.type);
  const {
    formState: { errors, isValid },
    formValues,
    register,
    setValue,
    registerSelect,
    handleSubmit,
    toggleAfterSubmitOption,
    closeAfterSave,
    clearAfterSave,
  } = useAppForm<ITransaction>({
    defaultValues: { currency: 'UAH', ...defaultState, eventDate: formatDateForInputValue(defaultState?.eventDate) },
    resolver: yupResolver(getValidation(currentType)),
    reValidateMode: 'onSubmit',
  });

  function onValidSubmit(submitData: ITransaction) {
    const omitPathArr: (keyof ITransaction)[] =
      (formValues.type === 'INCOME' && ['countOut', 'subCountOut']) ||
      (formValues.type === 'EXPENSE' && ['countIn', 'subCountIn']) ||
      [];

    const trReqData = createTransactionForReq(submitData, omitPathArr, '', 'amount');

    onSubmit && onSubmit({ _id: '', data: trReqData }, { closeAfterSave, clearAfterSave });
  }

  const renderInputsCountIn = useMemo(() => {
    const parentOptions = directories[ApiDirType.COUNTS];

    const parent = parentOptions.find(el => el._id === formValues.countIn?._id);

    return formValues.type && ['INCOME', 'TRANSFER'].includes(formValues.type) ? (
      <>
        <CustomSelect
          {...registerSelect(
            'countIn',
            {
              label: translate('countIn'),
              placeholder: translate('countIn'),
              required: true,
              options: parentOptions,
            },
            { childName: 'subCountIn' }
          )}
        />
        {parent?.childrenList && parent?.childrenList?.length > 0 && (
          <CustomSelect
            label={translate('subCountIn')}
            placeholder={translate('subCountIn')}
            {...registerSelect('subCountIn', { options: parent?.childrenList })}
          />
        )}
      </>
    ) : null;
  }, [directories, formValues.countIn?._id, formValues.type, registerSelect]);

  const renderInputsCountOut = useMemo(() => {
    const parentOptions = directories[ApiDirType.COUNTS];

    const childOptions = parentOptions.find(el => el._id === formValues.countOut?._id)?.childrenList;

    return formValues.type && ['EXPENSE', 'TRANSFER'].includes(formValues.type) ? (
      <>
        <CustomSelect
          {...registerSelect(
            'countOut',
            {
              label: translate('countOut'),
              placeholder: translate('countOut'),
              required: true,
              options: parentOptions,
              error: errors.countOut,
            },
            { childName: 'subCountOut' }
          )}
        />
        {childOptions && childOptions.length > 0 && (
          <CustomSelect
            label={translate('subCountOut')}
            placeholder={translate('subCountOut')}
            {...registerSelect('subCountOut', { options: childOptions, error: errors.subCountOut })}
          />
        )}
      </>
    ) : null;
  }, [directories, errors.countOut, errors.subCountOut, formValues.countOut?._id, formValues.type, registerSelect]);

  const renderInputsCategories = useMemo(() => {
    const parentOptions = directories[ApiDirType.CATEGORIES_TR].filter(el => el.type === formValues.type);

    const childOptions = parentOptions.find(el => el._id === formValues.category?._id)?.childrenList;

    return (
      <>
        <CustomSelect
          {...registerSelect(
            'category',
            {
              label: translate('category'),
              placeholder: translate('category'),
              required: true,
              options: parentOptions,
            },
            { childName: 'subCategory' }
          )}
        />
        {childOptions && childOptions.length > 0 && (
          <CustomSelect
            label={translate('subCategory')}
            placeholder={translate('subCategory')}
            {...registerSelect('subCategory', { options: childOptions })}
          />
        )}
      </>
    );
  }, [directories, formValues.category?._id, formValues.type, registerSelect]);

  return (
    <ModalForm
      isValid={isValid}
      onSubmit={handleSubmit(onValidSubmit, data => console.log(data))}
      onOptSelect={({ value }) => {
        if (value) {
          setCurrentType(value);
          setValue('type', value);
        }
      }}
      {...props}
      extraFooter={
        <FormAfterSubmitOptions
          toggleOption={toggleAfterSubmitOption}
          closeAfterSave={closeAfterSave}
          clearAfterSave={clearAfterSave}
        />
      }
    >
      <FlexBox className={'inputs'} flex={'1'} fillWidth maxHeight={'100%'} padding={'12px'} overflow={'auto'}>
        <InputLabel label={translate('dateAndTime')} direction={'vertical'}>
          <InputText placeholder={translate('dateAndTime')} type="datetime-local" {...register('eventDate')} />
        </InputLabel>
        <GridWrapper>
          <InputLabel label={translate('amount')} direction={'vertical'}>
            <InputText placeholder={translate('amount')} type={'number'} {...register('amount')} />
          </InputLabel>

          <InputLabel label={translate('currency')} direction={'vertical'}>
            <InputText placeholder={translate('currency')} {...register('currency')} disabled />
          </InputLabel>
        </GridWrapper>

        {renderInputsCountOut}
        {renderInputsCountIn}
        {renderInputsCategories}

        <CustomSelect
          label={translate('contractor')}
          placeholder={translate('contractor')}
          {...registerSelect('contractor', {
            options: directories[ApiDirType.CONTRACTORS],
          })}
        />

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

export default FormCreateTransaction;
