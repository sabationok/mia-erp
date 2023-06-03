import { AppDispatch, RootState, useAppDispatch } from '../store.store';
import { useSelector } from 'react-redux';
import {
  createPermissionThunk,
  deletePermissionByIdThunk,
  editPermissionThunk,
  getAllPermissionsByCompanyIdThunk,
  getAllPermissionsByUserIdThunk,
  getCurrentPermissionThunk,
  logOutPermissionThunk,
} from './permissions.thunk';
import { IPermissionForReq, IPermissionsState } from './permissions.types';

import { useMemo } from 'react';
import { ServiceDispatcher } from 'redux/global.types';

export interface PermissionService {
  dispatch: AppDispatch;
  state: IPermissionsState;
  getAllByCompanyId: ServiceDispatcher<{ companyId: string }>;
  getAllByUserId: ServiceDispatcher<{ userId: string }>;
  deleteById: ServiceDispatcher<{ id: string }>;
  edit: ServiceDispatcher<{ id: string; data: Partial<IPermissionForReq> }>;
  create: ServiceDispatcher<IPermissionForReq>;
  getCurrent: ServiceDispatcher<{ id: string }>;
  permissionLogOut: ServiceDispatcher<{ id: string }>;
  isCurrentValid: boolean;
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

  return {
    dispatch,
    state,
    getAllByCompanyId: payload => dispatch(getAllPermissionsByCompanyIdThunk(payload)),
    getAllByUserId: payload => dispatch(getAllPermissionsByUserIdThunk(payload)),
    deleteById: payload => dispatch(deletePermissionByIdThunk(payload)),
    edit: payload => dispatch(editPermissionThunk(payload)),
    create: payload => dispatch(createPermissionThunk(payload)),
    getCurrent: payload => dispatch(getCurrentPermissionThunk(payload)),
    permissionLogOut: payload => dispatch(logOutPermissionThunk(payload)),
    isCurrentValid,
  };
};

export default usePermissionsService as typeof usePermissionsService;
