import { ApiQueryParams } from '../../api';

export const toQueriesForReq = (queries: Partial<ApiQueryParams>): Partial<ApiQueryParams> => {
  let output: Partial<ApiQueryParams> = {};
  Object.entries(queries).forEach(([k, v]) => {
    const newKey = `${k}Id`;

    output[newKey] = v?._id ? `${v?._id}` : v;
  });

  return output;
};
