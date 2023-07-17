import { AppDispatch, RootState, useAppDispatch } from '../store.store';
import { useSelector } from 'react-redux';
import {
  createCompanyWithPermissionThunk,
  createPermissionThunk,
  deleteCompanyWithPermissionThunk,
  deletePermissionByIdThunk,
  getAllPermissionsByCompanyIdThunk,
  getAllPermissionsByUserIdThunk,
  getCurrentPermissionThunk,
  logInPermissionThunk,
  logOutPermissionThunk,
  updateCompanyWithPermissionThunk,
  updatePermissionThunk,
} from './permissions.thunk';
import { IPermission, IPermissionForReq, IPermissionReqData } from './permissions.types';
import { useMemo } from 'react';
import { ServiceDispatcherAsync } from 'redux/global.types';
import { clearCurrentPermission } from './permissions.action';
import { defaultThunkPayload } from '../../utils/fabrics';
import { ICompanyForReq, ICompanyReqData } from '../companies/companies.types';

export interface PermissionService {
  dispatch: AppDispatch;
  getAllByCompanyId: ServiceDispatcherAsync<{ companyId: string }, IPermission[]>;
  getAllByUserId: ServiceDispatcherAsync<{ userId: string }, IPermission[]>;
  deleteById: ServiceDispatcherAsync<{ id: string }>;
  edit: ServiceDispatcherAsync<IPermissionReqData>;
  create: ServiceDispatcherAsync<IPermissionForReq>;
  getCurrent: ServiceDispatcherAsync<{ id: string }>;
  permissionLogOut: ServiceDispatcherAsync<{ _id: string }, { _id?: string; result?: boolean }>;

  createInvitation?: ServiceDispatcherAsync<IPermissionForReq>;
  updateInvitation?: ServiceDispatcherAsync<IPermissionForReq>;
  rejectInvitation?: ServiceDispatcherAsync<IPermissionForReq>;
  acceptInvitation?: ServiceDispatcherAsync<IPermissionForReq>;
  deleteInvitation?: ServiceDispatcherAsync<IPermissionForReq>;

  createCompany: ServiceDispatcherAsync<ICompanyForReq>;
  updateCompany: ServiceDispatcherAsync<Required<ICompanyReqData>>;
  deleteCompany: ServiceDispatcherAsync<{ _id: string }>;

  logOut: ServiceDispatcherAsync<{ _id: string }, { _id?: string; result?: boolean }>;
  logIn: ServiceDispatcherAsync<{ _id: string }, IPermission>;
  isCurrentValid: boolean;
  clearCurrent: () => void;
  validatePermission?: (validateBy: ValidatePermissionOptions) => boolean;
}

export interface ValidatePermissionOptions {
  companyId?: string;
  permissionId?: string;
  userId?: string;
}

export const usePermissionsSelector = () => useSelector((state: RootState) => state.permissions);
const usePermissionsService = ({ companyId, permissionId }: ValidatePermissionOptions = {}): PermissionService => {
  const dispatch: AppDispatch = useAppDispatch();
  const state = usePermissionsSelector();

  const isCurrentValid = useMemo(
    () =>
      (companyId && state.permission?.company?._id === companyId) ||
      (permissionId && state.permission?._id === permissionId) ||
      false,
    [companyId, permissionId, state.permission?._id, state.permission?.company?._id]
  );

  const dispatchers = useMemo((): Omit<
    PermissionService,
    'state' | 'dispatch' | 'isCurrentValid' | 'validatePermission'
  > => {
    return {
      // getAllByCompanyId: async payload => dispatch(getAllPermissionsByCompanyIdThunk(defaultThunkPayload(payload))),
      getAllByUserId: async payload => dispatch(getAllPermissionsByUserIdThunk(defaultThunkPayload(payload))),
      getAllByCompanyId: async payload => dispatch(getAllPermissionsByCompanyIdThunk(defaultThunkPayload(payload))),

      deleteById: async payload => dispatch(deletePermissionByIdThunk(defaultThunkPayload(payload))),
      edit: async payload => dispatch(updatePermissionThunk(defaultThunkPayload(payload))),
      create: async payload => dispatch(createPermissionThunk(defaultThunkPayload(payload))),
      getCurrent: async payload => dispatch(getCurrentPermissionThunk(defaultThunkPayload(payload))),
      permissionLogOut: async payload => dispatch(logOutPermissionThunk(defaultThunkPayload(payload))),
      logOut: async payload => dispatch(logOutPermissionThunk(defaultThunkPayload(payload))),
      logIn: async payload => dispatch(logInPermissionThunk(defaultThunkPayload(payload))),
      clearCurrent: () => dispatch(clearCurrentPermission()),

      createCompany: async payload => dispatch(createCompanyWithPermissionThunk(defaultThunkPayload(payload))),
      deleteCompany: async payload => dispatch(deleteCompanyWithPermissionThunk(defaultThunkPayload(payload))),
      updateCompany: async payload => dispatch(updateCompanyWithPermissionThunk(defaultThunkPayload(payload))),
    };
  }, [dispatch]);

  return {
    dispatch,
    isCurrentValid,
    ...dispatchers,
  };
};

export default usePermissionsService as typeof usePermissionsService;
