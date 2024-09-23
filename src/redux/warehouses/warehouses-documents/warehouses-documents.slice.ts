import { createSlice } from '@reduxjs/toolkit';
import { onUserLogout } from '../../auth/auth.actions';
import { sliceCleaner } from '../../../utils';
import { PartialRecord, UUID } from '../../../types/utils.types';
import { WarehousingDocumentEntity } from '../../../types/warehousing';

export interface WarehousesDocumentsState {
  dataMap: PartialRecord<UUID, WarehousingDocumentEntity>;
  keysMap: PartialRecord<UUID, UUID[]>;
  list: WarehousingDocumentEntity[];
}

const initialState: WarehousesDocumentsState = {
  dataMap: {},
  keysMap: {},
  list: [],
};
export const warehousesDocumentsSlice = createSlice({
  name: 'warehousesDocuments',
  reducers: {},
  initialState,
  extraReducers: builder => builder.addMatcher(onUserLogout, sliceCleaner(initialState)),
});
