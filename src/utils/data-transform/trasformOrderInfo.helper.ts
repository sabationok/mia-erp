import { ICreateOrdersGroupDto, IOrderTempSlot } from '../../types/orders.types';
import { getIdRef } from './index';
import _ from 'lodash';
import { ICreateOrderInfoFormState } from '../../types/orders/createOrderInfoFormState.types';
import { ICreateOrderInfoDto } from '../../types/orders/createOrderInfoDto.types';

export function transformOrderInfoForReq(input: ICreateOrderInfoFormState): ICreateOrdersGroupDto['info'] {
  const output: ICreateOrdersGroupDto['info'] = {};

  const objectsArr = Object.keys(input).map(key => {
    const value = input[key as keyof typeof input];
    if (value && typeof value === 'object' && value.hasOwnProperty('_id') && '_id' in value) {
      return { [key]: getIdRef(value) };
    }
    return { [key]: value };
  });
  Object.assign(output, ...objectsArr);

  if (input?.invoiceInfo) {
    if (input.invoiceInfo) {
      let invoiceInfo: ICreateOrderInfoDto['invoiceInfo'] = {};

      if (input.invoiceInfo?.method) {
        invoiceInfo = {
          method: getIdRef(input.invoiceInfo.method),
          expireAt: input.invoiceInfo?.expireAt,
        };
        output.invoiceInfo = invoiceInfo;
      }
    }
  }
  if (input?.deliveryInfo) {
    const deliveryInfo: ICreateOrderInfoDto['deliveryInfo'] = {};
    if (input.deliveryInfo.method) {
      deliveryInfo.method = getIdRef(input.deliveryInfo.method);
    }

    if (input?.deliveryInfo?.invoiceInfo) {
      if (input?.deliveryInfo?.invoiceInfo?.method) {
        deliveryInfo.invoiceInfo = {
          method: getIdRef(input.deliveryInfo.invoiceInfo.method),
          expireAt: input.deliveryInfo.invoiceInfo?.expireAt,
        };
      }
    }

    output.deliveryInfo = deliveryInfo;
  }

  console.debug('Transform Order Info For Req'.toUpperCase());
  console.log({ input });
  console.log({ output });
  return output;
}
export function _transformOrderInfoForReq(input: ICreateOrderInfoFormState): ICreateOrdersGroupDto['info'] {
  console.debug('Transform Order Info For Req'.toUpperCase());
  console.log({ input });

  function transformObject(obj: any) {
    const result: any = {};

    for (const key in obj) {
      if (obj[key] instanceof Object) {
        result[key] = transformObject(obj[key]);
      } else if (key === 'method') {
        result.method = getIdRef(obj.method);
        result.expiredAt = obj.expiredAt;
      } else {
        result[key] = obj[key];
      }
    }

    return result;
  }

  const output: ICreateOrdersGroupDto = {
    info: transformObject(input),
  };

  console.log({ output });
  return output.info;
}

export function transformOrderSlotsForReq(slots: IOrderTempSlot[]): ICreateOrdersGroupDto['slots'] {
  const output = slots.map(slot => {
    const sl = _.omit(slot, ['tempId']);

    const objectsArr = Object.keys(sl).map(key => {
      const value = sl[key as keyof typeof sl];
      if (value && typeof value === 'object' && value.hasOwnProperty('_id') && '_id' in value) {
        return { [key]: getIdRef(value) };
      }
      return { [key]: value };
    });
    console.log({ objectsArr });
    Object.assign(sl, ...objectsArr);

    return sl;
  });
  console.debug(transformOrderSlotsForReq.name);
  console.log(output);
  return output;
}
