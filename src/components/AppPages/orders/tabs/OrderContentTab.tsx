import FlexBox from '../../../atoms/FlexBox';
import TabSelector from '../../../atoms/TabSelector';
import TableList, { ITableListProps } from '../../../TableList/TableList';
import { useOrdersSelector } from '../../../../redux/selectors.store';
import { useEffect, useMemo, useState } from 'react';
import { orderSlotsTableColumns } from '../../../../data';
import { offerTypeFilterOptions } from '../../../../data/modalFilterOptions.data';
import { useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { AppModuleName } from '../../../../redux/reduxTypes.types';
import { useLoaders } from '../../../../Providers/Loaders/useLoaders.hook';
import { OfferTypeEnum } from '../../../../types/offers/offers.types';
import { useCurrentOrder } from '../../../../Providers/CurrentOrderProvider';
import { OrderSlotEntity } from '../../../../types/orders/order-slot.types';

export interface OrderContentTabProps {}

const OrderContentTab: React.FC<OrderContentTabProps> = p => {
  // const service = useAppServiceProvider()[AppModuleName.orders];
  const [currentTab, setCurrentTab] = useState<OfferTypeEnum | undefined>();
  const loaders = useLoaders<'update' | 'create' | 'refresh'>();
  const Order = useCurrentOrder();

  // const { currentOrder } = useOrdersSelector();

  const tableData = useMemo(() => {
    // const grouped=groupBy(currentOrder?.slots)

    if (currentTab) {
      return Order?.slots?.filter(el => el.offer?.type === currentTab);
    } else return Order?.slots;
  }, [Order?.slots, currentTab]);

  const tableConfigs = useMemo((): ITableListProps<OrderSlotEntity> => {
    return {
      actionsCreator: _ctx => {
        return [
          {
            icon: 'refresh',
            name: 'refresh',
            disabled: !Order._id,
            onClick: () => {
              Order.getSlots({ onLoading: loaders.onLoading('refresh') });
            },
          },
        ];
      },
    };
  }, [Order, loaders]);

  useEffect(() => {
    if (!Order?.slots?.length) {
      Order.getSlots({ onLoading: loaders.onLoading('refresh') });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <FlexBox fillWidth overflow={'hidden'} flex={1}>
      <FlexBox fillWidth>
        <TabSelector
          options={offerTypeFilterOptions}
          defaultValue={currentTab}
          preventDefault
          onResetPress={() => {
            setCurrentTab(undefined);
          }}
          onOptSelect={(_o, value) => {
            setCurrentTab(value);
          }}
        />
      </FlexBox>

      <TableList
        hasSearch={false}
        hasFilter={false}
        {...tableConfigs}
        tableData={tableData}
        isLoading={loaders.isLoading.refresh}
        tableTitles={orderSlotsTableColumns}
      />
    </FlexBox>
  );
};

export default OrderContentTab;
