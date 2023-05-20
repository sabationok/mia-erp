import DirCategories, {
  DirCategoriesProps,
} from 'components/Directories/DirCategories/DirCategories';
import DirCounts, {
  DirCountsProps,
} from 'components/Directories/DirCounts/DirCounts';
import DirProjects, {
  DirProjectsProps,
} from 'components/Directories/DirProjects/DirProjects';
import { iconId } from '../img/sprite';
import DirMarks, { DirMarksProps } from 'components/Directories/DirMarks';
import DirContractors, {
  DirContractorsProps,
} from 'components/Directories/DirContractors';

import { CategoriesTypesMap } from 'redux/categories/categories.types';
import DirActivities, {
  DirActivitiesProps,
} from 'components/Directories/DirCompanyActivities/DirActivities';
import { contractorsColumns, contractorsMockData } from './contractors.data';
import { DirBaseProps } from '../components/Directories/dir.types';

export interface IDirectory<P extends DirBaseProps = any> {
  title: string;
  iconId: string;
  ModalChildren: React.FC<P>;
  modalChildrenProps: P;
  disabled: boolean;
}

const CountsProps: DirCountsProps = {
  title: 'Рахунки',
  filterOptions: [
    { label: 'Активні', value: 'ACTIVE' },
    { label: 'Пасивні', value: 'PASSIVE' },
  ],
};
const countsDir: IDirectory<DirCountsProps> = {
  title: CountsProps.title,
  iconId: iconId.wallet,
  ModalChildren: DirCounts,
  modalChildrenProps: CountsProps,
  disabled: true,
};
const CategoriesProps: DirCategoriesProps = {
  title: 'Категорії',
  filterOptions: [
    { label: CategoriesTypesMap.INCOME, value: 'INCOME' },
    { label: CategoriesTypesMap.TRANSFER, value: 'TRANSFER' },
    { label: CategoriesTypesMap.EXPENSE, value: 'EXPENSE' },
  ],
};
const categoriesDir: IDirectory<DirCategoriesProps> = {
  title: CategoriesProps.title,
  iconId: iconId.folder,
  ModalChildren: DirCategories,
  modalChildrenProps: CategoriesProps,
  disabled: false,
};
const ContractorsProps: DirContractorsProps = {
  title: 'Контрагенти',
  tableSettings: {
    tableData: contractorsMockData,
    tableTitles: contractorsColumns,
  },
};
const contractorsDir: IDirectory<DirContractorsProps> = {
  title: ContractorsProps.title,
  iconId: iconId.partners,
  ModalChildren: DirContractors,
  modalChildrenProps: ContractorsProps,
  disabled: false,
};
const ProjectsProps: DirProjectsProps = {
  title: 'Проєкти',
};
const projectsDir: IDirectory<DirProjectsProps> = {
  title: ProjectsProps.title,
  iconId: iconId.assignment,
  ModalChildren: DirProjects,
  modalChildrenProps: ProjectsProps,
  disabled: false,
};
const MarksProps: DirMarksProps = {
  title: 'Мітки',
};
const marksDir: IDirectory<DirMarksProps> = {
  title: MarksProps.title,
  iconId: iconId.bookMarkAdd,
  ModalChildren: DirMarks,
  modalChildrenProps: MarksProps,
  disabled: false,
};
const activitiesProps: DirActivitiesProps = {
  title: 'Види діяльності',
};
const activitiesDir: IDirectory<DirActivitiesProps> = {
  title: activitiesProps.title,
  iconId: iconId.folder,
  ModalChildren: DirActivities,
  modalChildrenProps: activitiesProps,
  disabled: false,
};

const directories = [
  countsDir,
  categoriesDir,
  activitiesDir,
  contractorsDir,
  projectsDir,
  marksDir,
];

export default directories;
