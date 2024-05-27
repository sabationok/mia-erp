import { useLocation, useNavigate } from 'react-router-dom';
import { useAppParams, useAppQuery } from './index';
import { AppQueryParams } from '../api';

export const useAppRouter = <Query extends AppQueryParams = AppQueryParams, Hash extends string = any>() => {
  const navTo = useNavigate();
  const location = useLocation();
  const params = useAppParams();
  const { query, params: sp } = useAppQuery();

  const goBack = () => window.history.back();
  //  _setSP

  const currentHash: Hash | undefined = (location.hash.replace('#', '') as Hash) || undefined;

  return {
    location,
    setHash: (value: string) => {
      navTo({ search: sp.toString(), hash: value });
    },
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
