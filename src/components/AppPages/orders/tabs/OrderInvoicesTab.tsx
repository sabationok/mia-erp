import TableList, { ITableListProps } from '../../../TableList/TableList';
import { invoicesTableColumns } from '../../../../data/invoicing.data';
import { useEffect, useMemo } from 'react';
import { IInvoice } from '../../../../types/invoices.types';
import { OrderTabProps } from './orderTabs.types';
import { useCurrentOrder } from '../../../../Providers/CurrentOrderProvider';
import { useLoaders } from '../../../../Providers/Loaders/useLoaders.hook';

export interface OrderInvoicesTabProps extends OrderTabProps {}

const OrderInvoicesTab: React.FC<OrderInvoicesTabProps> = _p => {
  // const state = useOrdersSelector();
  // const service = useAppServiceProvider().get(AppModuleName.orders);

  const Order = useCurrentOrder();

  // const modalService = useModalService();
  const loaders = useLoaders<'refresh'>();

  const tableConfigs = useMemo((): ITableListProps<IInvoice> => {
    return {
      actionsCreator: ctx => {
        return [
          {
            name: 'refresh',
            icon: 'refresh',
            disabled: !Order._id,
            onClick: () => {
              Order.getInvoices({});
            },
          },
        ];
      },
    };
  }, [Order]);

  useEffect(() => {
    if (Order?._id) {
      Order.getInvoices({ onLoading: loaders.onLoading('refresh') });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <TableList
      {...tableConfigs}
      hasSearch={false}
      hasFilter={false}
      isLoading={loaders.isLoading.refresh}
      tableData={Order?.invoices}
      tableTitles={invoicesTableColumns}
    />
  );
};

export default OrderInvoicesTab;
