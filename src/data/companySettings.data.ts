import DirUsers, { DirUsersProps } from '../components/CompanySettings/DirUsers';
import { usersDirColumns, usersMockData } from './usersDir.data';
import { iconId } from '../img/sprite';
import DirCustomRoles, { DirCustomRolesProps } from '../components/CompanySettings/DirCustomRoles/DirCustomRoles';
import { IDirectory } from './directories.data';

const UsersProps: DirUsersProps = {
  title: 'Користувачі',
  tableSettings: {
    tableTitles: usersDirColumns,
    tableData: usersMockData,
  },
};
const CustomRolesProps: DirCustomRolesProps = {
  title: 'Ролі',
};

export const comapnySettings: IDirectory[] = [
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