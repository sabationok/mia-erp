import { AppDispatch, RootState, useAppDispatch } from '../store.store';
import { useSelector } from 'react-redux';
import {
  createPermissionThunk,
  deletePermissionByIdThunk,
  getAllPermissionsByCompanyIdThunk,
  getAllPermissionsByUserIdThunk,
  getCurrentPermissionThunk,
  logOutPermissionThunk,
  updatePermissionThunk,
} from './permissions.thunk';
import { IPermissionForReq, IPermissionsState } from './permissions.types';
import { useMemo } from 'react';
import { ServiceDispatcher } from 'redux/global.types';
import { clearCurrentPermission } from './permissions.action';
import { defaultThunkPayload } from '../../utils/fabrics';

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
      getAllByCompanyId: async payload => dispatch(getAllPermissionsByCompanyIdThunk(defaultThunkPayload(payload))),
      getAllByUserId: async payload => dispatch(getAllPermissionsByUserIdThunk(defaultThunkPayload(payload))),
      deleteById: async payload => dispatch(deletePermissionByIdThunk(defaultThunkPayload(payload))),
      edit: async payload => dispatch(updatePermissionThunk(defaultThunkPayload(payload))),
      create: async payload => dispatch(createPermissionThunk(defaultThunkPayload(payload))),
      getCurrent: async payload => dispatch(getCurrentPermissionThunk(defaultThunkPayload(payload))),
      permissionLogOut: async payload => dispatch(logOutPermissionThunk(defaultThunkPayload(payload))),
      clearCurrent: () => dispatch(clearCurrentPermission()),
    };
  }, [dispatch]);

  return {
    dispatch,
    state,
    isCurrentValid,
    ...dispatchers,
  };
};

export default usePermissionsService as typeof usePermissionsService;
