import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { PartialRecord } from '../types/utils.types';
import { useAppParams } from './index';

export interface AppQuery extends PartialRecord<string, string | string[] | string[][]> {
  offerId?: string;
  variationId?: string;
  priceId?: string;
}
export const useAppRouter = <Query extends AppQuery = AppQuery, T extends string = any>() => {
  const navTo = useNavigate();
  const location = useLocation();
  const params = useAppParams();

  const goBack = () => window.history.back();

  const [sp, _setSP] = useSearchParams();

  const currentHash: T | undefined = (location.hash.replace('#', '') as T) || undefined;

  const query = useMemo(
    () =>
      Object.fromEntries(
        Array.from(sp.entries()).map(([key, value]) => {
          return [key, value?.includes(',') ? value.split(',') : value];
        })
      ) as Query,
    [sp]
  );

  return {
    location,
    setHash: (value: string) => navTo({ search: sp.toString(), hash: value }),
    query,
    queryToString: () => sp.toString(),
    push: async ({ pathname, query, hash }: { pathname?: string; query?: Query; hash?: string }) => {
      try {
        navTo({
          pathname,
          search: query ? new URLSearchParams(query as never).toString() : undefined,
          hash: hash || currentHash,
        });
      } catch (e) {
        console.error('[APP ROUTER ERROR]', e);
      }
    },

    replace: async ({ pathname, query, hash }: { pathname?: string; query?: Query; hash?: string }) => {
      try {
        navTo(
          {
            pathname,
            search: query ? new URLSearchParams(query as never).toString() : undefined,
            hash: hash || currentHash,
          },
          { replace: true }
        );
      } catch (e) {
        console.error('[APP ROUTER ERROR]', e);
      }
    },

    unSet: () => {
      return navTo({ search: sp.toString(), hash: '' });
    },
    params,
    goBack,
    hash: currentHash,
  };
};
