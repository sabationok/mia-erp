import { DirProjectsProps } from 'components/Directories/DirProjects';
import { iconId } from '../img/sprite';
import { contractorsColumns, contractorsSearchParams } from './contractors.data';
import {
  CategoryFilterOpt,
  CountFilterOpt,
  DirActivitiesProps,
  DirBaseProps,
  DirBrandsProps,
  DirCategoriesProps,
  DirCountsProps,
  DirInTreeActionsCreatorType,
  DirMarksProps,
  DirProductCategoriesProps,
  DirTagsProps,
} from '../components/Directories/dir.types';
import t from '../lang';
import DirTreeComp from '../components/Directories/DirTreeComp';
import { ApiDirType } from '../redux/APP_CONFIGS';
import { toast } from 'react-toastify';
import DirTableComp, { DirTableCompProps } from '../components/Directories/DirTableComp';
import FormCreateContractor from '../components/Forms/FormCreateContractor';
import { createDataForReq } from '../utils/dataTransform';
import { ProductFilterOpt, ProductTypeEnum } from '../redux/products/products.types';
import { ModalChildrenProps, Modals } from '../components/ModalProvider/Modals';
import { FilterOpt } from '../components/ModalForm/ModalFilter';
import { ContractorsTypesEnum } from '../redux/contractors/contractors.types';
import { BusinessSubjectFilterOption, BusinessSubjectTypeEnum } from '../redux/companies/companies.types';
import { enumToFilterOptions } from '../utils/fabrics';
import { CountsTypesEnum } from '../redux/directories/counts.types';
import { CategoryTrTypeEnum } from '../redux/directories/directories.types';

export const categoriesFilterOptions: CategoryFilterOpt[] = enumToFilterOptions(CategoryTrTypeEnum);
export const countsFilterOptions: CountFilterOpt[] = enumToFilterOptions(CountsTypesEnum);
export const StorageItemTypeFilterOptions: ProductFilterOpt[] = enumToFilterOptions(ProductTypeEnum);

export const tagsFilterOptions = enumToFilterOptions(ContractorsTypesEnum);

export const counterpartyFilterOptions: FilterOpt<ContractorsTypesEnum>[] = enumToFilterOptions(ContractorsTypesEnum);
export const businessSubjectTypeFilterOptions: BusinessSubjectFilterOption[] =
  enumToFilterOptions(BusinessSubjectTypeEnum);
export const getDirInTreeActionsCreator =
  (
    Modal: Modals = Modals.FormCreateDirTreeComp,
    createParentTitle?: string,
    createChildTitle?: string,
    updateItemTitle?: string
  ): DirInTreeActionsCreatorType =>
  ({ modalService, service, type, dirType, findById }) => {
    return {
      onCreateParent: async () => {
        const modal = modalService.handleOpenModal({
          Modal: Modal,
          props: {
            title: createParentTitle || t('createDirParentItem'),
            type,
            dirType,
            onSubmit: (data, o) => {
              service.create({
                data: { dirType, data },
                onSuccess: rd => {
                  o?.closeAfterSave && modal?.onClose();
                  toast.success(`Created: ${data.label}`);
                },
              });
            },
          } as ModalChildrenProps[Modals.FormCreateDirTreeComp],
        });
      },
      onCreateChild: async (parentId, parent) => {
        const modal = modalService.handleOpenModal({
          Modal,
          props: {
            title: createChildTitle || t('createDirChildItem'),
            type,
            parent,
            dirType,
            onSubmit: (data, o) => {
              service.create({
                data: { dirType, data },
                onSuccess: rd => {
                  o?.closeAfterSave && modal?.onClose();
                  toast.success(`Created: ${data.label}`);
                },
              });
            },
          } as ModalChildrenProps[Modals.FormCreateDirTreeComp],
        });
      },
      onUpdateItem: async (_id, o) => {
        const dataForUpdate = findById ? findById(_id) : undefined;
        if (!dataForUpdate) return;
        const modal = modalService.handleOpenModal({
          Modal,
          props: {
            title: updateItemTitle || t('update'),
            type,
            dirType,
            data: dataForUpdate,
            onSubmit: (data, o) => {
              service?.update({
                data: { dirType, _id, data },
                onSuccess: rd => {
                  o?.closeAfterSave && modal?.onClose();
                  toast.success(`Updated: ${data.label}`);
                },
              });
            },
          } as ModalChildrenProps[Modals.FormCreateDirTreeComp],
        });
      },

      onChangeArchiveStatus: service?.changeArchiveStatus
        ? async (id, status, o) => {
            const dataForUpdate = findById ? findById(id) : undefined;
            if (!dataForUpdate) return;
            service?.changeArchiveStatus({
              data: { dirType, data: { isArchived: status } },
              onSuccess: (rd: any) => {
                toast.success(`${dataForUpdate.label} => ${status ? 'archived' : 'unarchived'}`);
              },
            });
          }
        : undefined,
    };
  };

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
  actionsCreator: getDirInTreeActionsCreator(Modals.FormCreateCount),
};

