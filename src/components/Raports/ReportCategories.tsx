// @flow
import * as React from 'react';
import ReportList from './ReportList';
import styled from 'styled-components';
import ModalForm from '../ModalForm/ModalForm';
import { IReportBaseProps } from './report.types';

export interface IReportCategoriesProps extends IReportBaseProps {
};
const ReportCategories: React.FC<IReportCategoriesProps> = (props) => {
  return (
    <ModalForm>
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
export default ReportCategories;