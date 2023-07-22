// type EndpointCreator = (...args: any[]) => string;

export enum API_BASE_ROUTES {
  PERMISSIONS = '/permissions',
  COMPANIES = '/companies',
  AUTH = '/auth',
  DIRECTORIES = '/directories',
  TRANSACTIONS = '/transactions',
  CUSTOM_ROLES = '/roles',
  PRODUCTS = '/products',
  APP = 'APP',
}

export enum Endpoints {
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
  changeArchiveStatus = 'changeArchiveStatusById',
}

export enum ApiDirType {
  counts = 'counts',
  documents = 'documents',
  contractors = 'contractors',
  categories = 'categories',
  projects = 'projects',
  CATEGORIES_TR = 'categories_tr',
  CATEGORIES_PROD = 'categories_prod',
  CONTRACTORS = 'contractors',
  DOCUMENTS = 'documents',
  PROJECTS = 'projects',
  ACTIVITIES = 'activities',
  COUNTS = 'counts',
  MARKS = 'marks',
  TYPE = 'type',
  BRANDS = 'brands',
  STATUS_ORDER = 'status_order',
  STATUS_REFUND = 'status_refund',
  STATUS_DELIVERY = 'status_delivery',
}

const transactionsApiEndpoints = {
  [Endpoints.getAll]: (): string => `${API_BASE_ROUTES.TRANSACTIONS}/${Endpoints.getAll}`,
  [Endpoints.create]: (): string => `${API_BASE_ROUTES.TRANSACTIONS}/${Endpoints.create}`,
  [Endpoints.deleteById]: (id?: string): string =>
    `${API_BASE_ROUTES.TRANSACTIONS}/${Endpoints.deleteById}/${id || ''}`,
  [Endpoints.updateById]: (id?: string): string =>
    `${API_BASE_ROUTES.TRANSACTIONS}/${Endpoints.updateById}/${id || ''}`,
  [Endpoints.getById]: (id?: string): string => `${API_BASE_ROUTES.TRANSACTIONS}/${Endpoints.getById}/${id || ''}`,
};

const productsApiEndpoints = {
  [Endpoints.getAll]: (): string => `${API_BASE_ROUTES.PRODUCTS}/${Endpoints.getAll}`,
  [Endpoints.create]: (): string => `${API_BASE_ROUTES.PRODUCTS}/${Endpoints.create}`,
  [Endpoints.deleteById]: (id?: string): string => `${API_BASE_ROUTES.PRODUCTS}/${Endpoints.deleteById}/${id || ''}`,
  [Endpoints.updateById]: (id?: string): string => `${API_BASE_ROUTES.PRODUCTS}/${Endpoints.updateById}/${id || ''}`,
  [Endpoints.getById]: (id?: string): string => `${API_BASE_ROUTES.PRODUCTS}/${Endpoints.getById}/${id || ''}`,
};
const permissionsApiEndpoints = {
  [Endpoints.updateById]: (permissionId?: string) =>
    `${API_BASE_ROUTES.PERMISSIONS}/${Endpoints.delete}/${permissionId}`,
  [Endpoints.deleteById]: (permissionId?: string) =>
    `${API_BASE_ROUTES.PERMISSIONS}/${Endpoints.deleteById}/${permissionId}`,
  [Endpoints.create]: () => `${API_BASE_ROUTES.PERMISSIONS}/${Endpoints.create}`,
  [Endpoints.getAllByUserId]: (userId?: string) =>
    `${API_BASE_ROUTES.PERMISSIONS}/${Endpoints.getAllByUserId}/${userId}`,
  [Endpoints.getAllByCompanyId]: (companyId?: string) =>
    `${API_BASE_ROUTES.PERMISSIONS}/${Endpoints.getAllByCompanyId}/${companyId || ''}`,
  [Endpoints.getCurrent]: () => `${API_BASE_ROUTES.PERMISSIONS}/${Endpoints.getCurrent}`,
  [Endpoints.logIn]: (id?: string) => `${API_BASE_ROUTES.PERMISSIONS}/${Endpoints.logIn}/${id || ''}`,
  [Endpoints.logOut]: () => `${API_BASE_ROUTES.PERMISSIONS}/${Endpoints.logOut}`,
};

const companiesApiEndpoints = {
  [Endpoints.deleteById]: (permissionId?: string) =>
    `${API_BASE_ROUTES.COMPANIES}/${Endpoints.deleteById}/${permissionId}`,
  [Endpoints.updateById]: (permissionId?: string) =>
    `${API_BASE_ROUTES.COMPANIES}/${Endpoints.updateById}/${permissionId}`,
  [Endpoints.create]: () => `${API_BASE_ROUTES.COMPANIES}/${Endpoints.create}`,
  [Endpoints.getById]: (id?: string) => `${API_BASE_ROUTES.COMPANIES}/${Endpoints.getById}/${id || ''}`,
  [Endpoints.getAllByOwnerId]: (ownerId?: string) =>
    `${API_BASE_ROUTES.COMPANIES}/${Endpoints.getAllByOwnerId}/${ownerId}`,
};

const authApiEndpoints = {
  [Endpoints.register]: () => `${API_BASE_ROUTES.AUTH}/${Endpoints.register}`,
  [Endpoints.logIn]: () => `${API_BASE_ROUTES.AUTH}/${Endpoints.logIn}`,
  [Endpoints.logOut]: () => `${API_BASE_ROUTES.AUTH}/${Endpoints.logOut}`,
  [Endpoints.deleteById]: (id?: string) => `${API_BASE_ROUTES.AUTH}/${Endpoints.deleteById}`,
  [Endpoints.getCurrent]: (id?: string) => `${API_BASE_ROUTES.AUTH}/${Endpoints.getCurrent}`,
};

const directoriesApiEndpoints = {
  [Endpoints.getAll]: (dirType?: ApiDirType) => `${API_BASE_ROUTES.DIRECTORIES}/${dirType || '_'}/${Endpoints.getAll}`,
  [Endpoints.create]: (dirType?: ApiDirType) => `${API_BASE_ROUTES.DIRECTORIES}/${dirType || '_'}/${Endpoints.create}`,
  [Endpoints.deleteById]: (dirType?: ApiDirType, id?: string) =>
    `${API_BASE_ROUTES.DIRECTORIES}/${dirType || '_'}/${Endpoints.deleteById}/${id || ''}`,
  [Endpoints.updateById]: (dirType?: ApiDirType, id?: string) =>
    `${API_BASE_ROUTES.DIRECTORIES}/${dirType || '_'}/${Endpoints.updateById}/${id || ''}`,
  [Endpoints.getById]: (dirType?: ApiDirType, id?: string) =>
    `${API_BASE_ROUTES.DIRECTORIES}/${dirType || '_'}/${Endpoints.getById}/${id || ''}`,
  [Endpoints.changeArchiveStatus]: (dirType?: ApiDirType, id?: string) =>
    `${API_BASE_ROUTES.DIRECTORIES}/${dirType || '_'}/${Endpoints.changeArchiveStatus}/${id || ''}`,
};

const customRoles = {};

const appSettings = {
  getAllActions: () => `${API_BASE_ROUTES.APP}/getAllActions`,
};

const APP_CONFIGS = {
  endpoints: {
    permissions: permissionsApiEndpoints,
    companies: companiesApiEndpoints,
    auth: authApiEndpoints,
    directories: directoriesApiEndpoints,
    customRoles: customRoles,
    transactions: transactionsApiEndpoints,
    products: productsApiEndpoints,
    appSettings,
  },
};

export default APP_CONFIGS;
