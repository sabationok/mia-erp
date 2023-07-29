import * as React from 'react';
import { useMemo } from 'react';
import ModalForm, { ModalFormProps } from '../ModalForm';
import { TransactionType } from 'redux/transactions/transactions.types';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import * as yup from 'yup';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import CustomSelect from '../atoms/Inputs/CustomSelect';
import { useAppSelector } from '../../redux/store.store';
import FlexBox from '../atoms/FlexBox';
import translate from '../../lang';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { useAppForm } from '../../hooks';
import { IStorageItem, IStorageItemReqData, StorageItemFilterOption } from '../../redux/products/products.types';
import { createDataForReq } from '../../utils/dataTransform';
import { ContractorsTypesEnum } from '../../redux/contractors/contractors.types';
import FormAfterSubmitOptions from './components/FormAfterSubmitOptions';
import { UseAppFormAfterSubmitOptions } from '../../hooks/useAppForm.hook';

export interface AfterSubmitFormOptions {
  close?: boolean;
  clear?: boolean;
}

export interface FormProps extends Omit<ModalFormProps, 'onSubmit'> {
  edit?: boolean;
  copy?: boolean;
  id?: string;
  onSubmit?: (data: IStorageItemReqData, options?: UseAppFormAfterSubmitOptions) => void;
  filterOptions?: StorageItemFilterOption[];
  defaultState?: Partial<IStorageItem>;
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

const getValidation = (type: TransactionType) =>
  yup.object().shape({
    category: requiredSelectItem,
  });
const Form: React.FC<FormProps> = ({ edit, onSubmit, copy, defaultState, addInputs, ...props }) => {
  const {
    directories: { directories },
  } = useAppSelector();

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
  } = useAppForm<IStorageItem>({
    defaultValues: { currency: 'UAH', ...defaultState },
    reValidateMode: 'onSubmit',
  });

  // TODO eventDate: formatDateForInputValue(defaultState?.eventDate)
  function onValidSubmit(submitData: IStorageItem) {
    const omitPathArr: (keyof IStorageItem)[] = [];

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

  const renderCategoriesSelects = useMemo(() => {
    const parentOptions = directories[ApiDirType.CATEGORIES_PROD];

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
  }, [directories, formValues.category?._id, registerSelect]);

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
        <InputLabel label={translate('label')} direction={'vertical'} error={errors.label} required>
          <InputText placeholder={translate('label')} {...register('label')} required autoFocus />
        </InputLabel>

        <InputLabel label={translate('sku')} direction={'vertical'} error={errors.sku}>
          <InputText placeholder={translate('sku')} {...register('sku', { max: 120 })} />
        </InputLabel>

        {renderCategoriesSelects}
        {renderSupplierSelect}
        {renderBrandsSelect}

        <InputLabel label={translate('status')} direction={'vertical'} error={errors.status} disabled>
          <InputText placeholder={translate('status')} {...register('status')} disabled />
        </InputLabel>

        <InputLabel label={'Штрих-код'} direction={'vertical'} error={errors.barCode}>
          <InputText placeholder={'Штрих-код'} {...register('barCode')} />
        </InputLabel>

        <InputLabel label={'Одиниці виміру'} direction={'vertical'} error={errors.unitsOfMeasurement} disabled>
          <InputText placeholder={'Одиниці виміру'} {...register('unitsOfMeasurement')} disabled />
        </InputLabel>

        <InputLabel label={translate('description')} direction={'vertical'} error={errors.description}>
          <TextareaPrimary placeholder={translate('description')} {...register('description')} />
        </InputLabel>
      </FlexBox>
    </ModalForm>
  );
};

// const GridWrapper = styled.div<{ gridTemplateColumns?: string }>`
//   display: grid;
//   grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns || '1fr 120px'};
//   gap: 12px;
// `;

export default Form;
