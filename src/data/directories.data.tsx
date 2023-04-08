// import DirectoryOfCounts from 'components/Directories/DirectoryOfCounts';
// import DirectoryOfCategories from 'components/Directories/DirectoryOfCategories';
// import ModalDefault from 'components/ModalDefault/ModalDefault';
import DirCategories, { DirCategoriesProps } from 'components/Directories/DirCategories/DirCategories';
import DirCounts, { DirCountsProps } from 'components/Directories/DirCounts/DirCounts';
import DirProjects, { DirProjectsProps } from 'components/Directories/DirProjects/DirProjects';
import DirCustomRoles, { DirCustomRolesProps } from 'components/Directories/DirCustomRoles/DirCustomRoles';
import { iconId } from '../img/sprite/iconId.data';
import DirUsers, { DirUsersProps } from 'components/Directories/DirUsers';
import DirMarks, { DirMarksProps } from 'components/Directories/DirMarks';
import DirContractors, { DirContractorsProps } from 'components/Directories/DirContractors';
import { usersDirColumns, usersMockData } from './usersDir.data';
import { contractorsColumns, contractorsMockData } from './contractors.data';

export interface IDirectory {
  title: string;
  iconId: string;
  ModalChildren: React.FC<any>;
  modalChildrenProps: DirCountsProps | DirCategoriesProps | DirProjectsProps | DirContractorsProps | DirCustomRolesProps;
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
const ProjectsProps: DirProjectsProps = {
  title: 'Проєкти',
  // filterOptions: [
  //   { label: 'Нові', value: 'PENDING' },
  //   { label: 'Закриті', value: 'FULLFILED' },
  //   { label: 'Майбутні', value: 'FUTURE' },
  // ],
};
const ContractorsProps: DirContractorsProps = {
  title: 'Контрагенти',
  tableSettings: { tableData: contractorsMockData, tableTitles: contractorsColumns },
  footer: false,
};
const CustomRolesProps: DirCustomRolesProps = {
  title: 'Ролі',
};
const UsersProps: DirUsersProps = {
  title: 'Користувачі',
  tableSettings: {
    tableTitles: usersDirColumns,
    tableData: usersMockData,
  },
};

const MarksProps: DirMarksProps = {
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
    ModalChildren: DirContractors,
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
    ModalChildren: DirMarks, // !!!!
    modalChildrenProps: MarksProps,
    disabled: true,
  },
  {
    title: UsersProps.title,
    iconId: iconId.persons,
    ModalChildren: DirUsers, // !!!!
    modalChildrenProps: UsersProps,
    disabled: true,
  },
  {
    title: CustomRolesProps.title,
    iconId: iconId.lockPerson,
    ModalChildren: DirCustomRoles,
    modalChildrenProps: CustomRolesProps,
    disabled: true,
  },
];

export default directories;