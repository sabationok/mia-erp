import { ModalFormProps } from '../ModalForm';
import { ITableListProps } from '../TableList/TableList';

export interface IReportBaseProps<TableData = any, V = any, D = any> extends ModalFormProps<V, D> {
  tableConfigs?: ITableListProps<TableData>;
  timeFrom?: number | Date;
  timeTo?: number | Date;
}
