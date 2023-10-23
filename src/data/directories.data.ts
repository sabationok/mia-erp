import { DirProjectsProps } from 'components/Directories/DirProjects';
import { iconId } from '../img/sprite';
import { contractorsColumns, contractorsSearchParams } from './contractors.data';
import {
  DirActivitiesProps,
  DirBrandsProps,
  DirCategoriesProps,
  DirCountsProps,
  DirInTreeActionsCreatorType,
  DirMarksProps,
  DirProductCategoriesProps,
  DirTagsProps,
  GetDirInTreeActionsCreatorOptions,
  IDirItemBase,
} from '../components/Directories/dir.types';
import { t } from '../lang';
import DirTreeComp from '../components/Directories/DirTreeComp';
import { ApiDirType } from '../redux/APP_CONFIGS';
import { toast } from 'react-toastify';
import DirTableComp, { DirTableCompProps } from '../components/Directories/DirTableComp';
import FormCreateCounterparty from '../components/Forms/FormCreateCounterparty';
import { createDataForReq } from '../utils/dataTransform';
import { ProductTypeEnum } from '../redux/products/products.types';
import { ModalChildrenProps, Modals } from '../components/Modals';
import { CountsTypesEnum } from '../redux/directories/counts.types';
import { CategoryTrTypeEnum } from '../redux/directories/directories.types';
import { DirectoriesService } from '../hooks/useDirService.hook';
import DirProperties, {
  dirPropertiesActionsCreator,
  DirPropertiesProps,
} from '../components/Directories/DirProperties';
import { IDirectoryListItem } from '../components/SideBarContent/Directories';
import {
  categoriesFilterOptions,
  counterpartyFilterOptions,
  countsFilterOptions,
  productsFilterOptions,
  tagsFilterOptions,
} from './modalFilterOptions.data';

export const getDirInTreeActionsCreator = (
  Modal: Modals = Modals.FormCreateDirTreeComp,
  { createParentTitle, createChildTitle, updateItemTitle }: GetDirInTreeActionsCreatorOptions = {}
): DirInTreeActionsCreatorType<ApiDirType, IDirItemBase, DirectoriesService> => {
  return ({ modalService, service, type, dirType, findById }) => {
    return {
      onCreateParent: () => {
        const modal = modalService.handleOpenModal({
          Modal: Modal,
          props: {
            title: createParentTitle || t('createDirParentItem'),
            type,
            dirType,
            create: true,
            defaultState: { dirType, type },
            onSubmit: (data, o) => {
              console.log('onCreateParent', data);
              dirType &&
                service
                  .create({
                    data: { dirType, data },
                    onSuccess: rd => {
                      o?.closeAfterSave && modal?.onClose();
                      toast.success(`Created: ${data.label}`);
                    },
                  })
                  .then();
            },
          } as ModalChildrenProps[Modals.FormCreateDirTreeComp],
        });
      },
      onCreateChild: (_, parent) => {
        const modal = modalService.handleOpenModal({
          Modal,
          props: {
            title: createChildTitle || t('createDirChildItem'),
            type,
            parent,
            dirType,
            defaultState: { dirType, type, parent },
            create: true,
            onSubmit: (data, o) => {
              service
                .create({
                  data: { dirType, data },
                  onSuccess: rd => {
                    o?.closeAfterSave && modal?.onClose();
                    toast.success(`Created: ${data.label}`);
                  },
                })
                .then();
            },
          } as ModalChildrenProps[Modals.FormCreateDirTreeComp],
        });
      },
      onUpdate: (_id, dataForUpdate) => {
        const modal = modalService.handleOpenModal({
          Modal,
          props: {
            title: updateItemTitle || t('update'),
            type,
            dirType,
            _id,
            edit: true,
            defaultState: dataForUpdate,
            onSubmit: (data, o) => {
              service
                ?.update({
                  data: { dirType, _id, data },
                  onSuccess: rd => {
                    o?.closeAfterSave && modal?.onClose();
                    toast.success(`Updated: ${data.label}`);
                  },
                })
                .then();
            },
          } as ModalChildrenProps[Modals.FormCreateDirTreeComp],
        });
      },
      onChangeArchiveStatus: (_id, status) => {
        service
          .changeArchiveStatus({
            data: { dirType, _id, data: { isArchived: status } },
            onSuccess: (rd, meta) => {
              console.log(rd);
              // toast.success(`${dataForUpdate.label} => ${status ? 'archived' : 'unarchived'}`);
            },
          })
          .then();
      },
      onChangeDisableStatus: (_id, status) => {
        service
          .changeDisabledStatus({ data: { dirType, _id, data: { disabled: status } }, onSuccess: (rd, meta) => {} })
          .then();
      },
    };
  };
};

// export interface IDirectoryListItem<P extends DirBaseProps = any> {
//   title: string;
//   iconId: string;
//   ModalChildren: React.FC<P>;
//   modalChildrenProps: P;
//   disabled: boolean;
// }

