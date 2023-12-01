import { ICreateOrdersGroupDto, IOrderTempSlot } from '../../types/orders/orders.types';
import _ from 'lodash';
import { getIdRef } from './index';

export interface toOrderSlotsRequestDataOptions {
  convertToCents?: boolean;
  omitKeys?: (keyof IOrderTempSlot)[];
}
export function toOrderSlotsReqData(
  slots: IOrderTempSlot[],
  options?: toOrderSlotsRequestDataOptions
): ICreateOrdersGroupDto['slots'] {
  const output = slots.map(slot => {
    return Object.assign(
      {},
      ...Object.entries(_.omit(slot, ['tempId'])).map(([key, value]) => {
        if (value && typeof value === 'object') {
          if ('_id' in value) {
            return { [key]: getIdRef(value) };
          }
          if (options?.convertToCents && 'amount' in value) {
            return { [key]: { ...value, amount: (value.amount ?? 0) * 100 } };
          }
        }
        return { [key]: value };
      })
    );
  });
  // console.debug(toOrderSlotsReqData.name, output);
  return output;
}
