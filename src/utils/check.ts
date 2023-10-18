import { OnlyUUID } from '../redux/global.types';

export const isNum = (v: any): v is number => typeof v === 'number';
export const isStr = (v: any): v is string => typeof v === 'string';
export const isSym = (v: any): v is symbol => typeof v === 'symbol';

export const isDate = (v: any): boolean => isNum(Date.parse(v));
export const isFun = (v: any): v is Function => typeof v === 'function';
export const isNull = (v: any): v is null => v === null;
export const isUnd = (v: any): v is undefined => v === undefined;
export const isObj = (v: any): v is object => typeof v === 'object';
export const isNotUnd = (v: any): boolean => v !== undefined;
export const isArray = (v?: any): v is any[] => isNotUnd(v) && Array.isArray(v);
export const isEmptyObj = (v: any) => Object.keys(v).length === 0;
export const hasUUID = (v?: any): v is OnlyUUID => !!v && '_id' in v && isStr(v._id);
