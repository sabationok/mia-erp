import React from 'react';
import ModalForm from 'components/ModalForm';

import styled from 'styled-components';
import TableList from 'components/TableList/TableList';
import { DirTableCompProps } from './DirTableComp';

export interface DirProjectsProps extends DirTableCompProps {}

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
