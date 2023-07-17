import ModalForm from 'components/ModalForm';
import TableList, { ITableListProps } from 'components/TableList/TableList';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { DirBaseProps } from '../Directories/dir.types';
import usePermissionsServiceHook, { usePermissionsSelector } from '../../redux/permissions/usePermissionsService.hook';
import { IPermission } from '../../redux/permissions/permissions.types';

export interface DirUsersProps extends DirBaseProps {
  tableSettings?: ITableListProps;
  getTableSettings?: () => ITableListProps<IPermission>;
}

const DirUsers: React.FC<DirUsersProps> = ({ getTableSettings, ...props }) => {
  const permissionService = usePermissionsServiceHook();
  const { getAllByCompanyId } = permissionService;
  const tableData = usePermissionsSelector().permissions;

  const tableSettingsMemo = useMemo(() => (getTableSettings ? getTableSettings() : {}), [getTableSettings]);
  return (
    <StModalForm fitContentH fillHeight footer={false} {...props}>
      <TableList {...tableSettingsMemo} tableData={tableData} />
    </StModalForm>
  );
};
const StModalForm = styled(ModalForm)`
  & .modalFooter {
    padding: 8px;
  }

  & .tOverHead {
    padding: 8px;
  }
`;
export default DirUsers;
