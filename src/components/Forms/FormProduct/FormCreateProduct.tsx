import * as React from 'react';
import { useMemo } from 'react';
import ModalForm, { ModalFormProps } from '../../ModalForm';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import TextareaPrimary from '../../atoms/Inputs/TextareaPrimary';
import CustomSelect from '../../atoms/Inputs/CustomSelect/CustomSelect';
import { useAppSelector } from '../../../redux/store.store';
import FlexBox from '../../atoms/FlexBox';
import { t } from '../../../lang';
import { ApiDirType } from '../../../redux/APP_CONFIGS';
import { useAppForm } from '../../../hooks';
import { IProductFormData, IProductReqData, ProductFilterOpt, ProductStatusEnum } from '../../../types/products.types';
import { toReqData } from '../../../utils/data-transform';
import FormAfterSubmitOptions, { useAfterSubmitOptions } from '../components/FormAfterSubmitOptions';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { IVariationTemplate } from '../../../types/properties.types';
import FormProductStaticProperties from './FormProductStaticProperties';
import FormProductImagesComponent from './FormProductImagesComponent';
import FormProductCategories from './FormProductCategories';
import { enumToFilterOptions } from '../../../utils/fabrics';
import DimensionsInputs from './components/DimensionsInputs';
import MeasurementInputs from './components/MeasuremenInputs';

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

const FormCreateProduct: React.FC<FormCreateProductProps> = ({
  edit,
  _id,
  onSubmit,
  copy,
  defaultState,
  addInputs,
  ...props
}) => {
  const submitOptions = useAfterSubmitOptions();
  const {
    directories: { directories },
    products: { properties },
  } = useAppSelector();
  const form = useAppForm<IProductFormData>({
    defaultValues: defaultState,
  });
  const {
    formState: { errors },
    formValues,
    register,
    setValue,
    registerSelect,
    handleSubmit,
  } = form;

  const categories = useMemo(() => {
    return directories[ApiDirType.CATEGORIES_PROD].filter(el => el.type === formValues.type);
  }, [directories, formValues.type]);

  const currentTemplate = useMemo((): IVariationTemplate | undefined => {
    return properties.find(t => t._id === formValues?.template?._id);
  }, [formValues?.template?._id, properties]);

  // TODO eventDate: formatDateForInputValue(defaultState?.eventDate)
  function onValidSubmit(submitData: IProductFormData) {
    const productForSubmit = toReqData(submitData, { ignorePaths: ['measurement'] });

    onSubmit &&
      onSubmit(
        { _id, data: productForSubmit },
        {
          ...submitOptions.state,
        }
      );
  }

  return (
    <ModalForm
      {...props}
      onSubmit={handleSubmit(onValidSubmit, data => console.log(data))}
      onOptSelect={({ value }) => value && setValue('type', value)}
      extraFooter={<FormAfterSubmitOptions {...submitOptions} />}
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

        <MeasurementInputs appForm={form} />

        <DimensionsInputs form={form} />

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
