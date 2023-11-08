import { useAppDispatch } from 'redux/store.store';
import { ServiceDispatcherAsync } from '../redux/global.types';
import { useMemo } from 'react';
import { ICustomRole, ModuleWithActions } from '../redux/customRoles/customRoles.types';
import { createCustomRoleThunk, getAllActionsThunk } from '../redux/customRoles/customRoles.thunks';
import { defaultThunkPayload } from '../utils/fabrics';

export interface CustomRolesService {
  create: ServiceDispatcherAsync<Partial<ICustomRole>, ICustomRole>;
  edit?: ServiceDispatcherAsync<Partial<ICustomRole>, ICustomRole>;
  delete?: ServiceDispatcherAsync;
  getAll?: ServiceDispatcherAsync<{ refresh?: boolean }, ICustomRole[]>;
  getAllActions: ServiceDispatcherAsync<any, ModuleWithActions[]>;
}

const useCustomRolesService = (): CustomRolesService => {
  const dispatch = useAppDispatch();

  return useMemo(
    (): CustomRolesService => ({
      create: args => dispatch(createCustomRoleThunk(defaultThunkPayload(args))),
      getAllActions: args => dispatch(getAllActionsThunk(defaultThunkPayload(args))),
    }),
    [dispatch]
  );
};
export default useCustomRolesService;
