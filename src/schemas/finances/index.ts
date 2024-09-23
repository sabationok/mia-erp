import * as YUP from 'yup';
import { FinAccountFormData, FinAccountsTypeEnum } from '../../types/finances/fin-accounts.types';
import { IsEnum, IsString255, isString500, IsString64, IsUUID } from '../schemas';
import { CurrencyCode } from '../../types/utils.types';

export const finAccountDtoSchema: YUP.ObjectSchema<FinAccountFormData> = YUP.object().shape({
  _id: IsUUID(),
  label: IsString255(),
  description: isString500(),
  parentId: IsUUID(),
  // description:  IsString255().optional(),
  code: IsString64(),
  type: IsEnum(FinAccountsTypeEnum),
  status: IsEnum({}),
  currency: IsEnum(CurrencyCode),
  balance: IsString64(),
  parent: YUP.lazy(() => finAccountDtoSchema),
});
