import TableList from '../../../TableList/TableList';

export interface OrderPaymentsTabProps {}

const OrderPaymentsTab: React.FC<OrderPaymentsTabProps> = () => {
  return <TableList hasSearch={false} hasFilter={false} />;
};

export default OrderPaymentsTab;
