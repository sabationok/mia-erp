import { ICustomRole } from '../redux/customRoles/customRoles.types';

export const initialCustomRole: ICustomRole = {
  _id: 'dfbsdgbd',
  label: 'Фінансист',
  description: 'Такоє собі посада',
  actions: [],
  accessKeys: ['companies', 'transactions', 'orders', 'refunds', 'supplement', 'storage', 'manager', 'admin'],
};

export const rolesMockData: ICustomRole[] = [
  {
    _id: '5252457444245',
    label: 'Адмін',
    description: 'Може все',
    actions: [{ label: 'label' }, { label: 'label' }, { label: 'label' }],
    accessKeys: ['companies'],
  },
  {
    _id: '5252753745245',
    label: 'Недо-адмін',
    description: 'Може майже все',
    actions: [{ label: 'label' }, { label: 'label' }, { label: 'label' }],
    accessKeys: ['companies'],
  },
];
