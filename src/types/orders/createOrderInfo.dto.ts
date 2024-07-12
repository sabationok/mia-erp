import { OnlyUUID } from '../global.types';
import { AppDate, UUID } from '../utils.types';
import { AddressDto } from '../addresses/addresses.types';

export interface ICreateOrderInfoDto {
  manager?: OnlyUUID;
  managerId?: UUID;

  customer?: OnlyUUID;
  customerId?: UUID;

  receiver?: OnlyUUID;
  receiverId?: UUID;

  communication?: {
    customer?: OnlyUUID;
    customerId?: UUID;

    receiver?: OnlyUUID;
    receiverId?: UUID;
  };

  communications?: {
    forCustomerIds?: UUID[];
    forReceiverIds?: UUID[];
  };

  invoiceInfo?: {
    method?: OnlyUUID;
    methodId?: UUID;
    expiredAt?: AppDate;
  };
  shipmentInfo?: {
    executeAt?: AppDate;
    executeNow?: boolean;
  };
  deliveryInfo?: {
    method?: OnlyUUID;
    methodId?: UUID;
    destination?: AddressDto;
    address?: OnlyUUID | AddressDto;

    invoiceInfo?: {
      method?: OnlyUUID;
      methodId?: UUID;
      expiredAt?: AppDate;
    };
  };
}
