import * as YUP from 'yup';
import * as yup from 'yup';
import { IsEnum, IsString255, isString500, IsString64, IsUUID } from '../schemas';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { FinCategoryFormData, FinTransactionTypeEnum } from '../../types/directories.types';

const dirItemBaseSchema = yup.object().shape({
  label: IsString255(),
  description: isString500(),
});
export const finCategorySchema: YUP.ObjectSchema<FinCategoryFormData> = dirItemBaseSchema.shape({
  _id: IsUUID(),
  parentId: IsUUID(),
  dirType: IsEnum(ApiDirType).required(),
  type: IsEnum(FinTransactionTypeEnum).required(),
  code: IsString64(),
  taxCode: IsString64(),
  parent: YUP.lazy(() => finCategorySchema),
});
