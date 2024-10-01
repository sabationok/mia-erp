import { IBase, PartialRecord, UUID } from '../types/utils.types';

export interface StateMaps<Data extends IBase> {
  dataMap: PartialRecord<UUID, Data>;
  keysMap: PartialRecord<UUID, UUID[]>;
  list: Data[];
}
export const createStateMapsManager = <Data extends IBase, State extends StateMaps<Data>>({
  getParentIdKey,
}: {
  getParentIdKey?: ((data: Data) => string | null | undefined)[];
} = {}) => {
  const updateIdsArray = (action: 'add' | 'delete', state: State, idKey: UUID, parentId: UUID) => {
    const set = new Set(state.keysMap[parentId]);
    set[action](idKey);
    state.keysMap[parentId] = Array.from(set.values());
    if (!state.keysMap[parentId]?.length) delete state.keysMap[parentId];
    return state;
  };

  const manageKeysMap = (state: State, data: Data, idKey: UUID, action: 'add' | 'delete') => {
    if (getParentIdKey) {
      for (const getter of getParentIdKey) {
        const parentId = getter(data);
        if (typeof parentId !== 'string') continue;
        updateIdsArray(action, state, idKey, parentId);
      }
    }
    return state;
  };
  const update = (
    state: State,
    data: Data,
    {
      append,
      parentIds,
    }: {
      append?: boolean;
      parentIds?: (string | undefined)[];
    } = {}
  ) => {
    const idKey = data?._id;
    if (idKey) {
      state.dataMap[idKey] = data; // Оновлюємо або додаємо об'єкт в dataMap
      const filtered = [...state.list.filter(item => item._id !== idKey), data];
      const current = state.dataMap[idKey];
      if (current) {
        state.list = append ? filtered.concat([current]) : [current].concat(filtered);
      }
      manageKeysMap(state, data, idKey, 'add');
      parentIds?.forEach(parentId => {
        if (parentId) updateIdsArray('add', state, idKey, parentId);
      });
    }

    return state;
  };

  const set = (
    state: State,
    data: Data,
    {
      append,
      parentIds,
    }: {
      append?: boolean;
      parentIds?: (string | undefined)[];
    } = {}
  ) => {
    const idKey = data?._id;
    state.dataMap[idKey] = data; // Оновлюємо або додаємо об'єкт в dataMap
    const filtered = [...state.list.filter(item => item._id !== idKey), data];
    const current = state.dataMap[idKey];
    if (current) {
      state.list = append ? filtered.concat([current]) : [current].concat(filtered);
    }
    manageKeysMap(state, data, idKey, 'add');
    parentIds?.forEach(parentId => {
      if (parentId) updateIdsArray('add', state, idKey, parentId);
    });

    return state;
  };
  const remove = (
    state: State,
    deleteId: UUID, // Якщо передано, видаляємо
    params?: {
      parentIds?: string[];
    }
  ) => {
    const current = state.dataMap[deleteId];
    if (current) manageKeysMap(state, current, deleteId, 'delete');
    state.list = state.list.filter(item => item._id !== deleteId);
    delete state.dataMap[deleteId];
    params?.parentIds?.forEach(parentId => {
      if (parentId) updateIdsArray('delete', state, deleteId, parentId);
    });
  };

  return { update, set, remove };
};
