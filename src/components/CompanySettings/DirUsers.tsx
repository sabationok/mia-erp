import ModalForm, { ModalFormProps } from 'components/ModalForm';
import TableList, { ITableListProps } from 'components/TableList/TableList';
import React from 'react';
import styled from 'styled-components';

export interface DirUsersProps extends ModalFormProps {
  title: string;
  tableSettings?: ITableListProps;
}

const DirUsers: React.FC<DirUsersProps> = ({ tableSettings, ...props }) => {
  return (
    <StModalForm footer={false} {...props}>
      <TableList {...tableSettings} />
    </StModalForm>
  );
};
const StModalForm = styled(ModalForm)`
  width: max-content;
  height: 98vh;
  & .modalFooter {
    padding: 8px;
  }

  & .tOverHead {
    padding: 8px;
  }
`;
export default DirUsers;
