import { AppModuleName } from '../reduxTypes.types';
import { ExtServicesApi, IntegrationsApi } from '../../api';
import { createAppAsyncThunk } from '../createAppAsynkThunk';

const IntegrationsThunkType = {
  getAll: `${AppModuleName.integrations}/getAllThunk`,

  services: {
    getAll: `${AppModuleName.integrations}/services/getAllThunk`,
  },

  output: {
    create: `${AppModuleName.integrations}/output/createThunk`,
    update: `${AppModuleName.integrations}/output/updateThunk`,
    getOne: `${AppModuleName.integrations}/output/getOneThunk`,
    getById: `${AppModuleName.integrations}/output/getByIdThunk`,
  },

  input: {
    create: `${AppModuleName.integrations}/input/createThunk`,
    getOne: `${AppModuleName.integrations}/input/getOneThunk`,
    getById: `${AppModuleName.integrations}/input/getByIdThunk`,
  },
};

export const getAllExternalServicesThunk = createAppAsyncThunk(
  IntegrationsThunkType.services.getAll,
  ExtServicesApi.getExtServicesList
);

export const getAllIntegrationsByTypeThunk = createAppAsyncThunk(
  IntegrationsThunkType.getAll,
  IntegrationsApi.Client.getAll
);

// * OUTPUT =============================>>>>>>>>>>>>>>

export const createOutputIntegrationThunk = createAppAsyncThunk(
  IntegrationsThunkType.output.create,
  IntegrationsApi.Client.output.create
);
export const updateOutputIntegrationThunk = createAppAsyncThunk(
  IntegrationsThunkType.output.update,
  IntegrationsApi.Client.output.update
);
export const getOutputIntegrationByIdThunk = createAppAsyncThunk(
  IntegrationsThunkType.output.getById,
  IntegrationsApi.Client.output.getById
);

// * INPUT =============================>>>>>>>>>>>>>>

export const createInputIntegrationThunk = createAppAsyncThunk(
  IntegrationsThunkType.input.create,
  IntegrationsApi.Client.input.create
);
export const getInputIntegrationByIdThunk = createAppAsyncThunk(
  IntegrationsThunkType.input.getById,
  IntegrationsApi.Client.input.getById
);
