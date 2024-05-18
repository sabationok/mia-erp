import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { PartialRecord } from '../types/utils.types';

export interface AppQuery extends PartialRecord<string, string | string[] | string[][]> {
  offerId?: string;
  variationId?: string;
  priceId?: string;
}
export const useAppRouter = <Query extends AppQuery = AppQuery, T extends string = any>() => {
  const navTo = useNavigate();

  const [sp, _setSP] = useSearchParams();

  const currentHash: T | undefined = (window.location.hash.replace('#', '') as T) || undefined;

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

    hash: currentHash,
  };
};
