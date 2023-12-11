import { IntegrationTypeEnum } from '../types/integrations.types';

export enum API_BASE_ROUTES {
  APP = 'APP',
  AUTH = '/auth',
  PERMISSIONS = '/permissions',
  COMPANIES = '/companies',
  DIRECTORIES = '/directories',
  TRANSACTIONS = `/transactions`,
  FINANCES_TRANSACTIONS = '/finances/transactions',
  FINANCES_BANK_ACCOUNTS = '/finances/bank-accounts',
  FINANCES_FIN_ACCOUNTS = '/finances/fin-counts',
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
  DELIVERY = '/delivery',
  CUSTOMERS = '/customers',
  COMMUNICATION = '/communications',
  COUNTERPARTIES = '/counterparties',
  EXT_SERVICES = '/ext-services',
  INTEGRATIONS = '/integrations',
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

function createMethodsEndpoints(routeBaseUrl: string): {
  getAll: () => string;
  getList: () => string;
  create: () => string;
  update: (id?: string) => string;
} {
  return {
    getAll: () => `${routeBaseUrl}/${Endpoints.methods}/getAll`,
    getList: () => `${routeBaseUrl}/${Endpoints.methods}/getAll`,
    create: () => `${routeBaseUrl}/${Endpoints.methods}/create`,
    update: (id?: string) => `${routeBaseUrl}/${Endpoints.methods}/update/${id}`,
  };
}

export type EndpointCreator = (...args: any[]) => string;

export interface ApiEndpointsMap extends Record<Endpoints | string, EndpointCreator> {}

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
  METHODS_DELIVERY = 'methods_delivery',
  METHODS_COMMUNICATION = 'methods_communications',
  SOURCE_ATTRACTION = 'attractionSource',
  COLLECTION = 'collection',
  COLLECTIONS = 'collections',
  UNSET = 'unset',
  PROPERTIES_PRODUCTS = 'properties_products',
  VARIATIONS = 'variations',
  VARIATIONS_TEMPLATES = 'variations_templates',
  DEFAULT = 'DEFAULT',
}

const auth: ApiEndpointsMap = {
  register: () => `${API_BASE_ROUTES.AUTH}/${Endpoints.register}`,
  logIn: () => `${API_BASE_ROUTES.AUTH}/${Endpoints.logIn}`,
  logOut: () => `${API_BASE_ROUTES.AUTH}/${Endpoints.logOut}`,
  deleteById: (id?: string) => `${API_BASE_ROUTES.AUTH}/${Endpoints.deleteById}`,
  getCurrent: (id?: string) => `${API_BASE_ROUTES.AUTH}/${Endpoints.getCurrent}`,
};
const permissions: ApiEndpointsMap = {
  updateById: (permissionId?: string) => `${API_BASE_ROUTES.PERMISSIONS}/delete/${permissionId}`,
  deleteById: (permissionId?: string) => `${API_BASE_ROUTES.PERMISSIONS}/${Endpoints.deleteById}/${permissionId}`,
  create: () => `${API_BASE_ROUTES.PERMISSIONS}/create`,
  getAllByUserId: (userId?: string) => `${API_BASE_ROUTES.PERMISSIONS}/${Endpoints.getAllByUserId}/${userId}`,
  getAllByCompanyId: (companyId?: string) =>
    `${API_BASE_ROUTES.PERMISSIONS}/${Endpoints.getAllByCompanyId}/${companyId}`,
  getCurrent: () => `${API_BASE_ROUTES.PERMISSIONS}/${Endpoints.getCurrent}`,
  logIn: (id?: string) => `${API_BASE_ROUTES.PERMISSIONS}/${Endpoints.logIn}/${id}`,
  logOut: () => `${API_BASE_ROUTES.PERMISSIONS}/${Endpoints.logOut}`,
  inviteUser: () => `${API_BASE_ROUTES.PERMISSIONS}/${Endpoints.inviteUser}`,
};
const finances = {
  getAll: (): string => `${API_BASE_ROUTES.FINANCES_TRANSACTIONS}/getAll`,
  create: (): string => `${API_BASE_ROUTES.FINANCES_TRANSACTIONS}/create`,
  deleteById: (id?: string): string => `${API_BASE_ROUTES.FINANCES_TRANSACTIONS}/${Endpoints.deleteById}/${id}`,
  updateById: (id?: string): string => `${API_BASE_ROUTES.FINANCES_TRANSACTIONS}/${Endpoints.updateById}/${id}`,
  getById: (id?: string): string => `${API_BASE_ROUTES.FINANCES_TRANSACTIONS}/getById/${id}`,

  bankAccounts: {
    create: () => `${API_BASE_ROUTES.FINANCES_BANK_ACCOUNTS}/create`,
    update: (id?: string) => `${API_BASE_ROUTES.FINANCES_BANK_ACCOUNTS}/update/${id}`,
    getList: () => `${API_BASE_ROUTES.FINANCES_BANK_ACCOUNTS}/getAll`,
  },
};
const variationsApiEndpoints = {
  getAll: (): string => `${API_BASE_ROUTES.VARIATIONS}/getAll`,
  getAllByProductId: (id?: string): string => `${API_BASE_ROUTES.VARIATIONS}/${Endpoints.getAllByProductId}/${id}`,
  create: (): string => `${API_BASE_ROUTES.VARIATIONS}/create`,
  deleteById: (id?: string): string => `${API_BASE_ROUTES.VARIATIONS}/${Endpoints.deleteById}/${id}`,
  updateById: (id?: string): string => `${API_BASE_ROUTES.VARIATIONS}/${Endpoints.updateById}/${id}`,
  getById: (id?: string): string => `${API_BASE_ROUTES.VARIATIONS}/getById/${id}`,
};
const propertiesApiEndpoints: ApiEndpointsMap = {
  getAll: (): string => `${API_BASE_ROUTES.PROPERTIES}/getAll`,
  create: (): string => `${API_BASE_ROUTES.PROPERTIES}/create`,
  deleteById: (id?: string): string => `${API_BASE_ROUTES.PROPERTIES}/${Endpoints.deleteById}/${id}`,
  updateById: (id?: string): string => `${API_BASE_ROUTES.PROPERTIES}/${Endpoints.updateById}/${id}`,
  getById: (id?: string): string => `${API_BASE_ROUTES.PROPERTIES}/getById/${id}`,
};

