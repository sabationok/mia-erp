import { AppQueries, AppQueryParams } from '../../api';

export const toQueriesForReq = (queries: Partial<AppQueryParams>): Partial<AppQueries> => {
  let output: Partial<AppQueries> = {};
  Object.entries(queries).forEach(([k, v]) => {
    const newKey = `${k}Id`;

    output[newKey] = v?._id ? `${v?._id}` : v;
  });

  return output;
};
