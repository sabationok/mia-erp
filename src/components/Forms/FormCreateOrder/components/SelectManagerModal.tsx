import ModalForm, { ModalFormProps } from '../../../ModalForm';
import { IPermission } from '../../../../redux/permissions/permissions.types';
import { AppSubmitHandler } from '../../../../hooks/useAppForm.hook';
import TableList, { ITableListProps } from '../../../TableList/TableList';
import { usersDirColumns } from '../../../../data/usersDir.data';
import { t } from '../../../../lang';
import { useMemo } from 'react';
import { usePermissionsSelector } from '../../../../redux/selectors.store';

export interface SelectManagerModalProps extends Omit<ModalFormProps, 'onSubmit' | 'onSelect'> {
  onSelect?: (manager: IPermission) => void;
  onSubmit?: AppSubmitHandler<IPermission>;
}

const SelectManagerModal: React.FC<SelectManagerModalProps> = ({ onSubmit, onSelect, onClose, ...p }) => {
  const permissions = usePermissionsSelector().permissions;

  const tableConfigs = useMemo((): ITableListProps<IPermission> => {
    return {
      onRowClick: data => {
        const res = permissions.find(pr => pr._id === data._id);
        res && onSelect && onSelect(res);
      },
    };
  }, [onSelect, permissions]);
  return (
    <ModalForm fitContentH fillHeight onClose={onClose} title={t('Select manager')}>
      <TableList tableTitles={usersDirColumns} {...tableConfigs} />
    </ModalForm>
  );
};
export default SelectManagerModal;