const offers = {
  getAll: (): string => `${API_BASE_ROUTES.PRODUCTS}/getAll`,
  create: (): string => `${API_BASE_ROUTES.PRODUCTS}/create`,
  deleteById: (id?: string): string => `${API_BASE_ROUTES.PRODUCTS}/${Endpoints.deleteById}/${id}`,
  updateById: (id?: string): string => `${API_BASE_ROUTES.PRODUCTS}/${Endpoints.updateById}/${id}`,
  getById: (id?: string): string => `${API_BASE_ROUTES.PRODUCTS}/getById/${id}`,
  getFullInfoById: (id?: string): string => `${API_BASE_ROUTES.PRODUCTS}/${Endpoints.getFullInfoById}/${id}`,
  updateDefaultsById: (id?: string): string => `${API_BASE_ROUTES.PRODUCTS}/update/defaults/${id}`,

  propertiesApiEndpoints,
  variationsApiEndpoints,
};

const companies = {
  deleteById: (permissionId?: string) => `${API_BASE_ROUTES.COMPANIES}/${Endpoints.deleteById}/${permissionId}`,
  create: () => `${API_BASE_ROUTES.COMPANIES}/create`,
  getById: (id?: string) => `${API_BASE_ROUTES.COMPANIES}/getById/${id}`,
  getAllByOwnerId: (ownerId?: string) => `${API_BASE_ROUTES.COMPANIES}/${Endpoints.getAllByOwnerId}/${ownerId}`,
  updateById: (id?: string) => `${API_BASE_ROUTES.COMPANIES}/${Endpoints.updateById}/${id || ''}`,
};

const directories: ApiEndpointsMap = {
  getAllByType: (dirType?: ApiDirType) => `${API_BASE_ROUTES.DIRECTORIES}/${Endpoints.getAllByType}/${dirType || '_'}`,
  getAllGrouped: (dirType?: string) => `${API_BASE_ROUTES.DIRECTORIES}/${Endpoints.getAllGrouped}`,
  create: (dirType?: ApiDirType) => `${API_BASE_ROUTES.DIRECTORIES}/create/${dirType}`,
  deleteById: (dirType?: ApiDirType, id?: string) =>
    `${API_BASE_ROUTES.DIRECTORIES}/${Endpoints.deleteById}/${dirType || '_'}/${id}`,
  updateById: (dirType?: ApiDirType, id?: string) =>
    `${API_BASE_ROUTES.DIRECTORIES}/${Endpoints.updateById}/${dirType || '_'}/${id}`,
  getById: (dirType?: ApiDirType, id?: string) => `${API_BASE_ROUTES.DIRECTORIES}/getById/${dirType || '_'}/${id}`,
  changeArchiveStatus: (dirType?: ApiDirType, id?: string) =>
    `${API_BASE_ROUTES.DIRECTORIES}/${Endpoints.changeArchiveStatus}/${dirType || '_'}/${id}`,
  getDefaultDirectories: () => `${API_BASE_ROUTES.DIRECTORIES}/${Endpoints.getDefaultDirectories}`,
};

