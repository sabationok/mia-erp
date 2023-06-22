import DirProjects, { DirProjectsProps } from 'components/Directories/DirProjects';
import { iconId } from '../img/sprite';
import DirContractors, { DirContractorsProps } from 'components/Directories/DirContractors';
import { contractorsColumns, contractorsMockData } from './contractors.data';
import {
  CategoryFilterOpt,
  CountFilterOpt,
  DirActivitiesProps,
  DirBaseProps,
  DirCategoriesProps,
  DirCountsProps,
  DirMarksProps,
} from '../components/Directories/dir.types';
import t from '../lang';
import DirTreeComp from '../components/Directories/DirTreeComp';
import { ApiDirType } from '../redux/APP_CONFIGS';
import FormCreateCount from '../components/Forms/FormCreateCount';
import { toast } from 'react-toastify';

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
  createParentTitle: t('createChildCount'),
  dirType: ApiDirType.COUNTS,
  filterSearchPath: 'type',
  filterDefaultValue: 'ACTIVE',
  actionsCreator: ({ modalService, dirService, type }) => {
    return {
      onCreateParent: () => {
        const modal = modalService.handleOpenModal({
          ModalChildren: FormCreateCount,
          modalChildrenProps: {
            title: t('createParentCount'),
            type,
            onSubmit: data => {
              dirService.create({
                data: { dirType: ApiDirType.COUNTS, data },
                onSuccess: rd => {
                  modal?.onClose();
                  toast.success(`Created item: ${rd.data.label}`);
                },
              });
            },
          },
        });
      },
    };
  },
};
const countsDir: IDirectory<DirCountsProps> = {
  title: CountsProps.title,
  iconId: iconId.wallet,
  ModalChildren: DirTreeComp,
  modalChildrenProps: CountsProps,
  disabled: true,
};

const CategoriesProps: DirCategoriesProps = {
  title: t('categories'),
  filterOptions: categoriesFilterOptions,
  fillHeight: true,
  createParentTitle: t('createParentCategory'),
  dirType: ApiDirType.CATEGORIES_TR,
  filterSearchPath: 'type',
  filterDefaultValue: 'INCOME',
  actionsCreator: ({ modalService, dirService, type }) => {
    return {};
  },
};
const categoriesDir: IDirectory<DirCategoriesProps> = {
  title: CategoriesProps.title,
  iconId: iconId.folder,
  ModalChildren: DirTreeComp,
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
  dirType: ApiDirType.MARKS,
  actionsCreator: ({ modalService, dirService, type }) => {
    return {};
  },
};
const marksDir: IDirectory<DirMarksProps> = {
  title: MarksProps.title,
  iconId: iconId.bookMarkAdd,
  ModalChildren: DirTreeComp,
  modalChildrenProps: MarksProps,
  disabled: false,
};
const activitiesProps: DirActivitiesProps = {
  title: t('activityTypes'),
  createParentTitle: t('createDirParentItem'),
  dirType: ApiDirType.ACTIVITIES,
  fillHeight: true,
  actionsCreator: ({ modalService, dirService, type }) => {
    return {};
  },
};
const activitiesDir: IDirectory<DirActivitiesProps> = {
  title: activitiesProps.title,
  iconId: iconId.folder,
  ModalChildren: DirTreeComp,
  modalChildrenProps: activitiesProps,
  disabled: false,
};

const directories = [countsDir, categoriesDir, contractorsDir, projectsDir, marksDir, activitiesDir];

export default directories;
