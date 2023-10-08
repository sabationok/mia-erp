import { IContractor } from '../redux/directories/contractors.types';
import { CellTittleProps } from '../components/TableList/TebleCells/CellTitle';
import { SelectItem } from '../components/TableList/tableTypes.types';
import t from '../lang';
import { ICounterparty } from '../redux/directories/counterparties.types';

export const contractorsColumns: CellTittleProps<IContractor>[] = [
  {
    top: { name: 'Назва', path: 'label', getData: d => d?.label || `${d?.name || ''} ${d?.secondName || ''}` },
    bottom: { name: 'ІПН/ЄДРПОУ', path: 'taxCode' },
    width: '240px',
    action: 'doubleDataWithAvatar',
  },
  {
    top: { name: 'Тип', path: 'type', getData: d => t(d.type) },
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

export const contractorsSearchParams: SelectItem[] = [
  {
    label: "Ім'я",
    dataPath: 'name',
  },
  {
    label: 'Телефон',
    dataPath: 'phone',
  },
  {
    label: 'Емейл',
    dataPath: 'email',
  },
  {
    label: 'Коментар',
    dataPath: 'comment',
  },
  {
    label: 'Теги',
    dataPath: 'tags',
  },
];
export const counterpartyColumns: CellTittleProps<ICounterparty>[] = [
  {
    top: { name: 'Назва', path: 'label', getData: d => d?.label || `${d?.name || ''} ${d?.secondName || ''}` },
    bottom: { name: 'ІПН/ЄДРПОУ', path: 'taxCode' },
    width: '240px',
    action: 'doubleDataWithAvatar',
  },
  {
    top: { name: 'Тип', path: 'type', getData: d => t(d.type) },
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
