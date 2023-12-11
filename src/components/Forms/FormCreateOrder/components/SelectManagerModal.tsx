import ModalForm, { ModalFormProps } from '../../../ModalForm';
import { IPermission, PermissionRecipientEnum } from '../../../../types/permissions.types';
import { AppSubmitHandler } from '../../../../hooks/useAppForm.hook';
import TableList, { ITableListProps } from '../../../TableList/TableList';
import { usersDirColumns } from '../../../../data/usersDir.data';
import { t } from '../../../../lang';
import { useMemo, useState } from 'react';
import { usePermissionsSelector } from '../../../../redux/selectors.store';
import { useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { AppModuleName } from '../../../../redux/reduxTypes.types';

export interface SelectManagerModalProps extends Omit<ModalFormProps, 'onSubmit' | 'onSelect'> {
  onSelect?: (manager: IPermission) => void;
  onSubmit?: AppSubmitHandler<IPermission>;
}

const SelectManagerModal: React.FC<SelectManagerModalProps> = ({ onSubmit, onSelect, onClose, ...p }) => {
  const { users, permission } = usePermissionsSelector();
  const service = useAppServiceProvider()[AppModuleName.permissions];

  const [isLoading] = useState(false);

  const tableConfigs = useMemo((): ITableListProps<IPermission> => {
    return {
      tableData: users.filter(el => !el.integration),
      onRowClick: data => {
        const res = users.find(pr => pr._id === data?._id);
        res && onSelect && onSelect(res);
      },
      actionsCreator: ctx => {
        return [
          {
            name: 'refresh',
            icon: 'refresh',
            onClick: () => {
              permission.company?._id &&
                service.getAllByCompanyId({
                  data: { _id: permission.company?._id, params: { recipient: PermissionRecipientEnum.user } },
                });
            },
          },
        ];
      },
    };
  }, [onSelect, users]);

  return (
    <ModalForm fillWidth fillHeight onClose={onClose} title={t('Select manager')}>
      <TableList tableTitles={usersDirColumns} {...tableConfigs} isSearch={false} isLoading={isLoading} />
    </ModalForm>
  );
};
export default SelectManagerModal;
