import TableList, { ITableListProps } from '../../../TableList/TableList';
import { invoicesTableColumns } from '../../../../data/invoicing.data';
import { useOrdersSelector } from '../../../../redux/selectors.store';
import { useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { useEffect, useMemo, useState } from 'react';
import { getIdRef } from '../../../../utils';
import { IInvoice } from '../../../../types/invoices.types';
import { OrderTabProps } from './orderTabs.types';
import { AppModuleName } from '../../../../redux/reduxTypes.types';

export interface OrderInvoicesTabProps extends OrderTabProps {}

const OrderInvoicesTab: React.FC<OrderInvoicesTabProps> = ({ order }) => {
  const state = useOrdersSelector();
  const currentOrder = order ?? state?.currentOrder;
  const service = useAppServiceProvider().get(AppModuleName.orders);

  // const modalService = useModalService();

  const [isLoading, setIsLoading] = useState(false);

  const tableConfigs = useMemo((): ITableListProps<IInvoice> => {
    return {
      actionsCreator: ctx => {
        return [
          {
            name: 'refresh',
            icon: 'refresh',
            onClick: () => {
              if (currentOrder?._id) {
                service.getInvoicesByOrderId({ data: { params: { order: getIdRef(currentOrder) } } });
              }
            },
          },
        ];
      },
    };
  }, [currentOrder, service]);

  useEffect(() => {
    if (currentOrder?._id) {
      service.getInvoicesByOrderId({ data: { params: { order: getIdRef(currentOrder) } }, onLoading: setIsLoading });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <TableList
      {...tableConfigs}
      isSearch={false}
      isFilter={false}
      isLoading={isLoading}
      tableData={currentOrder?.invoices}
      tableTitles={invoicesTableColumns}
    />
  );
};

export default OrderInvoicesTab;
