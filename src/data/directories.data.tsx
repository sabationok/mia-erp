// import DirectoryOfCounts from 'components/Directories/DirectoryOfCounts';
// import DirectoryOfCategories from 'components/Directories/DirectoryOfCategories';
// import ModalDefault from 'components/ModalDefault/ModalDefault';
import CountsList, { CountsListProps } from 'components/Directories/DirCounts/CountsDir';
import { iconId } from './iconId.data';

export interface IDirectory {
  title: string;
  iconId: string;
  ModalChildren: React.FC<any>;
  modalChildrenProps: any;
  disabled: boolean;
}

const CountsProps: CountsListProps = {
  title: 'Рахунки',
  filterOptions: [
    { label: 'Активні', value: 'ACTIVE' },
    { label: 'Пасивні', value: 'PASSIVE' },
  ],
};

const directories: IDirectory[] = [
  {
    title: 'Рахунки',
    iconId: iconId.bank,
    ModalChildren: CountsList,
    modalChildrenProps: CountsProps,
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
