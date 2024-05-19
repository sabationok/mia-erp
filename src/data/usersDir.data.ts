import { CellTittleProps } from 'components/TableList/TebleCells/CellTitle';
import { ISystemRole, UserEntity } from 'types/auth.types';
import { karina_avatar } from '../img';
import { PermissionEntity } from '../types/permissions.types';
import { t } from '../lang';

export const testUserKarinaSystemRole: ISystemRole = {
  _id: 'sd6f51b6sd5f1b6sd5fgb16sd5',
  label: 'Адміністратор',
  name: 'ADMIN',
  actions: [],
};
export const testUserKarina: UserEntity = {
  _id: 'sdth651g6sdfbdb5fg16d',
  name: 'Каріна Дизайнівна Дизайнер',
  email: 'karina.des@mail.com',
  avatarURL: karina_avatar,
  sysRole: testUserKarinaSystemRole,
};
export const usersDirColumns: CellTittleProps<PermissionEntity>[] = [
  {
    top: {
      name: `${t('ПІП')}/${t('Label')}`,
      getData: d =>
        d?.user?.name ? `${d.user.name} ${d.user?.secondName}` : d.integration ? d.integration.label : '--- ---',
    },
    bottom: { name: 'Тип', getData: rd => (rd.user && t('User')) || (rd.integration && t('Integration')) || 'unknown' },
    width: '250px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Роль', path: 'role.label', uppercase: false },
    bottom: { name: 'Статус', path: 'status' },
    width: '210px',
    action: 'valueByPath',
  },
  {
    top: {
      name: 'Електронна пошта',
      path: 'user.email',
      uppercase: false,
      getData: rd => rd?.user?.email || rd?.email,
    },
    bottom: { name: 'Номер телефону', path: 'user.phone' },
    width: '210px',
    action: 'contacts',
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

export const usersMockData: Partial<UserEntity> & any[] = [
  {
    _id: 'sfbvssdgbdfg',
    name: 'Петро',
    fullName: 'Петро Васильович Галайко',
    email: 'petro@mail.com',
    phone: '+3806768923156',
    permission: { label: 'Адмін' },
  },
];
