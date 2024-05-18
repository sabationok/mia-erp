import { OrderEntity } from '../../../../types/orders/orders.types';

export interface OrderTabProps {
  order?: OrderEntity;
  onClose?: () => void;
}
