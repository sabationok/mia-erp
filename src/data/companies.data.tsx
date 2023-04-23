import { CellTittleProps } from 'components/TableList/TebleCells/CellTitle';

export const companiesTableColumns: CellTittleProps[] = [
  {
    top: { name: 'Назва', align: 'start', dataKey: 'company', nestedDataKey: 'name', sort: false },
    bottom: { name: 'ІПН/ЄДРПОУ', align: 'start', dataKey: 'taxCode', sort: false },
    width: '200px',
    action: 'cellDbl',
  },
  {
    top: { name: 'Роль', align: 'start', dataKey: 'role', nestedDataKey: 'label', sort: false },
    width: '160px',
    action: 'cellDbl',
  },
  {
    top: { name: 'Власник', align: 'start', dataKey: 'owner', nestedDataKey: 'name', sort: false },
    width: '180px',
    action: 'cellDbl',
  },
  {
    top: { name: 'Локація', align: 'start', dataKey: 'location', sort: false },
    width: '170px',
    action: 'cellDbl',
  },
  {
    top: { name: 'Емейл', align: 'start', dataKey: 'owner', nestedDataKey: 'name', sort: false },
    bottom: { name: 'Телефон', align: 'start', dataKey: 'phone', sort: false },
    width: '150px',
    action: 'cellDbl',
  },
  {
    top: { name: 'Створено', align: 'center', dataKey: 'createdAt', sort: false },
    bottom: { name: 'Оновлено', align: 'center', dataKey: 'updatedAt', sort: false },
    width: '150px',
    action: 'dateSimple',
  },
];

export const companies = [
  { title: '"ТОВ Анджеліка"', taxCode: '2138451235' },
  { title: '"ФОП Петров А.І."', taxCode: '6516546213' },
  { title: '"ТОВ Рога і копита"', taxCode: '8798495466' },
];
