import Decimal from 'decimal.js';
import { FormOrderSummaryData, OrderEntity, OrderSummary } from 'types/orders/orders.types';
import { IOrderTempSlot } from '../types/orders/order-slot.types';

export interface CountOrderSummaryInput {
  slots?: (Partial<IOrderTempSlot> | undefined)[];
  orders?: (Partial<OrderEntity> | undefined)[];
  warehouses?: OrderSummary[];
  deliveryCost?: number | string;
  currency?: FormOrderSummaryData['currency'];
  defValues?: FormOrderSummaryData;
  warehousesCount?: number;
}
export interface InitTotals {
  Brutto: Decimal;
  Netto: Decimal;
  Bonus: Decimal;
  Discount: Decimal;
  Cashback: Decimal;
  deliveriesCost?: Decimal;
}
export function countOrderSummary({
  slots,
  warehouses,
  deliveryCost,
  currency,
  defValues,
  warehousesCount,
}: CountOrderSummaryInput): FormOrderSummaryData {
  const deliveriesCount = warehousesCount ?? warehouses?.length ?? 0;

  let Total: InitTotals = {
    Brutto: new Decimal(defValues?.ordersAmount ?? 0),
    Netto: new Decimal(defValues?.forPay ?? 0),
    Bonus: new Decimal(defValues?.bonus?.amount ?? 0),
    Discount: new Decimal(defValues?.discount?.amount ?? 0),
    Cashback: new Decimal(defValues?.cashback?.amount ?? 0),
    deliveriesCost: deliveryCost ? new Decimal(deliveryCost).mul(deliveriesCount) : undefined,
  };

  if (slots) {
    Total = slots.reduce((prev, next) => {
      return {
        Brutto: prev.Brutto.plus(next?.brutto ?? 0),
        Netto: prev.Netto.plus(next?.netto ?? 0),
        Bonus: prev.Bonus.plus(next?.bonus?.amount ?? 0),
        Discount: prev.Discount.plus(next?.discount?.amount ?? 0),
        Cashback: prev.Cashback.plus(next?.cashback?.amount ?? 0),
        deliveriesCost: deliveryCost ? new Decimal(deliveryCost).mul(deliveriesCount) : undefined,
      };
    }, Total);
  } else if (warehouses) {
    Total = warehouses.reduce((prev, next) => {
      return {
        Brutto: prev.Brutto.plus(next?.ordersAmount ?? 0),
        Netto: prev.Netto.plus(next?.forPay ?? 0),
        Bonus: prev.Bonus.plus(next?.bonus?.amount ?? 0),
        Discount: prev.Discount.plus(next?.discount?.amount ?? 0),
        Cashback: prev.Cashback.plus(next?.cashback?.amount ?? 0),
      };
    }, Total);
  }
  const res: OrderSummary = {
    ordersAmount: Total.Brutto.toFixed(2),

    currency: currency,

    cashback: {
      amount: Total.Cashback.toFixed(2),
    },
    discount: {
      amount: Total.Discount.toFixed(2),
    },
    bonus: {
      amount: Total.Bonus.toFixed(2),
    },
    forPay: (Total?.deliveriesCost ? Total.Netto.plus(Total.deliveriesCost) : Total.Netto).toFixed(2),
  };
  if (deliveriesCount) {
    res.deliveriesCount = deliveriesCount;
    res.ordersCount = deliveriesCount;
    res.deliveryPrice = Total.deliveriesCost?.toFixed(2);
  }
  if (slots) {
    res.slotsCount = slots?.length;
  }

  return res;
}
