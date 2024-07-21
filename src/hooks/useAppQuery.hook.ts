import { Keys } from '../types/utils.types';
import { ApiQueryParams } from '../api';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

type AppQueryKey = Keys<ApiQueryParams>;

function parseAppQueryParam<Key extends AppQueryKey & string = string>(key: Key, value: string): ApiQueryParams[Key] {
  return key.endsWith('Ids') ? value.split(',') : value;
}
export const useAppQuery = <Query extends ApiQueryParams = ApiQueryParams>() => {
  const [params, set] = useSearchParams();
  const query = useMemo(
    () =>
      Object.fromEntries(
        Array.from(params.entries()).map(([key, value]) => {
          return [key, parseAppQueryParam(key, value)];
        })
      ) as Query,
    [params]
  );

  return {
    query,
    set,
    params,
  };
};
