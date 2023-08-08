import ModalForm, { ModalFormProps } from '../../ModalForm';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { IOrderSlot } from '../../../redux/orders/orders.types';
import { useCallback, useEffect, useState } from 'react';
import OrderSlotOverview from '../../Products/OrderSlotOverview';
import { IProduct } from '../../../redux/products/products.types';
import { pricesColumnsForProductReview } from '../../../data/priceManagement.data';
import TableList from '../../TableList/TableList';
import { useModalService } from '../../ModalProvider/ModalProvider';
import { createApiCall, OrdersApi } from '../../../api';
import { OnlyUUID } from '../../../redux/global.types';
import FlexBox from '../../atoms/FlexBox';
import { IPriceListItem } from '../../../redux/priceManagement/priceManagement.types';

export interface FormCreateOrderSlotItemProps extends Omit<ModalFormProps, 'onSubmit' | 'onSelect'> {
  onSubmit?: AppSubmitHandler<IOrderSlot>;
  product?: OnlyUUID;
}
const FormCreateOrderSlot: React.FC<FormCreateOrderSlotItemProps> = ({ onSubmit, product, ...props }) => {
  const [loadedData, setLoadedData] = useState<IOrderSlot>();
  const [dataForSlot, setDataForSlot] = useState<IProduct>();
  const [selectedPrice, setSelectedPrice] = useState<IPriceListItem>();
  const modalS = useModalService();

  const getData = useCallback(() => {
    createApiCall(
      {
        data: product,
        onSuccess: data => {
          setDataForSlot(data);
          console.log(data);
        },
        logError: true,
        logRes: true,
      },
      OrdersApi.getPreparedDataForNewSlot,
      OrdersApi
    ).then();
  }, [product]);

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <ModalForm width={'600px'} fillHeight title={'Створення позиції для замовлення'} {...props}>
      <FlexBox overflow={'auto'} style={{ minHeight: '100%' }}>
        <OrderSlotOverview price={selectedPrice} dataForSlot={dataForSlot} />

        <FlexBox style={{ minHeight: 150 }} flex={1}>
          <TableList
            tableTitles={pricesColumnsForProductReview}
            tableData={dataForSlot?.prices}
            isSearch={false}
            isFilter={false}
            onRowClick={data => {
              const rowData = dataForSlot?.prices?.find(p => p._id === data?._id);
              rowData && setSelectedPrice(rowData);
            }}
          />
        </FlexBox>

        <FlexBox style={{ minHeight: 150 }} flex={1}>
          <TableList tableTitles={pricesColumnsForProductReview} isSearch={false} isFilter={false} />
        </FlexBox>
      </FlexBox>
    </ModalForm>
  );
};
export default FormCreateOrderSlot;
