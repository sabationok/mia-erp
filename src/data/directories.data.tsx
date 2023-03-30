// import DirectoryOfCounts from 'components/Directories/DirectoryOfCounts';
// import DirectoryOfCategories from 'components/Directories/DirectoryOfCategories';
// import ModalDefault from 'components/ModalDefault/ModalDefault';
import { iconId } from './iconId.data';

export interface IDirectory {
  title: string;
  iconId: string;
  ModalChildren: React.FC;
  modalChildrenProps: any;
  disabled: boolean;
}

const directories: IDirectory[] = [
  {
    title: 'Рахунки',
    iconId: iconId.bank,
    ModalChildren: () => null,
    modalChildrenProps: { title: 'Рахунки' },
    disabled: false,
  },
  {
    title: 'Категорії',
    iconId: iconId.folder,
    ModalChildren: () => null,
    modalChildrenProps: { title: 'Категорії' },
    disabled: true,
  },
  {
    title: 'Котракти',
    iconId: iconId.assignment,
    ModalChildren: () => null,
    modalChildrenProps: { title: 'Контракти' },
    disabled: true,
  },
  { title: 'Проекти', iconId: iconId.folder, ModalChildren: () => null, modalChildrenProps: null, disabled: true },
  {
    title: 'Контрагенти',
    iconId: iconId.partners,
    ModalChildren: () => null,
    modalChildrenProps: null,
    disabled: true,
  },
  { title: 'Користувачі', iconId: iconId.persons, ModalChildren: () => null, modalChildrenProps: null, disabled: true },
  { title: 'Ролі', iconId: iconId.lockPerson, ModalChildren: () => null, modalChildrenProps: null, disabled: true },
  { title: 'Мітки', iconId: iconId.boockMarAdd, ModalChildren: () => null, modalChildrenProps: null, disabled: true },
];

export default directories;
