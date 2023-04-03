import { useAppDispatch } from 'redux/store.store';
import { useCustomRolesSelector } from 'redux/selectors.store';

const useCustomRolesService = () => {
  const dispatch = useAppDispatch;
  const state = useCustomRolesSelector();

  function create(submitData: any) {
    console.log({ submitData });
  }
  function deleteById(_id: string) {
    console.log({ _id });
  }
  function editById(_id: string, submitData: any) {
    console.log({ _id, submitData });
  }
  function getById(_id: string) {}

  return { dispatch, ...state, create, deleteById, editById, getById };
};
export default useCustomRolesService as typeof useCustomRolesService;
