import { MaybeNull, UUID } from '../../utils.types';
import { WarehouseEntity } from '../../warehousing';
import { IFormDataValueWithID } from '../../../redux/app-redux.types';

export interface HasPolicy {
  warehousingPolicy?: MaybeNull<{
    warehouse?: MaybeNull<WarehouseEntity>;
  }>;
}
export interface FormData {
  warehouseId?: UUID;
  warehouse?: IFormDataValueWithID;
}

export interface Dto {
  warehouseId?: UUID;
}
