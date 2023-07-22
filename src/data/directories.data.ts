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
  DirProductCategoriesProps,
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
  actionsCreator: ({ modalService, dirService, type, dirType, findById }) => {
    return {
      onCreateParent: () => {
        const modal = modalService.handleOpenModal({
          ModalChildren: FormCreateCount,
          modalChildrenProps: {
            title: t('createParentCount'),
            type,
            onSubmit: data => {
              dirService.create({
                data: { dirType, data },
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
                data: { dirType, data },
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
  disabled: false,
};

const CategoriesProps: DirCategoriesProps = {
  title: t('trCategories'),
  filterOptions: categoriesFilterOptions,
  fillHeight: true,
  createParentTitle: t('createParentCategory'),
  dirType: ApiDirType.CATEGORIES_TR,
  filterSearchPath: 'type',
  filterDefaultValue: 'INCOME',
  actionsCreator: ({ modalService, dirService, type, dirType, findById }) => {
    return {
      onCreateParent: async options => {
        const modal = modalService.handleOpenModal({
          ModalChildren: FormCreateCategory,
          modalChildrenProps: {
            title: t('createDirParentItem'),
            type,
            onSubmit: data => {
              dirService.create({
                data: { dirType, data },
                onSuccess: rd => {
                  options?.clearAfter && modal?.onClose();
                  toast.success(`Created: ${data.label}`);
                },
              });
            },
          },
        });
      },
      onCreateChild: async (parentId, parent, options) => {
        const modal = modalService.handleOpenModal({
          ModalChildren: FormCreateCategory,
          modalChildrenProps: {
            title: t('createDirParentItem'),
            type,
            parent,
            onSubmit: data => {
              dirService.create({
                data: { dirType, data },
                onSuccess: rd => {
                  options?.clearAfter && modal?.onClose();
                  toast.success(`Created: ${data.label}`);
                },
              });
            },
          },
        });
      },
      onUpdateItem: async (_id, options) => {
        const dataForUpdate = findById ? findById(_id) : undefined;
        if (!dataForUpdate) return;
        const modal = modalService.handleOpenModal({
          ModalChildren: FormCreateCategory,
          modalChildrenProps: {
            title: t('createChildCategory'),
            type,
            data: dataForUpdate,
            onSubmit: data => {
              dirService?.update({
                data: { dirType, _id, data },
                onSuccess: rd => {
                  options?.clearAfter && modal?.onClose();
                  toast.success(`Created: ${data.label}`);
                },
              });
            },
          },
        });
      },

      onChangeArchiveStatus: dirService?.changeArchiveStatus
        ? async (id, status, options) => {
            const dataForUpdate = findById ? findById(id) : undefined;
            if (!dataForUpdate) return;
            dirService?.changeArchiveStatus({
              data: { dirType, data: { isArchived: status } },
              onSuccess: (rd: any) => {
                toast.success(`${dataForUpdate.label} => ${status ? 'archived' : 'unarchived'}`);
              },
            });
          }
        : undefined,
    };
  },
};
const trCategoriesDir: IDirectory<DirCategoriesProps> = {
  title: CategoriesProps.title,
  iconId: iconId.folder,
  ModalChildren: DirTreeComp,
  modalChildrenProps: CategoriesProps,
  disabled: false,
};
const ProductCategoriesProps: DirProductCategoriesProps = {
  title: t('productCategories'),
  fillHeight: true,
  createParentTitle: t('createParentCategory'),
  dirType: ApiDirType.CATEGORIES_PROD,
  actionsCreator: CategoriesProps.actionsCreator as any,
  availableLevels: 5,
};
const prodCategoriesDir: IDirectory<DirProductCategoriesProps> = {
  title: ProductCategoriesProps.title,
  iconId: iconId.folder,
  ModalChildren: DirTreeComp,
  modalChildrenProps: ProductCategoriesProps,
  disabled: false,
};

const ContractorsProps: DirTableCompProps<ApiDirType.CONTRACTORS> = {
  title: t('contractors'),
  fillHeight: true,
  dirType: ApiDirType.CONTRACTORS,
  getTableSettings: ({ dirService, modalService, type, dirType }) => ({
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
            ModalChildren: FormCreateContractor,
            modalChildrenProps: {
              title: t('createContractor'),
              fillHeight: true,
              onSubmit: async data => {
                dirService.create({
                  data: { dirType, data: createDataForReq(data) },
                  onSuccess: data => {
                    console.log(t('createContractor'), data);
                  },
                  onError: e => {},
                });
              },
            },
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
  fillWidth: true,
  getTableSettings: ContractorsProps.getTableSettings,
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
  createParentTitle: t('createDirParentItem'),
  actionsCreator: CategoriesProps.actionsCreator as any,
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
  actionsCreator: CategoriesProps.actionsCreator as any,
};
const activitiesDir: IDirectory<DirActivitiesProps> = {
  title: activitiesProps.title,
  iconId: iconId.folder,
  ModalChildren: DirTreeComp,
  modalChildrenProps: activitiesProps,
  disabled: false,
};

const directories: Partial<IDirectory>[] = [
  countsDir,
  trCategoriesDir,
  prodCategoriesDir,
  activitiesDir,
  contractorsDir,
  projectsDir,
  marksDir,
  {
    title: 'Статуси для замовлень',
    disabled: true,
    modalChildrenProps: {
      dirType: ApiDirType.STATUS_ORDER,
    },
  },
  {
    title: 'Статуси для пвернень',
    disabled: true,
    modalChildrenProps: {
      dirType: ApiDirType.STATUS_REFUND,
    },
  },
  {
    title: 'Статуси для відправлень',
    disabled: true,
    modalChildrenProps: {
      dirType: ApiDirType.STATUS_DELIVERY,
    },
  },
  {
    title: 'Бренди',
    disabled: true,
    modalChildrenProps: {
      dirType: ApiDirType.BRANDS,
    },
  },
];

export default directories;
