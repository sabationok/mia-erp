import React from 'react';
import ModalForm from 'components/ModalForm';

import styled from 'styled-components';
import TableList from 'components/TableList/TableList';
import { DirBaseProps } from '../dir.types';

export interface DirProjectsProps extends DirBaseProps {}

const DirProjects: React.FC<DirProjectsProps> = props => {
  return (
    <StModalForm {...props}>
      <TableList
        {...{
          tableData: [],
          tableTitles: [],
          tableSearchParams: [],
          tableSortParams: [],
        }}
      />
    </StModalForm>
  );
};

const StModalForm = styled(ModalForm)`
  width: max-content;
`;


export default DirProjects;
