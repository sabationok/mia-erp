import { CellTittleProps } from '../components/TableList/TebleCells/CellTitle';
import { SelectItem } from '../components/TableList/TableList';
import { PermissionEntity, PermissionStatus } from '../types/permissions.types';
import { initialCompany } from '../redux/companies/companies.slice';
import { testUserKarina } from './usersDir.data';
import { initialCustomRole } from './customRoles.data';
import { t } from '../lang';

export const permissionsTableColumns: CellTittleProps<PermissionEntity>[] = [
  {
    top: {
      name: t('label'),
      align: 'start',
      path: 'company.name',
      getData: rd => {
        if (rd.company?.name) {
          return [rd.company?.name?.first, rd.company?.name?.middle, rd.company?.name?.second]
            .filter(el => el)
            .join(' ');
        } else {
          return rd.company?.label?.base ?? t('Undefined label');
        }
      },
    },
    bottom: {
      name: 'ІПН/ЄДРПОУ',
      align: 'start',
      getData(rd) {
        return rd.company?.taxCode?.corp ?? '---, ' + rd.company?.taxCode?.personal ?? '---';
      },
    },

    width: '250px',
    action: 'doubleDataWithAvatar',
  },
  {
    top: { name: 'Роль', align: 'start', path: 'role.label' },
    bottom: { name: 'Опис', align: 'start', path: 'role.description' },
    width: '160px',
    action: 'valueByPath',
  },
  {
    top: {
      name: t('businessSubjectType'),
      align: 'start',
      path: 'company.taxCode',
      getData: rd => rd.company?.businessSubjectType,
    },
    bottom: { name: t('ownership'), align: 'start', path: 'company.name', getData: rd => rd.company?.ownershipType },
    width: '220px',
    action: 'valueByPath',
  },

  {
    top: { name: 'Власник', align: 'start', path: 'owner.name' },
    bottom: { name: 'Емейл', align: 'start', path: 'owner.email' },
    width: '280px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Локація', align: 'start', path: 'company.location' },
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
    top: { name: 'Створено', align: 'center', path: 'createdAt' },
    bottom: { name: 'Оновлено', align: 'center', path: 'updatedAt' },
    width: '150px',
    action: 'dateSimple',
  },
];
export const permissionsSearchParams: SelectItem[] = [
  {
    label: 'Назва',
    dataPath: 'company.name',
    filter: false,
    search: false,
    sort: true,
  },
  {
    label: 'ІПН/ЄДРПОУ',
    dataPath: 'company.taxCode',
    filter: false,
    search: false,
    sort: true,
  },
  {
    label: 'Роль',
    dataPath: 'role.label',
    filter: false,
    search: false,
    sort: true,
  },
  {
    label: 'Власник',
    dataPath: 'company.owner.name',
    filter: false,
    search: true,
    sort: true,
  },
  {
    label: 'Емейл',
    dataPath: 'company.email',
    filter: false,
    search: true,
    sort: true,
  },
  {
    label: 'Телефон',
    dataPath: 'company.phone',
    filter: false,
    search: true,
    sort: true,
  },
];

export const initialPermission: PermissionEntity = {
  _id: 'companyId',
  status: PermissionStatus.ACCEPTED,
  company: initialCompany,
  user: testUserKarina,
  role: initialCustomRole,
};
