import { Connection } from '../types/integrations.types';
import { Keys } from '../types/utils.types';

export enum API_BASE_ROUTES {
  APP = 'APP',
  AUTH = '/auth',
  AUTH_DEVICES = '/auth/devices',
  AUTH_O_AUTH = '/auth/o-auth',
  AUTH_O_AUTH_CONFIGS = '/auth/o-auth/configs',

  PERMISSIONS = '/permissions',
  COMPANIES = '/companies',
  DIRECTORIES = '/directories',
  TRANSACTIONS = `/transactions`,
  FINANCES_TRANSACTIONS = '/finances/transactions',
  FINANCES_BANK_ACCOUNTS = '/finances/bank-accounts',
  FINANCES_FIN_ACCOUNTS = '/finances/fin-counts',
  CUSTOM_ROLES = '/roles',
  CUSTOM_ROLES_ACTIONS = '/roles/actions',
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
  WAREHOUSES_INVENTORIES = '/warehouses/inventories',
  WAREHOUSES_DOCUMENTS = '/warehouses/documents',

  PAYMENTS = '/payments',
  TAGS = '/tags',
  INVOICES = '/invoices',
  SHIPMENTS = '/shipments',
  DELIVERY = '/delivery',
  CUSTOMERS = '/customers',
  COMMUNICATION = '/communications',
  COUNTERPARTIES = '/counterparties',
  EXT_SERVICES = '/ext-services',
  CONNECTIONS = '/connections',
  TRACK_LINKS = 'tracking-links',
  CHAT = '/chat',
  CHAT_MESSAGES = '/chat/messages',
}

export enum Endpoints {
  getAll = 'getAll',
  getAllByProductId = 'getAllByProductId',
  getAllByType = 'getAllByType',
  getAllGrouped = 'getAllGrouped',
  create = 'create',
  update = 'update',
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
  configs = 'configs',
  changeArchiveStatus = 'changeArchiveStatusById',
  createList = 'createList',
  getAllPrices = 'getAllPrices',
  getDefaultDirectories = 'getDefaultDirectories',
  updateList = 'updateList',
  inviteUser = 'inviteUser',
  prices = 'prices',
  methods = 'methods',
  integrations = 'integrations',
}

enum EndpointsCRUD {
  create = 'create',
  update = 'update',
  delete = 'delete',
  remove = 'remove',
  one = 'one',
  all = 'all',
  getOne = 'getOne',
  getAll = 'getAll',
  getList = 'getList',
}

function createEndpoints<Endpoints extends Record<string, string>>(
  entryPoint: Keys<typeof API_BASE_ROUTES>,
  enpoints: Endpoints
) {
  const baseUr = API_BASE_ROUTES[entryPoint] ?? entryPoint;
  type KeyType = Keys<Endpoints>;

  return Object.assign(
    {},
    ...Object.entries(enpoints).map(([key, value]) => {
      return {
        [key]: () => baseUr + (value.startsWith('/') ? value : '/' + value),
      };
    })
  ) as Record<KeyType, () => string>;
}
export function createEndpoints2<
  Namespace extends Keys<typeof API_BASE_ROUTES>,
  Endpoints extends Record<string, (...args: any[]) => string>,