const CountsProps: DirCountsProps = {
  title: t('counts'),
  fillHeight: true,
  createParentTitle: t('createParentCount'),
  dirType: ApiDirType.COUNTS,
  availableLevels: 2,
  editing: true,
  creatingChild: true,
  creatingParent: true,
  archiving: true,
  filterSearchPath: 'type',
  filterOptions: countsFilterOptions,
  filterDefaultValue: CountsTypesEnum.ACTIVE,
  actionsCreator: getDirInTreeActionsCreator(Modals.FormCreateCount),
};

const countsDir: IDirectoryListItem<any, DirCountsProps> = {
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
  editing: true,
  creatingChild: true,
  creatingParent: true,
  archiving: true,
  createParentTitle: t('createParentCategory'),
  dirType: ApiDirType.CATEGORIES_TR,
  availableLevels: 2,
  filterSearchPath: 'type',
  filterDefaultValue: CategoryTrTypeEnum.INCOME,
  actionsCreator: getDirInTreeActionsCreator(Modals.FormCreateCategory),
};
const trCategoriesDir: IDirectoryListItem<any, DirCategoriesProps> = {
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
  filterOptions: productsFilterOptions,
  editing: true,
  creatingChild: true,
  creatingParent: true,
  archiving: true,
  filterSearchPath: 'type',
  filterDefaultValue: ProductTypeEnum.GOODS,
  availableLevels: 5,
};
const prodCategoriesDir: IDirectoryListItem<any, DirProductCategoriesProps> = {
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
            ModalChildren: FormCreateCounterparty,
            modalChildrenProps: {
              title: t('Create counterparty'),
              fillHeight: true,
              onSubmit: async data => {
                service.create({
                  data: { dirType, data: createDataForReq(data) },
                  onSuccess: rd => {
                    console.log(t('Create counterparty rd'), rd);
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
const contractorsDir: IDirectoryListItem<any, DirTableCompProps> = {
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
const projectsDir: IDirectoryListItem<any, DirProjectsProps> = {
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
const marksDir: IDirectoryListItem<any, DirMarksProps> = {
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
const tagsDir: IDirectoryListItem<any, DirTagsProps> = {
  title: dirTagsProps.title,
  iconId: iconId.bookMarkAdd,
  ModalChildren: DirTreeComp,
  modalChildrenProps: dirTagsProps,
  disabled: false,
};

const activitiesProps: DirActivitiesProps = {
  title: t('Company activities'),
  createParentTitle: t('Create activity'),
  dirType: ApiDirType.ACTIVITIES,
  fillHeight: true,
  availableLevels: 2,
  actionsCreator: getDirInTreeActionsCreator(),
};
const activitiesDir: IDirectoryListItem<any, DirActivitiesProps> = {
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
const brandsDir: IDirectoryListItem<any, DirBrandsProps> = {
  title: brandsProps.title,
  iconId: iconId.folder,
  ModalChildren: DirTreeComp,
  modalChildrenProps: brandsProps,
  disabled: false,
};

const prodPropertiesProps: DirPropertiesProps = {
  title: t(ApiDirType.PROPERTIES_PRODUCTS),
  createParentTitle: 'Create properties group',
  dirType: ApiDirType.PROPERTIES_PRODUCTS,
  fillHeight: true,
  filterOptions: productsFilterOptions,
  filterSearchPath: 'type',
  availableLevels: 3,
  creatingChild: true,
  actionsCreator: dirPropertiesActionsCreator,
};
const prodPropertiesDir: IDirectoryListItem<any, DirPropertiesProps> = {
  title: prodPropertiesProps.title,
  iconId: iconId.storage,
  ModalChildren: DirProperties,
  modalChildrenProps: prodPropertiesProps,
  disabled: false,
};

const directories: Partial<IDirectoryListItem>[] = [
  countsDir,
  trCategoriesDir,
  prodCategoriesDir,
  prodPropertiesDir,
  activitiesDir,
  contractorsDir,
  projectsDir,
  marksDir,
  brandsDir,
  tagsDir,

  {
    title: t('Bank counts'),
    disabled: true,
    modalChildrenProps: {
      dirType: ApiDirType.BANK_ACCOUNTS,
    },
  },
  {
    title: t('Order statuses'),
    disabled: true,
    modalChildrenProps: {
      dirType: ApiDirType.STATUSES_ORDER,
    },
  },
  {
    title: t('Refund statuses'),
    disabled: true,
    modalChildrenProps: {
      dirType: ApiDirType.STATUSES_REFUND,
    },
  },
  {
    title: t('Invoice statuses'),
    disabled: true,
    modalChildrenProps: {
      dirType: ApiDirType.STATUSES_INVOICE,
    },
  },
  {
    title: t('Invoice shipment'),
    disabled: true,
    modalChildrenProps: {
      dirType: ApiDirType.STATUSES_SHIPMENT,
    },
  },

  {
    title: t('Customer statuses'),
    disabled: true,
  },
  {
    title: t('Counterparty statuses'),
    disabled: true,
  },
  {
    title: t('Contracts'),
    disabled: true,
  },

  {
    title: t('Custom fields'),
    disabled: true,
    modalChildrenProps: {
      dirType: ApiDirType.CUSTOM_FIELDS,
    },
  },
  {
    title: t('Engagement sources'),
    disabled: true,
  },
  {
    title: t('Cash boxes'),
    disabled: true,
  },

  {
    title: t('Size tabels'),
    disabled: true,
  },
];

export default directories;
