import ModalForm from 'components/ModalForm';
import { IReportBaseProps } from './report.types';
import TableList, { ITableListProps } from '../TableList/TableList';
import { useMemo } from 'react';
import { IReportDataByProject } from 'redux/reports/reports.types';

export interface IReportProjectsProps extends IReportBaseProps<IReportDataByProject> {}

const ReportProjects: React.FC<IReportProjectsProps> = ({ tableConfigs, ...props }) => {
  const tableConfig = useMemo((): ITableListProps<IReportDataByProject> => ({ ...tableConfigs }), [tableConfigs]);

  return (
    <ModalForm {...props}>
      <TableList {...tableConfig} />
    </ModalForm>
  );
};
export default ReportProjects;
