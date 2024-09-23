import * as YUP from 'yup';
import { IsEnum, IsString255, isString500, IsString64, IsUUID } from '../schemas';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { FinCategoryFormData, FinTransactionTypeEnum } from '../../types/directories.types';
import { pick } from 'lodash';
import { OfferTypeEnum } from '../../types/offers/offers.types';

const IsDirItemBaseSchema = (dirType: keyof typeof ApiDirType) => {
  const base = YUP.object().shape({
    _id: IsUUID(),
    label: IsString255(),
    description: isString500(),
    dirType: IsEnum(pick(ApiDirType, [dirType])).required(),
    parentId: IsUUID(),
  });

  return base;
};
export const finCategorySchema: YUP.ObjectSchema<FinCategoryFormData> = IsDirItemBaseSchema('CATEGORIES_TR').shape({
  // dirType: IsEnum(pick(ApiDirType, 'CATEGORIES_PROD')).required(),
  type: IsEnum(FinTransactionTypeEnum).required(),
  taxCode: IsString64(),
  parent: YUP.lazy(() => finCategorySchema),
  code: IsString64(),
});

export const offerCategoryDtoSchema = IsDirItemBaseSchema('CATEGORIES_PROD').shape({
  description: IsString255().optional(),
  type: IsEnum(OfferTypeEnum),
  parent: YUP.lazy(() => offerCategoryDtoSchema),
});
