import FlexBox from '../../../atoms/FlexBox';
import TabSelector from '../../../atoms/TabSelector';
import TableList, { ITableListProps } from '../../../TableList/TableList';
import { useOrdersSelector } from '../../../../redux/selectors.store';
import { useEffect, useMemo, useState } from 'react';
import { orderSlotsTableColumns } from '../../../../data/orders.data';
import { offerTypeFilterOptions } from '../../../../data/modalFilterOptions.data';
import { useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { AppModuleName } from '../../../../redux/reduxTypes.types';
import { getIdRef } from '../../../../utils';
import { IOrderSlot } from '../../../../types/orders/orders.types';

export interface OrderContentTabProps {}

const OrderContentTab: React.FC<OrderContentTabProps> = p => {
  const service = useAppServiceProvider()[AppModuleName.orders];
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState<number>(0);

  const { currentOrder } = useOrdersSelector();

  const tableData = useMemo(() => {
    return currentOrder?.slots?.filter(el => el.product?.type === offerTypeFilterOptions[currentTab]?.value);
  }, [currentOrder?.slots, currentTab]);

  const tableConfigs = useMemo((): ITableListProps<IOrderSlot> => {
    return {
      actionsCreator: ctx => {
        return [
          {
            icon: 'refresh',
            name: 'refresh',
            onClick: () => {
              if (currentOrder?._id) {
                service.getSlots({ data: { params: { order: getIdRef(currentOrder) } }, onLoading: setIsLoading });
              }
            },
          },
        ];
      },
    };
  }, [currentOrder, service]);

  useEffect(() => {
    if (currentOrder?._id) {
      service.getSlots({ data: { params: { order: getIdRef(currentOrder) } } });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <FlexBox fillWidth overflow={'hidden'} flex={1}>
      <FlexBox fillWidth>
        <TabSelector
          options={offerTypeFilterOptions}
          currentIndex={currentTab}
          onOptSelect={(_o, _v, i) => {
            setCurrentTab(i);
          }}
        />
      </FlexBox>

      <TableList
        hasSearch={false}
        hasFilter={false}
        {...tableConfigs}
        tableData={tableData}
        isLoading={isLoading}
        tableTitles={orderSlotsTableColumns}
      />
    </FlexBox>
  );
};

export default OrderContentTab;
