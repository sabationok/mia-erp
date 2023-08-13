import { WarehousesService } from './useWarehousesService.hook';
import TableActions from '../components/TableList/TableActions';

export const WarehouseActionsCreator = TableActions;
const useWarehousesActionsCreator = (service: WarehousesService) => {
  return () => [{}];
};

export default useWarehousesActionsCreator;
