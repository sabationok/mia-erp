import TableList from '../../../TableList/TableList';
import { OrderTabProps } from './orderTabs.types';

export interface OrderDeliveriesTabProps extends OrderTabProps {}

const OrderDeliveriesTab: React.FC<OrderDeliveriesTabProps> = ({ order }) => {
  return <TableList isSearch={false} isFilter={false} />;
};

export default OrderDeliveriesTab;
