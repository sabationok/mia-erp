import TableList from '../../../TableList/TableList';

export interface OrderShipmentsTabProps {}

const OrderShipmentsTab: React.FC<OrderShipmentsTabProps> = ({}) => {
  return <TableList isSearch={false} isFilter={false} />;
};

export default OrderShipmentsTab;
