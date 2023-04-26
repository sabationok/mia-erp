import React from 'react';
import ModalForm from 'components/ModalForm/ModalForm';

import styled from 'styled-components';
import TableList from 'components/TableList/TableList';
import { DirBaseProps } from '../dir.types';

export interface DirProjectsProps extends DirBaseProps {

}

const DirProjects: React.FC<DirProjectsProps> = props => {
  return (
    <StModalForm {...props}>
      <Box>
        <TableList
          {...{
            tableData: [],
            tableTitles: [],
            tableSearchParams: [],
            tableSortParams: [],
          }}
        />
      </Box>
    </StModalForm>
  );
};

const StModalForm = styled(ModalForm)`
  width: max-content;
`;
const Box = styled.div`
  height: 100%;

`;

export default DirProjects;
