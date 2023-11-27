import { IFormDataValueWithID } from '../../redux/global.types';
import {
  HasDescription,
  HasDestination,
  HasDestinationRefs,
  HasExecuteDate,
  HasExpireDate,
  HasManager,
} from '../utils.types';
import { HasCustomer, HasReceiver } from '../customers.types';

type HasMethodRef = {
  method?: IFormDataValueWithID;
};
type HasInvoiceInfo = {
  invoiceInfo?: HasExpireDate & HasMethodRef;
};
export type ICreateOrderInfoFormState = {
  communication?: Record<'customer' | 'receiver', string[]>;
  shipmentInfo?: HasExecuteDate & HasReceiver;
  deliveryInfo?: HasInvoiceInfo & HasDestination & HasDestinationRefs & HasMethodRef & HasDescription;
} & HasCustomer &
  HasReceiver &
  HasManager &
  HasExecuteDate &
  HasInvoiceInfo;
