import {
  HasBarCode,
  HasDescription2,
  HasOwnerAsCompany,
  HasStatus,
  HasType,
  IBase,
  OnlyUUID,
  UUID,
} from '../utils.types';
import { PermissionEntity } from '../permissions.types';
import { RefundRequestEntity } from './requests.types';

export enum RefundTypeEnum {
  simple = 'simple',
  set = 'set',
}

export enum RefundStatus {
  queued = 'queued',
  pending = 'pending',
  confirmed = 'confirmed',
  rejected = 'rejected',
  success = 'success',
  fail = 'fail',
}

export interface RefundBaseFields
  extends HasBarCode,
    HasType<RefundTypeEnum>,
    HasStatus<RefundStatus>,
    HasDescription2 {}

export interface RefundEntity extends IBase, HasOwnerAsCompany, RefundBaseFields {
  request?: RefundRequestEntity;

  manager?: PermissionEntity;

  code?: string;

  customer?: PermissionEntity;
  receiver?: PermissionEntity;

  payments?: OnlyUUID[];
}

export interface CreateRefundsDto extends HasDescription2 {
  requestId?: UUID;
}
export interface UpdateRefundsDto extends OnlyUUID, CreateRefundsDto {}
