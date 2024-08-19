import { CellTittleProps } from 'components/TableList/TebleCells/CellTitle';
import { t } from '../lang';
import { BusinessSubjectTypeEnum, CompanyEntity, OwnershipTypeEnum } from '../types/companies/companies.types';
import { enumToFilterOptions } from '../utils';
import { TableSearchParam, TableSortParam } from '../components/TableList/tableTypes.types';

export const ownershipTypeFilterOptions = enumToFilterOptions(OwnershipTypeEnum);
export const businessSubjectTypeFilterOptions = enumToFilterOptions(BusinessSubjectTypeEnum);
export const companiesTableColumns: CellTittleProps<CompanyEntity>[] = [
  {
    top: {
      name: 'Назва',
      // getData: rd => (rd.name ? `${rd.name} ${rd.fullName || ''}` : `${rd.fullLabel}`),
    },
    bottom: {
      name: 'Тип',

      path: 'company.taxCode',
      getData: rd => (rd.businessSubjectType ? t(rd.businessSubjectType) : rd.businessSubjectType),
    },
    width: '200px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Назва', path: 'company.name' },
    bottom: { name: 'ІПН/ЄДРПОУ', path: 'company.taxCode' },
    width: '200px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Роль', path: 'role.label' },
    bottom: { name: 'Опис', path: 'role.descr' },
    width: '160px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Власник', path: 'company.owner.name' },
    bottom: { name: 'Емейл', path: 'company.owner.email' },
    width: '280px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Локація', path: 'location' },
    width: '250px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Емейл', path: 'company.email' },
    bottom: { name: 'Телефон', path: 'company.phone' },
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
export const permissionsSearchParams: TableSearchParam[] = [
  { label: t('Label base'), dataPath: 'label.base' },
  { label: t('Label print'), dataPath: 'label.print' },
  { label: t('Name first'), dataPath: 'name.first' },
  { label: t('Name second'), dataPath: 'name.second' },
  { label: t('status'), dataPath: 'status' },
];
export const permissionsSortParams: TableSortParam[] = [
  { label: t('Label'), dataPath: 'label.base' },
  { label: t('Name first'), dataPath: 'name.first' },
  { label: t('Name second'), dataPath: 'name.second' },
  { label: t('status'), dataPath: 'status' },
  { label: t('Type'), dataPath: 'status' },
  { label: t('status'), dataPath: 'status' },
  { label: t('status'), dataPath: 'status' },
];
