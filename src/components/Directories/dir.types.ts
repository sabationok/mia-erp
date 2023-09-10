import { ModalFormProps } from '../ModalForm';
import {
  CategoryTrTypeEnum,
  CategoryTypes,
  ICategory,
  ICategoryFormData,
} from '../../redux/directories/directories.types';
import { CountsTypesEnum, CountType, ICount, ICountFormData } from '../../redux/directories/counts.types';
import { FilterOpt } from '../ModalForm/ModalFilter';
import { IBase, OnlyUUID } from '../../redux/global.types';
import { ICompany } from '../../redux/companies/companies.types';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { IModalProviderContext } from '../ModalProvider/ModalProvider';
import { DirectoriesService } from '../../hooks/useDirService.hook';
import { AppSubmitHandler, UseAppFormSubmitOptions } from '../../hooks/useAppForm.hook';
import { ContractorsTypesEnum } from '../../redux/contractors/contractors.types';
import { ProductTypeEnum } from '../../redux/products/products.types';

export interface ItemTypeByDirType extends Record<ApiDirType, any> {
  [ApiDirType.COUNTS]: CountsTypesEnum;
  [ApiDirType.CATEGORIES_TR]: CategoryTrTypeEnum;
  [ApiDirType.CATEGORIES_PROD]: ProductTypeEnum;
  [ApiDirType.PROPERTIES_PRODUCTS]: ProductTypeEnum;
  [ApiDirType.CONTRACTORS]: ContractorsTypesEnum;
  [ApiDirType.TAGS]: ContractorsTypesEnum;
  [ApiDirType.METHODS_SHIPMENT]: IShipmentDirItem;
  [ApiDirType.METHODS_COMMUNICATION]: ICommunicationDirItem;
  [ApiDirType.METHODS_PAYMENT]: IPaymentDirItem;
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
  dirType?: DirType;
  owner?: Pick<ICompany, '_id' | 'name' | 'email'>;
  products?: OnlyUUID[];
  orders?: OnlyUUID[];
  parent?: IDirItemBase<DirType>;
  childrenList?: IDirItemBase<DirType>[];
  type?: ItemTypeByDirType[DirType];
  name?: string;
  secondName?: string;
  label?: string;
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
  type?: ItemTypeByDirType[DirType];
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
  type?: ItemTypeByDirType[DirType];
  createParentTitle?: string;
  filterOptions?: FilterOpt<ItemTypeByDirType[DirType]>[];
  filterSearchPath?: keyof IDirItemBase<DirType>;
  filterDefaultValue?: ItemTypeByDirType[DirType];
  availableLevels?: number;

  editing?: boolean;
  creatingParent?: boolean;
  creatingChild?: boolean;
  disabling?: boolean;
  archiving?: boolean;
  changeDisableStatus?: boolean;
  changeArchiveStatus?: boolean;

  actionsCreator: DirInTreeActionsCreatorType<
    DirType,
    unknown,
    ItemDataType,
    Service,
    CreateDTO | UpdateDTO,
    SubmitOptions
  >;
}

export type ActionsCreatorOptions<
  DirType extends ApiDirType = any,
  ItemType = any,
  CreateDTO = any,
  UpdateDTO = any,
  ItemDataType = any
> = {
  modalService: IModalProviderContext;
  service: DirectoriesService<DirType, ItemType, CreateDTO, UpdateDTO, ItemDataType>;
  dirType: DirType;
  type?: ItemTypeByDirType[DirType];
  findById?: (id: string) => ItemDataType | undefined;
};
export type DirInTreeActionsCreatorOptions<DirType extends ApiDirType = any, ItemDataType = any, Service = any> = {
  modalService: IModalProviderContext;
  dirType: DirType;
  service: Service;
  type?: ItemTypeByDirType[DirType];
  findById?: (id: string) => ItemDataType | undefined;
};
export type DirInTreeActionsCreatorType<
  DirType extends ApiDirType = any,
  ItemType = any,
  ItemDataType extends IDirItemBase = any,
  Service = any,
  ItemDto = any,
  SubmitOptions = any
