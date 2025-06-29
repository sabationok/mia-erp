import { PriceEntity } from '../price-management';
import { OnlyUUID } from '../utils.types';
import { CompanyEntity } from '../companies/companies.types';
import { IManager } from '../auth/auth.types';
import { OrderSlotEntity } from '../orders';

export interface IRefundSlotItem extends PriceEntity {
  slot?: OnlyUUID;
  order?: OnlyUUID;
  owner?: CompanyEntity;
  manager?: IManager;

  origin?: Partial<PriceEntity>;
}
export interface RefundSlotEntity extends OrderSlotEntity {}
