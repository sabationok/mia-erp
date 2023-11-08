import TableList from '../../../TableList/TableList';

export interface OrderPaymentsTabProps {}

const OrderPaymentsTab: React.FC<OrderPaymentsTabProps> = () => {
  return <TableList isSearch={false} isFilter={false} />;
};

export default OrderPaymentsTab;
