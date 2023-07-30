import DirUsers, { DirUsersProps } from '../components/CompanySettings/DirUsers';
import { usersDirColumns } from './usersDir.data';

import DirCustomRoles, { DirCustomRolesProps } from '../components/CompanySettings/DirCustomRoles';
import { IDirectory } from './directories.data';
import { ApiDirType } from '../redux/APP_CONFIGS';
import { iconId } from '../img/sprite';
import FormCreateCustomRole from '../components/Forms/FormCreateCustomRole';
import ModalForm from '../components/ModalForm';

const UsersProps: DirUsersProps = {
  title: 'Користувачі',
  getTableSettings: () => ({
    tableTitles: usersDirColumns,
  }),
};
const CustomRolesProps: DirCustomRolesProps = {
  title: 'Ролі',
  dirType: ApiDirType.DEFAULT,
  createParentTitle: 'Створити роль',
  fillHeight: true,
  actionsCreator: ({ service, modalService, findById }) => ({
    onUpdateItem: id => {
      const modal = modalService.handleOpenModal({
        ModalChildren: FormCreateCustomRole,
        modalChildrenProps: {
          title: 'Редагувати роль',
          customRole: findById ? findById(id) : undefined,
          onSubmit: data => {
            service.edit &&
              service.edit({
                data,
                onSuccess: () => {
                  modal?.onClose();
                },
              });
          },
        },
      });
    },
    onCreateParent: () => {
      const modal = modalService.handleOpenModal({
        ModalChildren: FormCreateCustomRole,
        modalChildrenProps: {
          title: 'Створити роль',
          onSubmit: data => {
            service.create({
              data,
              onSuccess: () => {
                modal?.onClose();
              },
            });
          },
        },
      });
    },
    onChangeArchiveStatus: () => {},
  }),
};
// const paymentMethodsProps: DirPaymentMethodsProps = {
//   title: 'Способи оплати',
//   dirType: ApiDirType.METHODS_PAYMENT,
//   createParentTitle: 'Створити спосіб оплати',
//   fillHeight: true,
//   actionsCreator: ({ service, modalService, dirType }) => ({
//     onCreateParent: () => {
//       modalService.handleOpenModal({
//         ModalChildren: FormCreatePaymentMethod,
//         modalChildrenProps: {
//           title: 'Створити спосіб оплати',
//           onSubmit: data => {
//             console.log('paymentMethodsProps submit data', data);
//
//             service.create({
//               data: { data, dirType },
//               onSuccess: rd => {
//                 console.log('New payment method created');
//               },
//             });
//           },
//         },
//       });
//     },
//   }),
// };
// const paymentMethods = {
//   title: paymentMethodsProps.title,
//   disabled: true,
//   iconId: iconId.bank,
//   ModalChildren: DirPaymentMethods,
//   modalChildrenProps: paymentMethodsProps,
// };
// const shipmentMethodsProps: DirPaymentMethodsProps = {
//   title: 'Способи відвантажень',
//   dirType: ApiDirType.METHODS_SHIPMENT as any,
//   createParentTitle: 'Створити спосіб відвантаження',
//   fillHeight: true,
//   actionsCreator: () => ({}),
// };
// const shipmentMethods: any = {
//   title: shipmentMethodsProps.title,
//   dirType: ApiDirType.METHODS_SHIPMENT,
//   createParentTitle: shipmentMethodsProps.createParentTitle,
//   ModalChildren: DirTreeComp,
//   modalChildrenProps: shipmentMethodsProps,
// };
const subCompanies = {
  title: 'Дочірні компанії',
  disabled: true,
  iconId: iconId.bank,
  ModalChildren: ModalForm,
  modalChildrenProps: {
    title: 'Дочірні компанії',
    fillHeight: true,
    fillWidth: true,
  },
};
export const comapnySettings: IDirectory[] = [
  subCompanies,
  {
    title: UsersProps.title,
    iconId: iconId.persons,
    ModalChildren: DirUsers,
    modalChildrenProps: UsersProps,
    disabled: true,
  },
  {
    title: CustomRolesProps.title,
    iconId: iconId.lockPerson,
    ModalChildren: DirCustomRoles,
    modalChildrenProps: CustomRolesProps,
    disabled: true,
  },
];
