import { StateDataMap } from './reduxTypes.types';

export function createDefaultDataMap<Entity = any, KeyType extends string = any>(): StateDataMap<Entity, KeyType> {
  return {
    dataMap: {},
    list: [],
    keysMap: {},
  };
}
