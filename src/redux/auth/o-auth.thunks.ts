import { createAppAsyncThunk } from '../createAppAsynkThunk';
import { OAuthApi } from '../../api/auth/OAuth.api';

export enum OAuthThunk {
  logIn = 'auth/o_auth/logInThunk',
}
export enum OAuthConfigsThunk {
  getAll = 'integrations/output/configs/getAllThunk',
  create = 'integrations/output/configs/createThunk',
  update = 'integrations/output/configs/updateThunk',
}
export const createOAuthConfigsThunk = createAppAsyncThunk(OAuthConfigsThunk.create, OAuthApi.configs.create);
export const updateOAuthConfigsThunk = createAppAsyncThunk(OAuthConfigsThunk.update, OAuthApi.configs.update);
export const getAllOAuthConfigsThunk = createAppAsyncThunk(OAuthConfigsThunk.getAll, OAuthApi.configs.getAll);
