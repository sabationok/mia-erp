import { AppDispatch, RootState, useAppDispatch } from '../redux/store.store';
import { useSelector } from 'react-redux';
import {
  createCompanyWithPermissionThunk,
  createPermissionThunk,
  deleteCompanyWithPermissionThunk,
  deletePermissionByIdThunk,
  getAllPermissionsByCompanyIdThunk,
  getAllPermissionsByUserIdThunk,
  getCurrentPermissionThunk,
  inviteUserThunk,
  logInPermissionThunk,
  logOutPermissionThunk,
  updateCurrentCompanyThunk,
  updatePermissionThunk,
} from '../redux/permissions/permissions.thunk';
import { IPermissionForReq, IPermissionsState, PermissionEntity } from '../types/permissions.types';
import { useMemo } from 'react';
import { __ServiceDispatcherAsync, ServiceDispatcherAsync } from 'redux/app-redux.types';
import { clearCurrentPermission } from '../redux/permissions/permissions.action';
import { defaultThunkPayload } from '../utils';
import { CompanyDto } from '../types/companies/companies.types';

export interface PermissionService {
  getAllByCompanyId: __ServiceDispatcherAsync<typeof getAllPermissionsByCompanyIdThunk>;
  getAllByUserId: __ServiceDispatcherAsync<typeof getAllPermissionsByUserIdThunk>;
  deleteById: ServiceDispatcherAsync<{ id: string }>;
  edit: __ServiceDispatcherAsync<typeof updatePermissionThunk>;
  create: ServiceDispatcherAsync<IPermissionForReq>;
  getCurrent: ServiceDispatcherAsync<{ id: string }>;
  logOut: __ServiceDispatcherAsync<typeof logOutPermissionThunk>;
  logIn: __ServiceDispatcherAsync<typeof logInPermissionThunk>;
  clearCurrent: () => void;
  validatePermission?: (validateBy: ValidatePermissionOptions) => boolean;

  createInvitation: __ServiceDispatcherAsync<typeof inviteUserThunk>;
  updateInvitation?: ServiceDispatcherAsync<IPermissionForReq, PermissionEntity>;
  rejectInvitation?: ServiceDispatcherAsync<IPermissionForReq, PermissionEntity>;
  acceptInvitation?: ServiceDispatcherAsync<IPermissionForReq, PermissionEntity>;
  deleteInvitation?: ServiceDispatcherAsync<IPermissionForReq, PermissionEntity>;

  createCompany: ServiceDispatcherAsync<CompanyDto>;
  deleteCompany: ServiceDispatcherAsync<{ _id: string }>;

  updateCurrentCompany: __ServiceDispatcherAsync<typeof updateCurrentCompanyThunk>;
}

export interface ValidatePermissionOptions {
  companyId?: string;
  permissionId?: string;
  userId?: string;
}

export const usePermissionsSelector = () =>
  useSelector<RootState, IPermissionsState>((state: RootState): IPermissionsState => state['permissions']);
const usePermissionsService = (_: ValidatePermissionOptions = {}): PermissionService => {
  const dispatch: AppDispatch = useAppDispatch();

  return useMemo((): PermissionService => {
    return {
      // getAllByCompanyId:  args => dispatch(getAllPermissionsByCompanyIdThunk(defaultThunkPayload(args))),
      getAllByUserId: args => dispatch(getAllPermissionsByUserIdThunk(defaultThunkPayload(args))),
      getAllByCompanyId: args => dispatch(getAllPermissionsByCompanyIdThunk(args)),

      deleteById: args => dispatch(deletePermissionByIdThunk(defaultThunkPayload(args))),
      edit: args => dispatch(updatePermissionThunk(args)),

      create: args => dispatch(createPermissionThunk(defaultThunkPayload(args))),
      getCurrent: args => dispatch(getCurrentPermissionThunk(defaultThunkPayload(args))),

      logOut: args => dispatch(logOutPermissionThunk(args)),
      logIn: args => dispatch(logInPermissionThunk(args)),
      clearCurrent: () => dispatch(clearCurrentPermission()),
      // * INVITATIONS
      createInvitation: args => dispatch(inviteUserThunk(args)),

      // * COMPANIES
      createCompany: args => dispatch(createCompanyWithPermissionThunk(defaultThunkPayload(args))),
      deleteCompany: args => dispatch(deleteCompanyWithPermissionThunk(defaultThunkPayload(args))),
      // * CURRENT COMPANY
      updateCurrentCompany: args => dispatch(updateCurrentCompanyThunk(args)),
    };
  }, [dispatch]);
};

export default usePermissionsService;