const customRoles = {
  getAllActions: () => `${API_BASE_ROUTES.CUSTOM_ROLES}/v2/getAllActions`,
};

const appSettings: ApiEndpointsMap = {
  getAllActions: () => `${API_BASE_ROUTES.APP}/getAllActions`,
};
const priceManagementEndpoints: ApiEndpointsMap = {
  getAll: () => `${API_BASE_ROUTES.PRICE_MANAGEMENT}/getAll`,
  getById: (listId: string) => `${API_BASE_ROUTES.PRICE_MANAGEMENT}/getById/${listId}`,
  createList: () => `${API_BASE_ROUTES.PRICE_MANAGEMENT}/${Endpoints.createList}`,
  updateList: (listId: string) => `${API_BASE_ROUTES.PRICE_MANAGEMENT}/${Endpoints.updateList}/${listId}`,
  getAllPrices: () => `${API_BASE_ROUTES.PRICE_MANAGEMENT}/${Endpoints.getAllPrices}`,

  createPrice: () => `${API_BASE_ROUTES.PRICE_MANAGEMENT}/${Endpoints.prices}/create`,
  updatePrice: (id?: string) => `${API_BASE_ROUTES.PRICE_MANAGEMENT}/${Endpoints.prices}/update/${id}`,
  deletePrice: (id?: string) => `${API_BASE_ROUTES.PRICE_MANAGEMENT}/${Endpoints.prices}/delete/${id}`,
};

const ordersEndpoints = {
  getAll: () => `${API_BASE_ROUTES.ORDERS}/getAll`,
  getOrderById: (orderId?: string) => `${API_BASE_ROUTES.ORDERS}/order/${orderId}`,
  getGroupById: (groupId?: string) => `${API_BASE_ROUTES.ORDERS}/group/${groupId}`,
  create: () => `${API_BASE_ROUTES.ORDERS}/create`,

  slots: {
    getList: () => `${API_BASE_ROUTES.ORDERS}/slots/getList`,
    update: () => ``,
    addNew: () => ``,
    delete: () => ``,
  },

  getSlots: () => `${API_BASE_ROUTES.ORDERS}/slots`,
  updateById: (orderId: string) => `${API_BASE_ROUTES.ORDERS}/${Endpoints.updateById}/${orderId}`,
  createManyOrdersGroupedByWarehouse: () => `${API_BASE_ROUTES.ORDERS}/create/group/byWarehouses`,
};

const refunds = {
  getAll: (...args: any[]) => `${API_BASE_ROUTES.REFUNDS}/`,
  getById: (...args: any[]) => `${API_BASE_ROUTES.REFUNDS}/`,
  create: (...args: any[]) => `${API_BASE_ROUTES.REFUNDS}/`,
  deleteById: (...args: any[]) => `${API_BASE_ROUTES.REFUNDS}/`,
  getAllRefundSlots: (...args: any[]) => `${API_BASE_ROUTES.REFUNDS}/`,
  addSlotToRefund: (...args: any[]) => `${API_BASE_ROUTES.REFUNDS}/`,
  softDeleteSlotFromRefund: (...args: any[]) => `${API_BASE_ROUTES.REFUNDS}/`,
  addItemToRefundSlot: (...args: any[]) => `${API_BASE_ROUTES.REFUNDS}/`,
  softDeleteRefundSlotItem: (...args: any[]) => `${API_BASE_ROUTES.REFUNDS}/`,
  getDataForNewRefundSlot: (...args: any[]) => `${API_BASE_ROUTES.REFUNDS}/`,
};

