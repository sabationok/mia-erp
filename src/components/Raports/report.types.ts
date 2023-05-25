import { ModalFormProps } from '../ModalForm';
import { ITableListProps } from '../TableList/TableList';

export interface IReportBaseProps<TableData = any> extends ModalFormProps {
  tableConfigs?: ITableListProps<TableData>;
}
