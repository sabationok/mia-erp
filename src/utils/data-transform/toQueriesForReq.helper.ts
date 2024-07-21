import { ApiQueryParams, AppQueries } from '../../api';

export const toQueriesForReq = (queries: Partial<ApiQueryParams>): Partial<AppQueries> => {
  let output: Partial<AppQueries> = {};
  Object.entries(queries).forEach(([k, v]) => {
    const newKey = `${k}Id`;

    output[newKey] = v?._id ? `${v?._id}` : v;
  });

  return output;
};
