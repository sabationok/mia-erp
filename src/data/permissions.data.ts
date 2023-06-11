import { CellTittleProps } from '../components/TableList/TebleCells/CellTitle';
import { SelectItem } from '../components/TableList/TableList';
import { IPermission, PermissionStatus } from '../redux/permissions/permissions.types';
import { initialCompany } from '../redux/companies/companies.slice';
import { testUserKarina } from './usersDir.data';
import { initialCustomRole } from './customRoles.data';

export const permissionsTableColumns: CellTittleProps[] = [
  {
    top: { name: 'Назва', align: 'start', path: 'company.name' },
    bottom: { name: 'ІПН/ЄДРПОУ', align: 'start', path: 'company.taxCode' },
    width: '200px',
    action: 'doubleDataWithAvatar',
  },
  {
    top: { name: 'Роль', align: 'start', path: 'role.label' },
    bottom: { name: 'Опис', align: 'start', path: 'role.descr' },
    width: '160px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Власник', align: 'start', path: 'owner.name' },
    bottom: { name: 'Емейл', align: 'start', path: 'owner.email' },
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

export const initialPermission: IPermission = {
  _id: 'companyId',
  status: PermissionStatus.accepted,
  company: initialCompany,
  user: testUserKarina,
  role: initialCustomRole,
};
export const testPermissions: IPermission[] = [
  initialPermission,
  {
    ...initialPermission,
    _id: 'dfbscfbvfgnbd13f5g13bdg1',
    company: { ...initialCompany, _id: 'dfbscxvfgnbd13f5g13bdg1', name: 'Roga & Copyta' },
    role: { ...initialPermission.role, label: 'Менеджер' },
  },
  {
    ...initialPermission,
    _id: 'dfbscfbvsvxfgnbd13f5g13bdg1',
    company: { ...initialCompany, _id: 'dfbscxvfgnbd13f5g13bdg1', name: 'Roga & Copyta' },
    role: { ...initialPermission.role, label: 'Менеджер' },
  },
  {
    ...initialPermission,
    _id: 'dfbscxvcxgnbd13f5g13bdg1',
    status: PermissionStatus.pending,
    company: { ...initialCompany, _id: 'dfbsdfsdf13f5g13bdg1', name: 'Roga & Copyta 3' },
    role: { ...initialPermission.role, label: 'Помічник' },
  },
  {
    ...initialPermission,
    _id: 'dfbscxvsdfbvsd13f5g13bdg1',
    status: PermissionStatus.accepted,
    company: { ...initialCompany, _id: 'dfbsxcvgbd13f5g13bdg1', name: 'Roga & Copyta 4' },
    role: { ...initialPermission.role, label: 'Аудитор' },
    owner: testUserKarina,
  },
];
