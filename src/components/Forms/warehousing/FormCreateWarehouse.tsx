import FormCreateDirTreeComp, { FormCreateDirTreeCompProps } from '../FormCreateDirTreeComp';
import { ApiDirType } from '../../../redux/APP_CONFIGS';
import { IWarehouseDto } from '../../../redux/warehouses/warehouses.types';

export interface FormCreateWarehouseProps
  extends FormCreateDirTreeCompProps<ApiDirType.WAREHOUSES, IWarehouseFormData> {}
export interface IWarehouseFormData extends IWarehouseDto {}
const FormCreateWarehouse: React.FC<FormCreateWarehouseProps> = FormCreateDirTreeComp;

export default FormCreateWarehouse;
