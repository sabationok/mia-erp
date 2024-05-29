import TableList from '../../../TableList/TableList';
import { OrderTabProps } from './orderTabs.types';

export interface OrderShipmentsTabProps extends OrderTabProps {}

const OrderShipmentsTab: React.FC<OrderShipmentsTabProps> = () => {
  return <TableList hasSearch={false} hasFilter={false} />;
};

export default OrderShipmentsTab;
