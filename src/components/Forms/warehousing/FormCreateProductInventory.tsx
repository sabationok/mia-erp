import ModalForm, { ModalFormProps } from '../../ModalForm';
import FlexBox from '../../atoms/FlexBox';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { OfferEntity } from '../../../types/offers/offers.types';
import TableList from '../../TableList/TableList';
import { pricesColumnsForProductReview } from '../../../data/priceManagement.data';
import { IProductInventoryFormData } from '../../../types/warehousing/warehouses.types';
import { PriceEntity } from '../../../types/price-management/price-management.types';
import { VariationEntity } from '../../../types/offers/variations.types';
import styled from 'styled-components';
import { useProductsSelector } from '../../../redux/selectors.store';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import { t } from '../../../lang';
import { enumToFilterOptions } from '../../../utils/fabrics';
import ButtonsGroup from '../../atoms/ButtonsGroup';
import { transformVariationTableData } from '../../../utils/tables';
import { createApiCall, PriceManagementApi } from '../../../api';
import { getIdRef } from '../../../utils/data-transform';
import { OnRowClickHandler } from '../../TableList/tableTypes.types';
import { useForm } from 'react-hook-form';
import { OnlyUUID } from '../../../redux/app-redux.types';

export interface FormCreateProductInventoryProps extends Omit<ModalFormProps<IProductInventoryFormData>, 'onSubmit'> {
  product?: OfferEntity;
}

const formCreateProductInventoryInputs: {
  name: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
}[] = [
  { name: 'stock', label: t('Available'), placeholder: t('Available') },
  { name: 'reserved', label: t('Reserved'), placeholder: t('Reserved') },
];
enum ReservationOptions {
  Yes = 'Yes',
  No = 'No',
}
const reservationOptions = enumToFilterOptions(ReservationOptions);
const FormCreateProductInventory: React.FC<FormCreateProductInventoryProps> = ({ ...props }) => {
  // const modalS = useModalProvider();
  const currentProduct = useProductsSelector().currentOffer;

  const form = useForm({});

  const currentProductData = useMemo(() => {
    return props?.product || currentProduct;
  }, [currentProduct, props?.product]);

  // const { products: productsS, warehouses: warehousesS } = useAppServiceProvider();
  const [loadedPrices, setLoadedPrices] = useState<PriceEntity[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<PriceEntity | OnlyUUID | undefined>();
  const [selectedVariation, setSelectedVariation] = useState<VariationEntity>();

  useEffect(() => {
    console.log('FormCreateProductInventory selectedPrice', selectedPrice);
  }, [selectedPrice]);

  // const templates = usePropertiesSelector();

  // const variationsTableTitles = useMemo(() => {
  //   const template = templates.find(t => t._id === currentProduct?.template?._id);
  //   return createTableTitlesFromProperties(template);
  // }, [currentProduct?.template?._id, templates]);

  useEffect(() => {
    if (selectedVariation) {
      createApiCall(
        { data: { variation: getIdRef(selectedVariation) }, onSuccess: setLoadedPrices },
        PriceManagementApi.prices.getAll,
        PriceManagementApi
      );
    }
  }, [selectedVariation]);

  const transformedVariationsTableData = useMemo(
    () => currentProductData?.variations?.map(v => transformVariationTableData(v)),
    [currentProductData?.variations]
  );

  const handleSelectVariation: OnRowClickHandler = useCallback(data => {
    const variation = data?._id ? { _id: data._id } : null;
    if (!variation) return;

    setSelectedVariation(variation);

    createApiCall(
      { data: { variation }, onSuccess: setLoadedPrices },
      PriceManagementApi.prices.getAll,
      PriceManagementApi
    );
  }, []);

  const handleSelectPrice: OnRowClickHandler = useCallback(data => {
    const price = data?._id ? { _id: data._id } : null;
    if (!price) return;

    setSelectedPrice(price);
  }, []);

  const onValid = (data: IProductInventoryFormData) => {
    console.log('IProductInventoryFormData', data);
  };

  return (
    <Form
      fillHeight
      title={'Add new product inventory'}
      width={'960px'}
      {...props}
      onSubmit={form.handleSubmit(onValid)}
    >
      <FlexBox padding={'8px'} overflow={'auto'} gap={8}>
        <InputLabel label={t('Select variation')}>
          <FlexBox style={{ height: 300 }} overflow={'hidden'}>
            <TableList
              // tableTitles={variationsTableTitles}
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

        <Inputs>
          {formCreateProductInventoryInputs.map(info => {
            return (
              <InputLabel key={info?.name} label={info?.label} disabled={info?.disabled} required={info?.required}>
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

        <InputLabel label={t('Reservation anable')}>
          <ButtonsGroup options={reservationOptions} />
        </InputLabel>
      </FlexBox>
    </Form>
  );
};
const Form = styled(ModalForm)`
  @media screen and (min-width: 480px) {
    width: fit-content;
    max-width: 960px;
  }
`;
const Inputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;

  width: 100%;
`;

export default FormCreateProductInventory;
