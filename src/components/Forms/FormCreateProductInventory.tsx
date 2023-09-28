import ModalForm, { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import { useModalProvider } from '../ModalProvider/ModalProvider';
import { useMemo, useState } from 'react';
import { IProduct } from '../../redux/products/products.types';
import TableList from '../TableList/TableList';
import { pricesColumnsForProductReview } from '../../data/priceManagement.data';
import { useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { IProductInventoryFormData } from '../../redux/warehouses/warehouses.types';
import { IPriceListItem } from '../../redux/priceManagement/priceManagement.types';
import { IVariation } from '../../redux/products/variations.types';
import styled from 'styled-components';
import { useProductsSelector } from '../../redux/selectors.store';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import { t } from '../../lang';
import { enumToFilterOptions } from '../../utils/fabrics';
import ButtonGroup from '../atoms/ButtonGroup';

export interface FormCreateProductInventoryProps extends Omit<ModalFormProps<IProductInventoryFormData>, 'onSubmit'> {
  product?: IProduct;
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
  const modalS = useModalProvider();
  const currentProduct = useProductsSelector().currentProduct;

  const currentProductData = useMemo(() => {
    return props?.product || currentProduct;
  }, [currentProduct, props?.product]);

  const { products: productsS, warehouses: warehousesS } = useAppServiceProvider();
  const [loadedPrices, setLoadedPrices] = useState<IPriceListItem[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<IPriceListItem | undefined>();
  const [selectedVariation, setSelectedVariation] = useState<IVariation>();

  // useEffect(() => {
  //   if (selectedVariation) {
  //     createApiCall(
  //       { data: { variation: ExtractId(selectedVariation) }, onSuccess: setLoadedPrices },
  //       PriceManagementApi.getAllPrices,
  //       PriceManagementApi
  //     );
  //   }
  // }, [selectedVariation]);

  return (
    <ModalForm fillHeight fillWidth title={'Add new product inventory'} {...props}>
      <FlexBox padding={'8px'} overflow={'auto'} gap={8}>
        <InputLabel label={t('Select variation')}>
          <FlexBox style={{ height: 300 }} overflow={'hidden'}>
            <TableList tableTitles={pricesColumnsForProductReview} tableData={[]} isSearch={false} />
          </FlexBox>
        </InputLabel>

        <InputLabel label={t('Select price')}>
          <FlexBox style={{ height: 300 }} overflow={'hidden'}>
            <TableList tableTitles={pricesColumnsForProductReview} tableData={loadedPrices} isSearch={false} />
          </FlexBox>
        </InputLabel>

        <Inputs>
          {formCreateProductInventoryInputs.map(info => {
            return (
              <InputLabel label={info?.label} disabled={info?.disabled} required={info?.required}>
                <InputText
                  key={info?.name}
                  name={info?.name}
                  disabled={info?.disabled}
                  required={info?.required}
                  placeholder={info?.placeholder}
                />
              </InputLabel>
            );
          })}
        </Inputs>

        <InputLabel label={t('Reservation anable')}>
          <ButtonGroup options={reservationOptions} />
        </InputLabel>
      </FlexBox>
    </ModalForm>
  );
};

const Inputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;

  width: 100%;
`;

export default FormCreateProductInventory;
