import _, { omit } from 'lodash';
import { OnlyUUID } from '../../redux/app-redux.types';

export interface ToRequestDataOptions<OmitPath extends string = string> {
  omitPathArr?: OmitPath[];
  dateToNumberPath?: string;
  amountToNumberPath?: string;
  checkArrayPath?: string;
  ignorePaths?: string[];
  isRoot?: boolean;
  uuidFieldKeysMap?: Record<string, string>;
  uuidArraysFieldKeysMap?: Record<string, string>;
}

export function toReqData<IncomeDataType extends Record<string, any> = any, OmitPath extends string = string>(
  incomeData: IncomeDataType,
  options?: ToRequestDataOptions<OmitPath>
): Partial<IncomeDataType> {
  // console.log(options?.omitPathArr);
  const _omitkeys = ['createdAt', 'updatedAt', ...(options?.omitPathArr || [])];
  if (options?.isRoot === false) {
    _omitkeys.unshift('_id');
  }
  const inputCopy = options?.isRoot
    ? JSON.parse(JSON.stringify(omit(incomeData, _omitkeys)))
    : omit(incomeData, _omitkeys);

  let outData: Record<string, any> = {};
  // console.log('before', { inputCopy }, { outData });
  try {
    Object.entries(inputCopy).forEach(([key, value]) => {
      if (_.isUndefined(value) || _.isNull(value)) {
        // console.log('isUndefined', { key }, { value });
        return;
      }
      if (['undefined', 'function', 'null'].includes(typeof value)) {
        return;
      }
      if (!value) {
        return;
      }

      if (options?.ignorePaths?.includes(key)) {
        // console.log('ignorePaths', { key }, { value });
        outData[key] = value;
        return;
      }

      if (options?.dateToNumberPath && key === options?.dateToNumberPath) {
        // console.log('dateToNumberPath', { key }, { value });
        outData[key] = new Date(value as never).valueOf() as any;
        return;
      }
      if (options?.amountToNumberPath && key === options?.amountToNumberPath) {
        // console.log('amountToNumberPath', { key }, { value });
        outData[key] = (Number(value) || 0) as any;
        return;
      }
      if (value && typeof value === 'object') {
        if (Object.keys(value).length === 0) {
          // console.log('ignored object', { key }, { value });
          return;
        }

        if ('_id' in value) {
          if (options?.uuidFieldKeysMap) {
            const idKey = options?.uuidFieldKeysMap?.[key];

            if (idKey) {
              return (outData[idKey] = value);
            }
          }

          if (options?.uuidArraysFieldKeysMap) {
            const idsKey = options?.uuidArraysFieldKeysMap?.[key];

            if (idsKey) {
              return (outData[idsKey] = value);
            }
          }

          // console.log("'_id' in value", { key }, { value });
          return (outData[key] = { _id: value?._id } as OnlyUUID);
        }
        if ('value' in value) {
          // console.log("'value' in value", { key }, { value });
          return (outData[key] = value?.value);
        }

        if (Array.isArray(value)) {
          // console.log('type === Array', { key }, { value });
          return (outData[key] = value as IncomeDataType[typeof key]);
        }

        if (
          Object.entries(value).some(([k, _v]) => {
            if (k === '_id' && value) return true;
            if (k === 'value' && value) return true;
            return false;
          })
        ) {
        }
        const recursiveRes = toReqData(value, {
          ...options,
          isRoot: false,
          omitPathArr: options?.omitPathArr
            ?.filter(omiPath => omiPath.startsWith(key))
            .map(omiPath => omiPath.replace(`${key}.`, '')) as never,
        });
        // console.log('recursive call', { key }, { value }, { recursiveRes });

        if (Object.keys(recursiveRes).length > 0) {
          // console.log('recursive call | keys.length > 0', { key }, { value });
          return (outData[key] = recursiveRes);
        }
        return;
      }
      if (!(_.isUndefined(value) || _.isNull(value))) {
        // console.log('value exist', { key }, { value });
        return (outData[key] = value as any);
      }
      return;
    });
  } catch (e) {
    console.error(e);
  }
  // console.log('after', outData);
  return outData as Partial<IncomeDataType>;
}
