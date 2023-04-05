import React from 'react';
import ModalForm, { ModalFormProps } from 'components/ModalForm/ModalForm';

import styled from 'styled-components';
import TableList from 'components/TableList/TableList';

export interface DirProjectsProps extends ModalFormProps {
  title: string;
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
  height: 95vh;
  width: 95vw;

  & .modalFooter {
    padding: 8px;
  }
`;
const Box = styled.div`
  height: 100%;

  & .tOverHead {
    padding: 8px;
  }
`;

export default DirProjects;
