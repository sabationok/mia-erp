import DirUsers, { DirUsersProps } from '../components/CompanySettings/DirUsers';
import { usersDirColumns } from './usersDir.data';
import { iconId } from '../img/sprite';
import DirCustomRoles, { DirCustomRolesProps } from '../components/CompanySettings/DirCustomRoles';
import { IDirectory } from './directories.data';
import { ApiDirType } from '../redux/APP_CONFIGS';

const UsersProps: DirUsersProps = {
  title: 'Користувачі',
  getTableSettings: () => ({
    tableTitles: usersDirColumns,
  }),
};
const CustomRolesProps: DirCustomRolesProps = {
  title: 'Ролі',
  dirType: ApiDirType.TYPE,
  createParentTitle: 'createRole',
  actionsCreator: () => ({
    onCreateParent: () => {},
    onUpdateItem: () => {},
    onChangeArchiveStatus: () => {},
  }),
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
