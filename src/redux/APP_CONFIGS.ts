export enum API_BASE_ROUTES {
  APP = 'APP',
  AUTH = '/auth',
  PERMISSIONS = '/permissions',
  COMPANIES = '/companies',
  DIRECTORIES = '/directories',
  TRANSACTIONS = `/transactions`,
  CUSTOM_ROLES = '/roles',
  PRODUCTS = '/products',
  PROPERTIES = '/products/properties',
  VARIATIONS = '/products/variations',
  ORDERS = '/orders',
  REFUNDS = '/refunds',
  PRICE_MANAGEMENT = '/priceManagement',
  WAREHOUSES = '/warehouses',
  PAYMENTS = '/payments',
  INVOICES = '/invoices',
  SHIPMENTS = '/shipments',
  CUSTOMERS = '/customers',
  COUNTERPARTIES = '/counterparties',
  EXT_SERVICES = '/ext-services',
}

export enum Endpoints {
  getAll = 'getAll',
  getAllByProductId = 'getAllByProductId',
  getAllByWarehouseId = 'getAllByWarehouseId',
  getAllByType = 'getAllByType',
  getAllGrouped = 'getAllGrouped',
  create = 'create',
  createDocument = 'createDocument',
  update = 'update',
  updateDocument = 'updateDocument',
  documents = 'documents',
  delete = 'delete',
  deleteById = 'deleteById',
  updateById = 'updateById',
  getById = 'getById',
  inventories = 'inventories',
  getFullInfoById = 'getFullInfoById',
  getCurrent = 'getCurrent',
  register = 'register',
  logOut = 'logOut',
  logIn = 'logIn',
  getAllByUserId = 'getAllByUserId',
  getAllByCompanyId = 'getAllByCompanyId',
  getAllByOwnerId = 'getAllByOwnerId',
  rejectById = 'rejectById',
  configs = 'configs',
  acceptById = 'acceptById',
  changeArchiveStatus = 'changeArchiveStatusById',
  createList = 'createList',
  softDeleteItemFromList = 'softDeleteItemFromList',
  addItemToList = 'addItemToList',
  updateListItem = 'updateListItem',
  insert = 'insert',
  getAllPrices = 'getAllPrices',
  getDefaultDirectories = 'getDefaultDirectories',
  updateList = 'updateList',
  inviteUser = 'inviteUser',
  prices = 'prices',
  getAllOrderSlots = 'getAllOrderSlots',
  addSlotToOrder = 'addSlotToOrder',
  getDataForNewOrderSlot = 'getDataForNewOrderSlot',
  removeSlotFromOrder = 'removeSlotFromOrder',
  softDeleteOrderSlot = 'softDeleteOrderSlot',
  addItemToOrderSlot = 'addItemToOrderSlot',
  removeItemFromOrderSlot = 'removeItemFromOrderSlot',
  softDeleteOrderSlotItem = 'softDeleteOrderSlotItem',
  createPrice = 'createPrice',
  updatePrice = 'updatePrice',
  deletePrice = 'deletePrice',
  methods = 'methods',
  integrations = 'integrations',
}

export type GetEndpoint = (...args: any[]) => string;

export interface ApiEndpointsMap extends Record<Endpoints | string, GetEndpoint> {}

export enum ApiDirType {
  CATEGORIES_TR = 'categories_tr',
  CATEGORIES_PROD = 'categories_prod',
  CONTRACTORS = 'contractors',
  WORKERS = 'workers',
  DOCUMENTS = 'documents',
  PROJECTS = 'projects',
  ACTIVITIES = 'activities',
  COUNTS = 'counts',
  BANK_ACCOUNTS = 'bank_accounts',
  MARKS = 'marks',
  TAGS = 'tags',
  STORAGES = 'storages',
  WAREHOUSES = 'warehouses',
  BRANDS = 'brands',
  COUNTERPARTIES = 'counterparties',
  TRANSPORTERS = 'transporters',
  CUSTOM_FIELDS = 'custom_fields',
  STATUSES_ORDER = 'statuses_order',
  STATUSES_REFUND = 'statuses_refund',
  STATUSES_SHIPMENT = 'statuses_shipment',
  STATUSES_PAYMENT = 'statuses_payment',
  STATUSES_INVOICE = 'statuses_invoice',
  METHODS_PAYMENT = 'methods_payment',
  METHODS_INVOICING = 'methods_invoicing',
  METHODS_SHIPMENT = 'methods_shipment',
  METHODS_COMMUNICATION = 'methods_communication',
  SOURCE_ATTRACTION = 'attractionSource',
  COLLECTION = 'collection',
  COLLECTIONS = 'collections',
  UNSET = 'unset',
  PROPERTIES_PRODUCTS = 'properties_products',
  VARIATIONS = 'variations',
  VARIATIONS_TEMPLATES = 'variations_templates',
  DEFAULT = 'DEFAULT',
}