>(entryPoint: Namespace, endpoints: Endpoints) {
  const baseUr = API_BASE_ROUTES[entryPoint] ?? entryPoint;

  return Object.assign(
    {},
    ...Object.entries(endpoints).map(([key, value]) => {
      return {
        [key]: (...args: Parameters<any>) => {
          const endp = value(...args);
          return baseUr + (endp.startsWith('/') ? endp : '/' + endp);
        },
      };
    })
  ) as {
    [key in keyof Endpoints]: (...args: Parameters<Endpoints[key]>) => `/${Namespace}/${string}`;
  };
}
function createMethodsEndpoints(routeBaseUrl: string) {
  return {
    ...createEndpoints(routeBaseUrl as never, {
      getAll: 'methods/getAll',
      getList: 'methods/getAll',
      create: 'methods/create',
      update: 'methods/update',
    }),
  };
}

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
  getCurrent: () => `${API_BASE_ROUTES.AUTH}/getCurrent`,
  refreshTokens: () => `${API_BASE_ROUTES.AUTH}/refresh-token`,

  devices: {
    register: () => `${API_BASE_ROUTES.AUTH_DEVICES}/register`,
    attach: () => `${API_BASE_ROUTES.AUTH_DEVICES}/attach`,
  },

  o_auth: {
    ...createEndpoints('AUTH_O_AUTH', {
      logOut: 'logOut',
      logIn: 'logIn',
      callback: 'callback',
      refresh: 'refresh',
      current: 'current',
      getAuthUrl: 'auth-url',
      save_tokens: 'save-tokens',
    }),

    configs: createEndpoints('AUTH_O_AUTH_CONFIGS', {
      getAll: 'getAll',
      create: 'create',
      update: 'update',
    }),
  },
};

