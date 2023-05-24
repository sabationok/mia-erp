// @flow
import * as React from 'react';
import ReportList from './ReportList';
import ModalForm from '../ModalForm';
import { IReportBaseProps } from './report.types';
import FlexBox from '../atoms/FlexBox';

export interface IReportCountsProps extends IReportBaseProps {}

const ReportCounts: React.FC<IReportCountsProps> = ({ ...props }) => {
  return (
    <ModalForm {...props}>
      <FlexBox>
        <ReportList />
      </FlexBox>
    </ModalForm>
  );
};

export default ReportCounts;
