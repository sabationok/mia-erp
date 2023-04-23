export const TRANSACTIONS_API_BASENAME = '/transactions';
export const transactionsApiEndpoints = {
  getAll: (): string => `${TRANSACTIONS_API_BASENAME}/getAll`,
  create: (): string => `${TRANSACTIONS_API_BASENAME}/create`,
  deleteById: (id: string): string => `${TRANSACTIONS_API_BASENAME}/delete/${id}`,
  updateById: (id: string): string => `${TRANSACTIONS_API_BASENAME}/update/${id}`,
};


const APP_CONFIGS = {
  endpoints: {
    transactions: transactionsApiEndpoints,
  },

};

export default APP_CONFIGS;
