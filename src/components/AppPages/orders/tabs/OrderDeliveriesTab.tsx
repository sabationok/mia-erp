import TableList from '../../../TableList/TableList';
import { OrderTabProps } from './orderTabs.types';
import { useEffect } from 'react';
import { useCurrentOrder } from '../../../../Providers/CurrentOrderProvider';

export interface OrderDeliveriesTabProps extends OrderTabProps {}

const OrderDeliveriesTab: React.FC<OrderDeliveriesTabProps> = ({ order }) => {
  const Order = useCurrentOrder();

  useEffect(() => {
    if (!Order?.deliveries?.length) {
      Order?.getDeliveries({});
    }
  }, [Order]);

  return (
    <TableList
      hasSearch={false}
      hasFilter={false}
      actionsCreator={() => {
        return [{ title: 'Refresh', icon: 'refresh', onClick: () => Order.getDeliveries({}) }];
      }}
    />
  );
};

export default OrderDeliveriesTab;
