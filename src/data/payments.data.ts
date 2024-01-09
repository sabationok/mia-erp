import { enumToFilterOptions } from '../utils';
import { pick } from 'lodash';
import { PaymentInternalTypeEnum } from '../types/integrations.types';

export const paymentMethodCategoryFilterOptions = enumToFilterOptions(
  pick(PaymentInternalTypeEnum, ['paymentService', 'bankTransfer', 'imposedPayment', 'cashbackService'])
);
