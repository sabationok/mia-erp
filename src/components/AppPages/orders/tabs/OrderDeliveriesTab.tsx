import TableList from '../../../TableList/TableList';
import { OrderTabProps } from './orderTabs.types';

export interface OrderDeliveriesTabProps extends OrderTabProps {}

const OrderDeliveriesTab: React.FC<OrderDeliveriesTabProps> = ({ order }) => {
  return <TableList hasSearch={false} hasFilter={false} />;
};

export default OrderDeliveriesTab;
