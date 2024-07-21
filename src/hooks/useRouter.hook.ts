import { useLocation, useNavigate } from 'react-router-dom';
import { useAppParams, useAppQuery } from './index';
import { ApiQueryParams } from '../api';

export const useAppRouter = <Query = any, Hash extends string = any>() => {
  const navTo = useNavigate();
  const location = useLocation();
  const params = useAppParams();
  const { query, params: sp } = useAppQuery<Query & ApiQueryParams>();

  const goBack = () => window.history.back();

  const currentHash: Hash | undefined = (location.hash.replace('#', '') as Hash) || undefined;

  return {
    location,
    setHash: (value: string) => {
      navTo({ search: sp.toString(), hash: value });
    },
    query,
    queryToString: () => sp.toString(),
    push: async ({ pathname, query, hash }: { pathname?: string; query?: Query & ApiQueryParams; hash?: string }) => {
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

    replace: async ({
      pathname,
      query,
      hash,
    }: {
      pathname?: string;
      query?: Query & ApiQueryParams;
      hash?: string;
    }) => {
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
      navTo({ search: sp.toString(), hash: '' });
      return;
    },
    params,
    goBack,
    hash: currentHash,
  };
};

export type AppRouter = ReturnType<typeof useAppRouter>;