export enum ApiDefaultDirType {
  SHIPMENT_TYPES = 'shipments',
  PAYMENT_TYPES = 'payments',
  COMMUNICATION_TYPES = 'communications',
}

const transactionsApiEndpoints: ApiEndpointsMap = {
  [Endpoints.getAll]: (): string => `${API_BASE_ROUTES.TRANSACTIONS}/getAll`,
  [Endpoints.create]: (): string => `${API_BASE_ROUTES.TRANSACTIONS}/create`,
  [Endpoints.deleteById]: (id?: string): string => `${API_BASE_ROUTES.TRANSACTIONS}/${Endpoints.deleteById}/${id}`,
  [Endpoints.updateById]: (id?: string): string => `${API_BASE_ROUTES.TRANSACTIONS}/${Endpoints.updateById}/${id}`,
  [Endpoints.getById]: (id?: string): string => `${API_BASE_ROUTES.TRANSACTIONS}/getById/${id}`,
};

const productsApiEndpoints = {
  [Endpoints.getAll]: (): string => `${API_BASE_ROUTES.PRODUCTS}/getAll`,
  [Endpoints.create]: (): string => `${API_BASE_ROUTES.PRODUCTS}/create`,
  [Endpoints.deleteById]: (id?: string): string => `${API_BASE_ROUTES.PRODUCTS}/${Endpoints.deleteById}/${id}`,
  [Endpoints.updateById]: (id?: string): string => `${API_BASE_ROUTES.PRODUCTS}/${Endpoints.updateById}/${id}`,
  [Endpoints.getById]: (id?: string): string => `${API_BASE_ROUTES.PRODUCTS}/getById/${id}`,
  [Endpoints.getFullInfoById]: (id?: string): string =>
    `${API_BASE_ROUTES.PRODUCTS}/${Endpoints.getFullInfoById}/${id}`,
  updateDefaultsById: (id?: string): string => `${API_BASE_ROUTES.PRODUCTS}/update/defaults/${id}`,
};
const propertiesApiEndpoints: ApiEndpointsMap = {
  [Endpoints.getAll]: (): string => `${API_BASE_ROUTES.PROPERTIES}/getAll`,
  [Endpoints.create]: (): string => `${API_BASE_ROUTES.PROPERTIES}/create`,
  [Endpoints.deleteById]: (id?: string): string => `${API_BASE_ROUTES.PROPERTIES}/${Endpoints.deleteById}/${id}`,
  [Endpoints.updateById]: (id?: string): string => `${API_BASE_ROUTES.PROPERTIES}/${Endpoints.updateById}/${id}`,
  [Endpoints.getById]: (id?: string): string => `${API_BASE_ROUTES.PROPERTIES}/getById/${id}`,
};
const variationsApiEndpoints = {
  [Endpoints.getAll]: (): string => `${API_BASE_ROUTES.VARIATIONS}/getAll`,
  [Endpoints.getAllByProductId]: (id?: string): string =>
    `${API_BASE_ROUTES.VARIATIONS}/${Endpoints.getAllByProductId}/${id}`,
  [Endpoints.create]: (): string => `${API_BASE_ROUTES.VARIATIONS}/create`,
  [Endpoints.deleteById]: (id?: string): string => `${API_BASE_ROUTES.VARIATIONS}/${Endpoints.deleteById}/${id}`,
  [Endpoints.updateById]: (id?: string): string => `${API_BASE_ROUTES.VARIATIONS}/${Endpoints.updateById}/${id}`,
  [Endpoints.getById]: (id?: string): string => `${API_BASE_ROUTES.VARIATIONS}/getById/${id}`,
};
const permissionsApiEndpoints: ApiEndpointsMap = {
  [Endpoints.updateById]: (permissionId?: string) => `${API_BASE_ROUTES.PERMISSIONS}/delete/${permissionId}`,
  [Endpoints.deleteById]: (permissionId?: string) =>
    `${API_BASE_ROUTES.PERMISSIONS}/${Endpoints.deleteById}/${permissionId}`,
  [Endpoints.create]: () => `${API_BASE_ROUTES.PERMISSIONS}/create`,
  [Endpoints.getAllByUserId]: (userId?: string) =>
    `${API_BASE_ROUTES.PERMISSIONS}/${Endpoints.getAllByUserId}/${userId}`,
  [Endpoints.getAllByCompanyId]: (companyId?: string) =>
    `${API_BASE_ROUTES.PERMISSIONS}/${Endpoints.getAllByCompanyId}/${companyId}`,
  [Endpoints.getCurrent]: () => `${API_BASE_ROUTES.PERMISSIONS}/${Endpoints.getCurrent}`,
  [Endpoints.logIn]: (id?: string) => `${API_BASE_ROUTES.PERMISSIONS}/${Endpoints.logIn}/${id}`,
  [Endpoints.logOut]: () => `${API_BASE_ROUTES.PERMISSIONS}/${Endpoints.logOut}`,
  [Endpoints.inviteUser]: () => `${API_BASE_ROUTES.PERMISSIONS}/${Endpoints.inviteUser}`,
};

