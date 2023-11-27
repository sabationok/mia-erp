import { HasDestination, HasDestinationRefs, HasExecuteDate, HasExpireDate } from '../utils.types';
import { OnlyUUID } from '../../redux/global.types';

type HasMethodRef = {
  method?: OnlyUUID;
};
type HasInvoiceInfo = {
  invoiceInfo?: HasExpireDate & HasMethodRef;
};
type HasReceiverRef = { receiver?: OnlyUUID };
type HasCustomerRef = { customer?: OnlyUUID };
type HasManagerRef = { manager?: OnlyUUID };

export type ICreateOrderInfoDto = {
  communication?: Record<'customer' | 'receiver', string[]>;

  shipmentInfo?: HasReceiverRef &
    HasExecuteDate & {
      communication?: string[];
    };
  deliveryInfo?: HasInvoiceInfo & HasMethodRef & HasDestination & HasDestinationRefs;
} & HasExecuteDate &
  HasInvoiceInfo &
  HasReceiverRef &
  HasCustomerRef &
  HasManagerRef;
