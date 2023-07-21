import { CellTittleProps } from 'components/TableList/TebleCells/CellTitle';
import { ISystemRole, IUser } from 'redux/auth/auth.types';
import { karina_avatar } from '../img';

export const testUserKarinaSystemRole: ISystemRole = {
  _id: 'sd6f51b6sd5f1b6sd5fgb16sd5',
  label: 'Адміністратор',
  name: 'ADMIN',
  actions: [],
};
export const testUserKarina: IUser = {
  _id: 'sdth651g6sdfbdb5fg16d',
  name: 'Каріна Дизайнівна Дизайнер',
  email: 'karina.des@mail.com',
  avatarURL: karina_avatar,
  sysRole: testUserKarinaSystemRole,
};
export const usersDirColumns: CellTittleProps[] = [
  {
    top: { name: 'ПІП', path: 'user.name' },
    bottom: { name: 'Роль', path: 'role.label' },
    width: '250px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Електронна пошта', path: 'user.email', uppercase: false },
    bottom: { name: 'Номер телефону', path: 'user.phone' },
    width: '210px',
    action: 'contacts',
  },
  {
    top: { name: 'Роль', path: 'role.label', uppercase: false },
    bottom: { name: 'Коментар', path: 'role.description' },
    width: '210px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Локація', path: 'user.fullLocation' },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Коментар', path: 'description' },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Створено', align: 'center', path: 'createdAt' },
    bottom: { name: 'Оновлено', align: 'center', path: 'updatedAt' },
    width: '150px',
    action: 'dateSimple',
  },
];

export const usersMockData: Partial<IUser> & any[] = [
  {
    _id: 'sfbvssdgbdfg',
    name: 'Петро',
    fullName: 'Петро Васильович Галайко',
    email: 'petro@mail.com',
    phone: '+3806768923156',
    permission: { label: 'Адмін' },
  },
];
