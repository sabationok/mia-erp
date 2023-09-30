import ModalForm, { ModalFormProps } from '../../ModalForm';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import styled from 'styled-components';
import { enumToFilterOptions } from '../../../utils/fabrics';
import {
  IWarehouseDoc,
  IWarehouseDocFormData,
  WarehouseDocumentType,
} from '../../../redux/warehouses/warehouses.types';
import { t } from '../../../lang';
import { useAppForm } from '../../../hooks';
import { useProductsSelector, usePropertiesSelector } from '../../../redux/selectors.store';
import { Path } from 'react-hook-form';
import { HTMLInputTypeAttribute, useCallback, useEffect, useMemo } from 'react';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { createTableTitlesFromTemplate } from '../../../utils';
import { transformVariationTableData } from '../../../utils/tables';
import { OnRowClickHandler } from '../../TableList/tableTypes.types';
import { IProduct } from '../../../redux/products/products.types';
import FlexBox from '../../atoms/FlexBox';
import TableList from '../../TableList/TableList';
import { pricesColumnsForProductReview } from '../../../data/priceManagement.data';
import { ExtractId } from '../../../utils/dataTransform';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const docTypeFilterOptions = enumToFilterOptions(WarehouseDocumentType);

const validation = yup.object().shape({
  amount: yup.number().min(1),
});

enum FormSteps {
  product = 'Product',
  info = 'Info',
  variation = 'Variation',
  price = 'Price',
}

const steps = enumToFilterOptions(FormSteps);

export interface FormCreateWarehouseDocumentProps
  extends Omit<ModalFormProps<any, any, IWarehouseDocFormData>, 'onSubmit'> {
  product?: IProduct;
  onSubmit?: AppSubmitHandler<IWarehouseDoc>;
}

const formCreateWarehouseInputs: {
  name: Path<IWarehouseDocFormData>;
  placeholder?: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  required?: boolean;
}[] = [
  { name: 'amount', type: 'number', label: t('Amount'), placeholder: t('Amount') },
  // { name: 'reserved', label: t('Reserved'), placeholder: t('Reserved') },
];

const FormCreateWarehouseDocument = ({ product, ...props }: FormCreateWarehouseDocumentProps) => {
  const { products: productsS, warehouses: warehousesS } = useAppServiceProvider();
  const currentProduct = useProductsSelector().currentProduct;
  const currentProductData = useMemo(() => {
    return product || currentProduct;
  }, [currentProduct, product]);
  const {
    register,
    registerSelect,
    setValue,
    formValues,
    formState: { errors },
    unregister,
    handleSubmit,
  } = useAppForm<IWarehouseDocFormData>({
    defaultValues: {
      amount: 0,
      type: WarehouseDocumentType.addToStock,
      ...props?.defaultState,
      product: currentProductData ? ExtractId(currentProductData) : undefined,
    },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });

  const templates = usePropertiesSelector();

  const variationsTableTitles = useMemo(() => {
    const template = templates.find(t => t._id === currentProduct?.template?._id);
    return createTableTitlesFromTemplate(template);
  }, [currentProduct?.template?._id, templates]);

  const transformedVariationsTableData = useMemo(() => {
    if (currentProductData?.variations) {
      return currentProductData?.variations?.map(v => transformVariationTableData(v));
    }
    return [];
  }, [currentProductData?.variations]);

  const currentPricesData = useMemo(() => {
    return currentProduct?.prices?.filter(el => el.variation?._id === formValues.variation?._id);
  }, [currentProduct?.prices, formValues.variation]);

  const handleSelectVariation: OnRowClickHandler = useCallback(
    data => {
      const variation = data?._id ? { _id: data._id } : null;
      if (!variation) return;

      unregister('price');

      setValue('variation', variation);
    },
    [setValue, unregister]
  );

  const handleSelectPrice: OnRowClickHandler = useCallback(
    data => {
      const price = data?._id ? { _id: data._id } : null;
      if (!price) return;

      setValue('price', price);
    },
    [setValue]
  );

  const onValid = (data: IWarehouseDocFormData) => {
    console.log('FormCreateWarehouseDocumentFormData', data);
  };

  useEffect(() => {
    if (product && currentProduct?._id !== product?._id) {
      productsS.getProductFullInfo({ data: ExtractId(product) });
    }
  }, [currentProduct?._id, product, productsS]);

  useEffect(() => {
    console.log('FormCreateWarehouseDocumentFormData', formValues);
    console.log(errors);
  }, [errors, formValues]);
  return (
    <Form
      title={'Create new warehouse document'}
      width={'960px'}
      {...props}
      filterOptions={docTypeFilterOptions}
      onSubmit={handleSubmit(onValid)}
    >
      <Content padding={'0 8px 8px'} overflow={'auto'} gap={8}>
        <FlexBox fillWidth alignItems={'stretch'}>
          <InputLabel label={t('Select variation')}>
            <FlexBox fillWidth style={{ height: 300 }} overflow={'hidden'}>
              <TableList
                tableTitles={variationsTableTitles}
                tableData={transformedVariationsTableData}
                isSearch={false}
                onRowClick={handleSelectVariation}
              />
            </FlexBox>
          </InputLabel>

          <InputLabel label={t('Select price')}>
            <FlexBox fillWidth style={{ height: 300 }} overflow={'hidden'}>
              <TableList
                tableTitles={pricesColumnsForProductReview}
                tableData={currentPricesData}
                isSearch={false}
                onRowClick={handleSelectPrice}
              />
            </FlexBox>
          </InputLabel>
        </FlexBox>

        <Inputs>
          {formCreateWarehouseInputs.map(info => {
            return (
              <InputLabel
                key={`${info?.name}`}
                label={info?.label}
                disabled={info?.disabled}
                required={info?.required}
                error={errors?.amount}
              >
                <InputText
                  align={'center'}
                  disabled={info?.disabled}
                  type={info?.type}
                  required={info?.required}
                  placeholder={info?.placeholder}
                  {...register('amount', { required: true, valueAsNumber: true })}
                />
              </InputLabel>
            );
          })}
        </Inputs>

        {/*<InputLabel label={t('Reservation anable')}>*/}
        {/*  <ButtonGroup options={reservationOptions} />*/}
        {/*</InputLabel>*/}
      </Content>
    </Form>
  );
};

const Form = styled(ModalForm)`
  //@media screen and (min-width: 480px) {
  //  width: fit-content;
  //  max-width: 960px;
  //}
`;
const Content = styled(FlexBox)`
  //@media screen and (min-width: 768px) {
  //  display: grid;
  //  grid-template-columns: 2fr 1fr;
  //}
`;
const Inputs = styled.div`
  display: grid;
  grid-template-columns: 0.5fr;
  gap: 8px;
  justify-content: center;

  width: 100%;
`;

export default FormCreateWarehouseDocument;
