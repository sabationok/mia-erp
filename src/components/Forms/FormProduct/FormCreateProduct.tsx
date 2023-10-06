import * as React from 'react';
import { useEffect, useMemo } from 'react';
import ModalForm, { ModalFormProps } from '../../ModalForm';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import TextareaPrimary from '../../atoms/Inputs/TextareaPrimary';
import CustomSelect from '../../atoms/Inputs/CustomSelect/CustomSelect';
import { useAppSelector } from '../../../redux/store.store';
import FlexBox from '../../atoms/FlexBox';
import t from '../../../lang';
import { ApiDirType } from '../../../redux/APP_CONFIGS';
import { useAppForm } from '../../../hooks';
import {
  IProductFormData,
  IProductReqData,
  MeasurementUnit,
  ProductFilterOpt,
  ProductStatusEnum,
} from '../../../redux/products/products.types';
import { createDataForReq } from '../../../utils/dataTransform';
import FormAfterSubmitOptions from '../components/FormAfterSubmitOptions';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { IVariationTemplate } from '../../../redux/products/properties.types';
import FormProductStaticProperties from './FormProductStaticProperties';
import FormProductImagesComponent from './FormProductImagesComponent';
import FormProductCategories from './FormProductCategories';
import { Path } from 'react-hook-form';
import { enumToFilterOptions } from '../../../utils/fabrics';
import { FilterOption } from '../../ModalForm/ModalFilter';

export interface FormCreateProductProps extends Omit<ModalFormProps<any, any, IProductFormData>, 'onSubmit'> {
  copy?: boolean;
  id?: string;
  edit?: boolean;
  _id?: string;
  onSubmit?: AppSubmitHandler<IProductReqData>;
  filterOptions?: ProductFilterOpt[];
  defaultState?: IProductFormData;
  addInputs?: boolean;
}
const productsStatusOption = enumToFilterOptions(ProductStatusEnum);
const productsMeasurementUnitOption = enumToFilterOptions(MeasurementUnit);
// const visibilityOptions: FilterOption<boolean>[] = [
//   { label: 'yes', value: true },
//   { label: 'no', value: false },
// ];
const measurementInputs: {
  label?: string;
  placeholder?: string;
  name: Path<IProductFormData>;
  type?: HTMLInputElement['type'];
  options?: FilterOption[];
}[] = [
  { name: 'measurement.unit', label: t('unit'), placeholder: t('unit'), options: productsMeasurementUnitOption },
  { name: 'measurement.min', label: t('min'), placeholder: t('min'), type: 'number' },
  { name: 'measurement.max', label: t('max'), placeholder: t('max'), type: 'number' },
  // { name: 'measurement.step', label: t('step'), placeholder: t('step'), type: 'number' },
];

