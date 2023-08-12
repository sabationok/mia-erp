import ModalForm, { ModalFormProps } from '../../ModalForm';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { IOrderSlot } from '../../../redux/orders/orders.types';
import { useCallback, useEffect, useState } from 'react';
import OrderSlotOverview from '../../Overviews/OrderSlotOverview';
import { IProduct } from '../../../redux/products/products.types';
import { pricesColumnsForProductReview } from '../../../data/priceManagement.data';
import TableList from '../../TableList/TableList';
import { useModalService } from '../../ModalProvider/ModalProvider';
import { createApiCall, OrdersApi } from '../../../api';
import { OnlyUUID } from '../../../redux/global.types';
import FlexBox from '../../atoms/FlexBox';
import { IPriceListItem } from '../../../redux/priceManagement/priceManagement.types';
import styled from 'styled-components';
import TableVariations, { IProductVariation } from '../../TableVariations';
import { IWarehouseDirItem } from '../../Directories/dir.types';
import CustomSelect from '../../atoms/Inputs/CustomSelect';
import { isUndefined } from 'lodash';

export interface FormCreateOrderSlotItemProps extends Omit<ModalFormProps, 'onSubmit' | 'onSelect'> {
  onSubmit?: AppSubmitHandler<IOrderSlot>;
  product?: OnlyUUID;
}
const warehouses = [
  { _id: '6', value: '6', label: 'Нижні Винники | 000256', code: '000256' },
  { _id: '7', value: '7', label: 'Івано-Франкова | 000217', code: '000217' },
  { _id: '9', value: '9', label: 'Сокільники | 000635', code: '000635' },
];
const FormCreateOrderSlot: React.FC<FormCreateOrderSlotItemProps> = ({ onSubmit, product, ...props }) => {
  const [loadedData, setLoadedData] = useState<IOrderSlot>();
  const [dataForSlot, setDataForSlot] = useState<IProduct>();
  const [selectedPrice, setSelectedPrice] = useState<IPriceListItem>();
  const [selectedVariation, setSelectedVariation] = useState<IProductVariation>();
  const [warehouse, setWarehouse] = useState<IWarehouseDirItem | undefined>();
  const [currentTab, setCurrentTab] = useState(1);
  const modalS = useModalService();

  const getData = useCallback(() => {
    createApiCall(
      {
        data: product,
        onSuccess: setDataForSlot,
      },
      OrdersApi.getPreparedDataForNewSlot,
      OrdersApi
    ).then();
  }, [product]);

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <ModalForm
      // width={'600px'}
      filterOptions={[
        { label: 'Ціна', value: 'warehouse' },
        { label: 'Варіація', value: 'warehouse' },
      ]}
      onOptSelect={(_option, _value, index) => {
        setCurrentTab(index);
      }}
      fillHeight
      title={'Створення позиції для замовлення'}
      {...props}
    >
      <FlexBox style={{ minHeight: '100%' }} overflow={'auto'}>
        <OrderSlotOverview
          price={selectedPrice}
          variation={selectedVariation}
          dataForSlot={dataForSlot}
          warehouse={warehouse}
          disabled
        />

        <FlexBox flex={1}>
          <FlexBox padding={'0 8px'} style={{ minHeight: '100%' }}>
            <TableBox flex={1} minHeight={'300px'}>
              {currentTab === 0 && (
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
              )}
              {currentTab === 1 && (
                <>
                  <FlexBox fillWidth padding={'0 0 8px'}>
                    <CustomSelect
                      label={'Склад'}
                      placeholder={'Оберіть склад'}
                      dropDownIsAbsolute
                      onSelect={(option, value, index) => {
                        !isUndefined(index) && setWarehouse(warehouses[index]);
                      }}
                      options={warehouses}
                    />
                  </FlexBox>

                  <TableVariations onSelect={setSelectedVariation} defaultState={selectedVariation} />
                </>
              )}
            </TableBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </ModalForm>
  );
};
const TableBox = styled(FlexBox)<{ minHeight?: string }>`
  min-height: ${({ minHeight = '150px' }) => minHeight};
  //padding: 0 8px;
  border-bottom: 1px solid ${({ theme }) => theme.modalBorderColor};
`;
export default FormCreateOrderSlot;