const companiesApiEndpoints = {
  [Endpoints.deleteById]: (permissionId?: string) =>
    `${API_BASE_ROUTES.COMPANIES}/${Endpoints.deleteById}/${permissionId}`,
  [Endpoints.create]: () => `${API_BASE_ROUTES.COMPANIES}/create`,
  [Endpoints.getById]: (id?: string) => `${API_BASE_ROUTES.COMPANIES}/getById/${id}`,
  [Endpoints.getAllByOwnerId]: (ownerId?: string) =>
    `${API_BASE_ROUTES.COMPANIES}/${Endpoints.getAllByOwnerId}/${ownerId}`,
  setConfigs: () => `${API_BASE_ROUTES.COMPANIES}/${Endpoints.configs}`,
  getConfigs: () => `${API_BASE_ROUTES.COMPANIES}/${Endpoints.configs}`,
  updateById: (id?: string) => `${API_BASE_ROUTES.COMPANIES}/${Endpoints.updateById}/${id || ''}`,
};

const authApiEndpoints: ApiEndpointsMap = {
  [Endpoints.register]: () => `${API_BASE_ROUTES.AUTH}/${Endpoints.register}`,
  [Endpoints.logIn]: () => `${API_BASE_ROUTES.AUTH}/${Endpoints.logIn}`,
  [Endpoints.logOut]: () => `${API_BASE_ROUTES.AUTH}/${Endpoints.logOut}`,
  [Endpoints.deleteById]: (id?: string) => `${API_BASE_ROUTES.AUTH}/${Endpoints.deleteById}`,
  [Endpoints.getCurrent]: (id?: string) => `${API_BASE_ROUTES.AUTH}/${Endpoints.getCurrent}`,
};

const directoriesApiEndpoints: ApiEndpointsMap = {
  [Endpoints.getAllByType]: (dirType?: ApiDirType) =>
    `${API_BASE_ROUTES.DIRECTORIES}/${Endpoints.getAllByType}/${dirType || '_'}`,
  [Endpoints.getAllGrouped]: (dirType?: string) => `${API_BASE_ROUTES.DIRECTORIES}/${Endpoints.getAllGrouped}`,
  [Endpoints.create]: (dirType?: ApiDirType) => `${API_BASE_ROUTES.DIRECTORIES}/create/${dirType}`,
  [Endpoints.deleteById]: (dirType?: ApiDirType, id?: string) =>
    `${API_BASE_ROUTES.DIRECTORIES}/${Endpoints.deleteById}/${dirType || '_'}/${id}`,
  [Endpoints.updateById]: (dirType?: ApiDirType, id?: string) =>
    `${API_BASE_ROUTES.DIRECTORIES}/${Endpoints.updateById}/${dirType || '_'}/${id}`,
  [Endpoints.getById]: (dirType?: ApiDirType, id?: string) =>
    `${API_BASE_ROUTES.DIRECTORIES}/getById/${dirType || '_'}/${id}`,
  [Endpoints.changeArchiveStatus]: (dirType?: ApiDirType, id?: string) =>
    `${API_BASE_ROUTES.DIRECTORIES}/${Endpoints.changeArchiveStatus}/${dirType || '_'}/${id}`,
  [Endpoints.getDefaultDirectories]: () => `${API_BASE_ROUTES.DIRECTORIES}/${Endpoints.getDefaultDirectories}`,
};