const FormCreateProduct: React.FC<FormCreateProductProps> = ({
  edit,
  _id,
  onSubmit,
  copy,
  defaultState,
  addInputs,
  ...props
}) => {
  const {
    directories: { directories },
    products: { properties },
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
  } = useAppForm<IProductFormData>({
    defaultValues: defaultState,
  });

  useEffect(() => {
    console.log('formValues', formValues);
  }, [formValues]);
  const categories = useMemo(() => {
    return directories[ApiDirType.CATEGORIES_PROD].filter(el => el.type === formValues.type);
  }, [directories, formValues.type]);

  const currentTemplate = useMemo((): IVariationTemplate | undefined => {
    return properties.find(t => t._id === formValues?.template?._id);
  }, [formValues?.template?._id, properties]);

  // TODO eventDate: formatDateForInputValue(defaultState?.eventDate)
  function onValidSubmit(submitData: IProductFormData) {
    const productForSubmit = createDataForReq(submitData, { ignorePaths: ['measurement'] });

    onSubmit &&
      onSubmit(
        { _id, data: { ...productForSubmit } },
        {
          closeAfterSave,
          clearAfterSave,
        }
      );
  }

  return (
    <ModalForm
      {...props}
      onSubmit={handleSubmit(onValidSubmit, data => console.log(data))}
      onOptSelect={({ value }) => value && setValue('type', value)}
      extraFooter={
        <FormAfterSubmitOptions
          toggleOption={toggleAfterSubmitOption}
          closeAfterSave={closeAfterSave}
          clearAfterSave={clearAfterSave}
        />
      }
    >
      <FlexBox className={'inputs'} flex={'1'} fillWidth maxHeight={'100%'} padding={'0 8px 8px'} overflow={'auto'}>
        <InputLabel label={t('label')} error={errors.label} required>
          <InputText placeholder={t('label')} {...register('label')} required autoFocus />
        </InputLabel>

        <FlexBox fxDirection={'row'} gap={6} fillWidth>
          <InputLabel label={t('sku')} error={errors.sku}>
            <InputText placeholder={t('sku')} {...register('sku')} />
          </InputLabel>

          <InputLabel label={'Штрих-код'} error={errors.barCode}>
            <InputText placeholder={'Штрих-код'} {...register('barCode')} />
          </InputLabel>
        </FlexBox>

        <FormProductCategories
          options={categories}
          defaultData={formValues?.categories}
          onChange={data => {
            setValue('categories', data);
          }}
        />

        <CustomSelect
          {...registerSelect('brand', {
            options: directories[ApiDirType.BRANDS],
            label: t('brand'),
            placeholder: t('selectBrand'),
            multipleMode: true,
          })}
        />

        <CustomSelect
          {...registerSelect('approved', {
            options: productsStatusOption,
            label: t('status'),
            placeholder: t('status'),
          })}
        />

        <FlexBox fxDirection={'row'} gap={6} fillWidth style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr' }}>
          {measurementInputs.map(input => {
            return input.options ? (
              <CustomSelect
                key={input.name}
                {...registerSelect(input?.name, {
                  options: input?.options,
                  label: input?.label,
                  placeholder: input?.label,
                  dropDownIsAbsolute: true,
                  onlyValue: true,
                })}
              />
            ) : (
              <InputLabel key={input.name} label={input.label} error={errors[input.name as never]}>
                <InputText
                  placeholder={input.placeholder}
                  min={input?.type === 'number' ? 1 : undefined}
                  type={input?.type}
                  {...register(input.name, {
                    valueAsNumber: input?.type === 'number',
                    min: input?.type === 'number' ? 1 : undefined,
                  })}
                />
              </InputLabel>
            );
          })}
        </FlexBox>

        <InputLabel label={t('description')} error={errors.description}>
          <TextareaPrimary placeholder={t('description')} {...register('description')} />
        </InputLabel>

        <FormProductStaticProperties
          template={currentTemplate}
          defaultData={formValues?.properties}
          onChange={ids => {
            setValue('properties', ids);
          }}
        >
          <CustomSelect
            {...registerSelect('template', {
              options: properties,
              dropDownIsAbsolute: true,
              label: t('variationsTemplate'),
              placeholder: t('selectVariationsTemplate'),
            })}
          />
        </FormProductStaticProperties>

        <FormProductImagesComponent
          initialData={formValues?.images}
          onChangeState={data => {
            setValue('images', data);
          }}
        />
      </FlexBox>
    </ModalForm>
  );
};

// const GridWrapper = styled.div<{ gridTemplateColumns?: string }>`
//   display: grid;
//   grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns || '1fr 120px'};
//   gap: 12px;
// `;

export default FormCreateProduct;

// const optionalSelectItem = yup
//   .object()
//   .shape({
//     _id: yup.string(),
//     label: yup.string(),
//   })
//   .nullable()
//   .optional();
// const requiredSelectItem = yup
//   .object()
//   .shape({
//     _id: yup.string(),
//     label: yup.string(),
//   })
//   .required();
//
// const getValidation = (type: TransactionType) =>
//   yup.object().shape({
//     category: requiredSelectItem,
//   });
