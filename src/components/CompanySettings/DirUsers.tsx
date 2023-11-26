import ModalForm from 'components/ModalForm';
import TableList, { ITableListProps } from 'components/TableList/TableList';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { DirBaseProps } from '../../types/dir.types';
import usePermissionsServiceHook, {
  PermissionService,
  usePermissionsSelector,
} from '../../hooks/usePermissionsService.hook';
import { IPermission } from '../../types/permissions.types';
import { IModalProviderContext, useModalProvider } from '../ModalProvider/ModalProvider';
import { ToastService } from '../../services';

export interface DirUsersProps extends DirBaseProps {
  getTableSettings: (options: {
    modalService: IModalProviderContext;
    service: PermissionService;
  }) => ITableListProps<IPermission>;
}

const DirUsers: React.FC<DirUsersProps> = ({ getTableSettings, ...props }) => {
  const service = usePermissionsServiceHook();
  const modalService = useModalProvider();
  const { getAllByCompanyId } = service;
  const tableData = usePermissionsSelector().users;
  const [isLoading, setIsLoading] = useState(false);

  const tableSettingsMemo = useMemo(
    (): ITableListProps => ({ ...getTableSettings({ service, modalService }) }),
    [getTableSettings, modalService, service]
  );

  useEffect(() => {
    getAllByCompanyId({
      onLoading: setIsLoading,
      onSuccess: data => {
        ToastService.info(`Found users: ${data.length}`);
      },
      onError: () => {},
    });
  }, [getAllByCompanyId]);

  return (
    <StModalForm fitContentH fillHeight footer={false} {...props}>
      <TableList {...tableSettingsMemo} tableData={tableData} isLoading={isLoading} />
    </StModalForm>
  );
};
const StModalForm = styled(ModalForm)`
  & .modalFooter {
    padding: 8px;
  }
`;
export default DirUsers;
