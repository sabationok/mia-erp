import DirCategories, { DirCategoriesProps } from 'components/Directories/DirCategories/DirCategories';
import DirCounts, { DirCountsProps } from 'components/Directories/DirCounts/DirCounts';
import DirProjects, { DirProjectsProps } from 'components/Directories/DirProjects/DirProjects';
import { iconId } from '../img/sprite';
import DirMarks, { DirMarksProps } from 'components/Directories/DirMarks';
import DirContractors, { DirContractorsProps } from 'components/Directories/DirContractors';
import DirActivities, { DirActivitiesProps } from 'components/Directories/DirCompanyActivities/DirActivities';
import { contractorsColumns, contractorsMockData } from './contractors.data';
import { CategoryFilterOpt, CountFilterOpt, DirBaseProps } from '../components/Directories/dir.types';
import t from '../lang';

export const categoriesFilterOptions: CategoryFilterOpt[] = [
  { label: t('INCOMES'), value: 'INCOME' },
  { label: t('TRANSFERS'), value: 'TRANSFER' },
  { label: t('EXPENSES'), value: 'EXPENSE' },
];
export const countsFilterOptions: CountFilterOpt[] = [
  { label: t('ACTIVES'), value: 'ACTIVE' },
  { label: t('PASSIVES'), value: 'PASSIVE' },
];

export interface IDirectory<P extends DirBaseProps = any> {
  title: string;
  iconId: string;
  ModalChildren: React.FC<P>;
  modalChildrenProps: P;
  disabled: boolean;
}

const CountsProps: DirCountsProps = {
  title: t('counts'),
  filterOptions: countsFilterOptions,
  fillHeight: true,
};
const countsDir: IDirectory<DirCountsProps> = {
  title: CountsProps.title,
  iconId: iconId.wallet,
  ModalChildren: DirCounts,
  modalChildrenProps: CountsProps,
  disabled: true,
};

const CategoriesProps: DirCategoriesProps = {
  title: t('categories'),
  filterOptions: categoriesFilterOptions,
  fillHeight: true,
};
const categoriesDir: IDirectory<DirCategoriesProps> = {
  title: CategoriesProps.title,
  iconId: iconId.folder,
  ModalChildren: DirCategories,
  modalChildrenProps: CategoriesProps,
  disabled: false,
};
const ContractorsProps: DirContractorsProps = {
  title: t('contractors'),
  fillHeight: true,
  tableSettings: {
    tableData: contractorsMockData,
    tableTitles: contractorsColumns,
    actionsCreator: () => [
      { icon: 'edit' },
      { icon: 'copy' },
      { icon: 'archive', iconSize: '100%' },
      { separator: true },
      {
        type: 'onlyIconFilled',
        icon: 'plus',
      },
    ],
    isFilter: true,
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
  title: t('projects'),
};
const projectsDir: IDirectory<DirProjectsProps> = {
  title: ProjectsProps.title,
  iconId: iconId.assignment,
  ModalChildren: DirProjects,
  modalChildrenProps: ProjectsProps,
  disabled: false,
};
const MarksProps: DirMarksProps = {
  title: t('marks'),
};
const marksDir: IDirectory<DirMarksProps> = {
  title: MarksProps.title,
  iconId: iconId.bookMarkAdd,
  ModalChildren: DirMarks,
  modalChildrenProps: MarksProps,
  disabled: false,
};
const activitiesProps: DirActivitiesProps = {
  title: t('activityTypes'),
};
const activitiesDir: IDirectory<DirActivitiesProps> = {
  title: activitiesProps.title,
  iconId: iconId.folder,
  ModalChildren: DirActivities,
  modalChildrenProps: activitiesProps,
  disabled: false,
};

const directories = [countsDir, categoriesDir, activitiesDir, contractorsDir, projectsDir, marksDir];

export default directories;
