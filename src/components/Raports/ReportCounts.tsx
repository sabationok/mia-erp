// @flow
import * as React from 'react';
import ReportList from './ReportList';
import styled from 'styled-components';
import ModalForm from '../ModalForm';
import { IReportBaseProps } from './report.types';

export interface IReportCountsProps extends IReportBaseProps {
};
const ReportCounts: React.FC<IReportCountsProps> = ({ ...props }) => {
  return (
    <ModalForm {...props}>
      <Box>
        <ReportList />
      </Box>
    </ModalForm>
  );
};
const Box = styled.div`
  display: flex;
  flex-direction: column;
`;
export default ReportCounts;