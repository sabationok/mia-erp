import { HasOwnerAsCompany, HasStatus, HasType, IBase, OnlyUUID } from '../utils.types';
import { HasRefundRequest } from './requests.types';
import { OrderSlotEntity } from '../orders';
import { WarehouseEntity } from '../warehousing';
import { DeliveryEntity } from '../deliveries.types';

export enum ReturnsStatus {
  queued = 'queued',
  confirmed = 'confirmed',
  rejected = 'rejected',
  success = 'success',
  fail = 'fail',
  created = 'created',
  pending = 'pending',
}

export interface ReturnBaseFields extends HasStatus<ReturnsStatus>, HasType {}

export interface ReturnEntity extends IBase, ReturnBaseFields, HasOwnerAsCompany, HasRefundRequest {
  slot?: OrderSlotEntity;
  warehouse?: WarehouseEntity;
  delivery?: DeliveryEntity;
}

export interface CreateReturnDto {}
export interface UpdateReturnDto extends OnlyUUID, CreateReturnDto {}
