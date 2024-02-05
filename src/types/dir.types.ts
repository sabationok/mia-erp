import { ModalFormProps } from '../components/ModalForm';
import { ITrCategory, ITrCategoryFormData, TagTypeEnum, TrCategoryTypeEnum } from './directories.types';
import { CountsTypesEnum, ICount, ICountFormData } from '../redux/directories/counts.types';
import { FilterOpt } from '../components/atoms/ModalFilter';
import { IBase } from '../redux/global.types';
import { ICompany } from './companies.types';
import { ApiDirType } from '../redux/APP_CONFIGS';
import { IModalProviderContext, ModalService } from '../components/ModalProvider/ModalProvider';
import { DirectoriesService } from '../hooks/useDirService.hook';
import { AppSubmitHandler, UseAppFormSubmitOptions } from '../hooks/useAppForm.hook';
import { ContractorsTypesEnum } from '../redux/directories/contractors.types';
import { OfferTypeEnum } from './products.types';
import { CounterpartyTypesEnum } from '../redux/directories/counterparties.types';
import { MaybeNull } from './utils.types';

export interface DirItemTypeByDirType extends Record<ApiDirType, any> {
  [ApiDirType.COUNTS]: CountsTypesEnum;
  [ApiDirType.CATEGORIES_TR]: TrCategoryTypeEnum;
  [ApiDirType.CATEGORIES_PROD]: OfferTypeEnum;
  [ApiDirType.PROPERTIES_PRODUCTS]: OfferTypeEnum;
  [ApiDirType.CONTRACTORS]: ContractorsTypesEnum | CounterpartyTypesEnum;
  [ApiDirType.COUNTERPARTIES]: ContractorsTypesEnum | CounterpartyTypesEnum;
  [ApiDirType.TAGS]: TagTypeEnum;
}

export interface IBaseDirItem<Type = any, DirType extends ApiDirType = any> extends IBase {
  dirType?: DirType;
  owner?: Pick<ICompany, '_id' | 'name' | 'email'>;
  // products?: IProduct[];
  // orders?: IOrder[];
  parent?: IBaseDirItem<Type, DirType>;
  childrenList?: IBaseDirItem<Type, DirType>[];
  type?: Type;
  name?: string;
  secondName?: string;
  label?: string;
  status?: 'ARCHIVED' | 'DELETED' | 'ACTIVE';
  taxCode?: string | number;
  personalTaxCode?: string | number;
  description?: string;
  manufacturer?: string;
  email?: string;
  phone?: string;
  code?: string | number;
}

export interface IDirItemBase<DirType extends ApiDirType = any> extends IBase {
  type?: DirItemTypeByDirType[DirType];
  dirType?: DirType;
  owner?: Pick<ICompany, '_id' | 'name' | 'email'>;
  // products?: OnlyUUID[];
  // orders?: OnlyUUID[];
  parent?: MaybeNull<IDirItemBase<DirType>>;
  childrenList?: MaybeNull<IDirItemBase<DirType>[]>;
  name?: MaybeNull<string>;
  secondName?: string;

  label?: MaybeNull<string>;
  // status?: 'ARCHIVED' | 'DELETED' | 'ACTIVE';
  taxCode?: string | number;
  personalTaxCode?: string | number;

  description?: string;
  manufacturer?: string;
  email?: string;
  phone?: string;
  code?: string | number;
}

export interface IDirTreeParentItem<DirType extends ApiDirType = any> extends IDirItemBase<DirType> {
  childrenList: IDirTreeParentItem<DirType>[];
}
export interface IDirTreeChildItem<DirType extends ApiDirType = any> extends IDirTreeParentItem<DirType> {
  parent: IDirTreeParentItem<DirType>;
}

export interface DirBaseProps extends ModalFormProps {
  title: string;
}

export interface DirectoriesFormProps<DirType extends ApiDirType = any, ItemDataType = any, FormData = any>
  extends Omit<ModalFormProps<any, any, ItemDataType>, 'onSubmit'> {
  _id?: string;
  dirType?: DirType;
  type?: DirItemTypeByDirType[DirType];
  data?: ItemDataType;
  parent?: Partial<ItemDataType>;
  create?: boolean;
  edit?: boolean;
  onSubmit?: AppSubmitHandler<FormData, { logAfterSubmit?: boolean }>;
}
export interface GetDirInTreeActionsCreatorOptions {
  createParentTitle?: string;
  createChildTitle?: string;
  updateItemTitle?: string;
}

export interface IDirInTreeProps<
  DirType extends ApiDirType = any,
  CreateDTO = any,
  UpdateDTO = any,
  ItemDataType extends IDirItemBase = any,
  Service = any,
  SubmitOptions = any
> extends DirBaseProps {
  dirType: DirType;
  type?: DirItemTypeByDirType[DirType];
  createParentTitle?: string;
  filterOptions?: FilterOpt<DirItemTypeByDirType[DirType]>[];
  filterSearchPath?: keyof IDirItemBase<DirType>;
  filterDefaultValue?: DirItemTypeByDirType[DirType];
  availableLevels?: number;

  editing?: boolean;
  creatingParent?: boolean;
  creatingChild?: boolean;
  disabling?: boolean;
  archiving?: boolean;
  changeDisableStatus?: boolean;
  changeArchiveStatus?: boolean;

  actionsCreator: DirInTreeActionsCreatorType<DirType, ItemDataType, Service, CreateDTO | UpdateDTO, SubmitOptions>;
}

