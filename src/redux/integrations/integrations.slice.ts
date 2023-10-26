import { ExtServiceBase } from './integrations.types';
import { AppModuleName, StateErrorType } from '../reduxTypes.types';
import { createSlice } from '@reduxjs/toolkit';
import { getAllExtIntegrationServicesThunk } from './integrations.thunk';

export interface IntegrationsState {
  extList: ExtServiceBase[];
  error: StateErrorType | null;
  isLoading: boolean;
}

const initState: IntegrationsState = {
  error: null,
  isLoading: false,
  extList: [],
};

export const integrationsSlice = createSlice({
  name: AppModuleName.integrations,
  initialState: initState,
  reducers: {},
  extraReducers: builder => {
    return builder.addCase(getAllExtIntegrationServicesThunk.fulfilled, (s, a) => {
      s.extList = a.payload.data;
    });
  },
});
