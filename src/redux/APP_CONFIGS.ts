import { Integration } from '../types/integrations.types';
import { Keys } from '../types/utils.types';

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
  FILES = '/files',
  PRODUCTS = '/products',
  PROPERTIES = '/products/properties',
  VARIATIONS = '/products/variations',
  ORDERS = '/orders',
  ORDERS_SLOTS = '/orders/slots',
  ORDERS_SALES = '/orders/sales',
  ORDERS_SALES_SLOTS = '/orders/slots', // ! /orders/sales/slots
  ORDERS_PURCHASE = '/orders/purchases',
  ORDERS_PURCHASE_SLOTS = '/orders/purchases/slots',
  REFUNDS = '/refunds',
  PRICE_MANAGEMENT = '/priceManagement',
  WAREHOUSES = '/warehouses',
  PAYMENTS = '/payments',
  TAGS = '/tags',
  INVOICES = '/invoices',
  SHIPMENTS = '/shipments',
  DELIVERY = '/delivery',
  CUSTOMERS = '/customers',
  COMMUNICATION = '/communications',
  COUNTERPARTIES = '/counterparties',
  EXT_SERVICES = '/ext-services',
  INTEGRATIONS = '/integrations',
  TRACK_LINKS = 'tracking-links',
  CHAT = '/chat',
  CHAT_MESSAGES = '/chat/messages',
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
  update: () => string;
} {
  return {
    getAll: () => `${routeBaseUrl}/methods/getAll`,
    getList: () => `${routeBaseUrl}/methods/getAll`,
    create: () => `${routeBaseUrl}/methods/create`,
    update: () => `${routeBaseUrl}/methods/update`,
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

const auth = {
  register: () => `${API_BASE_ROUTES.AUTH}/register`,
  logIn: () => `${API_BASE_ROUTES.AUTH}/logIn`,
  logOut: () => `${API_BASE_ROUTES.AUTH}/logOut`,
  deleteById: (id?: string) => `${API_BASE_ROUTES.AUTH}/deleteById`,
  getCurrent: (id?: string) => `${API_BASE_ROUTES.AUTH}/getCurrent`,
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
  getOne: (): string => `${API_BASE_ROUTES.PRODUCTS}/one`,
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
const priceManagementEndpoints = {
  getAll: () => `${API_BASE_ROUTES.PRICE_MANAGEMENT}/getAll`,
  getById: (listId: string) => `${API_BASE_ROUTES.PRICE_MANAGEMENT}/getById/${listId}`,
  getOne: () => `${API_BASE_ROUTES.PRICE_MANAGEMENT}/one`,
  createList: () => `${API_BASE_ROUTES.PRICE_MANAGEMENT}/${Endpoints.createList}`,
  updateList: (listId: string) => `${API_BASE_ROUTES.PRICE_MANAGEMENT}/${Endpoints.updateList}/${listId}`,

  getAllPrices: () => `${API_BASE_ROUTES.PRICE_MANAGEMENT}/prices/getAll`,
  createPrice: () => `${API_BASE_ROUTES.PRICE_MANAGEMENT}/${Endpoints.prices}/create`,
  updatePrice: (id?: string) => `${API_BASE_ROUTES.PRICE_MANAGEMENT}/${Endpoints.prices}/update/${id}`,
  deletePrice: (id?: string) => `${API_BASE_ROUTES.PRICE_MANAGEMENT}/${Endpoints.prices}/delete/${id}`,
};

const ordersEndpoints = {
  getAll: () => `${API_BASE_ROUTES.ORDERS}/getAll`,
  create: () => `${API_BASE_ROUTES.ORDERS}/create`,
  getOne: () => `${API_BASE_ROUTES.ORDERS}/one`,

  slots: {
    getAll: () => `${API_BASE_ROUTES.ORDERS_SLOTS}/getAll`,
    update: () => `${API_BASE_ROUTES.ORDERS_SLOTS}/update`,
    create: () => `${API_BASE_ROUTES.ORDERS_SLOTS}/create`,
    remove: () => `${API_BASE_ROUTES.ORDERS_SLOTS}/remove`,
  },

  updateById: (orderId: string) => `${API_BASE_ROUTES.ORDERS}/${Endpoints.updateById}/${orderId}`,
  createGroupedByWarehouse: () => `${API_BASE_ROUTES.ORDERS}/create/group/byWarehouses`,

  sales: {
    getAll: () => `${API_BASE_ROUTES.ORDERS_SALES}/getAll`,
    create: () => `${API_BASE_ROUTES.ORDERS_SALES}/create`,
    getOne: () => `${API_BASE_ROUTES.ORDERS_SALES}/one`,
    groups: {
      createByWarehouse: () => `${API_BASE_ROUTES.ORDERS}/create/group/byWarehouses`,
    },
    slots: {
      getAll: () => `${API_BASE_ROUTES.ORDERS_SALES_SLOTS}/getAll`,
      update: () => `${API_BASE_ROUTES.ORDERS_SALES_SLOTS}/update`,
      create: () => `${API_BASE_ROUTES.ORDERS_SALES_SLOTS}/create`,
      remove: () => `${API_BASE_ROUTES.ORDERS_SALES_SLOTS}/remove`,
    },
    reject: {
      request: () => `${API_BASE_ROUTES.ORDERS_SALES_SLOTS}/reject/request`,
      confirm: () => `${API_BASE_ROUTES.ORDERS_SALES_SLOTS}/reject/confirm`,
      abort: () => `${API_BASE_ROUTES.ORDERS_SALES_SLOTS}/reject/abort`,
      getWithCode: () => `${API_BASE_ROUTES.ORDERS_SALES_SLOTS}/reject/getWithCode`,
    },
  },
  purchase: {
    getAll: () => `${API_BASE_ROUTES.ORDERS_PURCHASE_SLOTS}/getAll`,
    create: () => `${API_BASE_ROUTES.ORDERS_PURCHASE_SLOTS}/create`,
    getOne: () => `${API_BASE_ROUTES.ORDERS_PURCHASE_SLOTS}/one`,
    groups: {
      createByWarehouse: () => `${API_BASE_ROUTES.ORDERS_PURCHASE_SLOTS}/create/group/byWarehouses`,
    },
    slots: {
      getAll: () => `${API_BASE_ROUTES.ORDERS_PURCHASE_SLOTS}/getAll`,
      update: () => `${API_BASE_ROUTES.ORDERS_PURCHASE_SLOTS}/update`,
      create: () => `${API_BASE_ROUTES.ORDERS_PURCHASE_SLOTS}/create`,
      remove: () => `${API_BASE_ROUTES.ORDERS_PURCHASE_SLOTS}/remove`,
    },
    reject: {
      request: () => `${API_BASE_ROUTES.ORDERS_PURCHASE_SLOTS}/reject/request`,
      confirm: () => `${API_BASE_ROUTES.ORDERS_PURCHASE_SLOTS}/reject/confirm`,
      abort: () => `${API_BASE_ROUTES.ORDERS_PURCHASE_SLOTS}/reject/abort`,
      getWithCode: () => `${API_BASE_ROUTES.ORDERS_PURCHASE_SLOTS}/reject/getWithCode`,
    },
  },
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

  inventories: {
    getAll: () => `${API_BASE_ROUTES.WAREHOUSES}/inventories/getAll`,
    getOne: () => `${API_BASE_ROUTES.WAREHOUSES}/inventories/one`,
    update: () => `${API_BASE_ROUTES.WAREHOUSES}/inventories/update`,
  },
  documents: {
    getAll: () => `${API_BASE_ROUTES.WAREHOUSES}/documents/getAll`,
    getOne: () => `${API_BASE_ROUTES.WAREHOUSES}/documents/one`,
    create: () => `${API_BASE_ROUTES.WAREHOUSES}/documents/create`,
  },
};
const payments = {
  create: () => `${API_BASE_ROUTES.PAYMENTS}/create`,
  getAll: () => `${API_BASE_ROUTES.PAYMENTS}/getAll`,

  methods: createMethodsEndpoints(API_BASE_ROUTES.PAYMENTS),
};

const invoices = {
  createForOrder: (id?: string) => `${API_BASE_ROUTES.INVOICES}/create/order/${id}`,
  createForDelivery: (id?: string) => `${API_BASE_ROUTES.INVOICES}/create/delivery/${id}`,
  getAll: () => `${API_BASE_ROUTES.INVOICES}/getAll`,

  methods: createMethodsEndpoints(API_BASE_ROUTES.INVOICES),
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
  getByOrderId: (id?: string) => `${API_BASE_ROUTES.DELIVERY}/getByOrderId/${id}`,
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
const counterparties = {
  create: () => `${API_BASE_ROUTES.CUSTOMERS}/create`,
  update: (id?: string) => `${API_BASE_ROUTES.CUSTOMERS}/update/${id}`,
  getAll: () => `${API_BASE_ROUTES.CUSTOMERS}/getAll`,
  getById: (id?: string) => `${API_BASE_ROUTES.CUSTOMERS}/getById/${id}`,
  connection: {
    request: (id?: string) => `${API_BASE_ROUTES.CUSTOMERS}/connection/request/${id}`,
    accept: (id?: string) => `${API_BASE_ROUTES.CUSTOMERS}/connection/accept${id}`,
    reject: (id?: string) => `${API_BASE_ROUTES.CUSTOMERS}/connection/reject${id}`,
  },
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
  setDefaultInput: (serviceId?: string, inputId?: string) =>
    `${API_BASE_ROUTES.EXT_SERVICES}/setDefaultInput/${serviceId}/${inputId}`,

  createInputInt: () => `${API_BASE_ROUTES.EXT_SERVICES}/${Endpoints.integrations}/input/create`,
  createOutputInt: () => `${API_BASE_ROUTES.EXT_SERVICES}/${Endpoints.integrations}/output/create`,
  updateInputInt: () => `${API_BASE_ROUTES.EXT_SERVICES}/${Endpoints.integrations}/input/update`,
  updateOutputInt: () => `${API_BASE_ROUTES.EXT_SERVICES}/${Endpoints.integrations}/output/update`,
};
export type IntegrationType = Keys<typeof Integration.Type>;

const integrations = {
  getAll: (type: IntegrationType | string = '') => `${API_BASE_ROUTES.INTEGRATIONS}/getAll`,
  getById: (type?: IntegrationType, id?: string) => `${API_BASE_ROUTES.INTEGRATIONS}/${type}/${id}`,
  create: (type?: IntegrationType) => `${API_BASE_ROUTES.INTEGRATIONS}/create/${type}`,
  update: (type?: IntegrationType, id?: string) => `${API_BASE_ROUTES.INTEGRATIONS}/update/${type}/${id}`,
  delete: (type?: IntegrationType, id?: string) => `${API_BASE_ROUTES.INTEGRATIONS}/${type}/${id}`,
};

const tags = {
  getAll: () => `${API_BASE_ROUTES.TAGS}/getAll`,
  create: () => `${API_BASE_ROUTES.TAGS}/create`,
  update: () => `${API_BASE_ROUTES.TAGS}/update`,
  delete: (id?: string) => `${API_BASE_ROUTES.TAGS}/one/${id}`,
  getOne: () => `${API_BASE_ROUTES.TAGS}/one`,
};

const tracking = {
  links: {
    create: () => `${API_BASE_ROUTES.TRACK_LINKS}/create`,
    getAll: () => `${API_BASE_ROUTES.TRACK_LINKS}/getAll`,
    track: () => `${API_BASE_ROUTES.TRACK_LINKS}/track`,
  },
};
const chat = {
  create: () => `${API_BASE_ROUTES.CHAT}/create`,
  getOne: () => `${API_BASE_ROUTES.CHAT}/getOne`,
  getAll: () => `${API_BASE_ROUTES.CHAT}/getAll`,
  messages: {
    send: () => `${API_BASE_ROUTES.CHAT_MESSAGES}/send`,
    update: () => `${API_BASE_ROUTES.CHAT_MESSAGES}/update`,
    getAll: () => `${API_BASE_ROUTES.CHAT_MESSAGES}/getAll`,
  },
};

const createEndpoints = <Endpoints extends Record<string, string>>(
  entryPoint: Keys<typeof API_BASE_ROUTES>,
  enpoints: Endpoints
) => {
  const baseUr = API_BASE_ROUTES[entryPoint];
  type KeyType = Keys<Endpoints>;

  return Object.assign(
    {},
    ...Object.entries(enpoints).map(([key, value]) => {
      return {
        [key]: () => baseUr + (value.startsWith('/') ? value : '/' + value),
      };
    })
  ) as Record<KeyType, () => string>;
};

const APP_CONFIGS = {
  endpoints: {
    chat,
    appSettings,
    permissions,
    companies,
    auth,
    files: createEndpoints('FILES', {
      getAll: 'getAll',
      getUploadUrl: 'get-upload-url',
      saveUploadedFileUrl: 'save-uploaded-file-url',
    } as const),
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
    tags,
    tracking,
    counterparties,
  },
};

export default APP_CONFIGS;
