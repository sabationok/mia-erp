import FormCreateDirTreeComp, { FormCreateDirTreeCompProps } from './FormCreateDirTreeComp';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { IWarehouseDto } from '../../redux/warehouses/warehouses.types';

export interface FormCreateWarehouseProps
  extends FormCreateDirTreeCompProps<any, ApiDirType.WAREHOUSES, IWarehouseDto> {}
const FormCreateWarehouse: React.FC<FormCreateWarehouseProps> = props => {
  return <FormCreateDirTreeComp {...props} />;
};

export default FormCreateWarehouse;
