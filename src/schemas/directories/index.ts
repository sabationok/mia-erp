import * as YUP from 'yup';
import { IsEnum, IsString255, isString500, IsString64, IsUrl, IsUUID } from '../schemas';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { FinCategoryFormData, FinTransactionTypeEnum } from '../../types/directories.types';
import { pick } from 'lodash';
import { OfferTypeEnum } from '../../types/offers/offers.types';
import { OfferCategoryFormData } from '../../components/Forms/Directories/FormCreateOfferCategory';

const dirItemBaseSchema = YUP.object().shape({
  _id: IsUUID(),
  label: IsString255(),
  description: isString500(),
  parentId: IsUUID(),
});
const dirItemParentSchema = dirItemBaseSchema.omit(['description', 'parentId']);
export const finCategorySchema: YUP.ObjectSchema<FinCategoryFormData> = dirItemBaseSchema.shape({
  dirType: IsEnum(pick(ApiDirType, ['CATEGORIES_TR'])).required(),
  type: IsEnum(FinTransactionTypeEnum).required(),
  taxCode: IsString64().optional(),
  parent: dirItemParentSchema.optional(),
  code: IsString64().optional(),
});

export const offerCategoryDtoSchema: YUP.ObjectSchema<OfferCategoryFormData> = dirItemBaseSchema.shape({
  dirType: IsEnum(pick(ApiDirType, ['CATEGORIES_PROD'])).required(),
  type: IsEnum(OfferTypeEnum).required(),
  description: IsString255().optional(),
  parent: dirItemParentSchema.notRequired(),
  iconUrl: IsUrl().notRequired(),
});
