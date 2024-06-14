import { IVariationReqData, VariationFormData } from '../../types/offers/variations.types';
import { pick } from 'lodash';
import { toReqData } from './index';

export const toVariationReqData = (formData: VariationFormData, _id?: string): IVariationReqData => {
  const propValuesIds = formData?.propertiesMap
    ? Object.values(formData?.propertiesMap).map(item => item._id)
    : undefined;

  const data: IVariationReqData['data'] = toReqData({
    ...pick(formData, ['offer', 'template', 'timeFrom', 'timeTo', 'label', 'sku', 'barCode', 'imgPreview']),
    propertiesIds: propValuesIds,
    properties: propValuesIds,
  });

  return _id ? { data, _id } : { data };
};
