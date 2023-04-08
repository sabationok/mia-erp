import { CellTittleProps } from 'components/TableList/TebleCells/CellTitle';
import { IUser } from 'redux/auth/auth.slice';

export const usersDirColumns: CellTittleProps[] = [
  {
    top: { name: 'ПІП', dataKey: 'fullName', uppercase: false },
    bottom: { name: 'Роль', dataKey: 'permission', nestedDataKey: 'label' },
    width: '200px',
    action: 'cellDbl',
  },
  {
    top: { name: 'Електронна пошта', dataKey: 'email', uppercase: false },
    bottom: { name: 'Номер телефону', dataKey: 'phone' },
    width: '190px',
    action: 'contacts',
  },
  {
    top: { name: 'Локація', dataKey: 'fullLocation' },
    width: '170px',
    action: 'cellDbl',
  },
  {
    top: { name: 'Коментар', dataKey: 'descr' },
    width: '170px',
    action: 'cellDbl',
  },
  {
    top: { name: 'Створено', align: 'center', dataKey: 'createdAt' },
    bottom: { name: 'Оновлено', align: 'center', dataKey: 'updatedAt' },
    width: '150px',
    action: 'dateSimple',
  },
];

export const usersMockData: Partial<IUser> & any[] = [{
  _id: 'sfbvssdgbdfg',
  name: 'Петро',
  fullName: 'Петро Васильович Галайко',
  email: 'petro@mail.com',
  phone: '+3806768923156',
  permission: { label: 'Адмін' },
}];
