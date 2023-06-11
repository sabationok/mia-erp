import { TableActionCreator } from '../../components/TableList/tableTypes.types';
import { IPermission } from './permissions.types';
import { useCallback } from 'react';
import { PermissionService } from './usePermissionsService.hook';
import { useModalProvider } from '../../components/ModalProvider/ModalProvider';
import ModalForm from '../../components/ModalForm';
import { useNavigate } from 'react-router-dom';
import { CompanyQueryType } from '../global.types';
import { toast } from 'react-toastify';
import { CompaniesService } from '../companies/useCompaniesService';

export type PermissionsActionsCreator = TableActionCreator<IPermission>;

export const isMyCompany = ({ owner, user }: IPermission) => {
  return user?._id === owner?._id;
};

const usePermissionsActionsCreator = (
  services: {
    permissionsService: PermissionService;
    companiesService?: CompaniesService;
  },
  companyType: CompanyQueryType
): PermissionsActionsCreator => {
  const modal = useModalProvider();
  const navigate = useNavigate();
  const service = services.permissionsService;
  const companiesService = services.companiesService;

  return useCallback(
    ctx => {
      const selPerm = ctx.selectedRow;
      return [
        {
          name: 'selectPermission',
          title: 'Перейти',
          icon: 'openInNew',
          disabled: !ctx.selectedRow?._id,
          iconSize: '100%',
          type: 'onlyIcon',
          onClick: () => {
            if (selPerm?._id) {
              service.getCurrent({
                data: { id: selPerm?._id },
                onSuccess: data => {
                  if (!data._id) return console.log('data', data);
                  console.log('getCurrentPermission Success', data);
                  toast.success(`Current company: ${data.company?.name}`);
                  navigate(`/app/${data._id}`);
                },
                onError: error => {
                  console.log(error);
                },
              });
            }
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
      ];
    },
    [companyType, modal, navigate, service]
  );
};

export default usePermissionsActionsCreator;
