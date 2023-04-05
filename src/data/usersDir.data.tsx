import { CellTittleProps } from 'components/TableList/TebleCells/CellTitle';
import { IUser } from 'redux/auth/auth.slice';

export const usersDirColumns: CellTittleProps[] = [
  {
    top: { name: 'ПІП', dataKey: 'fullName' },
    bottom: { name: 'Роль', dataKey: 'permission', nestedDataKey: 'label' },
    width: '200px',
    action: 'cellDbl',
  },
  {
    top: { name: 'Електронна пошта', dataKey: 'email' },
    bottom: { name: 'Номер телефону', dataKey: 'phone' },
    width: '190px',
    action: 'cellDbl',
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
    top: { name: 'Створено', dataKey: 'email' },
    bottom: { name: 'Оновлено', dataKey: 'phone' },
    width: '150px',
    action: 'cellDbl',
  },
];

export const usersMockData: Partial<IUser>[] = [{ _id: 'sfbvssdgbdfg', name: 'Андрій' }];
