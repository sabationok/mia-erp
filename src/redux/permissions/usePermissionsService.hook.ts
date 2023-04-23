import { RootState, useAppDispatch } from '../store.store';
import { useSelector } from 'react-redux';

export const usePermissionsSelector = () => useSelector((state: RootState) => state);
const usePermissionsService = () => {
  const dispatch = useAppDispatch();
  const state = usePermissionsSelector();

  return {
    dispatch,
    ...state,
  };
};

export default usePermissionsService as typeof usePermissionsService;