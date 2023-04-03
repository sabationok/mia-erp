import { useAppDispatch } from 'redux/store.store';
import { useCustomRolesSelector } from 'redux/selectors.store';

const useCustomRolesService = () => {
  const dispatch = useAppDispatch;
  const state = useCustomRolesSelector();

  return { dispatch, ...state };
};
export default useCustomRolesService;
