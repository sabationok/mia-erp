import { AppModuleName } from '../reduxTypes.types';
import { ConnectionsApi, ExtServicesApi } from '../../api';
import { createAppAsyncThunk } from '../createAppAsynkThunk';

const IntegrationsThunkType = {
  getAll: `${AppModuleName.connections}/getAllThunk`,

  services: {
    getAll: `${AppModuleName.connections}/services/getAllThunk`,
  },

  output: {
    create: `${AppModuleName.connections}/output/createThunk`,
    update: `${AppModuleName.connections}/output/updateThunk`,
    regenerateKeys: `${AppModuleName.connections}/output/regenerateKeysThunk`,
    getOne: `${AppModuleName.connections}/output/getOneThunk`,
    getById: `${AppModuleName.connections}/output/getByIdThunk`,
  },

  input: {
    create: `${AppModuleName.connections}/input/createThunk`,
    getOne: `${AppModuleName.connections}/input/getOneThunk`,
    getById: `${AppModuleName.connections}/input/getByIdThunk`,
  },
};

export const getAllExternalServicesThunk = createAppAsyncThunk(
  IntegrationsThunkType.services.getAll,
  ExtServicesApi.getExtServicesList
);

export const getAllIntegrationsByTypeThunk = createAppAsyncThunk(
  IntegrationsThunkType.getAll,
  ConnectionsApi.Client.getAll
);

// * OUTPUT =============================>>>>>>>>>>>>>>

export const createOutputIntegrationThunk = createAppAsyncThunk(
  IntegrationsThunkType.output.create,
  ConnectionsApi.Client.output.create
);
export const updateOutputIntegrationThunk = createAppAsyncThunk(
  IntegrationsThunkType.output.update,
  ConnectionsApi.Client.output.update
);
export const regenerateKeysOutputConnectionThunk = createAppAsyncThunk(
  IntegrationsThunkType.output.regenerateKeys,
  ConnectionsApi.Client.output.regenerateKeys
);
export const getOutputConnectionThunk = createAppAsyncThunk(
  IntegrationsThunkType.output.getById,
  ConnectionsApi.Client.output.getById
);

// * INPUT =============================>>>>>>>>>>>>>>

export const createInputConnectionThunk = createAppAsyncThunk(
  IntegrationsThunkType.input.create,
  ConnectionsApi.Client.input.create
);
export const getInputConnectionByIdThunk = createAppAsyncThunk(
  IntegrationsThunkType.input.getById,
  ConnectionsApi.Client.input.getById
);
