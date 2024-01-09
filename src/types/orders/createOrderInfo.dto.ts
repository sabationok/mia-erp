import { AddressDto, OnlyUUID } from '../../redux/global.types';
import { AppDate, LocationRefsDto } from '../utils.types';

export interface ICreateOrderInfoDto {
  manager?: OnlyUUID;
  customer?: OnlyUUID;
  receiver?: OnlyUUID;
  communication?: {
    customer?: OnlyUUID;
    receiver?: OnlyUUID;
  };

  invoiceInfo?: {
    method?: OnlyUUID;
    expiredAt?: AppDate;
  };
  shipmentInfo?: {
    executeAt?: AppDate;
    executeNow?: boolean;
  };
  deliveryInfo?: {
    method?: OnlyUUID;
    locationRefs?: LocationRefsDto;
    destination?: AddressDto;

    invoiceInfo?: {
      method?: OnlyUUID;
      expiredAt?: AppDate;
    };
  };
}
