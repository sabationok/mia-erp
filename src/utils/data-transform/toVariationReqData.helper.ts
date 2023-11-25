import { IVariationFormData, IVariationReqData } from '../../redux/products/variations/variations.types';
import { pick } from 'lodash';
import { getIdRef } from './index';

export const toVariationReqData = (formData: IVariationFormData, _id?: string): IVariationReqData => {
  // isDevMode && console.log('createVariationReqData input', formData);

  const data: IVariationReqData['data'] = {
    ...pick(formData, ['timeFrom', 'timeTo', 'label', 'sku', 'barCode']),
    product: formData?.product ? getIdRef(formData?.product) : undefined,
    properties: formData?.propertiesMap ? Object.values(formData?.propertiesMap) : undefined,
  };

  // const dataForReq = createDataForReq(data);

  return _id ? { data, _id } : { data };
};
