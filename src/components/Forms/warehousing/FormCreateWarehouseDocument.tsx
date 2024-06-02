import ModalForm, { ModalFormProps } from '../../ModalForm';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import styled from 'styled-components';
import { enumToFilterOptions } from '../../../utils/fabrics';
import {
  IWarehouseDoc,
  IWarehouseDocFormData,
  WarehouseDocumentType,
  WarehouseEntity,
} from '../../../types/warehousing/warehouses.types';
import { t } from '../../../lang';
import { useAppForm } from '../../../hooks';
import { useOffersSelector, useWarehousesSelector } from '../../../redux/selectors.store';
import { Path } from 'react-hook-form';
import { HTMLInputTypeAttribute, useCallback, useEffect, useMemo } from 'react';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { transformVariationTableData } from '../../../utils/tables';
import { OnRowClickHandler } from '../../TableList/tableTypes.types';
import { OfferEntity } from '../../../types/offers/offers.types';
import FlexBox from '../../atoms/FlexBox';
import TableList from '../../TableList/TableList';
import { pricesColumnsForProductReview } from '../../../data/priceManagement.data';
import { getIdRef } from '../../../utils/data-transform';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createApiCall, WarehousesApi } from '../../../api';
import { warehousesTableColumns } from '../../../data/warehauses.data';
import useVariationTableTitlesForCurrentProduct from '../../../hooks/useVariationTableTitlesForCurrentProduct.hook';

const docTypeFilterOptions = enumToFilterOptions(WarehouseDocumentType);

const validation = yup.object().shape({
  amount: yup.number().min(1).required(),
  variation: yup
    .object()
    .shape({
      _id: yup.string().required(),
    })
    .required(),
  price: yup
    .object()
    .shape({
      _id: yup.string().required(),
    })
    .required(),
});

// enum FormSteps {
//   product = 'Product',
//   info = 'Info',
//   variation = 'Variation',
//   price = 'Price',
// }
//
// const steps = enumToFilterOptions(FormSteps);

export interface FormCreateWarehouseDocumentProps
  extends Omit<ModalFormProps<any, any, IWarehouseDocFormData>, 'onSubmit'> {
  product?: OfferEntity;
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
  { name: 'amount', type: 'number', label: t('quantity'), placeholder: t('quantity') },
  { name: 'batch', label: t('batch'), placeholder: t('batch') },
];

const FormCreateWarehouseDocument = ({ product, ...props }: FormCreateWarehouseDocumentProps) => {
  const { products: productsS } = useAppServiceProvider();
  const currentProduct = useOffersSelector().currentOffer;
  const warehouses = useWarehousesSelector().warehouses;
  // const [availablePrices,setAvailablePrices]=useState()

  const currentProductData = useMemo(() => {
    return product || currentProduct;
  }, [currentProduct, product]);
  const {
    register,
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
      product: currentProductData ? getIdRef(currentProductData) : undefined,
    },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });

  const variationsTableTitles = useVariationTableTitlesForCurrentProduct();

  const transformedVariationsTableData = useMemo(() => {
    if (currentProductData?.variations) {
      return currentProductData?.variations?.map(v => transformVariationTableData(v));
    }
    return [];
  }, [currentProductData?.variations]);

  const currentPricesData = useMemo(() => {
    return currentProduct?.prices?.filter(el => el.variation?._id === formValues.variation?._id);
  }, [currentProduct?.prices, formValues.variation]);

  useEffect(() => {
    console.log(currentPricesData);
    console.log('currentProduct?.prices', currentProduct?.prices);
  }, [currentPricesData, currentProduct?.prices]);

  const handleSelectVariation: OnRowClickHandler = useCallback(
    data => {
      if (data?.rowId === formValues.variation?._id) return;

      unregister('price');

      data?.rowId && setValue('variation', { _id: data.rowId });
    },
    [formValues.variation?._id, setValue, unregister]
  );

  useEffect(() => {
    console.log(formValues.variation);
  }, [formValues.variation]);

  const handleSelectPrice: OnRowClickHandler = useCallback(
    data => {
      data?.rowId && setValue('price._id', data?.rowId);
    },
    [setValue]
  );
  const handleSelectWarehouse: OnRowClickHandler<WarehouseEntity> = useCallback(
    data => {
      data?.rowId && setValue('warehouse._id', data?.rowId);
    },
    [setValue]
  );
  const onValid = (data: IWarehouseDocFormData) => {
    console.log('FormCreateWarehouseDocumentFormData', data);

    createApiCall(
      {
        data: { data },
        onSuccess: data => {
          console.log('FormCreateWarehouseDocument success', data);
          props?.onClose && props?.onClose();
        },
        onError: e => {
          console.error('FormCreateWarehouseDocument err ', e);
        },
      },
      WarehousesApi.createDocument,
      WarehousesApi
    );
  };

  useEffect(() => {
    if (product && currentProduct?._id !== product?._id) {
      productsS.getProductFullInfo({ data: getIdRef(product) });
    }
  }, [currentProduct?._id, product, productsS]);

  return (
    <Form
      title={'Create new warehouse document'}
      width={'960px'}
      {...props}
      options={docTypeFilterOptions}
      onOptSelect={(_o, value, _i) => {
        setValue('type', value);
      }}
      onSubmit={handleSubmit(onValid)}
      extraFooter={
        <Inputs>
          {formCreateWarehouseInputs.map(info => {
            return (
              <InputLabel key={`${info?.name}`} label={info?.label} disabled={info?.disabled} required={info?.required}>
                <InputText
                  align={info?.type === 'number' ? 'center' : 'left'}
                  disabled={info?.disabled}
                  type={info?.type}
                  required={info?.required}
                  placeholder={info?.placeholder}
                  {...register(info.name, { required: info?.required, valueAsNumber: info?.type === 'number' })}
                />
              </InputLabel>
            );
          })}
        </Inputs>
      }
    >
      <Content padding={'0 0 8px'} overflow={'auto'} gap={8}>
        <FlexBox fillWidth alignItems={'stretch'}>
          <InputLabel label={t('Select warehouse')} error={errors.warehouse}>
            <FlexBox fillWidth style={{ height: 250 }} overflow={'hidden'} padding={'0 2px'}>
              <TableList
                tableTitles={warehousesTableColumns}
                tableData={warehouses}
                hasSearch={false}
                onRowClick={handleSelectWarehouse}
              />
            </FlexBox>
          </InputLabel>

          <InputLabel label={t('Select variation')} error={errors.variation}>
            <FlexBox fillWidth style={{ height: 250 }} overflow={'hidden'} padding={'0 2px'}>
              <TableList
                tableTitles={variationsTableTitles}
                tableData={transformedVariationsTableData}
                hasSearch={false}
                onRowClick={handleSelectVariation}
              />
            </FlexBox>
          </InputLabel>

          <InputLabel label={t('Select price')} error={errors.price}>
            <FlexBox fillWidth style={{ height: 250 }} overflow={'hidden'} padding={'0 2px'}>
              <TableList
                tableTitles={pricesColumnsForProductReview}
                tableData={currentPricesData}
                hasSearch={false}
                onRowClick={handleSelectPrice}
              />
            </FlexBox>
          </InputLabel>
        </FlexBox>

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
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  justify-content: center;

  width: 100%;

  padding: 0 8px 8px;
`;

export default FormCreateWarehouseDocument;
