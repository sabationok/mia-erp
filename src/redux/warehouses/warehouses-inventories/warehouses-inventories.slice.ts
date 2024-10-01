import { createSlice } from '@reduxjs/toolkit';
import { onUserLogout } from '../../auth/auth.actions';
import { sliceCleaner } from '../../../utils';
import { WarehouseInventoryEntity } from '../../../types/warehousing';
import { createWrhsDocThunk, getAllWrhsDocsThunk } from './warehouses-inventories.thunks';
import { createStateMapsManager, StateMaps } from '../../createStateMapsManager.helper';

export type WarehousesInventoriesState = StateMaps<WarehouseInventoryEntity>;

const initialState: WarehousesInventoriesState = {
  dataMap: {},
  keysMap: {},
  list: [],
};

const manager = createStateMapsManager({});
export const warehousesInventoriesSlice = createSlice({
  name: 'warehousesInventories',
  reducers: {},
  initialState,
  extraReducers: builder =>
    builder
      .addCase(getAllWrhsDocsThunk.fulfilled, (st, { payload: { data, params } }) => {
        for (const item of data) {
          manager.update(st, item, { parentIds: [params?.warehouseId] });
        }
      })
      .addCase(createWrhsDocThunk.fulfilled, (st, { payload: { data, params } }) => {
        return manager.update(st, data, { parentIds: [params?.warehouseId] });
      })
      .addMatcher(onUserLogout, sliceCleaner(initialState)),
});
