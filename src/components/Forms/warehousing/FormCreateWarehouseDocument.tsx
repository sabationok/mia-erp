import ModalForm, { ModalFormProps } from '../../ModalForm';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import styled from 'styled-components';
import { enumToFilterOptions } from '../../../utils/fabrics';
import { IWarehouseDoc, WarehouseDocumentType } from '../../../redux/warehouses/warehouses.types';
import { t } from '../../../lang';
import { useAppForm } from '../../../hooks';
import { OnlyUUID } from '../../../redux/global.types';
import { useModalProvider } from '../../ModalProvider/ModalProvider';
import { useProductsSelector, usePropertiesSelector } from '../../../redux/selectors.store';
import { Path } from 'react-hook-form';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { IPriceListItem } from '../../../redux/priceManagement/priceManagement.types';
import { IVariation } from '../../../redux/products/variations.types';
import { createTableTitlesFromTemplate } from '../../../utils';
import { createApiCall, PriceManagementApi } from '../../../api';
import { transformVariationTableData } from '../../../utils/tables';
import { OnRowClickHandler } from '../../TableList/tableTypes.types';
import { IProduct } from '../../../redux/products/products.types';
import FlexBox from '../../atoms/FlexBox';
import TableList from '../../TableList/TableList';
import { pricesColumnsForProductReview } from '../../../data/priceManagement.data';

const docTypeFilterOptions = enumToFilterOptions(WarehouseDocumentType);
export interface FormCreateWarehouseDocumentProps extends Omit<ModalFormProps, 'onSubmit'> {
  product?: IProduct;
}
const fomrCreateWarehouseInputs: {
  name: Path<FormCreateWarehouseDocumentFormData>;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
}[] = [
  { name: 'amount', label: t('Amount'), placeholder: t('Amount') },
  // { name: 'reserved', label: t('Reserved'), placeholder: t('Reserved') },
];
export interface FormCreateWarehouseDocumentFormData extends Record<keyof IWarehouseDoc, string | number | OnlyUUID> {}
const FormCreateWarehouseDocument = ({ ...props }: FormCreateWarehouseDocumentProps) => {
  const { products: productsS, warehouses: warehousesS } = useAppServiceProvider();
  const [loadedPrices, setLoadedPrices] = useState<IPriceListItem[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<IPriceListItem | undefined>();
  const [selectedVariation, setSelectedVariation] = useState<IVariation>();
  const {
    register,
    registerSelect,
    formState: { isValid },
    setValue,
    formValues,
    ...form
  } = useAppForm<FormCreateWarehouseDocumentFormData>({
    defaultValues: props.defaultState,
  });

  const modalS = useModalProvider();
  const currentProduct = useProductsSelector().currentProduct;

  const currentProductData = useMemo(() => {
    return props?.product || currentProduct;
  }, [currentProduct, props?.product]);

  const templates = usePropertiesSelector();

  const variationsTableTitles = useMemo(() => {
    const template = templates.find(t => t._id === currentProduct?.template?._id);
    return createTableTitlesFromTemplate(template);
  }, [currentProduct?.template?._id, templates]);

  useEffect(() => {
    console.log('FormCreateWarehouseDocumentFormData', formValues);
  }, [formValues]);

  const transformedVariationsTableData = useMemo(
    () => currentProductData?.variations?.map(v => transformVariationTableData(v)),
    [currentProductData?.variations]
  );

  const handleSelectVariation: OnRowClickHandler = useCallback(
    data => {
      const variation = data?._id ? { _id: data._id } : null;
      if (!variation) return;

      setValue('variation', variation);

      createApiCall(
        { data: { variation }, onSuccess: setLoadedPrices },
        PriceManagementApi.getAllPrices,
        PriceManagementApi
      );
    },
    [setValue]
  );

  const handleSelectPrice: OnRowClickHandler = useCallback(
    data => {
      const price = data?._id ? { _id: data._id } : null;
      if (!price) return;

      setValue('price', price);
    },
    [setValue]
  );

  const onValid = (data: FormCreateWarehouseDocumentFormData) => {
    console.log('FormCreateWarehouseDocumentFormData', data);
  };

  return (
    <Form
      title={'Create new warehouse document'}
      width={'960px'}
      {...props}
      filterOptions={docTypeFilterOptions}
      onSubmit={form.handleSubmit(onValid)}
    >
      <Content padding={'0 8px 8px'} overflow={'auto'} gap={8}>
        <FlexBox>
          <InputLabel label={t('Select variation')}>
            <FlexBox style={{ height: 300 }} overflow={'hidden'}>
              <TableList
                tableTitles={variationsTableTitles}
                tableData={transformedVariationsTableData}
                isSearch={false}
                onRowClick={handleSelectVariation}
              />
            </FlexBox>
          </InputLabel>

          <InputLabel label={t('Select price')}>
            <FlexBox style={{ height: 300 }} overflow={'hidden'}>
              <TableList
                tableTitles={pricesColumnsForProductReview}
                tableData={loadedPrices}
                isSearch={false}
                onRowClick={handleSelectPrice}
              />
            </FlexBox>
          </InputLabel>
        </FlexBox>

        <Inputs>
          {fomrCreateWarehouseInputs.map(info => {
            return (
              <InputLabel key={`${info?.name}`} label={info?.label} disabled={info?.disabled} required={info?.required}>
                <InputText
                  name={info?.name}
                  align={'right'}
                  disabled={info?.disabled}
                  required={info?.required}
                  placeholder={info?.placeholder}
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
  @media screen and (min-width: 480px) {
    width: fit-content;
    max-width: 960px;
  }
`;
const Content = styled(FlexBox)`
  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
`;
const Inputs = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;

  width: 100%;
`;

export default FormCreateWarehouseDocument;
