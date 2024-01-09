import { ICustomerBase } from '../customers.types';
import { IUserBase } from '../auth.types';
import { AddressDto, IFormDataValueWithID, OnlyUUID } from '../../redux/global.types';
import { AppDate, FormDataLocationRefs, HasEmbeddedType } from '../utils.types';
import { PaymentInternalTypeEnum } from '../integrations.types';

export interface ICreateOrderInfoFormState {
  customer?: ICustomerBase;
  receiver?: ICustomerBase;

  manager?: {
    _id: string;
    user?: Partial<IUserBase>;
  };

  communication?: {
    customer?: OnlyUUID;
    receiver?: OnlyUUID;
  };

  invoiceInfo?: {
    method?: IFormDataValueWithID & HasEmbeddedType<PaymentInternalTypeEnum>;
    expireAt?: AppDate;
  };

  executeAt?: AppDate;
  executeNow?: boolean;

  shipmentInfo?: {
    executeAt?: AppDate;
    executeNow?: boolean;
  };
  deliveryInfo?: {
    method?: IFormDataValueWithID & HasEmbeddedType;
    destinationRefs?: FormDataLocationRefs;
    destination?: AddressDto;

    declaredAmount?: number;

    returnPayment: {
      amount?: string;
      payer?: 'customer' | 'receiver' | 'company';
      commission?: {
        payer?: number;
        receiver?: number;
      };
    };

    invoiceInfo?: {
      method?: IFormDataValueWithID & HasEmbeddedType<PaymentInternalTypeEnum>;
      expireAt?: AppDate;
    };
  };
}
