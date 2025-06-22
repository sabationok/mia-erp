import { ICreateOrdersGroupFormState, OrderEntity } from 'types/orders/orders.types';
import { HasBaseCmsConfigs } from '../../types/cms.types';
import { HasImgPreview, HasLabel, HasSku, UUID } from '../../types/utils.types';
import { WarehouseEntity } from '../../types/warehousing';

export interface SetRecommendationPayload extends HasSku, HasLabel, HasBaseCmsConfigs, HasImgPreview {
  _id?: string;
  offerId?: string;
  fromRef: string;
  variation?: HasSku &
    HasLabel & {
      // * не обовязково
      _id?: string;
      properties?: { _id?: string }[];
    };
}

export interface CartOrder extends Omit<OrderEntity, 'slots'>, ICreateOrdersGroupFormState {
  ordersIds?: UUID[];
  slotsIds?: UUID[];
  selectedIds?: UUID[];
  offersIdsMap?: Record<UUID, UUID[]>;

  isSelected?: boolean;

  warehouse?: WarehouseEntity;
  orders?: CartOrder[];
}
