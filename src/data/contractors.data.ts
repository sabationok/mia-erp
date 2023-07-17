import { ContractorsTypesEnum, IContractor } from '../redux/contractors/contractors.types';
import { CellTittleProps } from '../components/TableList/TebleCells/CellTitle';
import { SelectItem } from '../components/TableList/tableTypes.types';

export const contractorsColumns: CellTittleProps[] = [
  {
    top: { name: 'Назва', path: 'label' },
    bottom: { name: 'ІПН/ЄДРПОУ', path: 'taxCode' },
    width: '170px',
    action: 'cellDbl',
  },
  {
    top: { name: 'Тип', path: 'type' },
    bottom: { name: 'Статус', path: 'status' },
    width: '120px',
    action: 'status',
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
    top: { name: 'Коментар', path: 'description' },
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
    type: ContractorsTypesEnum.FIN_MANAGER,
    email: 'mitla@mail.com',
    phone: '+380670676795',
    tags: ['тай таке', 'Ті що треба', 'VIP', 'Оптові', 'Основні', 'Надійні'],
  },
  {
    _id: 'аdvs4f6sf5vsf',
    label: 'ТОВ "Будмат"',
    type: ContractorsTypesEnum.COUNTER,
    email: 'budmat@mail.com',
    phone: '+380670676795',
    tags: ['VIP', 'Оптові', 'Основні', 'Надійні'],
  },
  {
    _id: 'іdvs4f6sf5vsf',
    label: 'ФОП Тарасенко',
    type: ContractorsTypesEnum.SUPPLIER,
    email: 'tarasenko@mail.com',
    phone: '+380670676795',
    tags: ['tag1', 'tag2'],
  },
];

export const contractorsSearchParams: SelectItem[] = [
  {
    label: "Ім'я",
    dataPath: 'name',
  },
  {
    label: 'Телефон',
    dataPath: 'phone',
  },
  {
    label: 'Емейл',
    dataPath: 'email',
  },
  {
    label: 'Коментар',
    dataPath: 'comment',
  },
  {
    label: 'Теги',
    dataPath: 'tags',
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
