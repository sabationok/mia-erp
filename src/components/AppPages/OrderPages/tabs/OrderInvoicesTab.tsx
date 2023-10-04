import TableList from '../../../TableList/TableList';

export interface OrderInvoicesTabProps {}

const OrderInvoicesTab: React.FC<OrderInvoicesTabProps> = ({}) => {
  return <TableList isSearch={false} isFilter={false} />;
};

export default OrderInvoicesTab;
