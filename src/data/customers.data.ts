import { CellTittleProps } from '../components/TableList/TebleCells/CellTitle';
import { ICustomer } from '../redux/customers/customers.types';
import { t } from '../lang';

export const customersColumns: CellTittleProps<ICustomer>[] = [
  {
    top: { name: 'Назва', path: 'label', getData: d => d?.label || `${d?.name || ''} ${d?.secondName || ''}` },
    bottom: { name: 'ІПН/ЄДРПОУ', path: 'taxCode' },
    width: '240px',
    action: 'doubleDataWithAvatar',
  },
  {
    top: { name: 'Тип', path: 'type', getData: d => t(`${d?.type}`) },
    bottom: { name: 'Статус', path: 'status' },
    width: '120px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Емейл', path: 'email', uppercase: false },
    bottom: { name: 'Телефон', path: 'phone' },
    width: '170px',
    action: 'contacts',
  },
  {
    top: { name: 'Локація' },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Теги', path: 'tags' },
    width: '200px',
    action: 'tags',
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
