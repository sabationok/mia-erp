import { RootState, useAppDispatch } from '../store.store';
import { useSelector } from 'react-redux';
import {
  createPermissionThunk,
  deletePermissionByIdThunk,
  editPermissionThunk,
  getAllPermissionsByCompanyIdThunk,
  getAllPermissionsByUserIdThunk,
  getCurrentPermissionThunk,
} from './permissions.thunk';
import { IPermission } from './permissions.types';

export const usePermissionsSelector = () => useSelector((state: RootState) => state.permissions);
const usePermissionsService = () => {
  const dispatch = useAppDispatch();
  const state = usePermissionsSelector();

  function getAllByCompanyId(companyId: string) {
    dispatch(getAllPermissionsByCompanyIdThunk({ submitData: { companyId } }));
  }

  function getAllByUserId(userId: string) {
    dispatch(getAllPermissionsByUserIdThunk({ submitData: { userId } }));
  }

  function deleteById(permissionId: string, permission: Partial<IPermission>) {
    dispatch(deletePermissionByIdThunk({ submitData: { id: permissionId } }));
  }

  function edit(permissionId: string, permission: { company: string; user: string; role: string; }) {
    dispatch(editPermissionThunk({ submitData: { id: permissionId, data: permission } }));
  }

  function create(permissionId: string, permission: { company: string; user: string; role: string; }) {
    dispatch(createPermissionThunk({ submitData: { id: permissionId, data: permission } }));
  }

  function getCurrentPermission(permissionId: string) {
    dispatch(getCurrentPermissionThunk({ submitData: { permissionId } }));
  }


  return {
    dispatch,
    ...state,
    getAllByCompanyId,
    getAllByUserId,
    getCurrentPermission,
    deleteById,
    edit,
    create,
  };
};

export default usePermissionsService as typeof usePermissionsService;