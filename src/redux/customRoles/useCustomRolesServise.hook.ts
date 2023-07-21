import { useAppDispatch } from 'redux/store.store';
import { ServiceDispatcherAsync } from '../global.types';
import { useMemo } from 'react';
import { ICustomRole } from './customRoles.types';
import { createCustomRoleThunk } from './customRoles.thunks';
import { defaultThunkPayload } from '../../utils/fabrics';

export interface CustomRolesService {
  create: ServiceDispatcherAsync<Partial<ICustomRole>, ICustomRole>;
  edit?: ServiceDispatcherAsync<Partial<ICustomRole>, ICustomRole>;
  delete?: ServiceDispatcherAsync;
  getAll?: ServiceDispatcherAsync<{ refresh?: boolean }, ICustomRole[]>;
}

const useCustomRolesService = () => {
  const dispatch = useAppDispatch();

  return useMemo(
    (): CustomRolesService => ({
      create: async payload => dispatch(createCustomRoleThunk(defaultThunkPayload(payload))),
    }),
    [dispatch]
  );
};
export default useCustomRolesService as typeof useCustomRolesService;
