import { IContractor } from '../redux/contractors/contractors.types';
import { CellTittleProps } from '../components/TableList/TebleCells/CellTitle';


export const contractorsColumns: CellTittleProps[] = [
  {
    top: { name: 'Назва', path: 'label' },
    bottom: { name: 'Тип', path: 'type' },
    width: '170px',
    action: 'cellDbl',
  },
  {
    top: { name: 'Електронна пошта', path: 'email', uppercase: false },
    bottom: { name: 'Номер телефону', path: 'phone' },
    width: '170px',
    action: 'contacts',
  },
  {
    top: { name: 'Локація', path: 'location' },
    width: '170px',
    action: 'cellDbl',
  },
  {
    top: { name: 'Теги', path: 'tags' },
    width: '200px',
    action: 'tags',
  },
  {
    top: { name: 'Коментар', path: 'descr' },
    width: '170px',
    action: 'cellDbl',
  },
  {
    top: { name: 'Створено', align: 'center', path: 'createdAt', sort: false },
    bottom: { name: 'Оновлено', align: 'center', path: 'updatedAt', sort: false },
    width: '150px',
    action: 'dateSimple',
  },
];
export const contractorsMockData: IContractor[] = [
  {
    _id: 'sdvs4f6sf5vsf',
    label: 'ТОВ "Мітла"',
    type: 'Основні',
    email: 'mitla@mail.com', phone: '+380670676795',
    tags: ['тай таке', 'Ті що треба', 'VIP', 'Оптові', 'Основні', 'Надійні'],
  },
  {
    _id: 'аdvs4f6sf5vsf',
    label: 'ТОВ "Будмат"',
    type: 'Основні',
    email: 'budmat@mail.com',
    phone: '+380670676795',
    tags: ['VIP', 'Оптові', 'Основні', 'Надійні'],
  },
  {
    _id: 'іdvs4f6sf5vsf',
    label: 'ФОП Тарасенко',
    type: 'Основні',
    email: 'tarasenko@mail.com', phone: '+380670676795',
    tags: ['tag1', 'tag2'],
  },
];
// {
//   _id: '',
//     name: '',
//   type: '',
//   info: '',
//   company: '',
//   contacts: {
//   email: '',
//     phone: '',
// },
//   address: '',
//     contracts: [''],
//   descr: '',
// },