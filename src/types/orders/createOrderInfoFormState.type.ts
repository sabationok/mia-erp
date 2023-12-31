import { ICustomerBase } from '../customers.types';
import { IUserBase } from '../auth.types';
import { AddressDto, IFormDataValueWithID } from '../../redux/global.types';
import { AppDate, FormDataLocationRefs, HasEmbeddedType } from '../utils.types';
import { InvoicingInternalTypeEnum } from '../integrations.types';

export interface ICreateOrderInfoFormState {
  customer?: ICustomerBase;
  receiver?: ICustomerBase;

  manager?: {
    _id: string;
    user?: Partial<IUserBase>;
  };

  communication?: {
    customer?: string[];
    receiver?: string[];
  };

  invoiceInfo?: {
    method?: IFormDataValueWithID & HasEmbeddedType<InvoicingInternalTypeEnum>;
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
      method?: IFormDataValueWithID & HasEmbeddedType<InvoicingInternalTypeEnum>;
      expireAt?: AppDate;
    };
  };
}
