import {
  HasBarCode,
  HasDescription,
  HasDescription2,
  HasLabel,
  HasManager,
  HasOwnerAsCompany,
  HasStatus,
  HasType,
  IBase,
  OnlyUUID,
  UUID,
} from '../utils.types';
import { RefundEntity } from './refunds.types';
import { ExchangeEntity } from './exchange.types';
import { ReturnEntity } from './returns.types';
import { HasCmsParams } from '../cms';
import { FilesApi } from '../../api';
import FileEntity = FilesApi.FileEntity;

export enum RefundRequestStatus {
  queued = 'queued',
  confirmed = 'confirmed',
  rejected = 'rejected',
  success = 'success',
  fail = 'fail',
  created = 'created',
}

export enum RefundRequestTypeEnum {
  refund = 'refund',
  exchange = 'exchange',
  return = 'return',
}

export type RefundRequestReason = IBase & HasDescription & HasLabel & HasCmsParams; // TODO
export type RefundRequestReasonDto = HasDescription & HasLabel & HasCmsParams; // TODO

export interface RefundRequestBaseFields
  extends HasBarCode,
    HasStatus<RefundRequestStatus>,
    HasType<RefundRequestTypeEnum>,
    HasDescription2 {}

export interface RefundRequestEntity extends IBase, HasOwnerAsCompany, HasManager, RefundRequestBaseFields {
  refund?: RefundEntity;
  exchange?: ExchangeEntity;
  return?: ReturnEntity;

  reason?: RefundRequestReason;

  files?: FileEntity[];
}

export interface CreateRefundRequestDto extends Pick<RefundRequestBaseFields, 'description' | 'type'> {
  orderId: UUID;

  reasonId?: UUID;
  reason?: RefundRequestReasonDto;

  // return?: CreateReturnDto;
  // refund?: CreateRefundsDto;
  // exchange?: CreateExchangeDto;
}

export interface UpdateRefundRequestDto extends OnlyUUID, Omit<CreateRefundRequestDto, 'type'> {}

export interface HasRefundRequest {
  refundRequest?: RefundRequestEntity;
}
export interface HasRefundRequests {
  refundRequests?: RefundRequestEntity[];
}
