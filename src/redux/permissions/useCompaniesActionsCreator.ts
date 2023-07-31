import { TableActionCreator } from '../../components/TableList/tableTypes.types';
import { IPermission } from './permissions.types';
import { PermissionService } from '../../hooks/usePermissionsService.hook';
import { useModalProvider } from '../../components/ModalProvider/ModalProvider';
import { useNavigate } from 'react-router-dom';
import { CompanyQueryType } from '../global.types';

export type PermissionsActionsCreator = TableActionCreator<IPermission>;

export type PermissionsActionsType =
  | 'enterCompany'
  | 'editCompany'
  | 'deleteCompany'
  | 'leaveCompany'
  | 'rejectPermission'
  | 'acceptPermission'
  | 'createCompany'
  | 'createPermission'
  | 'deletePermission'
  | 'editPermission';
export const isMyCompany = ({ owner, user }: IPermission) => {
  return user?._id === owner?._id;
};

const usePermissionsActionsCreator = (service: PermissionService, companyType: CompanyQueryType) => {
  const modal = useModalProvider();
  const navigate = useNavigate();

  // return useCallback(
  //   (ctx): (ITableAction & { name?: PermissionsActionsType })[] => {
  //     const selPerm = ctx.selectedRow;
  //     return [
  //       {
  //         name: 'enterCompany',
  //         title: 'Перейти',
  //         icon: 'logIn',
  //         disabled: !ctx.selectedRow?._id,
  //         iconSize: '100%',
  //         type: 'onlyIcon',
  //         onClick: () => {
  //           if (selPerm?._id) {
  //             console.log('selPerm', selPerm);
  //             service.logIn({
  //               data: { _id: selPerm._id },
  //               onSuccess: data => {
  //                 if (!data._id) return console.log('data', data);
  //                 toast.success(`Current company: ${data.company?.name}`);
  //                 navigate(`/app/${data._id}`);
  //               },
  //               onError: error => {
  //                 console.log(error);
  //               },
  //             });
  //           }
  //         },
  //       },
  //       {
  //         name: 'editCompany',
  //         title: 'Редагувати',
  //         icon: 'edit',
  //         disabled: ctx.selectedRow?._id && companyType ? !['own'].includes(companyType) : true,
  //         iconSize: '100%',
  //         type: 'onlyIcon',
  //         onClick: () => {
  //           modal.handleOpenModal({
  //             ModalChildren: ModalForm,
  //             modalChildrenProps: {
  //               fillHeight: true,
  //               title: 'Редагувати компанію',
  //             },
  //           });
  //         },
  //       },
  //       {
  //         name: 'deleteCompany',
  //         title: 'Видалити',
  //         icon: 'delete',
  //         iconSize: '100%',
  //         disabled: ctx.selectedRow?._id && companyType ? !['own'].includes(companyType) : true,
  //         type: 'onlyIcon',
  //         onClick: () => {
  //           console.log('selPermission', selPerm);
  //         },
  //       },
  //       {
  //         name: 'leaveCompany',
  //         title: 'Покинути',
  //         icon: 'logOut',
  //         iconSize: '100%',
  //         disabled: ctx.selectedRow && companyType ? !['invited'].includes(companyType) : true,
  //         type: 'onlyIcon',
  //         onClick: () => {
  //           console.log('selPermission', selPerm);
  //         },
  //       },
  //       { separator: true },
  //       {
  //         name: 'rejectPermission',
  //         title: 'Відхилити',
  //         icon: 'clear',
  //         iconSize: '100%',
  //         type: 'onlyIconFilled',
  //         disabled: ctx.selectedRow?._id && companyType ? !['invites'].includes(companyType) : true,
  //         onClick: () => {
  //           console.log('selPermission', selPerm);
  //         },
  //       },
  //       {
  //         name: 'acceptPermission',
  //         title: 'Прийняти',
  //         icon: 'done',
  //         iconSize: '100%',
  //         type: 'onlyIconFilled',
  //         disabled: ctx.selectedRow?._id && companyType ? !['invites'].includes(companyType) : true,
  //         onClick: () => {
  //           console.log('selPermission', selPerm);
  //         },
  //       },
  //       {
  //         name: 'createCompany',
  //         title: 'Створити компанію',
  //         icon: 'plus',
  //         iconSize: '100%',
  //         type: 'onlyIconFilled',
  //         onClick: () => {
  //           modal.handleOpenModal({
  //             ModalChildren: FormCreateCompany,
  //             modalChildrenProps: {
  //               fillHeight: true,
  //               title: 'Створити компанію',
  //             },
  //           });
  //         },
  //       },
  //     ];
  //   },
  //   [companyType, modal, navigate, service]
  // );
};

export default usePermissionsActionsCreator;
