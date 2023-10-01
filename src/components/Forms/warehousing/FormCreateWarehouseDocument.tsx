import ModalForm, { ModalFormProps } from '../../ModalForm';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import styled from 'styled-components';
import { enumToFilterOptions } from '../../../utils/fabrics';
import {
  IWarehouse,
  IWarehouseDoc,
  IWarehouseDocFormData,
  WarehouseDocumentType,
} from '../../../redux/warehouses/warehouses.types';
import { t } from '../../../lang';
import { useAppForm } from '../../../hooks';
import { useProductsSelector, usePropertiesSelector, useWarehousesSelector } from '../../../redux/selectors.store';
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
import { createApiCall, WarehousesApi } from '../../../api';
import { warehousesTableColumns } from '../../../data/warehauses.data';

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
  { name: 'batch', label: t('Batch'), placeholder: t('Batch') },
];

const FormCreateWarehouseDocument = ({ product, ...props }: FormCreateWarehouseDocumentProps) => {
  const { products: productsS } = useAppServiceProvider();
  const currentProduct = useProductsSelector().currentProduct;
  const warehouses = useWarehousesSelector().warehouses;
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
      if (data?._id === formValues.variation?._id) return;

      unregister('price');

      data?._id && setValue('variation._id', data?._id);
    },
    [formValues.variation?._id, setValue, unregister]
  );

  const handleSelectPrice: OnRowClickHandler = useCallback(
    data => {
      data?._id && setValue('price._id', data?._id);
    },
    [setValue]
  );
  const handleSelectWarehouse: OnRowClickHandler<IWarehouse> = useCallback(
    data => {
      data?._id && setValue('warehouse._id', data?._id);
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
      productsS.getProductFullInfo({ data: ExtractId(product) });
    }
  }, [currentProduct?._id, product, productsS]);

  return (
    <Form
      title={'Create new warehouse document'}
      width={'960px'}
      {...props}
      filterOptions={docTypeFilterOptions}
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
            <FlexBox fillWidth style={{ height: 250 }} overflow={'hidden'}>
              <TableList
                tableTitles={warehousesTableColumns}
                tableData={warehouses}
                isSearch={false}
                onRowClick={handleSelectWarehouse}
              />
            </FlexBox>
          </InputLabel>

          <InputLabel label={t('Select variation')} error={errors.variation}>
            <FlexBox fillWidth style={{ height: 250 }} overflow={'hidden'}>
              <TableList
                tableTitles={variationsTableTitles}
                tableData={transformedVariationsTableData}
                isSearch={false}
                onRowClick={handleSelectVariation}
              />
            </FlexBox>
          </InputLabel>

          <InputLabel label={t('Select price')} error={errors.price}>
            <FlexBox fillWidth style={{ height: 250 }} overflow={'hidden'}>
              <TableList
                tableTitles={pricesColumnsForProductReview}
                tableData={currentPricesData}
                isSearch={false}
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
