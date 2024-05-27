import { Keys } from '../types/utils.types';
import { AppQueryParams } from '../api';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

type AppQueryKey = Keys<AppQueryParams>;

function parseAppQueryParam<Key extends AppQueryKey & string = string>(key: Key, value: string): AppQueryParams[Key] {
  return key.endsWith('Ids') ? value.split(',') : value;
}
export const useAppQuery = <Query extends AppQueryParams = AppQueryParams>() => {
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
