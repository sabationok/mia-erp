import { ExtServiceBase, Integration } from '../../types/integrations.types';
import { AppModuleName, StateErrorType } from '../reduxTypes.types';
import { createSlice } from '@reduxjs/toolkit';
import {
  createInputIntegrationThunk,
  createOutputIntegrationThunk,
  getAllExternalServicesThunk,
  getAllIntegrationsByTypeThunk,
  getInputIntegrationByIdThunk,
  getOutputIntegrationByIdThunk,
  updateOutputIntegrationThunk,
} from './integrations.thunk';
import { onUserLogout } from '../auth/auth.actions';
import { sliceCleaner } from '../../utils';
import { ArrayOfUUID, UUID } from '../../types/utils.types';
import { createOAuthConfigsThunk, getAllOAuthConfigsThunk } from '../auth/o-auth.thunks';

export interface IntegrationsState {
  extList: ExtServiceBase[];
  output: {
    dataMap: Record<UUID, Integration.Output.Entity>;
    keysMap: Record<UUID, ArrayOfUUID>;
    list: Integration.Output.Entity[];
  };

  input: {
    dataMap: Record<UUID, Integration.Input.Entity>;
    keysMap: Record<UUID, ArrayOfUUID>;
    list: Integration.Input.Entity[];
  };

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

const initState: IntegrationsState = {
  error: null,
  isLoading: false,
  input: createBaseMaps(),
  output: createBaseMaps(),
  extList: [],
};

export const integrationsSlice = createSlice({
  name: AppModuleName.integrations,
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
            type Tp = Integration.ByType[typeof currentType];

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
        .addCase(getOutputIntegrationByIdThunk.fulfilled, (s, a) => {
          s.output.dataMap[a.payload.data._id] = a.payload.data;
          // s.output.list.push(a.payload.data);
        })
        .addCase(createOAuthConfigsThunk.fulfilled, (st, a) => {
          st.output.list = st.output.list.map(item => {
            if (item._id === a.payload.data.outputConnection?._id) {
              if (!item.oAuth) {
                item.oAuth = [];
              }

              item.oAuth.push(a.payload.data);
            }

            return item;
          });
        })
        .addCase(getAllOAuthConfigsThunk.fulfilled, (st, a) => {
          st.output.list = st.output.list.map(item => {
            if (item._id === a.payload.params?.consumerId) {
              item.oAuth = a.payload.data;
            }

            return item;
          });
        })
        // * ====================== INPUT
        .addCase(createInputIntegrationThunk.fulfilled, (s, a) => {
          s.input.dataMap[a.payload.data._id] = a.payload.data;
          s.input.list.push(a.payload.data);
        })
        .addCase(getInputIntegrationByIdThunk.fulfilled, (s, a) => {
          s.input.dataMap[a.payload.data._id] = a.payload.data;
          // s.input.list.push(a.payload.data);
        })

        .addMatcher(onUserLogout, sliceCleaner(initState))
    );
  },
});
