import { IReportBaseProps } from '../../components/Raports/report.types';
import { ModalFormProps } from '../../components/ModalForm';
import { IBase } from '../global.types';
import { FilterReturnDataType } from '../../components/Filter/AppFilter';

export interface IReportConfigs<P = IReportBaseProps> extends ModalFormProps {
  title: string;
  iconId: string;
  ModalChildren: React.FC<P> | React.ReactNode;
  modalChildrenProps: P;
  disabled: boolean;
}

export interface IReportResData<DataType = IReportDataBase> {
  dateFrom?: number | Date;
  dateTo?: number | Date;
  data: DataType[];
}

export interface IReportReqData {
  dateFrom?: number | Date;
  dateTo?: number | Date;
  filterConfigs?: FilterReturnDataType;
}

export interface IReportDataBase extends Partial<IBase> {}

export interface IReportDataByCounts extends IReportDataBase {}

export interface IReportDataByCategories extends IReportDataBase {}

export interface IReportDataByActivity extends IReportDataBase {}

export interface IReportDataByContractor extends IReportDataBase {}

export interface IReportDataByProject extends IReportDataBase {}

export interface IReportDataByTags extends IReportDataBase {}
