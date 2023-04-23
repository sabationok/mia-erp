import { useAppDispatch } from 'redux/store.store';
import { useCustomRolesSelector } from 'redux/selectors.store';
import { ICustomRole } from 'redux/customRoles/customRoles.types';

const useCustomRolesService = () => {
  const dispatch = useAppDispatch;
  const state = useCustomRolesSelector();

  function create(submitData: any) {
    console.log({ submitData });
  }

  function deleteById(_id: string) {
    console.log({ _id });
  }

  function editById(_id: string, submitData: Partial<ICustomRole>) {
    console.log({ _id, submitData });
  }

  function getById(_id: string) {
    return state.customRoles.find(role => role._id === _id);
  }

  return { dispatch, ...state, create, deleteById, editById, getById };
};
export default useCustomRolesService as typeof useCustomRolesService;
