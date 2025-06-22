import { Connections, ExtServiceBase } from '../../types/integrations.types';
import { AppModuleName, StateErrorType } from '../reduxTypes.types';
import { createSlice } from '@reduxjs/toolkit';
import {
  createInputConnectionThunk,
  createOutputIntegrationThunk,
  getAllExternalServicesThunk,
  getAllIntegrationsByTypeThunk,
  getInputConnectionByIdThunk,
  getOutputConnectionThunk,
  regenerateKeysOutputConnectionThunk,
  updateOutputIntegrationThunk,
} from './integrations.thunk';
import { onUserLogoutMatch } from '../auth/auth.actions';
import { sliceCleaner } from '../../utils';
import { StateMaps } from '../createStateMapsManager.helper';

export interface ConnectionsState {
  extList: ExtServiceBase[];
  output: StateMaps<Connections.Output.Entity>;

  input: StateMaps<Connections.Input.Entity>;

  error: StateErrorType | null;
  isLoading: boolean;
}

const createBaseMaps = () => {
  return {
    dataMap: {},
    keysMap: {},
    list: [],
  };
};

const initState: ConnectionsState = {
  error: null,
  isLoading: false,
  input: createBaseMaps(),
  output: createBaseMaps(),
  extList: [],
};

export const integrationsSlice = createSlice({
  name: AppModuleName.connections,
  initialState: initState,
  reducers: {},
  extraReducers: builder => {
    return (
      builder
        .addCase(getAllExternalServicesThunk.fulfilled, (s, a) => {
          s.extList = a.payload.data;
        })
        .addCase(getAllIntegrationsByTypeThunk.fulfilled, (s, a) => {
          const currentType = a.payload.params?.type;

          if (currentType) {
            type Tp = Connections.ByType[typeof currentType];

            let list = s[currentType].list as Tp[];

            list = a.payload.update ? list.concat(a.payload.data as unknown as Tp) : a.payload.data;

            s[currentType].list = list;
          }
          return s;
        })
        .addCase(createOutputIntegrationThunk.fulfilled, (s, a) => {
          s.output.dataMap[a.payload.data._id] = a.payload.data;
          s.output.list.push(a.payload.data);
        })
        .addCase(updateOutputIntegrationThunk.fulfilled, (s, a) => {
          s.output.dataMap[a.payload.data._id] = a.payload.data;

          s.output.list = s.output.list.map(item => {
            return item._id === a.payload.data._id ? a.payload.data : item;
          });
        })
        .addCase(regenerateKeysOutputConnectionThunk.fulfilled, (s, a) => {
          s.output.dataMap[a.payload.data._id] = a.payload.data;

          s.output.list = s.output.list.map(item => {
            return item._id === a.payload.data._id ? a.payload.data : item;
          });
        })
        .addCase(getOutputConnectionThunk.fulfilled, (s, a) => {
          s.output.dataMap[a.payload.data._id] = a.payload.data;
          // s.output.list.push(a.payload.data);
        })

        // * ====================== INPUT
        .addCase(createInputConnectionThunk.fulfilled, (s, a) => {
          s.input.dataMap[a.payload.data._id] = a.payload.data;
          s.input.list.push(a.payload.data);
        })
        .addCase(getInputConnectionByIdThunk.fulfilled, (s, a) => {
          s.input.dataMap[a.payload.data._id] = a.payload.data;
          // s.input.list.push(a.payload.data);
        })

        .addMatcher(onUserLogoutMatch, sliceCleaner(initState))
    );
  },
});
