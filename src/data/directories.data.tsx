// import DirectoryOfCounts from 'components/Directories/DirectoryOfCounts';
// import DirectoryOfCategories from 'components/Directories/DirectoryOfCategories';
// import ModalDefault from 'components/ModalDefault/ModalDefault';
import DirCategories, { DirCategoriesProps } from 'components/Directories/DirCategories/DirCategories';
import DirCounts, { DirCountsProps } from 'components/Directories/DirCounts/DirCounts';
import DirProjects from 'components/Directories/DirProjects/DirProjects';
import DirRoles from 'components/Directories/DirRoles/DirRoles';
import { iconId } from '../img/sprite/iconId.data';

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
const ContractorsProps: DirCategoriesProps = {
  title: 'Контрагенти',
};
const RolesProps: { title: string } = {
  title: 'Ролі',
};
const UsersProps: { title: string } = {
  title: 'Користувачі',
};

const MarksProps: { title: string } = {
  title: 'Мітки',
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
    title: ContractorsProps.title,
    iconId: iconId.partners,
    ModalChildren: DirRoles, // !!!!
    modalChildrenProps: ContractorsProps,
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
    title: MarksProps.title,
    iconId: iconId.boockMarAdd,
    ModalChildren: DirRoles, // !!!!
    modalChildrenProps: MarksProps,
    disabled: true,
  },
  {
    title: UsersProps.title,
    iconId: iconId.persons,
    ModalChildren: DirRoles, // !!!!
    modalChildrenProps: UsersProps,
    disabled: true,
  },
  {
    title: RolesProps.title,
    iconId: iconId.lockPerson,
    ModalChildren: DirRoles,
    modalChildrenProps: RolesProps,
    disabled: true,
  },
];

export default directories;
