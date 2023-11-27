import { ICreateOrderInfoFormState } from '../../types/orders/createOrderInfoFormState.type';
import { ICreateOrderInfoDto, ICreateOrdersGroupDto } from '../../types/orders/orders.types';
import { getIdRef } from './index';

export function toOrderInfoReqData(input: ICreateOrderInfoFormState): ICreateOrdersGroupDto['info'] {
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
          expiredAt: input.invoiceInfo?.expiredAt,
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
          expiredAt: input.deliveryInfo.invoiceInfo?.expiredAt,
        };
      }
    }

    output.deliveryInfo = deliveryInfo;
  }

  // console.debug('Transform Order Info For Req'.toUpperCase());
  // console.log('input', input, 'output', output);

  return output;
}
