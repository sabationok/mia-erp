import { DirProjectsProps } from 'components/Directories/DirProjects';
import { iconId } from '../img/sprite';
import { contractorsColumns, contractorsSearchParams } from './contractors.data';
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
import FormCreateCategory from '../components/Forms/FormCreateCategory';
import DirTableComp, { DirTableCompProps } from '../components/Directories/DirTableComp';
import FormCreateContractor from '../components/Forms/FormCreateContractor';
import { createDataForReq } from '../utils/dataTransform';

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
  createParentTitle: t('createParentCount'),
  dirType: ApiDirType.COUNTS,
  filterSearchPath: 'type',
  filterDefaultValue: 'ACTIVE',
  actionsCreator: ({ modalService, dirService, type, findById }) => {
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
                  toast.success(`Created item: ${data.label}`);
                },
              });
            },
          },
        });
      },
      onCreateChild: parentId => {
        const modal = modalService.handleOpenModal({
          ModalChildren: FormCreateCount,
          modalChildrenProps: {
            title: t('createParentCount'),
            type,
            parent: { _id: parentId },
            onSubmit: data => {
              dirService.create({
                data: { dirType: ApiDirType.COUNTS, data },
                onSuccess: rd => {
                  modal?.onClose();
                  toast.success(`Created item: ${data.label}`);
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
  actionsCreator: ({ modalService, dirService, type, findById }) => {
    return {
      onCreateParent: () => {
        const modal = modalService.handleOpenModal({
          ModalChildren: FormCreateCategory,
          modalChildrenProps: {
            title: t('createParentCategory'),
            type,
            onSubmit: data => {
              dirService.create({
                data: { dirType: ApiDirType.CATEGORIES_TR, data },
                onSuccess: rd => {
                  modal?.onClose();
                  toast.success(`Created item: ${data.label}`);
                },
              });
            },
          },
        });
      },
      onCreateChild: parentId => {
        const modal = modalService.handleOpenModal({
          ModalChildren: FormCreateCategory,
          modalChildrenProps: {
            title: t('createParentCount'),
            type,
            parent: { _id: parentId },
            onSubmit: data => {
              dirService.create({
                data: { dirType: ApiDirType.CATEGORIES_TR, data },
                onSuccess: rd => {
                  modal?.onClose();
                  toast.success(`Created item: ${data.label}`);
                },
              });
            },
          },
        });
      },
    };
  },
};
const categoriesDir: IDirectory<DirCategoriesProps> = {
  title: CategoriesProps.title,
  iconId: iconId.folder,
  ModalChildren: DirTreeComp,
  modalChildrenProps: CategoriesProps,
  disabled: false,
};

const ContractorsProps: DirTableCompProps<ApiDirType.CONTRACTORS> = {
  title: t('contractors'),
  fillHeight: true,
  dirType: ApiDirType.CONTRACTORS,
  getTableSettings: ({ dirService, modalService, type }) => ({
    tableTitles: contractorsColumns,
    tableSearchParams: contractorsSearchParams,
    actionsCreator: p => [
      {
        icon: 'edit',
      },
      { icon: 'copy' },
      { icon: 'archive', iconSize: '100%' },
      { separator: true },
      {
        type: 'onlyIconFilled',
        icon: 'plus',
        onClick: () => {
          modalService.handleOpenModal({
            modalChildrenProps: {
              title: t('createContractor'),
              fillHeight: true,
              onSubmit: data => {
                dirService.create({
                  data: { dirType: ApiDirType.CONTRACTORS, data: createDataForReq(data) },
                  onSuccess: data => {
                    console.log(t('createContractor'), data);
                  },
                  onError: e => {},
                });
              },
            },
            ModalChildren: FormCreateContractor,
          });
        },
      },
    ],
  }),
};
const contractorsDir: IDirectory<DirTableCompProps> = {
  title: ContractorsProps.title,
  iconId: iconId.partners,
  ModalChildren: DirTableComp,
  modalChildrenProps: ContractorsProps,
  disabled: false,
};
const ProjectsProps: DirProjectsProps = {
  title: t('projects'),
  dirType: ApiDirType.PROJECTS,
  getTableSettings: options => {
    return {};
  },
};
const projectsDir: IDirectory<DirProjectsProps> = {
  title: ProjectsProps.title,
  iconId: iconId.assignment,
  ModalChildren: DirTableComp,
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
