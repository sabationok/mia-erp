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
import {
  IPermission,
  IPermissionForReq,
  IPermissionReqData,
  IPermissionsState,
} from '../redux/permissions/permissions.types';
import { useMemo } from 'react';
import { ServiceDispatcherAsync } from 'redux/global.types';
import { clearCurrentPermission } from '../redux/permissions/permissions.action';
import { defaultThunkPayload } from '../utils/fabrics';
import { ICompany, ICompanyForReq, ICompanyReqData } from '../redux/companies/companies.types';
import { IUser } from '../redux/auth/auth.types';

export interface PermissionService {
  getAllByCompanyId: ServiceDispatcherAsync<{ companyId: string; refresh?: boolean }, IPermission[]>;
  getAllByUserId: ServiceDispatcherAsync<{ userId: string }, IPermission[]>;
  deleteById: ServiceDispatcherAsync<{ id: string }>;
  edit: ServiceDispatcherAsync<IPermissionReqData>;
  create: ServiceDispatcherAsync<IPermissionForReq>;
  getCurrent: ServiceDispatcherAsync<{ id: string }>;
  permissionLogOut: ServiceDispatcherAsync<{ _id: string }, { _id?: string; result?: boolean; user: IUser }>;
  logOut: ServiceDispatcherAsync<{ _id: string }, { _id?: string; result?: boolean }>;
  logIn: ServiceDispatcherAsync<{ _id: string }, IPermission>;
  clearCurrent: () => void;
  validatePermission?: (validateBy: ValidatePermissionOptions) => boolean;

  createInvitation: ServiceDispatcherAsync<IPermissionForReq, IPermission>;
  updateInvitation?: ServiceDispatcherAsync<IPermissionForReq, IPermission>;
  rejectInvitation?: ServiceDispatcherAsync<IPermissionForReq, IPermission>;
  acceptInvitation?: ServiceDispatcherAsync<IPermissionForReq, IPermission>;
  deleteInvitation?: ServiceDispatcherAsync<IPermissionForReq, IPermission>;

  createCompany: ServiceDispatcherAsync<ICompanyForReq>;
  deleteCompany: ServiceDispatcherAsync<{ _id: string }>;

  updateCurrentCompany: ServiceDispatcherAsync<ICompanyReqData, ICompany>;
}

export interface ValidatePermissionOptions {
  companyId?: string;
  permissionId?: string;
  userId?: string;
}

export const usePermissionsSelector = () =>
  useSelector<RootState, IPermissionsState>((state: RootState): IPermissionsState => state['permissions']);
const usePermissionsService = ({ companyId, permissionId }: ValidatePermissionOptions = {}): PermissionService => {
  const dispatch: AppDispatch = useAppDispatch();

  return useMemo((): PermissionService => {
    return {
      // getAllByCompanyId:  args => dispatch(getAllPermissionsByCompanyIdThunk(defaultThunkPayload(args))),
      getAllByUserId: args => dispatch(getAllPermissionsByUserIdThunk(defaultThunkPayload(args))),
      getAllByCompanyId: args => dispatch(getAllPermissionsByCompanyIdThunk(defaultThunkPayload(args))),

      deleteById: args => dispatch(deletePermissionByIdThunk(defaultThunkPayload(args))),
      edit: args => dispatch(updatePermissionThunk(defaultThunkPayload(args))),
      create: args => dispatch(createPermissionThunk(defaultThunkPayload(args))),
      getCurrent: args => dispatch(getCurrentPermissionThunk(defaultThunkPayload(args))),

      permissionLogOut: args => dispatch(logOutPermissionThunk(defaultThunkPayload(args))),
      logOut: args => dispatch(logOutPermissionThunk(defaultThunkPayload(args))),
      logIn: args => dispatch(logInPermissionThunk(defaultThunkPayload(args))),
      clearCurrent: () => dispatch(clearCurrentPermission()),
      // * INVITATIONS
      createInvitation: args => dispatch(inviteUserThunk(defaultThunkPayload(args))),

      // * COMPANIES
      createCompany: args => dispatch(createCompanyWithPermissionThunk(defaultThunkPayload(args))),
      deleteCompany: args => dispatch(deleteCompanyWithPermissionThunk(defaultThunkPayload(args))),
      // * CURRENT COMPANY
      updateCurrentCompany: args => dispatch(updateCurrentCompanyThunk(defaultThunkPayload(args))),
    };
  }, [dispatch]);
};

export default usePermissionsService;
