import { IOrder } from '../../../../types/orders/orders.types';

export interface OrderTabProps {
  order?: IOrder;
  onClose?: () => void;
}
