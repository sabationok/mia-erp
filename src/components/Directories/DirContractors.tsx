import ModalForm from 'components/ModalForm/ModalForm';
import TableList, { ITableListProps } from 'components/TableList/TableList';
import React from 'react';
import styled from 'styled-components';
import { DirBaseProps } from './dir.types';

export interface DirContractorsProps extends DirBaseProps {
  tableSettings?: ITableListProps;
}

const DirContractors: React.FC<DirContractorsProps> = ({ tableSettings, ...props }) => {
  return (
    <StModalForm {...props}>
      <TableList {...tableSettings} />
    </StModalForm>
  );
};
const StModalForm = styled(ModalForm)`
  width: max-content;
  min-height: 50vh;

  & .modalFooter {
    padding: 8px;
  }

  & .tOverHead {
    padding: 8px;
  }
`;
export default DirContractors;
