import { CellTittleProps } from '../components/TableList/TebleCells/CellTitle';
import { CustomerEntity } from '../types/customers.types';
import { t } from '../lang';

export const customersColumns: CellTittleProps<CustomerEntity>[] = [
  {
    top: {
      name: `${t('label')}/${t('name')}`,
      getData: d => {
        const entry = d.label ?? d.name;

        return entry
          ? Object.values(entry)
              .map(value => value ?? '')
              .join(' ')
          : '---';
      },
    },
    bottom: { name: 'ІПН/ЄДРПОУ', getData: d => (d.taxCode?.personal || '---') + '/' + (d.taxCode?.corp || '---') },
    width: '240px',
    action: 'doubleDataWithAvatar',
  },
  {
    top: { name: 'Тип', getData: d => d?.type },
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
