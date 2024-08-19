import { DeliveryPolicy, PaymentPolicy } from 'types/companies/policies';
import * as YUP from 'yup';
import { isUUID } from '../schemas';
import { ObjectFromEntries } from '../../utils';

const baseFields = {
  methodId: isUUID.optional(),
  selectByClient: YUP.boolean().optional(),
  autoCreate: YUP.boolean().optional(),
  autoPublish: YUP.boolean().optional(),
} as const;

export const delivery_policy_sales_json_data_schema: YUP.ObjectSchema<DeliveryPolicy.FormData['sales']> =
  YUP.object().shape({
    ...baseFields,

    allowImposedPayment: YUP.boolean(),
    insurance: YUP.object().shape({
      allowed: YUP.boolean(),
      percentage: YUP.string()
        .min(0)
        .max(100)
        .optional()
        .transform((value: string) => {
          return Number(value ? value : '0').toFixed(2);
        }),
      amount: YUP.string()
        .min(0)
        .optional()
        .transform((value: string) => {
          return Number(value ? value : '0').toFixed(2);
        }),
    }),
  });
export const delivery_policy_json_data_schema: YUP.ObjectSchema<DeliveryPolicy.FormData> = YUP.object().shape(
  ObjectFromEntries(
    Object.values(DeliveryPolicy.TypeEnum).map(key => {
      return [key, delivery_policy_sales_json_data_schema];
    })
  )
);

export const payment_policy_sales_json_data_schema: YUP.ObjectSchema<PaymentPolicy.FormData['sales']> =
  YUP.object().shape({
    ...baseFields,
  });
export const payment_policy_json_data_schema: YUP.ObjectSchema<PaymentPolicy.FormData> = YUP.object().shape(
  ObjectFromEntries(
    Object.values(PaymentPolicy.TypeEnum).map(key => {
      return [key, payment_policy_sales_json_data_schema];
    })
  )
);
