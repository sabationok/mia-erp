import { useMemo } from 'react';
import { ServiceDispatcher } from '../redux/global.types';
import { useDispatch } from 'react-redux';

export interface WarehousesService {
  getAll: ServiceDispatcher;
}
export const useWarehousesService = (): WarehousesService => {
  const dispath = useDispatch();
  return useMemo(
    (): WarehousesService => ({
      getAll: async p => {},
    }),
    []
  );
};
export default useWarehousesService;
