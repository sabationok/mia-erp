import { createSlice } from '@reduxjs/toolkit';
import { onUserLogoutMatch } from '../../auth/auth.actions';
import { sliceCleaner } from '../../../utils';
import { WarehousingDocumentEntity } from '../../../types/warehousing';
import { createWrhsDocThunk, getAllWrhsDocsThunk } from './warehouses-documents.thunks';
import { createStateMapsManager, StateMaps } from '../../createStateMapsManager.helper';

export type WarehousesDocumentsState = StateMaps<WarehousingDocumentEntity>;

const initialState: WarehousesDocumentsState = {
  dataMap: {},
  keysMap: {},
  list: [],
};

const manager = createStateMapsManager({});
export const warehousesDocumentsSlice = createSlice({
  name: 'warehousesDocuments',
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
      .addMatcher(onUserLogoutMatch, sliceCleaner(initialState)),
});
