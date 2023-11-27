import { ICustomerBase } from '../customers.types';
import { IUserBase } from '../auth.types';
import { AddressDto, IFormDataValueWithID } from '../../redux/global.types';
import { AppDate, FormDataLocationRefs } from '../utils.types';

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
    method?: IFormDataValueWithID;
    expiredAt?: AppDate;
  };

  executeAt?: AppDate;
  executeNow?: boolean;

  shipmentInfo?: {
    executeAt?: AppDate;
    executeNow?: boolean;
  };
  deliveryInfo?: {
    method?: IFormDataValueWithID;
    destinationRefs?: FormDataLocationRefs;
    destination?: AddressDto;

    invoiceInfo?: {
      method?: IFormDataValueWithID;
      expiredAt?: AppDate;
    };
  };
}