> = (options: DirInTreeActionsCreatorOptions<DirType, ItemDataType, Service>) => {
  onCreateParent?: (options?: UseAppFormSubmitOptions & SubmitOptions) => void;
  onCreateChild?: (parentId: string, parent: IBaseDirItem, options?: UseAppFormSubmitOptions & SubmitOptions) => void;
  onCreateValue?: (parentId: string, parent: IBaseDirItem, options?: UseAppFormSubmitOptions & SubmitOptions) => void;

  onUpdate?: (id: string, data: ItemDto, options?: UseAppFormSubmitOptions & SubmitOptions) => void;
  onDelete?: (id: string, options?: UseAppFormSubmitOptions & SubmitOptions) => void;

  onChangeArchiveStatus?: (id: string, status: boolean, options?: UseAppFormSubmitOptions & SubmitOptions) => void;
  onChangeDisableStatus?: (id: string, status: boolean, options?: UseAppFormSubmitOptions & SubmitOptions) => void;
};

export interface DirCategoriesProps
  extends IDirInTreeProps<ApiDirType.CATEGORIES_TR, ICategoryFormData, ICategoryFormData, ICategory> {}

export interface DirProductCategoriesProps
  extends IDirInTreeProps<ApiDirType.CATEGORIES_PROD, ICategoryFormData, ICategoryFormData, ICategory> {}

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
export interface IPropertyDirItem extends IDirItemBase {}
export interface IPropertyFormData extends Omit<IPropertyDirItem, '_id' | 'createdAt' | 'updatedAt' | 'childrenList'> {}
export interface DirPropertiesProps
  extends IDirInTreeProps<ApiDirType.PROPERTIES_PRODUCTS, IPropertyFormData, IPropertyFormData, IPropertyDirItem> {}

export interface DirMarksProps extends IDirInTreeProps<ApiDirType.MARKS> {}

export interface ITagDirItem extends IDirItemBase<ApiDirType.TAGS> {}
export interface DirTagsProps extends IDirInTreeProps<ApiDirType.TAGS> {}

export interface ISupplierDirItem extends IDirItemBase<ApiDirType.CONTRACTORS> {}
export interface ICustomerDirItem extends IDirItemBase<ApiDirType.CONTRACTORS> {
  secondName?: string;
}

// ? ======== METHODS
export interface IShipmentDirItem extends IDirItemBase<ApiDirType.METHODS_SHIPMENT> {}
export interface ICommunicationDirItem extends IDirItemBase<ApiDirType.METHODS_COMMUNICATION> {}
export interface IPaymentDirItem extends IDirItemBase<ApiDirType.METHODS_PAYMENT> {}

export type MethodDirType = ApiDirType.METHODS_SHIPMENT | ApiDirType.METHODS_COMMUNICATION | ApiDirType.METHODS_PAYMENT;

export type IMethodDirItem = IShipmentDirItem | ICommunicationDirItem | IPaymentDirItem;

// ? ============== WAREHOUSES
// export interface IWarehouse extends IDirItemBase<ApiDirType.WAREHOUSES> {}
// export interface IWarehouseFormData extends Omit<IWarehouse, '_id' | 'createdAt' | 'updatedAt'> {}
// export interface DirWarehousesProps
//   extends IDirInTreeProps<ApiDirType.WAREHOUSES, IWarehouseFormData, IWarehouseFormData, IWarehouse> {}
// export interface IWarehouseDirItem extends IDirItemBase<ApiDirType.WAREHOUSES> {
//   code?: string | number;
// }

// export interface DirStatusOrderProps extends IDirInTreeProps<ApiDirType.STATUSES_ORDER> {}

// export interface DirStatusRefundProps extends IDirInTreeProps<ApiDirType.STATUSES_REFUND> {}

// export interface DirStatusDeliveryProps extends IDirInTreeProps<ApiDirType.STATUSES_SHIPMENT> {}

// export interface DirProjectsProps extends DirTableCompProps<ApiDirType.PROJECTS> {}

// export type ActivityType = 'BASE' | 'ADDS';

export type CategoryFilterOpt<D = any> = FilterOpt<CategoryTypes, D>;

export type CountFilterOpt<D = any> = FilterOpt<CountType, D>;
// export type ActivityFilterOpt<D = any> = FilterOpt<ActivityType, D>;
