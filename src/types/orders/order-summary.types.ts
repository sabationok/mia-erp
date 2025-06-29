import { HasCurrencyCode } from '../utils.types';
import { AmountAndPercentageFields } from '../price-management';

export interface OrderSummary extends HasCurrencyCode {
  discount?: AmountAndPercentageFields;

  cashback?: AmountAndPercentageFields;

  bonus?: AmountAndPercentageFields;

  brutto?: string;
  netto?: string;

  ordersCount?: number;
  offersCount?: number;
  slotsCount?: number;
  ordersAmount?: string;

  forPay?: string;
  deliveriesCount?: number;
  deliveryPrice?: number | string;
}

export interface FormOrderSummaryData extends OrderSummary {}
