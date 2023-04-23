import DirCategories, { DirCategoriesProps } from 'components/Directories/DirCategories/DirCategories';
import DirCounts, { DirCountsProps } from 'components/Directories/DirCounts/DirCounts';
import DirProjects, { DirProjectsProps } from 'components/Directories/DirProjects/DirProjects';
import { DirCustomRolesProps } from 'components/CompanySettings/DirCustomRoles/DirCustomRoles';
import { iconId } from '../img/sprite';
import DirMarks, { DirMarksProps } from 'components/Directories/DirMarks';
import DirContractors, { DirContractorsProps } from 'components/Directories/DirContractors';
import { contractorsColumns, contractorsMockData } from './contractors.data';

import { CategoriesTypesMap } from '../redux/categories/categories.types';
import DirCompanyActivities, {
  DirCompanyActivitiesProps,
} from 'components/Directories/DirCompanyActivities/DirCompanyActivities';

export interface IDirectory {
  title: string;
  iconId: string;
  ModalChildren: React.FC<any>;
  modalChildrenProps: DirCountsProps | DirCategoriesProps | DirProjectsProps | DirContractorsProps | DirCustomRolesProps | DirCompanyActivitiesProps;
  disabled: boolean;
}

const CountsProps: DirCountsProps = {
  title: 'Рахунки',
  filterOptions: [
    { label: 'Активні', value: 'ACTIVE' },
    { label: 'Пасивні', value: 'PASSIVE' },
  ],
};
export const CategoriesProps: DirCategoriesProps = {
  title: 'Категорії',
  filterOptions: [
    { label: CategoriesTypesMap.INCOME, value: 'INCOME' },
    { label: CategoriesTypesMap.TRANSFER, value: 'TRANSFER' },
    { label: CategoriesTypesMap.EXPENSE, value: 'EXPENSE' },
  ],
};
const ProjectsProps: DirProjectsProps = {
  title: 'Проєкти',
};
const ContractorsProps: DirContractorsProps = {
  title: 'Контрагенти',
  tableSettings: { tableData: contractorsMockData, tableTitles: contractorsColumns },
  footer: false,
};
const CompanyActivitiesProps: DirCompanyActivitiesProps = {
  title: 'Види діяльності',
};
const MarksProps: DirMarksProps = {
  title: 'Мітки', footer: false,
};

const directories: IDirectory[] = [
  {
    title: CountsProps.title,
    iconId: iconId.wallet,
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
    title: CompanyActivitiesProps.title, iconId: iconId.boockMarAdd,
    ModalChildren: DirCompanyActivities,
    modalChildrenProps: CompanyActivitiesProps,
    disabled: true,
  },
];

export default directories;
