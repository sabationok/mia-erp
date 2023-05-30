import { TableActionCreator } from '../../components/TableList/tableTypes.types';
import { IPermission } from './permissions.types';
import { useCallback } from 'react';
import { PermissionService } from './usePermissionsService.hook';
import { useModalProvider } from '../../components/ModalProvider/ModalProvider';
import ModalForm from '../../components/ModalForm';
import { useNavigate } from 'react-router-dom';
import { CompanyQueryType } from '../global.types';

export type PermissionsActionsCreator = TableActionCreator<IPermission>;

export const isMyCompany = ({ owner, user }: IPermission) => {
  return user._id === owner?._id;
};

const usePermissionsActionsCreator = (
  service: PermissionService,
  companyType?: CompanyQueryType
): PermissionsActionsCreator => {
  const modal = useModalProvider();
  const navigate = useNavigate();

  return useCallback(
    ctx => [
      {
        name: 'selectPermission',
        title: 'Перейти',
        icon: 'openInNew',
        disabled: !ctx.selectedRow?._id,
        iconSize: '100%',
        type: 'onlyIcon',
        onClick: () => {
          const selPerm = ctx.selectedRow;
          console.log('selPermission', selPerm);
          console.log('companyType', { companyType });
          ctx.selectedRow?._id && navigate(`/app/${ctx.selectedRow?._id}`);
        },
      },
      {
        name: 'editPermission',
        title: 'Редагувати',
        icon: 'edit',
        disabled: ctx.selectedRow?._id && companyType ? !['own'].includes(companyType) : true,
        iconSize: '100%',
        type: 'onlyIcon',
        onClick: () => {
          const selPerm = ctx.selectedRow;
          console.log('selPermission', selPerm);

          modal.handleOpenModal({
            ModalChildren: ModalForm,
            modalChildrenProps: {
              fillHeight: true,
              title: 'Редагувати компанію',
            },
          });
        },
      },
      {
        name: 'deletePermission',
        title: 'Видалити',
        icon: 'delete',
        iconSize: '100%',
        disabled: ctx.selectedRow?._id && companyType ? !['own'].includes(companyType) : true,
        type: 'onlyIcon',
        onClick: () => {
          const selPerm = ctx.selectedRow;
          console.log('selPermission', selPerm);
        },
      },
      {
        name: 'leavePermission',
        title: 'Покинути',
        icon: 'logOut',
        iconSize: '100%',
        disabled: ctx.selectedRow && companyType ? !['invited'].includes(companyType) : true,
        type: 'onlyIcon',
        onClick: () => {
          const selPerm = ctx.selectedRow;
          console.log('selPermission', selPerm);
        },
      },
      { separator: true },
      {
        name: 'rejectPermission',
        title: 'Відхилити',
        icon: 'clear',
        iconSize: '100%',
        type: 'onlyIconFilled',
        disabled: ctx.selectedRow?._id && companyType ? !['invites'].includes(companyType) : true,
        onClick: () => {
          const selPerm = ctx.selectedRow;
          console.log('selPermission', selPerm);
        },
      },
      {
        name: 'acceptPermission',
        title: 'Прийняти',
        icon: 'done',
        iconSize: '100%',
        type: 'onlyIconFilled',
        disabled: ctx.selectedRow?._id && companyType ? !['invites'].includes(companyType) : true,
        onClick: () => {
          const selPerm = ctx.selectedRow;
          console.log('selPermission', selPerm);
        },
      },
      {
        name: 'createPermission',
        title: 'Створити',
        icon: 'plus',
        iconSize: '100%',
        type: 'onlyIconFilled',
        onClick: () => {
          modal.handleOpenModal({
            ModalChildren: ModalForm,
            modalChildrenProps: {
              fillHeight: true,
              title: 'Створити нову компанію',
            },
          });
        },
      },
    ],
    [companyType, modal, navigate]
  );
};

export default usePermissionsActionsCreator;
