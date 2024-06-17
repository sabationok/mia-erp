import { getIdFromRef } from './data-transform';
import { Path } from 'react-hook-form';
import { Values } from '../types/utils.types';
import { orderBy } from 'lodash';
import { TableSortOrderEnum, TableSortParam } from '../components/TableList/tableTypes.types';

export function ObjectKeys<Obj extends object = object, Key extends keyof Obj = keyof Obj>(obj: Obj): Key[] {
  return Object.keys(obj) as Key[];
}
export function ObjectValues<
  Obj extends object = any,
  Key extends keyof Obj = keyof Obj,
  Value extends Obj[Key] = Obj[Key],
>(obj: Obj): Value[] {
  return Object.values(obj) as Value[];
}

export function ObjectEntries<
  Obj extends object = any,
  Key extends keyof Obj = keyof Obj,
  Value extends Obj[Key] = Obj[Key],
>(obj: Obj): [Key, Value][] {
  return Object.entries(obj) as [Key, Value][];
}

export function ObjectFromEntries<Key extends string, T>(
  entries: Iterable<readonly [Key, T]>
): {
  [key in Key]: T;
} {
  return Object.fromEntries(entries) as { [key in Key]: T };
}

export function sortIds(ids?: string[]) {
  return [...(ids ?? [])]?.sort((a, b) => a.localeCompare(b));
}

export function idsFromRefs<Ref extends { [key in '_id']: string }>(refs: Ref[]): string[] {
  const ids: string[] = [];
  for (const ref of refs) {
    const id = getIdFromRef(ref);
    if (id) ids.push(id);
  }
  return ids;
}
export const getUnicSelectedIdsFromMap = (map: Record<string, string[]>) => {
  const idsArrays = Object.keys(map).filter(key => {
    return map?.[key]?.length;
  });

  return idsArrays;
};

export function getSortedDataByParam<DataType = any>(
  data: DataType[],
  param: TableSortParam<Path<DataType>, never, DataType>,
  sortOrder: Values<Pick<typeof TableSortOrderEnum, 'desc' | 'asc'>>
) {
  return orderBy(data, [param.dataPath], [sortOrder]);
}
