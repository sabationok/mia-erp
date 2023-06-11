type EndpointCreator = (...args: any[]) => string;

export enum EndpointNames {
  getAll = 'getAll',
  create = 'create',
  delete = 'delete',
  deleteById = 'deleteById',
  updateById = 'updateById',
  getById = 'getById',
  getCurrent = 'getCurrent',
  register = 'register',
  logOut = 'logOut',
  logIn = 'logIn',
  getAllByUserId = 'getAllByUserId',
  getAllByCompanyId = 'getAllByCompanyId',
  getAllByOwnerId = 'getAllByOwnerId',
  rejectById = 'rejectById',
  acceptById = 'acceptById',
}

interface Endpoints<T = EndpointCreator | string> extends Record<keyof typeof EndpointNames, T> {}

export const TRANSACTIONS_API_BASENAME = '/transactions';
export const transactionsApiEndpoints = {
  [EndpointNames.getAll]: (): string => `${TRANSACTIONS_API_BASENAME}/${EndpointNames.getAll}`,
  [EndpointNames.create]: (): string => `${TRANSACTIONS_API_BASENAME}/${EndpointNames.create}`,
  [EndpointNames.deleteById]: (id: string): string => `${TRANSACTIONS_API_BASENAME}/${EndpointNames.deleteById}/${id}`,
  [EndpointNames.updateById]: (id: string): string => `${TRANSACTIONS_API_BASENAME}/${EndpointNames.updateById}/${id}`,
  [EndpointNames.getById]: (id: string): string => `${TRANSACTIONS_API_BASENAME}/${EndpointNames.getById}/${id}`,
};
export const PERMISSIONS_API_BASENAME = '/permissions';
export const permissionsApiEndpoints = {
  [EndpointNames.updateById]: (permissionId: string) =>
    `${PERMISSIONS_API_BASENAME}/${EndpointNames.delete}/${permissionId}`,
  [EndpointNames.deleteById]: (permissionId: string) =>
    `${PERMISSIONS_API_BASENAME}/${EndpointNames.deleteById}/${permissionId}`,
  [EndpointNames.create]: () => `${PERMISSIONS_API_BASENAME}/${EndpointNames.create}`,
  [EndpointNames.getAllByUserId]: (userId: string) =>
    `${PERMISSIONS_API_BASENAME}/${EndpointNames.getAllByUserId}/${userId}`,
  [EndpointNames.getAllByCompanyId]: (companyId: string) =>
    `${PERMISSIONS_API_BASENAME}/${EndpointNames.getAllByCompanyId}/${companyId}`,
  [EndpointNames.getCurrent]: (permissionId: string) =>
    `${PERMISSIONS_API_BASENAME}/${EndpointNames.getCurrent}/${permissionId}`,
  [EndpointNames.logOut]: (id: string) => `${PERMISSIONS_API_BASENAME}/${EndpointNames.logOut}/${id}`,
};

export const COMPANIES_API_BASENAME = '/companies';
export const companiesApiEndpoints = {
  [EndpointNames.deleteById]: (permissionId: string) =>
    `${COMPANIES_API_BASENAME}/${EndpointNames.deleteById}/${permissionId}`,
  [EndpointNames.updateById]: (permissionId: string) =>
    `${COMPANIES_API_BASENAME}/${EndpointNames.updateById}/${permissionId}`,
  [EndpointNames.create]: () => `${COMPANIES_API_BASENAME}/${EndpointNames.create}`,
  [EndpointNames.getById]: (id: string) => `${COMPANIES_API_BASENAME}/${EndpointNames.getById}/${id}`,
  [EndpointNames.getAllByOwnerId]: (ownerId: string) =>
    `${COMPANIES_API_BASENAME}/${EndpointNames.getAllByOwnerId}/${ownerId}`,
};

export const AUTH_API_BASENAME = '/auth';

export const authApiEndpoints = {
  [EndpointNames.register]: () => `${AUTH_API_BASENAME}/${EndpointNames.register}`,
  [EndpointNames.logIn]: () => `${AUTH_API_BASENAME}/${EndpointNames.logIn}`,
  [EndpointNames.logOut]: () => `${AUTH_API_BASENAME}/${EndpointNames.logOut}`,
  [EndpointNames.deleteById]: () => `${AUTH_API_BASENAME}/${EndpointNames.deleteById}`,
  [EndpointNames.getCurrent]: () => `${AUTH_API_BASENAME}/${EndpointNames.getCurrent}`,
};

const APP_CONFIGS = {
  endpoints: {
    transactions: transactionsApiEndpoints,
    permissions: permissionsApiEndpoints,
    companies: companiesApiEndpoints,
    auth: authApiEndpoints,
  },
};

export default APP_CONFIGS;
