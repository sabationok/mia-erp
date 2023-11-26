import ModalForm from 'components/ModalForm';
import TableList, { ITableListProps } from 'components/TableList/TableList';
import React from 'react';
import styled from 'styled-components';
import { DirBaseProps } from '../../types/dir.types';

export interface DirDocumentsProps extends DirBaseProps {
  tableSettings?: ITableListProps;
}

const DirDocuments: React.FC<DirDocumentsProps> = ({ tableSettings, ...props }) => {
  return (
    <StModalForm {...props}>
      <TableList {...tableSettings} />
    </StModalForm>
  );
};
const StModalForm = styled(ModalForm)`
  height: 95vh;
  width: 95vw;

  & .modalFooter {
    padding: 8px;
  }

  & .tOverHead {
    padding: 8px;
  }
`;
export default DirDocuments;
