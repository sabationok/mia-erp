import { OrderSlotEntity } from '../orders/order-slot.types';
import { HasOwnerAsCompany, HasStatus, HasType, IBase, OnlyUUID, UUID } from '../utils.types';
import { HasRefundRequest } from './requests.types';
import { HasDeliveriesList } from '../deliveries.types';

export enum ExchangeStatus {
  queued = 'queued',
  confirmed = 'confirmed',
  rejected = 'rejected',
  success = 'success',
  fail = 'fail',
  pending = 'pending',
}

export interface ExchangeBaseFields extends HasType, HasStatus<ExchangeStatus> {}

export interface ExchangeEntity
  extends IBase,
    HasOwnerAsCompany,
    ExchangeBaseFields,
    HasRefundRequest,
    HasDeliveriesList {
  from?: OrderSlotEntity;
  to?: OrderSlotEntity;
}

export interface CreateExchangeDto {
  requestId?: UUID;
  fromId: UUID;
  toId: UUID;
}
export interface UpdateExchangeDto extends OnlyUUID, CreateExchangeDto {}