const countsDir: IDirectory<DirCountsProps> = {
  title: CountsProps.title,
  iconId: iconId.wallet,
  ModalChildren: DirTreeComp,
  modalChildrenProps: CountsProps,
  disabled: false,
};

const CategoriesProps: DirCategoriesProps = {
  title: 'Статті доходів/витрат',
  filterOptions: categoriesFilterOptions,
  fillHeight: true,
  createParentTitle: t('createParentCategory'),
  dirType: ApiDirType.CATEGORIES_TR,
  filterSearchPath: 'type',
  filterDefaultValue: 'INCOME',
  actionsCreator: getDirInTreeActionsCreator(Modals.FormCreateCategory),
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
  actionsCreator: getDirInTreeActionsCreator(Modals.FormCreateCategory),
  filterOptions: StorageItemTypeFilterOptions,
  filterSearchPath: 'type',
  filterDefaultValue: 'GOODS',
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
  filterOptions: counterpartyFilterOptions,
  getTableSettings: ({ service, modalService, type, dirType }) => ({
    tableTitles: contractorsColumns,
    tableSearchParams: contractorsSearchParams,
    actionsCreator: p => [
      { icon: 'openInNew' },
      { icon: 'edit' },
      { icon: 'copy' },
      { icon: 'archive', iconSize: '100%' },
      { separator: true },
      {
        type: 'onlyIconFilled',
        icon: 'plus',
        onClick: async () => {
          const modal = modalService.handleOpenModal({
            ModalChildren: FormCreateContractor,
            modalChildrenProps: {
              title: t('createContractor'),
              fillHeight: true,
              onSubmit: async data => {
                service.create({
                  data: { dirType, data: createDataForReq(data) },
                  onSuccess: rd => {
                    console.log(t('createContractor'), rd);
                    toast.success(`Created: ${data.label || data.name}`);
                    modal?.onClose();
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
  fillHeight: true,
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
  availableLevels: 1,
  createParentTitle: t('createDirParentItem'),
  actionsCreator: getDirInTreeActionsCreator(),
};
const marksDir: IDirectory<DirMarksProps> = {
  title: MarksProps.title,
  iconId: iconId.bookMarkAdd,
  ModalChildren: DirTreeComp,
  modalChildrenProps: MarksProps,
  disabled: false,
};
const dirTagsProps: DirTagsProps = {
  title: t(ApiDirType.TAGS),
  dirType: ApiDirType.TAGS,
  availableLevels: 1,
  filterOptions: tagsFilterOptions,
  createParentTitle: t('createTag'),
  filterSearchPath: 'type',
  fillHeight: true,
  actionsCreator: getDirInTreeActionsCreator(Modals.FormCreateTag),
};
const tagsDir: IDirectory<DirTagsProps> = {
  title: dirTagsProps.title,
  iconId: iconId.bookMarkAdd,
  ModalChildren: DirTreeComp,
  modalChildrenProps: dirTagsProps,
  disabled: false,
};

const activitiesProps: DirActivitiesProps = {
  title: t('activityTypes'),
  createParentTitle: t('createDirParentItem'),
  dirType: ApiDirType.ACTIVITIES,
  fillHeight: true,
  availableLevels: 2,
  actionsCreator: getDirInTreeActionsCreator(),
};
const activitiesDir: IDirectory<DirActivitiesProps> = {
  title: activitiesProps.title,
  iconId: iconId.folder,
  ModalChildren: DirTreeComp,
  modalChildrenProps: activitiesProps,
  disabled: false,
};
const brandsProps: DirBrandsProps = {
  title: t(ApiDirType.BRANDS),
  createParentTitle: t('createDirParentItem'),
  dirType: ApiDirType.BRANDS,
  fillHeight: true,
  availableLevels: 1,
  actionsCreator: getDirInTreeActionsCreator(),
};
const brandsDir: IDirectory<DirBrandsProps> = {
  title: brandsProps.title,
  iconId: iconId.folder,
  ModalChildren: DirTreeComp,
  modalChildrenProps: brandsProps,
  disabled: false,
};
// const warehousesProps: DirWarehousesProps = {
//   title: t(ApiDirType.WAREHOUSES),
//   createParentTitle: 'Create warehouse',
//   dirType: ApiDirType.WAREHOUSES,
//   fillHeight: true,
//   availableLevels: 1,
//   actionsCreator: getDirInTreeActionsCreator(Modals.FormCreateDirTreeComp, 'Create warehouse'),
// };
// const warehousesDir: IDirectory<DirWarehousesProps> = {
//   title: warehousesProps.title,
//   iconId: iconId.storage,
//   ModalChildren: DirTreeComp,
//   modalChildrenProps: warehousesProps,
//   disabled: false,
// };

const directories: Partial<IDirectory>[] = [
  {
    title: 'Банківські рахунки',
    disabled: true,
    modalChildrenProps: {
      dirType: ApiDirType.BANK_ACCOUNTS,
    },
  },
  countsDir,
  trCategoriesDir,
  prodCategoriesDir,
  activitiesDir,
  contractorsDir,
  projectsDir,
  marksDir,
  brandsDir,
  tagsDir,
  {
    title: 'Статуси для замовлень',
    disabled: true,
    modalChildrenProps: {
      dirType: ApiDirType.STATUSES_ORDER,
    },
  },
  {
    title: 'Статуси для повернень',
    disabled: true,
    modalChildrenProps: {
      dirType: ApiDirType.STATUSES_REFUND,
    },
  },
  {
    title: 'Статуси для відправлень',
    disabled: true,
    modalChildrenProps: {
      dirType: ApiDirType.STATUSES_SHIPMENT,
    },
  },
  {
    title: 'Статуси для оплат',
    disabled: true,
    modalChildrenProps: {
      dirType: ApiDirType.STATUSES_PAYMENT,
    },
  },
  {
    title: 'Статуси для клієнтів',
    disabled: true,
  },
  {
    title: 'Статуси для контрагентів',
    disabled: true,
  },
  {
    title: 'Контракти',
    disabled: true,
  },

  {
    title: 'Кастомні поля',
    disabled: true,
    modalChildrenProps: {
      dirType: ApiDirType.CUSTOM_FIELDS,
    },
  },
  {
    title: 'Джерело залучення',
    disabled: true,
  },
  {
    title: 'Каси',
    disabled: true,
  },

  {
    title: 'Працівники',
    disabled: true,
    modalChildrenProps: {
      dirType: ApiDirType.WORKERS,
    },
  },
  {
    title: 'Специфікації',
    disabled: true,
  },
  {
    title: 'Розмірні сітки',
    disabled: true,
  },
  {
    title: "Способи зв'язку",
    disabled: true,
  },
];

export default directories;
