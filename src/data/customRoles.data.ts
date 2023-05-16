import { ICustomRole } from '../redux/customRoles/customRoles.types';

export const rolesMockData: ICustomRole[] = [
  { _id: '5252457444245', name: '', label: 'Адмін', descr: 'Може все', actions: ['', '', ''], accessKeys: ['home'] },
  {
    _id: '5252753745245',
    name: '',
    label: 'Недо-адмін',
    descr: 'Може майже все',
    actions: ['', '', ''],
    accessKeys: ['home'],
  },
];