const warehousing = {
  create: () => `${API_BASE_ROUTES.WAREHOUSES}/create`,
  delete: (id?: string) => `${API_BASE_ROUTES.WAREHOUSES}/delete/${id}`,
  update: (id?: string) => `${API_BASE_ROUTES.WAREHOUSES}/update/${id}`,
  getById: (id?: string) => `${API_BASE_ROUTES.WAREHOUSES}/getById/${id}`,
  getAll: () => `${API_BASE_ROUTES.WAREHOUSES}/getAll`,
  getAllByWarehouseId: (id?: string) => `${API_BASE_ROUTES.WAREHOUSES}/${Endpoints.getAllByWarehouseId}/${id}`,

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
  createForOrder: (id?: string) => `${API_BASE_ROUTES.INVOICES}/create/order/${id}`,
  createForDelivery: (id?: string) => `${API_BASE_ROUTES.INVOICES}/create/delivery/${id}`,
  getAll: () => `${API_BASE_ROUTES.INVOICES}/getAll`,

  methods: createMethodsEndpoints(API_BASE_ROUTES.INVOICES),

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
const deliveries = {
  create: () => `${API_BASE_ROUTES.DELIVERY}/create`,
  getAll: () => `${API_BASE_ROUTES.DELIVERY}/getAll`,
  getById: (id?: string) => `${API_BASE_ROUTES.DELIVERY}/getById/${id}`,
  getAllMethods: () => `${API_BASE_ROUTES.DELIVERY}/${Endpoints.methods}/getAll`,
  updateMethod: (id?: string) => `${API_BASE_ROUTES.DELIVERY}/${Endpoints.methods}/update/${id}`,
  methods: createMethodsEndpoints(API_BASE_ROUTES.DELIVERY),
};
const customers = {
  create: () => `${API_BASE_ROUTES.CUSTOMERS}/create`,
  update: (id?: string) => `${API_BASE_ROUTES.CUSTOMERS}/update/${id}`,
  getAll: () => `${API_BASE_ROUTES.CUSTOMERS}/getAll`,
  getById: (id?: string) => `${API_BASE_ROUTES.CUSTOMERS}/getById/${id}`,
};
const communications = {
  getAllMethods: () => `${API_BASE_ROUTES.COMMUNICATION}/${Endpoints.methods}/getAll`,
  updateMethod: (id?: string) => `${API_BASE_ROUTES.COMMUNICATION}/${Endpoints.methods}/update/${id}`,
  methods: createMethodsEndpoints(API_BASE_ROUTES.COMMUNICATION),
};
const extServices = {
  getAllIntegrationsByType: (type: 'input' | 'output' | string = '') =>
    `${API_BASE_ROUTES.EXT_SERVICES}/${Endpoints.integrations}/getAll`,
  getById: (id?: string) => `${API_BASE_ROUTES.EXT_SERVICES}/service/getById/${id}`,
  updateService: () => `${API_BASE_ROUTES.EXT_SERVICES}/service/update`,
  getList: () => `${API_BASE_ROUTES.EXT_SERVICES}/getAll`,

  createInputInt: () => `${API_BASE_ROUTES.EXT_SERVICES}/${Endpoints.integrations}/input/create`,
  createOutputInt: () => `${API_BASE_ROUTES.EXT_SERVICES}/${Endpoints.integrations}/output/create`,
  updateInputInt: () => `${API_BASE_ROUTES.EXT_SERVICES}/${Endpoints.integrations}/input/update`,
  updateOutputInt: () => `${API_BASE_ROUTES.EXT_SERVICES}/${Endpoints.integrations}/output/update`,
};
export type IntegrationType = keyof typeof IntegrationTypeEnum;

const integrations = {
  getAll: (type: IntegrationType | string = '') => `${API_BASE_ROUTES.INTEGRATIONS}/getAll`,
  getById: (id?: string) => `${API_BASE_ROUTES.INTEGRATIONS}/${id}`,
  create: (type?: IntegrationType) => `${API_BASE_ROUTES.INTEGRATIONS}/create/${type}`,
  update: (type?: IntegrationType, id?: string) => `${API_BASE_ROUTES.INTEGRATIONS}/update/${type}/${id}`,
};

const APP_CONFIGS = {
  endpoints: {
    appSettings,
    permissions,
    companies,
    auth,
    directories,
    customRoles,
    finTransactions: finances,
    offers,
    propertiesApiEndpoints,
    variationsApiEndpoints,
    warehousing,
    priceManagementEndpoints,
    ordersEndpoints,
    payments,
    invoices,
    customers,
    shipments,
    deliveries,
    extServices,
    communications,
    refunds,
    integrations,
  },
};

export default APP_CONFIGS;
