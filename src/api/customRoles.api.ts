import baseApi from './baseApi';
import APP_CONFIGS from '../redux/APP_CONFIGS';

export default class CustomRolesApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.customRoles;
}