const customRoles = {
  getAllActions: () => `${API_BASE_ROUTES.CUSTOM_ROLES}/v2/getAllActions`,
};

const appSettings: ApiEndpointsMap = {
  getAllActions: () => `${API_BASE_ROUTES.APP}/getAllActions`,
};
const priceManagementEndpoints: ApiEndpointsMap = {
  [Endpoints.getAll]: () => `${API_BASE_ROUTES.PRICE_MANAGEMENT}/getAll`,
  [Endpoints.getById]: (listId: string) => `${API_BASE_ROUTES.PRICE_MANAGEMENT}/getById/${listId}`,
  [Endpoints.createList]: () => `${API_BASE_ROUTES.PRICE_MANAGEMENT}/${Endpoints.createList}`,
  [Endpoints.updateList]: (listId: string) => `${API_BASE_ROUTES.PRICE_MANAGEMENT}/${Endpoints.updateList}/${listId}`,
  [Endpoints.getAllPrices]: () => `${API_BASE_ROUTES.PRICE_MANAGEMENT}/${Endpoints.getAllPrices}`,

  createPrice: () => `${API_BASE_ROUTES.PRICE_MANAGEMENT}/${Endpoints.prices}/create`,
  updatePrice: (id?: string) => `${API_BASE_ROUTES.PRICE_MANAGEMENT}/${Endpoints.prices}/update/${id}`,
  deletePrice: (id?: string) => `${API_BASE_ROUTES.PRICE_MANAGEMENT}/${Endpoints.prices}/delete/${id}`,
};

const ordersEndpoints: ApiEndpointsMap = {
  getAll: () => `${API_BASE_ROUTES.ORDERS}/getAll`,
  getById: (orderId: string) => `${API_BASE_ROUTES.ORDERS}/getById/${orderId}`,
  create: () => `${API_BASE_ROUTES.ORDERS}/create`,
  addItemToOrderSlot: (orderId: string) => `${API_BASE_ROUTES.ORDERS}/${Endpoints.addItemToOrderSlot}/${orderId}`,
  softDeleteOrderSlot: (orderId: string, orderSlotId: string) =>
    `${API_BASE_ROUTES.ORDERS}/${Endpoints.softDeleteOrderSlot}/${orderId}/${orderSlotId}`,
  softDeleteOrderSlotItem: (orderId: string, orderSlotId: string, slotItemId: string) =>
    `${API_BASE_ROUTES.ORDERS}/${Endpoints.softDeleteOrderSlotItem}/${orderId}/${orderSlotId}/${slotItemId}`,
  updateListItem: (listId: string, priceId: string) =>
    `${API_BASE_ROUTES.ORDERS}/${Endpoints.updateListItem}/${listId}/${priceId}`,
  updateById: (orderId: string) => `${API_BASE_ROUTES.ORDERS}/${Endpoints.updateById}/${orderId}`,
  getAllOrderSlots: () => `${API_BASE_ROUTES.ORDERS}/${Endpoints.getAllOrderSlots}`,
  getDataForNewOrderSlot: (productId: string) =>
    `${API_BASE_ROUTES.ORDERS}/${[Endpoints.getDataForNewOrderSlot]}/${productId}`,
};

