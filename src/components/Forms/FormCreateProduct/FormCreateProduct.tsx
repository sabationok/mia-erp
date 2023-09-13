import * as React from 'react';
import { useMemo } from 'react';
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
  IProductImage,
  IProductReqData,
  ProductFilterOpt,
} from '../../../redux/products/products.types';
import { createDataForReq } from '../../../utils/dataTransform';
import FormAfterSubmitOptions from '../components/FormAfterSubmitOptions';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { IVariationTemplate } from '../../../redux/products/properties.types';
import { Text } from '../../atoms/Text';
import FormProductStaticProperties from './FormProductStaticProperties';

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
  const categories = useMemo(() => {
    return directories[ApiDirType.CATEGORIES_PROD].filter(el => el.type === formValues.type);
  }, [directories, formValues.type]);

  const currentTemplate = useMemo((): IVariationTemplate | undefined => {
    return properties.find(t => t._id === formValues?.template?._id);
  }, [formValues?.template?._id, properties]);
  // TODO eventDate: formatDateForInputValue(defaultState?.eventDate)
  function onValidSubmit(submitData: IProductFormData) {
    const omitPathArr: (keyof IProductFormData)[] = [];

    const productForSubmit = createDataForReq(submitData, omitPathArr);

    onSubmit &&
      onSubmit(
        { _id, data: productForSubmit },
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
      <FlexBox className={'inputs'} flex={'1'} fillWidth maxHeight={'100%'} padding={'12px'} overflow={'auto'}>
        <InputLabel label={t('label')} direction={'vertical'} error={errors.label} required>
          <InputText placeholder={t('label')} {...register('label')} required autoFocus />
        </InputLabel>

        <InputLabel label={t('sku')} direction={'vertical'} error={errors.sku}>
          <InputText placeholder={t('sku')} {...register('sku', { max: 120 })} />
        </InputLabel>

        <CustomSelect
          treeMode
          {...registerSelect('category', {
            label: t('category'),
            placeholder: t('category'),
            required: true,
            options: categories,
          })}
        />

        <CustomSelect
          {...registerSelect('brand', {
            options: directories[ApiDirType.BRANDS],
            label: t('brand'),
            placeholder: t('selectBrand'),
          })}
        />

        <InputLabel label={t('status')} direction={'vertical'} error={errors.status} disabled>
          <InputText placeholder={t('status')} {...register('status')} disabled />
        </InputLabel>

        <InputLabel label={'Штрих-код'} direction={'vertical'} error={errors.barCode}>
          <InputText placeholder={'Штрих-код'} {...register('barCode')} />
        </InputLabel>

        <InputLabel label={'Одиниці виміру'} direction={'vertical'} error={errors?.measurement} disabled>
          <InputText placeholder={'Одиниці виміру'} {...register('measurement.units')} disabled />
        </InputLabel>

        <InputLabel label={t('description')} direction={'vertical'} error={errors.description}>
          <TextareaPrimary placeholder={t('description')} {...register('description')} />
        </InputLabel>

        <FormProductStaticProperties
          template={currentTemplate}
          formData={formValues?.properties}
          onSelect={(key, option) => {
            console.log('FormStaticProductProperties on select prop', { [key]: option });
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

        <FormProductImages></FormProductImages>
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

export interface FormProductImagesProps {
  onSelect?: (imageInfo: IProductImage) => void;
  formData?: IProductImage[];
}
const FormProductImages: React.FC<FormProductImagesProps> = ({}) => {
  const renderImages = useMemo(() => {
    return <FlexBox></FlexBox>;
  }, []);

  return (
    <FlexBox fillWidth style={{ minHeight: 200 }}>
      <FlexBox padding={'8px 8px 0'}>
        <Text $weight={600} $size={14}>
          {'Фото'}
        </Text>
      </FlexBox>

      {renderImages}
    </FlexBox>
  );
};

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
