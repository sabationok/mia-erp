import { ICustomRole } from '../redux/customRoles/customRoles.types';

export const initialCustomRole: ICustomRole = {
  _id: 'dfbsdgbd',
  label: 'Фінансист',
  descr: 'Такоє собі посада',
  actions: [],
  accessKeys: ['companies', 'transactions', 'orders', 'refunds', 'supplement', 'storage', 'manager', 'admin'],
};

export const rolesMockData: ICustomRole[] = [
  {
    _id: '5252457444245',
    name: '',
    label: 'Адмін',
    descr: 'Може все',
    actions: ['', '', ''],
    accessKeys: ['companies'],
  },
  {
    _id: '5252753745245',
    name: '',
    label: 'Недо-адмін',
    descr: 'Може майже все',
    actions: ['', '', ''],
    accessKeys: ['companies'],
  },
];
