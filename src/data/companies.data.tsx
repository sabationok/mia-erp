import { CellTittleProps } from 'components/TableList/TebleCells/CellTitle';
import { SelectItem } from '../components/TableList/TableList';
import { selects } from './select.data';

export const companiesTableColumns: CellTittleProps[] = [
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
  { label: 'Дата', dataPath: 'transactionDate', filter: false, search: false, sort: true },
  { label: 'Оновлено', dataPath: 'createdAt', filter: false, search: false, sort: true },
  { label: 'Створено', dataPath: 'updateAt', filter: false, search: false, sort: true },
  { label: selects.countIn.label, dataPath: '', filter: false, search: true, sort: true },
  { label: selects.subCountIn.label, dataPath: '', filter: false, search: true, sort: true },
  { label: selects.countOut.label, dataPath: '', filter: false, search: true, sort: true },
  { label: selects.subCountOut.label, dataPath: '', filter: false, search: true, sort: true },
  { label: selects.category.label, dataPath: '', filter: false, search: true, sort: true },
  { label: selects.subCategory.label, dataPath: '', filter: false, search: true, sort: true },
  { label: 'Сума', dataPath: 'amount', filter: false, search: true, sort: true },
  { label: 'Контрагент', dataPath: 'contractor', filter: false, search: true, sort: true },
  { label: 'Документ', dataPath: 'document', filter: false, search: true, sort: true },
  { label: 'Проєкт', dataPath: 'project', filter: false, search: true, sort: true },
  { label: 'Мітка', dataPath: 'mark', filter: false, search: true, sort: true },
  { label: 'Статус', dataPath: 'status', filter: false, search: true, sort: true },
];
