import ModalForm from 'components/ModalForm';
import TableList, { ITableListProps } from 'components/TableList/TableList';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { DirBaseProps } from '../Directories/dir.types';
import usePermissionsServiceHook, {
  PermissionService,
  usePermissionsSelector,
} from '../../hooks/usePermissionsService.hook';
import { IPermission } from '../../redux/permissions/permissions.types';
import AppLoader from '../atoms/AppLoader';
import { IModalProviderContext, useModalProvider } from '../ModalProvider/ModalProvider';

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
  const tableData = usePermissionsSelector().permissions;
  const [isLoading, setIsLoading] = useState(false);

  const tableSettingsMemo = useMemo(
    (): ITableListProps => ({ ...getTableSettings({ service, modalService }) }),
    [getTableSettings, modalService, service]
  );

  useEffect(() => {
    (async () => {
      await getAllByCompanyId({
        onSuccess: data => {},
        onError: () => {},
        onLoading: setIsLoading,
      });
    })();
  }, [getAllByCompanyId]);

  return (
    <>
      <StModalForm fitContentH fillHeight footer={false} {...props}>
        <TableList {...tableSettingsMemo} tableData={tableData} isLoading={isLoading} />
      </StModalForm>

      <AppLoader isLoading={isLoading} />
    </>
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
