import { getIdFromRef } from './data-transform';

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
