// import DirectoryOfCounts from 'components/Directories/DirectoryOfCounts';
// import DirectoryOfCategories from 'components/Directories/DirectoryOfCategories';
// import ModalDefault from 'components/ModalDefault/ModalDefault';
import DirCategories, { DirCategoriesProps } from 'components/Directories/DirCategories/DirCategories';
import DirCounts, { DirCountsProps } from 'components/Directories/DirCounts/DirCounts';
import DirProjects from 'components/Directories/DirProjects/DirProjects';
import { iconId } from './iconId.data';

export interface IDirectory {
  title: string;
  iconId: string;
  ModalChildren: React.FC<any>;
  modalChildrenProps: any;
  disabled: boolean;
}

const CountsProps: DirCountsProps = {
  title: 'Рахунки',
  filterOptions: [
    { label: 'Активні', value: 'ACTIVE' },
    { label: 'Пасивні', value: 'PASSIVE' },
  ],
};
const CategoriesProps: DirCategoriesProps = {
  title: 'Категорії',
  filterOptions: [
    { label: 'Дохід', value: 'INCOME' },
    { label: 'Переказ', value: 'TRANSFER' },
    { label: 'Витрата', value: 'EXPENSE' },
  ],
};
const ProjectsProps: DirCategoriesProps = {
  title: 'Проєкти',
  // filterOptions: [
  //   { label: 'Нові', value: 'PENDING' },
  //   { label: 'Закриті', value: 'FULLFILED' },
  //   { label: 'Майбутні', value: 'FUTURE' },
  // ],
};

const directories: IDirectory[] = [
  {
    title: CountsProps.title,
    iconId: iconId.bank,
    ModalChildren: DirCounts,
    modalChildrenProps: CountsProps,
    disabled: false,
  },
  {
    title: CategoriesProps.title,
    iconId: iconId.folder,
    ModalChildren: DirCategories,
    modalChildrenProps: CategoriesProps,
    disabled: true,
  },
  {
    title: ProjectsProps.title,
    iconId: iconId.assignment,
    ModalChildren: DirProjects,
    modalChildrenProps: ProjectsProps,
    disabled: true,
  },
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
