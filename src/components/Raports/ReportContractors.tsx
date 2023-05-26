import ModalForm from 'components/ModalForm';
import { IReportBaseProps } from './report.types';
import TableList, { ITableListProps } from '../TableList/TableList';
import { useMemo } from 'react';
import { IReportDataByContractor } from 'redux/reports/reports.types';

export interface IReportContractorsProps extends IReportBaseProps<IReportDataByContractor> {}

const ReportContractors: React.FC<IReportContractorsProps> = ({ tableConfigs, ...props }) => {
  const tableConfig = useMemo((): ITableListProps<IReportDataByContractor> => ({ ...tableConfigs }), [tableConfigs]);

  return (
    <ModalForm {...props}>
      <TableList {...tableConfig} />
    </ModalForm>
  );
};
export default ReportContractors;