const permissions = {
  updateById: (permissionId?: string) => `${API_BASE_ROUTES.PERMISSIONS}/delete/${permissionId}`,
  deleteById: (permissionId?: string) => `${API_BASE_ROUTES.PERMISSIONS}/deleteById/${permissionId}`,
  getAllByUserId: (userId?: string) => `${API_BASE_ROUTES.PERMISSIONS}/getAllByUserId/${userId}`,
  logIn: (id?: string) => `${API_BASE_ROUTES.PERMISSIONS}/logIn/${id}`,
  ...createEndpoints('PERMISSIONS', {
    getAll: 'getAll',
    create: 'create',
    logOut: 'logOut',
    inviteUser: 'inviteUser',
    getCurrent: 'getCurrent',
  }),
};
const finances = {
  deleteById: (id?: string): string => `${API_BASE_ROUTES.FINANCES_TRANSACTIONS}/${Endpoints.deleteById}/${id}`,
  updateById: (id?: string): string => `${API_BASE_ROUTES.FINANCES_TRANSACTIONS}/${Endpoints.updateById}/${id}`,
  getById: (id?: string): string => `${API_BASE_ROUTES.FINANCES_TRANSACTIONS}/getById/${id}`,
  ...createEndpoints('FINANCES_TRANSACTIONS', {
    getAll: 'getAll',
    create: 'create',
  }),
  bankAccounts: {
    update: (id?: string) => `${API_BASE_ROUTES.FINANCES_BANK_ACCOUNTS}/update/${id}`,
    ...createEndpoints('FINANCES_BANK_ACCOUNTS', {
      getAll: 'getAll',
      create: 'create',
    }),
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
const propertiesApiEndpoints = {
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

  properties: propertiesApiEndpoints,
  variations: variationsApiEndpoints,
};

const companies = createEndpoints('COMPANIES', EndpointsCRUD);

const directories = {
  getAllByType: (dirType?: ApiDirType) => `${API_BASE_ROUTES.DIRECTORIES}/${Endpoints.getAllByType}/${dirType || ''}`,
  getAllGrouped: () => `${API_BASE_ROUTES.DIRECTORIES}/${Endpoints.getAllGrouped}`,
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
  ...createEndpoints('CUSTOM_ROLES', EndpointsCRUD),
  getAllActions: () => `${API_BASE_ROUTES.CUSTOM_ROLES}/v2/getAllActions`,
  actions: createEndpoints('CUSTOM_ROLES_ACTIONS', { getAll: 'getAll' }),
};

const appSettings = {
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
  ...createEndpoints('ORDERS', EndpointsCRUD),

  slots: createEndpoints('ORDERS_SLOTS', EndpointsCRUD),

  updateById: (orderId: string) => `${API_BASE_ROUTES.ORDERS}/${Endpoints.updateById}/${orderId}`,
  createGroupedByWarehouse: () => `${API_BASE_ROUTES.ORDERS}/create/group/byWarehouses`,

  sales: {
    ...createEndpoints('ORDERS_SALES', EndpointsCRUD),

    groups: {
      createByWarehouse: () => `${API_BASE_ROUTES.ORDERS}/create/group/byWarehouses`,
    },
    slots: createEndpoints('ORDERS_SALES_SLOTS', EndpointsCRUD),
    reject: createEndpoints('ORDERS_SALES', {
      request: 'reject/request',
      confirm: 'reject/confirm',
      abort: 'reject/abort',
      getWithCode: 'reject/getWithCode',
    }),
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

const refunds = createEndpoints2('REFUNDS', {
  getAll: () => `/`,
  getById: () => `/`,
  create: () => `/`,
  deleteById: () => `/`,
  getAllRefundSlots: () => `/`,
  addSlotToRefund: () => `/`,
  softDeleteSlotFromRefund: () => `/`,
  addItemToRefundSlot: () => `/`,
  softDeleteRefundSlotItem: () => `/`,
  getDataForNewRefundSlot: () => `/`,
});

const warehousing = {
  getById: (id?: string) => `${API_BASE_ROUTES.WAREHOUSES}/getById/${id}`,
  ...createEndpoints('WAREHOUSES', EndpointsCRUD),

  inventories: {
    ...createEndpoints('WAREHOUSES_INVENTORIES', EndpointsCRUD),
  },
  documents: {
    ...createEndpoints('WAREHOUSES_DOCUMENTS', EndpointsCRUD),
  },
};
const payments = {
  ...createEndpoints('PAYMENTS', EndpointsCRUD),

  methods: createMethodsEndpoints(API_BASE_ROUTES.PAYMENTS),
};

const invoices = {
  createForOrder: (id?: string) => `${API_BASE_ROUTES.INVOICES}/create/order/${id}`,
  createForDelivery: (id?: string) => `${API_BASE_ROUTES.INVOICES}/create/delivery/${id}`,
  getAll: () => `${API_BASE_ROUTES.INVOICES}/getAll`,

  methods: createMethodsEndpoints(API_BASE_ROUTES.INVOICES),
};

const shipments = createEndpoints2('SHIPMENTS', {
  create: () => `/create`,
  getAll: () => `/getAll`,
  getById: (id?: string) => `/getById/${id}`,
  getAllMethods: () => `/${Endpoints.methods}/getAll`,
  updateMethod: (id?: string) => `/${Endpoints.methods}/update/${id}`,
});
const deliveries = {
  ...createEndpoints2('DELIVERY', {
    create: () => `/create`,
    getAll: () => `/getAll`,
    getById: (id?: string) => `/getById/${id}`,
  }),
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
  getById: (id?: string) => `${API_BASE_ROUTES.EXT_SERVICES}/service/getById/${id}`,
  update: () => `${API_BASE_ROUTES.EXT_SERVICES}/service/update`,
  getAll: () => `${API_BASE_ROUTES.EXT_SERVICES}/getAll`,
  setDefaultInput: (serviceId?: string, inputId?: string) =>
    `${API_BASE_ROUTES.EXT_SERVICES}/setDefaultInput/${serviceId}/${inputId}`,
};

const connections = createEndpoints2('CONNECTIONS', {
  getAll: () => `/getAll`,
  getById: (type?: Connection.TypeEnum, id?: string) => `/${type}/${id}`,
  create: (type?: Connection.TypeEnum) => `/create/${type}`,
  update: (type?: Connection.TypeEnum, id?: string) => `/update/${type}/${id}`,
  delete: (type?: Connection.TypeEnum, id?: string) => `/${type}/${id}`,
});

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
    connections: connections,
    tags,
    tracking,
    counterparties,
  },
};

export default APP_CONFIGS;