export type ActionsCreatorOptions<
  DirType extends ApiDirType = any,
  CreateDTO = any,
  UpdateDTO = any,
  ItemDataType = any
> = {
  modalService: IModalProviderContext;
  service: DirectoriesService<DirType, CreateDTO, UpdateDTO, ItemDataType>;
  dirType: DirType;
  type?: DirItemTypeByDirType[DirType];
  findById?: (id: string) => ItemDataType | undefined;
};
export type DirInTreeActionsCreatorOptions<DirType extends ApiDirType = any, ItemDataType = any, Service = any> = {
  modalService: ModalService;
  dirType: DirType;
  service: Service;
  type?: DirItemTypeByDirType[DirType];
  findById?: (id: string) => ItemDataType | undefined;
};
export type DirInTreeActionsCreatorType<
  DirType extends ApiDirType = any,
  ItemDataType extends IDirItemBase = any,
  Service = any,
  ItemDto = any,
  SubmitOptions = any
> = (options: DirInTreeActionsCreatorOptions<DirType, ItemDataType, Service>) => {
  onCreateParent?: (options?: UseAppFormSubmitOptions & SubmitOptions) => void;
  onCreateChild?: (
    parentId: string,
    parent: MaybeNull<IBaseDirItem>,
    options?: UseAppFormSubmitOptions & SubmitOptions
  ) => void;
  onCreateValue?: (
    parentId: string,
    parent: MaybeNull<IBaseDirItem>,
    options?: UseAppFormSubmitOptions & SubmitOptions
  ) => void;

  onUpdate?: (id: string, data: ItemDataType, options?: UseAppFormSubmitOptions & SubmitOptions) => void;
  onDelete?: (id: string, options?: UseAppFormSubmitOptions & SubmitOptions) => void;

  onChangeArchiveStatus?: (id: string, status: boolean, options?: UseAppFormSubmitOptions & SubmitOptions) => void;
  onChangeDisableStatus?: (id: string, status: boolean, options?: UseAppFormSubmitOptions & SubmitOptions) => void;
};

export interface DirCategoriesProps
  extends IDirInTreeProps<ApiDirType.CATEGORIES_TR, ITrCategoryFormData, ITrCategoryFormData, ITrCategory> {}

export interface DirProductCategoriesProps
  extends IDirInTreeProps<ApiDirType.CATEGORIES_PROD, ITrCategoryFormData, ITrCategoryFormData, ITrCategory> {}

// export interface DirBrandsProps
//   extends IDirInTreeProps<ApiDirType.BRANDS, any, ICategoryFormData, ICategoryFormData, ICategory> {}

export interface DirCountsProps extends IDirInTreeProps<ApiDirType.COUNTS, ICountFormData, ICountFormData, ICount> {}
export interface IActivity extends IDirItemBase<ApiDirType.ACTIVITIES> {}
export interface IActivityFormData extends Omit<IActivity, '_id' | 'createdAt' | 'updatedAt'> {}
export interface DirActivitiesProps
  extends IDirInTreeProps<ApiDirType.ACTIVITIES, IActivityFormData, IActivityFormData, IActivity> {}

// ? ================ PRODUCT CATEGORIES
export interface IProductParentCategoryDirItem extends IDirItemBase<ApiDirType.CATEGORIES_PROD> {}
export interface IProductCategoryDirItem extends IDirItemBase<ApiDirType.CATEGORIES_PROD> {}
export interface IProductCategoryDirItem extends IDirItemBase<ApiDirType.CATEGORIES_PROD> {}

// ? ================ BRANDS
export interface IBrand extends IDirItemBase {}
export interface IBrandFormData extends Omit<IBrand, '_id' | 'createdAt' | 'updatedAt'> {}
export interface DirBrandsProps extends IDirInTreeProps<ApiDirType.BRANDS, IBrandFormData, IBrandFormData, IBrand> {}

// ? PRODUCTS PROPERTIES

export interface DirMarksProps extends IDirInTreeProps<ApiDirType.MARKS> {}

export interface ITagDirItem extends IDirItemBase<ApiDirType.TAGS> {}
export interface DirTagsProps extends IDirInTreeProps<ApiDirType.TAGS> {}

export interface ISupplierDirItem extends IDirItemBase<ApiDirType.CONTRACTORS> {}

// ? ======== METHODS
export interface IShipmentDirItem extends IDirItemBase<ApiDirType.METHODS_SHIPMENT> {}
export interface IPaymentDirItem extends IDirItemBase<ApiDirType.METHODS_PAYMENT> {}

export type MethodDirType = ApiDirType.METHODS_SHIPMENT | ApiDirType.METHODS_COMMUNICATION | ApiDirType.METHODS_PAYMENT;

export type IMethodDirItem = IShipmentDirItem | IPaymentDirItem;
