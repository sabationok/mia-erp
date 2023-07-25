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
  dirType: ApiDirType.TYPE,
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
];
