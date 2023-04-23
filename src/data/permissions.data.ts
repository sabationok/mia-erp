import { CellTittleProps } from '../components/TableList/TebleCells/CellTitle';
import { SelectItem } from '../components/TableList/TableList';

export const permissionsTableColumns: CellTittleProps[] = [
  {
    top: { name: 'Назва', align: 'start', path: 'company.name' },
    bottom: { name: 'ІПН/ЄДРПОУ', align: 'start', path: 'company.taxCode' },
    width: '200px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Роль', align: 'start', path: 'role.label' },
    bottom: { name: 'Опис', align: 'start', path: 'role.descr' },
    width: '160px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Власник', align: 'start', path: 'company.owner.name' },
    bottom: { name: 'Емейл', align: 'start', path: 'company.owner.email' },
    width: '280px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Локація', align: 'start', path: 'location' },
    width: '250px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Емейл', align: 'start', path: 'company.email' },
    bottom: { name: 'Телефон', align: 'start', path: 'company.phone' },
    width: '210px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Створено', align: 'center', dataKey: 'createdAt' },
    bottom: { name: 'Оновлено', align: 'center', dataKey: 'updatedAt' },
    width: '150px',
    action: 'dateSimple',
  },
];
export const permissionsSearchParams: SelectItem[] = [
  { label: 'Назва', dataPath: 'company.name', filter: false, search: false, sort: true },
  { label: 'ІПН/ЄДРПОУ', dataPath: 'company.taxCode', filter: false, search: false, sort: true },
  { label: 'Роль', dataPath: 'role.label', filter: false, search: false, sort: true },
  { label: 'Власник', dataPath: 'company.owner.name', filter: false, search: true, sort: true },
  { label: 'Емейл', dataPath: 'company.email', filter: false, search: true, sort: true },
  { label: 'Телефон', dataPath: 'company.phone', filter: false, search: true, sort: true },
];