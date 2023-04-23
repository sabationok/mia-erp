export const TRANSACTIONS_API_BASENAME = '/transactions';
export const transactionsApiEndpoints = {
  getAll: (): string => `${TRANSACTIONS_API_BASENAME}/getAll`,
  create: (): string => `${TRANSACTIONS_API_BASENAME}/create`,
  deleteById: (id: string): string => `${TRANSACTIONS_API_BASENAME}/delete/${id}`,
  updateById: (id: string): string => `${TRANSACTIONS_API_BASENAME}/update/${id}`,
};
export const PERMISSIONS_API_BASENAME = '/permissions';
export const permissionsApiEndpoints = {
  delete: (permissionId: string) => `${PERMISSIONS_API_BASENAME}/delete/${permissionId}`,
  edit: (permissionId: string) => `${PERMISSIONS_API_BASENAME}/edit/${permissionId}`,
  create: () => `${PERMISSIONS_API_BASENAME}/create`,
  getAllByUserId: (userId: string) => `${PERMISSIONS_API_BASENAME}/getAllByUserId/${userId}`,
  getAllByCompanyId: (companyId: string) => `${PERMISSIONS_API_BASENAME}/getAllByCompanyId/${companyId}`,
  getCurrentPermission: (permissionId: string) => `${PERMISSIONS_API_BASENAME}/getCurrentPermission/${permissionId}`,
};


const APP_CONFIGS = {
  endpoints: {
    transactions: transactionsApiEndpoints,
    permissions: permissionsApiEndpoints,
  },
};

export default APP_CONFIGS;
