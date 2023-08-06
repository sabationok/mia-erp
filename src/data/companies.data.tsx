import { CellTittleProps } from 'components/TableList/TebleCells/CellTitle';
import { SelectItem } from '../components/TableList/TableList';
import t from '../lang';
import { ICompany, OwnershipTypeEnum } from '../redux/companies/companies.types';
import { enumToFilterOptions } from '../utils/fabrics';

export const ownershipTypeFilterOptions = enumToFilterOptions(OwnershipTypeEnum);

export const companiesTableColumns: CellTittleProps<ICompany>[] = [
  {
    top: { name: 'Назва', align: 'start', path: 'company.name' },
    bottom: { name: 'Тип', align: 'start', path: 'company.taxCode', getData: rd => rd.businessSubjectType },
    width: '200px',
    action: 'valueByPath',
  },
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
  { label: t('date'), dataPath: 'eventDate', filter: false, search: false, sort: true },
  { label: t('createdAt'), dataPath: 'createdAt', filter: false, search: false, sort: true },
  { label: t('updateAt'), dataPath: 'updateAt', filter: false, search: false, sort: true },
  { label: t('countIn'), dataPath: 'countIn', filter: false, search: true, sort: true },
  { label: t('subCountIn'), dataPath: 'subCountIn', filter: false, search: true, sort: true },
  { label: t('countOut'), dataPath: 'countOut', filter: false, search: true, sort: true },
  { label: t('subCountOut'), dataPath: 'subCountOut', filter: false, search: true, sort: true },
  { label: t('category'), dataPath: 'category', filter: false, search: true, sort: true },
  { label: t('subCategory'), dataPath: 'subCategory', filter: false, search: true, sort: true },
  { label: t('amount'), dataPath: 'amount', filter: false, search: true, sort: true },
  { label: t('contractor'), dataPath: 'contractor', filter: false, search: true, sort: true },
  { label: t('document'), dataPath: 'document', filter: false, search: true, sort: true },
  { label: t('project'), dataPath: 'project', filter: false, search: true, sort: true },
  { label: t('mark'), dataPath: 'mark', filter: false, search: true, sort: true },
  { label: t('status'), dataPath: 'status', filter: false, search: true, sort: true },
];