const warehousesEndpoints = {
  [Endpoints.create]: () => `${API_BASE_ROUTES.WAREHOUSES}/create`,
  [Endpoints.delete]: (id?: string) => `${API_BASE_ROUTES.WAREHOUSES}/delete/${id}`,
  [Endpoints.update]: (id?: string) => `${API_BASE_ROUTES.WAREHOUSES}/update/${id}`,
  [Endpoints.getById]: (id?: string) => `${API_BASE_ROUTES.WAREHOUSES}/getById/${id}`,
  [Endpoints.getAll]: () => `${API_BASE_ROUTES.WAREHOUSES}/getAll`,
  [Endpoints.getAllByWarehouseId]: (id?: string) =>
    `${API_BASE_ROUTES.WAREHOUSES}/${Endpoints.getAllByWarehouseId}/${id}`,

  getAllInventories: () => `${API_BASE_ROUTES.WAREHOUSES}/${Endpoints.inventories}/getAll`,
  createDocument: () => `${API_BASE_ROUTES.WAREHOUSES}/${Endpoints.documents}/create`,
  getAllDocuments: () => `${API_BASE_ROUTES.WAREHOUSES}/${Endpoints.documents}/getAll`,
};
const payments = {
  create: () => `${API_BASE_ROUTES.PAYMENTS}/create`,
  getAll: () => `${API_BASE_ROUTES.PAYMENTS}/getAll`,
  getAllMethods: () => `${API_BASE_ROUTES.PAYMENTS}/${Endpoints.methods}/getAll`,
  updateMethod: (id?: string) => `${API_BASE_ROUTES.PAYMENTS}/${Endpoints.methods}/update/${id}`,
};
const invoices = {
  create: () => `${API_BASE_ROUTES.INVOICES}/create`,
  getAll: () => `${API_BASE_ROUTES.INVOICES}/getAll`,
  getAllMethods: () => `${API_BASE_ROUTES.INVOICES}/${Endpoints.methods}/getAll`,
  updateMethod: (id?: string) => `${API_BASE_ROUTES.INVOICES}/${Endpoints.methods}/update/${id}`,
};
const shipments = {
  create: () => `${API_BASE_ROUTES.SHIPMENTS}/create`,
  getAll: () => `${API_BASE_ROUTES.SHIPMENTS}/getAll`,
  getById: (id?: string) => `${API_BASE_ROUTES.SHIPMENTS}/getById/${id}`,
  getAllMethods: () => `${API_BASE_ROUTES.SHIPMENTS}/${Endpoints.methods}/getAll`,
  updateMethod: (id?: string) => `${API_BASE_ROUTES.SHIPMENTS}/${Endpoints.methods}/update/${id}`,
};
const customers = {
  create: () => `${API_BASE_ROUTES.CUSTOMERS}/create`,
  update: (id?: string) => `${API_BASE_ROUTES.CUSTOMERS}/update/${id}`,
  getAll: () => `${API_BASE_ROUTES.CUSTOMERS}/getAll`,
  getById: (id?: string) => `${API_BASE_ROUTES.CUSTOMERS}/getById/${id}`,
};
const extServices = {
  getAllIntegrationsByType: (type: 'input' | 'output' | string = '') =>
    `${API_BASE_ROUTES.EXT_SERVICES}/${Endpoints.integrations}/getAll`,
  getById: (id?: string) => `${API_BASE_ROUTES.EXT_SERVICES}/service/getById/${id}`,
  updateService: () => `${API_BASE_ROUTES.EXT_SERVICES}/service/update`,
  getAll: () => `${API_BASE_ROUTES.EXT_SERVICES}/getAll`,

  createInputInt: () => `${API_BASE_ROUTES.EXT_SERVICES}/${Endpoints.integrations}/input/create`,
  createOutputInt: () => `${API_BASE_ROUTES.EXT_SERVICES}/${Endpoints.integrations}/output/create`,
  updateInputInt: () => `${API_BASE_ROUTES.EXT_SERVICES}/${Endpoints.integrations}/input/update`,
  updateOutputInt: () => `${API_BASE_ROUTES.EXT_SERVICES}/${Endpoints.integrations}/output/update`,
};

const APP_CONFIGS = {
  endpoints: {
    appSettings,
    permissions: permissionsApiEndpoints,
    companies: companiesApiEndpoints,
    auth: authApiEndpoints,
    directories: directoriesApiEndpoints,
    customRoles: customRoles,
    transactions: transactionsApiEndpoints,
    products: productsApiEndpoints,
    propertiesApiEndpoints,
    variationsApiEndpoints,
    warehousesEndpoints,
    priceManagementEndpoints,
    ordersEndpoints,
    payments,
    invoices,
    customers,
    shipments,
    extServices,
  },
};

export default APP_CONFIGS;
