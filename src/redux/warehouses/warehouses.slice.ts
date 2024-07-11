import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateErrorType } from 'redux/reduxTypes.types';
import { WarehouseEntity, WarehouseInventoryEntity } from '../../types/warehousing/warehouses.types';
import { createWarehouseThunk, getAllWarehousesThunk, getWarehouseByIdThunk } from './warehouses.thunks';
import { sliceCleaner } from '../../utils';
import { onUserLogout } from '../auth/auth.actions';
import { isString } from 'lodash';
import { UUID } from '../../types/utils.types';

export interface WarehousingState {
  list: WarehouseEntity[];
  current?: WarehouseEntity;
  filteredLists?: WarehouseEntity[];
  isLoading: boolean;
  keysMap: Record<UUID, UUID[]>;
  dataMap: Record<UUID, WarehouseEntity>;

  error: StateErrorType;
  inventories: {
    listsMap?: Record<UUID, WarehouseInventoryEntity[]>;
    keysMap: Record<UUID, UUID[]>;
    dataMap: Record<UUID, WarehouseInventoryEntity>;
  };
}

const initialState: WarehousingState = {
  list: [],
  current: {
    _id: '',
    label: '',
    inventories: [],
  },
  keysMap: {},
  dataMap: {},
  filteredLists: [],
  isLoading: false,
  error: null,
  inventories: {
    listsMap: {},
    keysMap: {},
    dataMap: {},
  },
};

export const warehousesSlice = createSlice({
  name: 'warehouses',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllWarehousesThunk.fulfilled, (s, a) => {
        const inputArr = a?.payload?.data && Array.isArray(a?.payload?.data) ? a?.payload?.data : [];

        if (a.payload?.refresh) {
          s.list = [...inputArr];
          return;
        }
        s.list = [...inputArr, ...s.list];
      })
      .addCase(createWarehouseThunk.fulfilled, (s, a) => {
        if (a.payload) {
          s.list = [a.payload, ...s.list];
        }
      })
      .addCase(getWarehouseByIdThunk.fulfilled, (s, a) => {
        if (a.payload) {
          s.current = a.payload;
          s.dataMap[a.payload._id] = a.payload;
        }
      })

      .addMatcher(inError, (s, a: PayloadAction<StateErrorType>) => {
        // s.isLoading = false;
        s.error = a.payload;
      })
      .addMatcher(onUserLogout, sliceCleaner(initialState));
  },
});
function isWarehousingCase(type: string) {
  return isString(type) && type.startsWith('warehouses');
}
// function inPending(a: AnyAction) {
//   return isWarehousingCase(a.type) && a.type.endsWith('pending');
// }
// function inFulfilled(a: AnyAction) {
//   return isWarehousingCase(a.type) && a.type.endsWith('fulfilled');
// }
function inError(a: AnyAction) {
  return isWarehousingCase(a.type) && a.type.endsWith('rejected');
}
