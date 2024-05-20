import { IVariationFormData, IVariationReqData } from '../../types/offers/variations.types';
import { pick } from 'lodash';
import { getIdRef } from './index';

export const toVariationReqData = (formData: IVariationFormData, _id?: string): IVariationReqData => {
  // isDevMode && console.log('createVariationReqData input', formData);

  const data: IVariationReqData['data'] = {
    ...pick(formData, ['timeFrom', 'timeTo', 'label', 'sku', 'barCode', 'imgPreview', 'cmsConfigs']),
    offer: formData?.offer ? getIdRef(formData?.offer) : undefined,
    properties: formData?.propertiesMap ? Object.values(formData?.propertiesMap) : undefined,
  };

  return _id ? { data, _id } : { data };
};
