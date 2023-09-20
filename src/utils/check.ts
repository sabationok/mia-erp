export const isNum = (v: any): v is number => typeof v === 'number';
export const isStr = (v: any): v is string => typeof v === 'string';
export const isFun = (v: any): v is Function => typeof v === 'function';
export const isNull = (v: any): v is null => v === null;
export const isUnd = (v: any): v is null => v === undefined;
