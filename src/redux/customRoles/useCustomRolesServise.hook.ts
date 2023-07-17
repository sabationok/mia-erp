import { useAppDispatch } from 'redux/store.store';
import { ServiceDispatcherAsync } from '../global.types';
import { useMemo } from 'react';

export interface CustomRolesService {
  create?: ServiceDispatcherAsync;
  edit?: ServiceDispatcherAsync;
  delete?: ServiceDispatcherAsync;
  getAll?: ServiceDispatcherAsync;
}

const useCustomRolesService = () => {
  const dispatch = useAppDispatch;

  return useMemo((): CustomRolesService => ({}), []);
};
export default useCustomRolesService as typeof useCustomRolesService;
