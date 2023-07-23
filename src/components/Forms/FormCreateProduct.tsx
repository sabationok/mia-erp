import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import ModalForm, { ModalFormProps } from '../ModalForm';
import styled from 'styled-components';
import { TransactionType } from 'redux/transactions/transactions.types';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import * as yup from 'yup';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import { FilterOpt } from '../ModalForm/ModalFilter';
import CustomSelect from '../atoms/Inputs/CustomSelect';
import { useAppSelector } from '../../redux/store.store';
import FlexBox from '../atoms/FlexBox';
import translate from '../../lang';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { useAppForm } from '../../hooks';
import { IProduct, IProductReqData, ProductPriceType } from '../../redux/products/products.types';
import { createDataForReq } from '../../utils/dataTransform';
import { ContractorsTypesEnum } from '../../redux/contractors/contractors.types';
import FormAfterSubmitOptions from './FormAfterSubmitOptions';
import { UseAppFormAfterSubmitOptions } from '../../hooks/useAppForm.hook';

export type ProductFilterOpt = FilterOpt<ProductPriceType>;

export interface AfterSubmitFormOptions {
  close?: boolean;
  clear?: boolean;
}

export interface FormProps extends Omit<ModalFormProps, 'onSubmit'> {
  edit?: boolean;
  copy?: boolean;
  id?: string;
  onSubmit?: (data: IProductReqData, options?: UseAppFormAfterSubmitOptions) => void;
  filterOptions?: ProductFilterOpt[];
  defaultState?: Partial<IProduct>;
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

const getValidation = (type: TransactionType) => yup.object().shape({});
const Form: React.FC<FormProps> = ({ edit, onSubmit, copy, defaultState, addInputs, ...props }) => {
  const {
    directories: { directories },
  } = useAppSelector();
  const [currentType, setCurrentType] = useState<string>('INCOME');

  const {
    formState: { errors },
    formValues,
    register,
    setValue,
    registerSelect,
    handleSubmit,
    toggleAfterSubmitOption,
    closeAfterSave,
    clearAfterSave,
  } = useAppForm<IProduct>({
    defaultValues: { currency: 'UAH', ...defaultState },
    reValidateMode: 'onSubmit',
  });

  // TODO eventDate: formatDateForInputValue(defaultState?.eventDate)
  function onValidSubmit(submitData: IProduct) {
    const omitPathArr: (keyof IProduct)[] =
      (formValues.priceType === 'DEFAULT' && []) || (formValues.priceType === 'COMMISSION' && []) || [];

    const productForSubmit = createDataForReq(submitData, omitPathArr);

    onSubmit &&
      onSubmit(
        { _id: '', data: productForSubmit },
        {
          closeAfterSave,
          clearAfterSave,
        }
      );
  }

  const renderInputsCategories = useMemo(() => {
    const parentOptions = directories[ApiDirType.CATEGORIES_PROD].filter(el => el.type === formValues.type);

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

  const renderSupplierSelect = useMemo(
    () => (
      <CustomSelect
        {...registerSelect('supplier', {
          options: directories[ApiDirType.CONTRACTORS].filter(el => el.type === ContractorsTypesEnum.SUPPLIER),
          placeholder: translate(ContractorsTypesEnum.SUPPLIER),
          label: translate(ContractorsTypesEnum.SUPPLIER),
        })}
      />
    ),
    [directories, registerSelect]
  );
  const renderBrandsSelect = useMemo(
    () => (
      <CustomSelect
        {...registerSelect('brand', {
          // options: directories[ApiDirType.BRANDS].filter(el => el?.parent?._id === formValues?.contractor?._id),
          options: directories[ApiDirType.BRANDS],
          placeholder: translate('selectBrand'),
          label: translate('brand'),
        })}
      />
    ),
    [directories, registerSelect]
  );

  useEffect(() => {
    console.log('closeAfterSave', closeAfterSave);
    console.log('clearAfterSave', clearAfterSave);
  }, [closeAfterSave, clearAfterSave]);

  return (
    <ModalForm
      onSubmit={handleSubmit(onValidSubmit, data => console.log(data))}
      onOptSelect={({ value }) => value && setValue('type', value)}
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
        <GridWrapper>
          <InputLabel label={translate('price')} direction={'vertical'} error={errors.price}>
            <InputText placeholder={translate('price')} type={'number'} {...register('price')} />
          </InputLabel>

          <InputLabel label={translate('currency')} direction={'vertical'}>
            <InputText placeholder={translate('currency')} {...register('currency')} disabled />
          </InputLabel>
        </GridWrapper>

        <InputLabel label={translate('label')} direction={'vertical'}>
          <InputText placeholder={translate('label')} {...register('label')} />
        </InputLabel>

        <InputLabel label={translate('sku')} direction={'vertical'} disabled>
          <InputText placeholder={translate('sku')} {...register('sku')} disabled />
        </InputLabel>
        <InputLabel label={translate('status')} direction={'vertical'} disabled>
          <InputText placeholder={translate('status')} {...register('status')} disabled />
        </InputLabel>

        {renderSupplierSelect}
        {renderBrandsSelect}
        {renderInputsCategories}

        <InputLabel label={translate('description')} direction={'vertical'}>
          <TextareaPrimary placeholder={translate('description')} {...register('description')} />
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

export default Form;
