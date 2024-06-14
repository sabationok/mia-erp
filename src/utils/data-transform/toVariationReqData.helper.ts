import { IVariationReqData, VariationFormData } from '../../types/offers/variations.types';
import { pick } from 'lodash';
import { toReqData } from './index';

export const toVariationReqData = (formData: VariationFormData, _id?: string): IVariationReqData => {
  // isDevMode && console.log('createVariationReqData input', formData);
  const data: IVariationReqData['data'] = toReqData({
    ...pick(formData, [
      'offer',
      'template',
      'timeFrom',
      'timeTo',
      'label',
      'sku',
      'barCode',
      'imgPreview',
      'cmsConfigs',
    ]),
    properties: formData?.propertiesMap ? Object.values(formData?.propertiesMap) : undefined,
  });

  return _id ? { data, _id } : { data };
};
