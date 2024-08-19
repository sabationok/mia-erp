import { MaybeNull, UUID } from '../../utils.types';
import { Permission } from '../../permissions.types';
import { IFormDataValueWithID } from '../../../redux/app-redux.types';

export interface HasPolicy {
  supplementPolicy?: MaybeNull<{
    supplier?: MaybeNull<Permission.Entity>;
  }>;
}
export interface FormData {
  supplier?: IFormDataValueWithID;
}
export interface Dto {
  supplierId?: UUID;
}
