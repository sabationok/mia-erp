import * as React from 'react';
import { useCallback, useMemo, useState } from 'react';
import ModalForm, { ModalFormProps } from '../ModalForm';
import styled from 'styled-components';
import { ITransaction, ITransactionReqData } from 'redux/transactions/transactions.types';
import { CategoryTypes } from 'redux/directories/categories.types';
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
import FlexBox from '../atoms/FlexBox';
import translate from '../../lang';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';

export type TransactionsFilterOpt = FilterOpt<CategoryTypes>;

export interface AfterFormSubmitOptions {
  close?: boolean;
  clear?: boolean;
}

export interface TransactionFormNewProps extends Omit<ModalFormProps, 'onSubmit'> {
  edit?: boolean;
  copy?: boolean;
  id?: string;
  onSubmit?: (data: ITransactionReqData, options?: AfterFormSubmitOptions) => void;

  filterOptions?: TransactionsFilterOpt[];
  defaultState?: Partial<ITransaction>;
  addInputs?: boolean;
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
  amount: yup.number(),
  type: yup.string().required(),
  comment: yup.string().optional(),
  countIn: validationItem,
  subCountIn: validationItem,
  countOut: validationItem,
  subCountOut: validationItem,
  category: validationItem,
  subCategory: validationItem,
});

const TransactionFormNew: React.FC<TransactionFormNewProps> = ({
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

  const [afterSubmitOptions, setAfterSubmitOptions] = useState<AfterFormSubmitOptions>({});
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

  function onValidSubmit(submitData: ITransaction) {
    const omitPathArr: (keyof ITransaction)[] =
      (formValues.type === 'INCOME' && ['countOut', 'subCountOut']) ||
      (formValues.type === 'EXPENSE' && ['countIn', 'subCountIn']) ||
      [];

    const trReqData = createTransactionForReq(submitData, omitPathArr, 'eventDate', 'amount');

    onSubmit && onSubmit({ _id: '', data: trReqData }, afterSubmitOptions);
  }

  const renderInputsCountIn = useMemo(() => {
    const parentOptions = directories[ApiDirType.COUNTS];

    const parent = parentOptions.find(el => el._id === formValues.countIn?._id);

    return formValues.type && ['INCOME', 'TRANSFER'].includes(formValues.type) ? (
      <>
        <CustomSelect
          label={translate('countIn')}
          placeholder={translate('countIn')}
          {...registerSelect('countIn', { options: parentOptions }, { childName: 'subCountIn' })}
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
          label={translate('category')}
          placeholder={translate('category')}
          {...registerSelect('category', { options: parentOptions }, { childName: 'subCategory' })}
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

  const renderExtraFooter = useMemo(() => {
    const isClearActive = afterSubmitOptions.clear;
    const isCloseActive = afterSubmitOptions.close;
    return (
      <ExtraFooter fillWidth gap={4} padding={'4px 8px'} alignItems={'flex-start'}>
        <Label
          gap={8}
          fxDirection={'row'}
          onClick={() => {
            setAfterSubmitOptions(prev => ({ ...prev, clear: !prev.clear }));
          }}
        >
          <ButtonIcon
            variant={'onlyIconNoEffects'}
            size={'14px'}
            iconSize={'90%'}
            icon={isClearActive ? 'checkBoxOn' : 'checkBoxOff'}
          />
          <div>{'Очистити після підтверджеання'}</div>
        </Label>
        <Label
          gap={8}
          fxDirection={'row'}
          onClick={() => {
            setAfterSubmitOptions(prev => ({ ...prev, close: !prev.close }));
          }}
        >
          <ButtonIcon
            variant={'onlyIconNoEffects'}
            size={'14px'}
            iconSize={'90%'}
            icon={isCloseActive ? 'checkBoxOn' : 'checkBoxOff'}
          />
          <div>{'Закрити після підтверджеання'}</div>
        </Label>
      </ExtraFooter>
    );
  }, [afterSubmitOptions.clear, afterSubmitOptions.close]);

  return (
    <ModalForm
      onSubmit={handleSubmit(onValidSubmit, data => {
        console.log(data);
      })}
      onOptSelect={({ value }) => value && setValue('type', value)}
      {...props}
      extraFooter={renderExtraFooter}
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

const ExtraFooter = styled(FlexBox)`
  min-height: 40px;
`;

const Label = styled(FlexBox)`
  cursor: pointer;
  user-select: none;
`;
export default TransactionFormNew;
