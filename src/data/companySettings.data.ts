import DirUsers, { DirUsersProps } from '../components/CompanySettings/DirUsers';
import { usersDirColumns } from './usersDir.data';

import DirCustomRoles, { DirCustomRolesProps } from '../components/CompanySettings/DirCustomRoles';
import { getDirInTreeActionsCreator, IDirectory } from './directories.data';
import { ApiDirType } from '../redux/APP_CONFIGS';
import { iconId } from '../img/sprite';
import FormCreateCustomRole from '../components/Forms/FormCreateCustomRole';
import ModalForm from '../components/ModalForm';
import DirMethods from '../components/CompanySettings/DirMethods';
import { Modals } from '../components/ModalProvider/Modals';

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
      console.log(findById ? findById(id) : undefined);
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
const subCompanies = {
  title: 'Дочірні компанії',
  disabled: true,
  ModalChildren: ModalForm,
  iconId: iconId.bank,
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
  {
    title: 'Способи оплати',
    iconId: iconId.persons,
    ModalChildren: DirMethods,
    modalChildrenProps: {
      dirType: ApiDirType.METHODS_PAYMENT,
      createParentTitle: 'Додати спосіб оплати',
      availableLevels: 1,
      actionsCreator: getDirInTreeActionsCreator(Modals.FormCreateMethod),
    },
    disabled: true,
  },
  {
    title: 'Способи відвантаження',
    iconId: iconId.persons,
    ModalChildren: DirMethods,
    modalChildrenProps: {
      dirType: ApiDirType.METHODS_SHIPMENT,
      createParentTitle: 'Додати спосіб відвантаження',
      availableLevels: 1,
      actionsCreator: getDirInTreeActionsCreator(Modals.FormCreateMethod),
    },
    disabled: true,
  },
  {
    title: "Способи зв'язку",
    iconId: iconId.persons,
    ModalChildren: DirMethods,
    modalChildrenProps: {
      dirType: ApiDirType.METHODS_COMMUNICATION,
      createParentTitle: 'Додати спосіб комунікації',
      availableLevels: 1,
      actionsCreator: getDirInTreeActionsCreator(Modals.FormCreateMethod, 'Додати спосіб комунікації'),
    },
    disabled: true,
  },
];
// {
//   title: 'Способи оплати',
//     disabled: true,
//   modalChildrenProps: {
//   dirType: ApiDirType.METHODS_PAYMENT,
// },
// },
// {
//   title: 'Способи відвантажень',
//     disabled: true,
//   modalChildrenProps: {
//   dirType: ApiDirType.METHODS_SHIPMENT,
// },
// },
